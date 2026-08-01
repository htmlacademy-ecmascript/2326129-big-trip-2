import AbstractView from "../../framework/view/abstract-view";

export default class NewEventButton extends AbstractView {
  #handleClick = null;

  constructor (onClick) {
    super();
    this.#handleClick = onClick;
  }
}
