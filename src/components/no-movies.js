import AbstractComponent from "../components/abstract-components";

const createNoMoviesTemplate = () => {
  return (
    `<section class="films">
    <section class="films-list">
      <h2 class="films-list__title">There are no movies in our database</h2>
    </section>
  </section>`
  );
};

// Класс фильмы
export default class NoMovies extends AbstractComponent {
  getTemplate() {
    return createNoMoviesTemplate();
  }
}
