import View from './View.js';
import icons from 'url:../../img/icons.svg'; // Parcell 2

class AddRecipeView extends View {
  _parentElement = document.querySelector('.upload');

  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');

  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');

  constructor() {
    super();
    this._addHandlerShowWindow();
    this._addhandlerCloseWindow();
  }

  btnShow() {
    this._window.classList.toggle('hidden');
    this._overlay.classList.toggle('hidden');
  }

  closeWindow() {
    this._window.classList.toggle('hidden');
    this._overlay.classList.toggle('hidden');
  }

  _addHandlerShowWindow() {
    this._btnOpen.addEventListener('click', this.btnShow.bind(this));
  }

  _addhandlerCloseWindow() {
    this._btnClose.addEventListener('click', this.closeWindow.bind(this));
    this._overlay.addEventListener('click', this.closeWindow.bind(this));
  }

  _generateMarkup() {}
}

export default new AddRecipeView();
