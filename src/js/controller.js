import * as model from './model.js';
import recipeView from './views/recipeView.js';

import 'core-js/stable'; // for polyfilling everything
import 'regenerator-runtime/runtime'; // for polyfilling async/await

const recipeContainer = document.querySelector('.recipe');

// https://forkify-api.herokuapp.com/v2   // Forkify API

///////////////////////////////////////

// Publisher-Subscriber Design pattern (Subscriber: controlRecipes)
const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    console.log(id);

    if (!id) return;
    recipeView.renderSpinner();

    // 1) Loading recipe
    await model.loadRecipe(id);

    // 2) Rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.handlerError(err.message);
  }
};

// Publisher-Subscriber Design pattern (Publiher: addHandlerRender, Subscriber: controlRecipes)
const init = function () {
  recipeView.addHandlerRender(controlRecipes);
};
init();
