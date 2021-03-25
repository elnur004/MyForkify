import icons from 'url:../../img/icons.svg'; // Parcell 2

export default class View {
  _data;
  render(data) {
    // Check the data is 'undefined' and 'null' or is an array and it is empty --> if so? return 'ERROR'!
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;
    const markup = this._generateMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  update(data) {
    // Check the data is 'undefined' and 'null' or is an array and it is empty --> if so? return 'ERROR'!
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;
    const newMarkup = this._generateMarkup();

    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = newDOM.querySelectorAll('*');
    console.log(newElements);
  }

  _clear() {
    this._parentElement.innerHTML = ''; // clear the PARENT element before insert anything
  }

  // Publisher-Subscriber Design pattern (Publisher: addHandlerRender)
  addHandlerRender(handler) {
    // Variant 1
    // window.addEventListener('hashchange', handler);
    // window.addEventListener('load', handler);

    // Variant 2
    // const addListener = function (listener) {
    //   window.addEventListener(listener, handler);
    // };
    // addListener('hashchange');
    // addListener('load');

    // Variant 3
    ['hashchange', 'load'].forEach(ev => window.addEventListener(ev, handler));
  }

  addHandlerUpdateServings(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--update-servings');
      if (!btn) return;

      const { updateTo } = btn.dataset;
      if (+updateTo < 1) return;
      handler(+updateTo);
    });
  }

  renderError(message = this._errorMessage) {
    const errMsg = message.includes('Invalid _id:')
      ? this._errorMessage
      : message;

    const markup = `
    <div class="error">
        <div>
          <svg>
            <use href="${icons}#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${errMsg}</p>
    </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  // renderSuccess(message = this._successMessage) {
  //   const markup = `
  //       <div class="message">
  //         <div>
  //           <svg>
  //             <use href=${icons}svg#icon-smile"></use>
  //           </svg>
  //         </div>
  //         <p>${message}</p>
  //       </div>
  //   `;
  //   this._clear();
  //   this._parentElement.insertAdjacentHTML('afterbegin', markup);
  // }

  renderSpinner() {
    const markup = `
    <div class="spinner">
      <svg>
        <use href="${icons}#icon-loader"></use>
      </svg>
    </div>
    `;
    this._clear(); // clear the PARENT element before insert anything
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}
