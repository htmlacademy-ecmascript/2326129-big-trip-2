/* eslint-disable camelcase */
import { createEditPointTemplate } from './edit-point-view-template.js';
import AbstractStatefulView from '../../framework/view/abstract-stateful-view.js';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

export default class EditPointView extends AbstractStatefulView {
  #handleFormSubmit = null;
  #handleFormClose = null;
  #datepicker = null;
  #datepickerFrom = null;
  #datepickerTo = null;

  constructor({ point, destinations, offers, onFormSubmit, onRollupClick }) {
    super();
    this.point = point;
    this.destinations = destinations;
    this.offers = offers;
    this.#handleFormSubmit = onFormSubmit;
    this.#handleFormClose = onRollupClick;

    this._setState(EditPointView.parsePointToState({ point }));
    this._restoreHandlers();
  }

  get template() {
    return createEditPointTemplate(this.destinations, this.offers, this._state);
  }

  reset = () => this.updateElement({ point: this.point });

  _restoreHandlers = () => {
    const rollupBtn = this.element.querySelector('.event__rollup-btn');
    if (rollupBtn) {
      rollupBtn.addEventListener('click', this.#closeFormHandler);
    }

    const resetBtn = this.element.querySelector('.event__reset-btn');
    if (resetBtn) {
      resetBtn.addEventListener('click', this.#resetFormHandler);
    }

    this.element.querySelector('form').addEventListener('submit', this.#submitFormHandler);
    this.element.querySelector('.event__type-group').addEventListener('change', this.#typeChangeHandler);
    this.element.querySelector('.event__input--destination')?.addEventListener('change', this.#destinationChangeHandler);
    this.element.querySelector('.event__available-offers')?.addEventListener('change', this.#offersChangeHandler);
    this.element.querySelector('.event__input--price').addEventListener('change', this.#priceChangeHandler);
  };

  #submitFormHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit();
  };

  #closeFormHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormClose();
  };

  #resetFormHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormClose();
  };

  #typeChangeHandler = (evt) => {
    this.updateElement({
      point: {
        ...this._state.point,
        type: evt.target.value,
        offers: []
      }
    });
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

  #setDatepicker() {
    this.#datepickerFrom = flatpickr(
      this.element.querySelector('input[name="event-start-time"]'),
      {
        dateFormat: 'd/m/y H:i',
        enableTime: true,
        time_24hr: true,
        defaultDate: this._state.dateFrom,
        minDate: 'today'
      });
    this.#datepickerTo = flatpickr(
      this.element.querySelector('input[name="event-end-time"]'),
      {
        dateFormat: 'd/m/y H:i',
        enableTime: true,
        time_24hr: true,
        defaultDate:this._state.dateTo,
        minDate: 'today'
      }
    );
  }

  static parsePointToState = ({ point }) => ({ point });

  static parseStateToPoint = (state) => state.point;
}
