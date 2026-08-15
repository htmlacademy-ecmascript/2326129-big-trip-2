/* eslint-disable camelcase */
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { createEditPointTemplate } from './edit-point-view-template.js';
import AbstractStatefulView from '../../framework/view/abstract-stateful-view.js';
import { isPointEqual } from '../../utils/point-adapter.js';
import { getSafePointType } from '../../const.js';
import { formatOfferTitle } from '../../utils/common.js';

dayjs.extend(customParseFormat);

const DATE_TIME_FORMAT = 'd/m/y H:i';
const DAYJS_DATE_TIME_FORMAT = 'D/M/YY H:mm';
const NEW_POINT_ID = 'new';

const ButtonText = {
  SAVE: 'Save',
  SAVING: 'Saving...',
  DELETE: 'Delete',
  DELETING: 'Deleting...',
  CANCEL: 'Cancel',
};

export default class EditPointView extends AbstractStatefulView {
  #handleFormSubmit = null;
  #handleFormClose = null;
  #handleDeleteClick = null;
  #startDatepicker = null;
  #endDatepicker = null;
  #destinationInput = null;
  #validateDestinationHandler = null;
  #initialPoint = null;

  constructor({ point, destinations, offers, onFormSubmit, onRollupClick, onDeleteClick }) {
    super();
    this.#initialPoint = {
      ...point,
      offers: [...(point.offers ?? [])],
    };
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
      this.#destinationInput.removeEventListener('change', this.#destinationChangeHandler);
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
      this.#destinationInput.addEventListener('change', this.#destinationChangeHandler);
    }

    this.#setDatepickers();
  }

  #isNewPoint() {
    return !this._state.point?.id;
  }

  #getMinEndDate(dateFrom) {
    if (dateFrom) {
      return dateFrom;
    }

    return this.#isNewPoint() ? 'today' : null;
  }

  #setDatepickers() {
    const { point } = this._state;
    if (!point) {
      return;
    }

    const isNewPoint = this.#isNewPoint();
    const startElement = this.element.querySelector('[name="event-start-time"]');
    const endElement = this.element.querySelector('[name="event-end-time"]');
    this.#startDatepicker?.destroy();
    this.#endDatepicker?.destroy();

    this.#startDatepicker = flatpickr(startElement, {
      enableTime: true,
      dateFormat: DATE_TIME_FORMAT,
      ...(point.date_from ? { defaultDate: point.date_from } : {}),
      ...(isNewPoint ? { minDate: 'today' } : {}),
      onChange: ([selectedDate]) => {
        this.#endDatepicker.set('minDate', this.#getMinEndDate(selectedDate));
      },
    });

    this.#endDatepicker = flatpickr(endElement, {
      enableTime: true,
      dateFormat: DATE_TIME_FORMAT,
      ...(point.date_to ? { defaultDate: point.date_to } : {}),
      minDate: this.#getMinEndDate(point.date_from),
      onChange: ([selectedDate]) => {
        if (selectedDate) {
          this.#startDatepicker.set('maxDate', selectedDate);
        }
      },
    });
  }

  #destinationChangeHandler = () => {
    const value = this.#destinationInput.value.trim();
    const destination = this._state.destinations.find((dest) => dest.name === value);

    if (!destination || destination.id === this._state.point.destination) {
      return;
    }

    this.updateElement({
      point: {
        ...this.#parseFormPoint(),
        destination: destination.id,
      },
    });
  };

  #validateDestination = () => {
    const input = this.#destinationInput;
    const value = input.value.trim();
    const destination = this._state.destinations.find((dest) => dest.name === value);
    input.setCustomValidity(destination ? '' : 'Выберите город из списка');
    input.reportValidity();
  };

  #getDateFromInput(datepicker, input, message) {
    const selectedDate = datepicker?.selectedDates[0];

    if (selectedDate) {
      input.setCustomValidity('');
      return selectedDate.toISOString();
    }

    const parsedDate = dayjs(input.value.trim(), DAYJS_DATE_TIME_FORMAT, true);

    if (parsedDate.isValid()) {
      input.setCustomValidity('');
      return parsedDate.toISOString();
    }

    if (message) {
      input.setCustomValidity(message);
      input.reportValidity();
    }

    return null;
  }

  #getSelectedOffers(form, typeOffers, pointId) {
    return typeOffers
      .filter((offer) => {
        const offerElementId = `event-offer-${formatOfferTitle(offer.title)}-${pointId}`;
        return form.querySelector(`[id="${CSS.escape(offerElementId)}"]`)?.checked;
      })
      .map((offer) => offer.id);
  }

  #getFormFields(form, validate) {
    const { point, destinations, offers } = this._state;
    const destinationInput = form.querySelector('[name="event-destination"]');
    const startInput = form.querySelector('[name="event-start-time"]');
    const endInput = form.querySelector('[name="event-end-time"]');
    const destinationName = destinationInput.value.trim();
    const destination = destinations.find((dest) => dest.name === destinationName);
    const type = getSafePointType(form.querySelector('[name="event-type"]:checked')?.value ?? point.type);
    const typeOffers = offers.find((item) => item.type === type)?.offers ?? [];
    const pointId = point.id ?? NEW_POINT_ID;

    if (validate && !destination) {
      destinationInput.setCustomValidity('Выберите город из списка');
      destinationInput.reportValidity();
      return null;
    }

    destinationInput.setCustomValidity('');

    const dateFrom = this.#getDateFromInput(
      this.#startDatepicker,
      startInput,
      validate ? 'Укажите дату и время начала' : ''
    ) ?? (validate ? null : point.date_from);

    const dateTo = this.#getDateFromInput(
      this.#endDatepicker,
      endInput,
      validate ? 'Укажите дату и время окончания' : ''
    ) ?? (validate ? null : point.date_to);

    return {
      destination,
      type,
      typeOffers,
      pointId,
      dateFrom,
      dateTo,
      startInput,
      endInput,
      basePrice: Number(form.querySelector('[name="event-price"]').value) || 0,
    };
  }

  #validateFormDates({ validate, dateFrom, dateTo, startInput, endInput }) {
    if (!validate) {
      return true;
    }

    if (!dateFrom || !dateTo) {
      return false;
    }

    startInput.setCustomValidity('');

    if (this.#isNewPoint() && dayjs(dateFrom).isBefore(dayjs(), 'minute')) {
      startInput.setCustomValidity('Дата начала не может быть в прошлом');
      startInput.reportValidity();
      return false;
    }

    if (dayjs(dateTo).isBefore(dayjs(dateFrom), 'minute')) {
      endInput.setCustomValidity('Дата окончания не может быть раньше даты начала');
      endInput.reportValidity();
      return false;
    }

    endInput.setCustomValidity('');
    return true;
  }

  #buildPointFromForm(point, form, fields, validate) {
    const { destination, type, typeOffers, pointId, dateFrom, dateTo, basePrice } = fields;

    return {
      ...point,
      type,
      destination: validate ? destination.id : (destination?.id ?? point.destination),
      date_from: dateFrom || point.date_from,
      date_to: dateTo || point.date_to,
      base_price: basePrice,
      offers: this.#getSelectedOffers(form, typeOffers, pointId),
      is_favorite: point.is_favorite ?? false,
    };
  }

  #parseFormPoint({ validate = false } = {}) {
    const { point } = this._state;

    if (!point) {
      return null;
    }

    const form = this.element.querySelector('.event--edit');

    if (!form) {
      return validate ? null : point;
    }

    const fields = this.#getFormFields(form, validate);

    if (!fields || !this.#validateFormDates({ validate, ...fields })) {
      return null;
    }

    return this.#buildPointFromForm(point, form, fields, validate);
  }

  #getPoint() {
    return this.#parseFormPoint({ validate: true });
  }

  #getSaveButton() {
    return this.element.querySelector('.event__save-btn');
  }

  #getResetButton() {
    return this.element.querySelector('.event__reset-btn');
  }

  #setSaveButtonLoading(isLoading) {
    const button = this.#getSaveButton();
    button.textContent = isLoading ? ButtonText.SAVING : ButtonText.SAVE;
    button.disabled = isLoading;
  }

  #setDeleteButtonLoading(isLoading) {
    const button = this.#getResetButton();

    if (!this._state.point?.id) {
      return;
    }

    button.textContent = isLoading ? ButtonText.DELETING : ButtonText.DELETE;
    button.disabled = isLoading;
  }

  #typeChangeHandler = (evt) => {
    const selectedType = getSafePointType(evt.target.value);
    this.element.querySelector('.event__type-toggle').checked = false;
    if (selectedType === this._state.point.type) {
      return;
    }

    this.updateElement({
      point: {
        ...this.#parseFormPoint(),
        type: selectedType,
        offers: [],
      },
    });
  };

  #submitFormHandler = async (evt) => {
    evt.preventDefault();
    const updatedPoint = this.#getPoint();

    if (!updatedPoint) {
      this.shake();
      return;
    }

    if (updatedPoint.id && isPointEqual(this.#initialPoint, updatedPoint)) {
      this.#handleFormClose?.();
      return;
    }

    this.#setSaveButtonLoading(true);
    const isSuccess = await this.#handleFormSubmit?.(updatedPoint);

    if (!isSuccess) {
      this.#setSaveButtonLoading(false);
      this.shake();
    }
  };

  #closeFormHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormClose?.();
  };

  #resetButtonHandler = async (evt) => {
    evt.preventDefault();

    if (this._state.point?.id) {
      this.#setDeleteButtonLoading(true);
      const isSuccess = await this.#handleDeleteClick?.();

      if (!isSuccess) {
        this.#setDeleteButtonLoading(false);
        this.shake();
      }

      return;
    }

    this.#handleFormClose?.();
  };
}
