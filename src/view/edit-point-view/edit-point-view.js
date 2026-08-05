/* eslint-disable camelcase */
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import dayjs from 'dayjs';
import { createEditPointTemplate } from './edit-point-view-template.js';
import AbstractStatefulView from '../../framework/view/abstract-stateful-view.js';

const DATE_TIME_FORMAT = 'd/m/y\\ H:i';
const formatOfferTitle = (title) => title.split(' ').join('_');

export default class EditPointView extends AbstractStatefulView {
  #handleFormSubmit = null;
  #handleFormClose = null;
  #handleDeleteClick = null;
  #startDatepicker = null;
  #endDatepicker = null;
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
    this._restoreHandlers();
  }

  get template() {
    const { point, destinations, offers } = this._state;
    if (!point) {
      return '<li class="trip-events__item"></li>';
    }
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
    const element = this.element;
    element.querySelector('form').addEventListener('submit', this.#submitFormHandler);
    element.querySelector('.event__rollup-btn')?.addEventListener('click', this.#closeFormHandler);
    element.querySelector('.event__reset-btn').addEventListener('click', this.#resetButtonHandler);

    element.querySelectorAll('.event__type-input').forEach((input) => {
      input.addEventListener('change', this.#typeChangeHandler);
    });

    const destinationInput = element.querySelector('[name="event-destination"]');
    if (destinationInput) {
      this.#destinationInput = destinationInput;
      this.#validateDestinationHandler = this.#validateDestination.bind(this);
      this.#destinationInput.addEventListener('input', this.#validateDestinationHandler);
    }

    this.#setDatepickers();
  }

  #setDatepickers() {
    const { point } = this._state;
    if (!point) {
      return;
    }

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

  #validateDestination = () => {
    const input = this.#destinationInput;
    const value = input.value.trim();
    const destination = this._state.destinations.find((dest) => dest.name === value);
    input.setCustomValidity(destination ? '' : 'Выберите город из списка');
    input.reportValidity();
  };

  #getPoint() {
    const { point, destinations, offers } = this._state;
    if (!point) {
      return null;
    }

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
      return null;
    }
    destinationInput.setCustomValidity('');

    const selectedOffers = typeOffers
      .filter((offer) => {
        const offerId = `event-offer-${formatOfferTitle(offer.title)}-${pointId}`;
        const checkbox = form.querySelector(`[id="${CSS.escape(offerId)}"]`);
        return checkbox?.checked;
      })
      .map((offer) => offer.id);

    const startValue = form.querySelector('[name="event-start-time"]').value;
    const endValue = form.querySelector('[name="event-end-time"]').value;
    const parsedStart = dayjs(startValue, DATE_TIME_FORMAT);
    const parsedEnd = dayjs(endValue, DATE_TIME_FORMAT);

    return {
      ...point,
      type,
      destination: destination?.id ?? point.destination,
      date_from: parsedStart.isValid() ? parsedStart.toISOString() : point.date_from,
      date_to: parsedEnd.isValid() ? parsedEnd.toISOString() : point.date_to,
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
    this.#handleFormClose?.();
  };

  #resetButtonHandler = (evt) => {
    evt.preventDefault();
    if (this._state.point?.id) {
      return this.#handleDeleteClick?.();
    }
    this.#handleFormClose?.();
  };
}
