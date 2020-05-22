import Movie from "./models/movie";
import Comment from "./models/comment";

const Method = {
  GET: `GET`,
  POST: `POST`,
  PUT: `PUT`,
  DELETE: `DELETE`
};

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

export default class API {
  constructor(authorization, endPoint) {
    this._authorization = authorization;
    this._endPoint = endPoint;
  }

  getMovies() {
    return this._load({url: `movies`})
    .then((response) => response.json())
    .then(Movie.parseMovies);
  }

  getComments(id) {
    return this._load({url: `comments/${id}`})
    .then((response) => response.json())
    .then(Comment.parseComments);
  }

  updateMovie(id, data) {
    return this._load({
      url: `movies/${id}`,
      headers: new Headers({"Content-Type": `application/json`}),
      method: Method.PUT,
      body: JSON.stringify(data.toRAW()),
    })
    .then((response) => response.json())
    .then(Movie.parseMovies);
  }

  addComment(movieData, commentData) {
    return this._load({
      url: `comments/${movieData.id}`,
      headers: new Headers({"Content-Type": `application/json`}),
      method: `POST`,
      body: JSON.stringify(Comment.commentToRaw(commentData)),
    })
      .then((response) => response.json())
      .then(({movies, comments}) => {
        return {
          movies: Movie.parseMovies(movies),
          comments: Comment.parseComments(comments)
        };
      });
  }

  deleteComment(commentId) {
    return this._load({
      url: `comments/${commentId}`,
      method: `DELETE`,
    });
  }

  _load({url, method = Method.GET, body = null, headers = new Headers()}) {
    headers.append(`Authorization`, this._authorization);

    return fetch(`${this._endPoint}/${url}`, {method, body, headers})
      .then(checkStatus)
      .catch((error) => {
        throw error;
      });
  }
}