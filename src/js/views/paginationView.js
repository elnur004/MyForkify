import View from './View.js';
import icons from 'url:../../img/icons.svg'; // Parcell 2

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  // Create pagination buttons based on conditions
  _generateMarkupButton(type, currentPage) {
    return `
      <button data-goto="${
        type === 'next' ? currentPage + 1 : currentPage - 1
      }" class="btn--inline pagination__btn--${
      type === 'next' ? 'next' : 'prev'
    }">
        <span>Page ${type === 'next' ? currentPage + 1 : currentPage - 1}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-${
      type === 'next' ? 'right' : 'left'
    }"></use>
        </svg>
    </button>`;
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    // Page 1, and there are other pages
    if (curPage === 1 && numPages > 1) {
      return this._generateMarkupButton('next', curPage);

      // return `
      //   <button class="btn--inline pagination__btn--next">
      //     <span>Page ${curPage + 1}</span>
      //     <svg class="search__icon">
      //       <use href="${icons}#icon-arrow-right"></use>
      //     </svg>
      //   </button>
      // `;
    }

    // Last page
    if (curPage === numPages && numPages > 1) {
      return this._generateMarkupButton('prev', curPage);

      // return `
      //   <button class="btn--inline pagination__btn--prev">
      //     <svg class="search__icon">
      //       <use href="${icons}#icon-arrow-left"></use>
      //     </svg>
      //      <span>Page ${curPage - 1}</span>
      //   </button>
      // `;
    }

    // Other page
    if (curPage < numPages) {
      return `${this._generateMarkupButton(
        'prev',
        curPage
      )}${this._generateMarkupButton('next', curPage)}`;

      // return `
      //   <button class="btn--inline pagination__btn--prev">
      //     <svg class="search__icon">
      //       <use href="${icons}#icon-arrow-left"></use>
      //     </svg>
      //      <span>Page ${curPage - 1}</span>
      //   </button>
      //   <button class="btn--inline pagination__btn--next">
      //     <span>Page ${curPage + 1}</span>
      //     <svg class="search__icon">
      //       <use href="${icons}#icon-arrow-right"></use>
      //     </svg>
      //   </button>
      // `;
    }

    // Page 1, and there are NO other pages
    return '';
  }
}

export default new PaginationView();
