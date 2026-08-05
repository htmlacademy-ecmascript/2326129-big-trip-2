/* eslint-disable camelcase */
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import dayjs from 'dayjs';
import { createEditPointTemplate } from './edit-point-view-template.js';
import AbstractStatefulView from '../../framework/view/abstract-stateful-view.js';

const DATE_TIME_FORMAT = 'Y-m-d\\TH:i';

const formatOfferTitle = (title) => title.split(' ').join('_');

export default class EditPointView extends AbstractStatefulView {
  #handleFormSubmit = null;
  #handleFormClose = null;
  #datepicker = null;
  #datepickerFrom = null;
  #datepickerTo = null;
  #handleDeleteClick = null;
  #startDatepicker = null;
  #endDatepicker = null;
  #saveButton = null;
  #destinationInput = null;
  #validateDestinationHandler = null;

  constructor({ point, destinations, offers, onFormSubmit, onRollupClick, onDeleteClick }) {
    super();
    this._setState({
      point,
      destinations,
      offers,
    });
    this.#handleFormSubmit = onFormSubmit;
    this.#handleFormClose = onRollupClick;
    this.#handleDeleteClick = onDeleteClick;
    this.#saveButton = this.element.querySelector('.event__save-btn');

    this._restoreHandlers();
  }

  get template() {
    const { point, destinations, offers } = this._state;
    return createEditPointTemplate(point, destinations, offers);
  }

  removeElement() {
    if (this.#destinationInput && this.#validateDestinationHandler) {
      this.#destinationInput.removeEventListener('input', this.#validateDestinationHandler);
      this.#destinationInput = null;
      this.#validateDestinationHandler = null;
    }
    this.#startDatepicker?.destroy();
    this.#endDatepicker?.destroy();
    this.#startDatepicker = null;
    this.#endDatepicker = null;
    super.removeElement();
  }

  _restoreHandlers() {
    this.element.querySelector('form').addEventListener('submit', this.#submitFormHandler);
    this.element.querySelector('.event__rollup-btn')?.addEventListener('click', this.#closeFormHandler);
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#resetButtonHandler);

    this.element.querySelectorAll('.event__type-input').forEach((input) => {
      input.addEventListener('change', this.#typeChangeHandler);
    });

    const destinationInput = this.element.querySelector('[name="event-destination"]');
    if (destinationInput) {
      this.#destinationInput = destinationInput;
      this.#validateDestinationHandler = this.#validateDestination.bind(this);
      this.#destinationInput.addEventListener('input', this.#validateDestinationHandler);
    }
    this.#setDatepickers();
  }

  #validateDestination = () => {
    const input = this.#destinationInput;
    const value = input.value.trim();
    const destination = this._state.destinations.find((dest) => dest.name === value);
    input.setCustomValidity(destination ? '' : 'Выберите город из списка');
    input.reportValidity();
  };

  #setDatepickers() {
    const { point } = this._state;
    const startElement = this.element.querySelector('[name="event-start-time"]');
    const endElement = this.element.querySelector('[name="event-end-time"]');

    this.#startDatepicker?.destroy();
    this.#endDatepicker?.destroy();

    this.#startDatepicker = flatpickr(startElement, {
      enableTime: true,
      dateFormat: DATE_TIME_FORMAT,
      defaultDate: point.date_from,
      minDate: 'today',
      onChange: ([selectedDate]) => {
        if (selectedDate) {
          this.#endDatepicker.set('minDate', selectedDate);
        }
      },
    });

    this.#endDatepicker = flatpickr(endElement, {
      enableTime: true,
      dateFormat: DATE_TIME_FORMAT,
      defaultDate: point.date_to,
      minDate: point.date_from,
      onChange: ([selectedDate]) => {
        if (selectedDate) {
          this.#startDatepicker.set('maxDate', selectedDate);
        }
      },
    });
  }

  #getPoint() {
    const { point, destinations, offers } = this._state;
    const form = this.element.querySelector('.event--edit');
    const destinationInput = form.querySelector('[name="event-destination"]');
    const destinationName = destinationInput.value.trim();
    const destination = destinations.find((dest) => dest.name === destinationName);
    const type = form.querySelector('[name="event-type"]:checked')?.value ?? point.type;
    const typeOffers = offers.find((item) => item.type === type).offers;
    const pointId = point.id || null;

    if (!destination) {
      destinationInput.setCustomValidity('Выберите город из списка');
      destinationInput.reportValidity();
      return null; // не возвращаем точку
    } else {
      destinationInput.setCustomValidity(''); // сбрасываем ошибку
    }

    const selectedOffers = typeOffers
      .filter((offer) => {
        const offerId = `event-offer-${formatOfferTitle(offer.title)}-${pointId}`;
        const checkbox = form.querySelector(`[id="${CSS.escape(offerId)}"]`);
        return checkbox?.checked;
      })
      .map((offer) => offer.id);

    return {
      ...point,
      type,
      destination: destination?.id ?? point.destination,
      date_from: dayjs(form.querySelector('[name="event-start-time"]').value).toISOString(),
      date_to: dayjs(form.querySelector('[name="event-end-time"]').value).toISOString(),
      base_price: Number(form.querySelector('[name="event-price"]').value) || 0,
      offers: selectedOffers,
    };
  }

  #typeChangeHandler = (evt) => {
    const selectedType = evt.target.value;

    this.element.querySelector('.event__type-toggle').checked = false;

    if (selectedType === this._state.point.type) {
      return;
    }

    this.updateElement({
      point: {
        ...this._state.point,
        type: selectedType,
        offers: [],
      },
    });
  };

  #submitFormHandler = (evt) => {
    evt.preventDefault();
    const updatedPoint = this.#getPoint();
    if (updatedPoint) {
      this.#handleFormSubmit(updatedPoint);
    }
  };

  #closeFormHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormClose();
  };

  #resetFormHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormClose();
  };

  #destinationChangeHandler = (evt) => {
    const inputValue = evt.target.value.trim();
    const selectedDestination = this.destinations.find(
      (dest) => dest.name.toLowerCase() === inputValue.toLowerCase()
    );
    const destinationId = selectedDestination ? selectedDestination.id : null;
    this.updateElement({
      point: { ...this._state.point, destination: destinationId }
    });
  };

  #offersChangeHandler = () => {
    const checkboxes = Array.from(
      this.element.querySelectorAll('.event__offer-checkbox:checked')
    );
    this._setState({
      point: {
        ...this._state.point,
        offers: checkboxes.map((cb) => cb.dataset.offerId)
      }
    });
  };

  #priceChangeHandler = (evt) => {
    this._setState({
      point: {
        ...this._state.point,
        basePrice: evt.target.value
      }
    });
  };

  #dateFromCloseHandler = ([userDate]) => {
    this._setState({
      point: {
        ...this._state.point,
        date_from: userDate.toISOString()
      }
    });
    this.#datepickerTo.set('minDate', this._state.point.date_from);
  };

  #dateToCloseHandler = ([userDate]) => {
    this._setState({
      point: {
        ...this._state.point,
        date_to: userDate.toISOString()
      }
    });
    this.#datepickerFrom.set('maxDate', this._state.point.date_to);
  };

  #setDatepicker() {
    const [dateFromElement, dateToElement] = this.element.querySelectorAll('.event__input--time');
    const commonConfig = {
      dateFormat: 'd/m/y H:i',
      enableTime: true,
      'time_24hr': true,
      locale: { firstDayOfWeek: 1 }
    };

    this.#datepickerFrom = flatpickr(
      dateFromElement,
      {
        ...commonConfig,
        defaultDate: this._state.point.date_from,
        onClose: this.#dateFromCloseHandler,
        maxDate: this._state.point.date_to,
      }
    );

    this.#datepickerTo = flatpickr(
      dateToElement,
      {
        ...commonConfig,
        defaultDate: this._state.point.date_to,
        onClose: this.#dateToCloseHandler,
        minDate: this._state.point.date_from,
      }
    );
  }

  static parsePointToState = ({ point }) => ({ point });

  static parseStateToPoint = (state) => state.point;
  #deletePointHandler = (evt) => {
    evt.preventDefault();

    if (this._state.point.id) {
      return this.#handleDeleteClick?.();
    }

    return this.#handleFormClose?.();
  };
}
