import AbstractComponent from "../components/abstract-components";

// Возвращает разметку блока звание пользователя
const createUserRank = () => {
  return (
    `<section class="header__profile profile">
      <p class="profile__rating">Sci-Fighter</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`
  );
};

// Класс звание пользователя
export default class UserRank extends AbstractComponent {
  getTemplate() {
    return createUserRank();
  }
}