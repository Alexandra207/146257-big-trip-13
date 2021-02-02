import TripsModel from "./model/trips-model.js";
const Method = {
  GET: `GET`,
  PUT: `PUT`,
  POST: `POST`,
  DELETE: `DELETE`
};

const SuccessHTTPStatusRange = {
  MIN: 200,
  MAX: 299
};

export default class Api {
  constructor(endPoint, authorization) {
    this._endPoint = endPoint; // адрес куда делаем запрос
    this._authorization = authorization; // строка авторизации
  }

  getTrips() {
    return this._load({url: `points`}) // реализация настройки fetch
      .then(Api.toJSON)
      .then((points) => points.map(TripsModel.adaptToClient));
  }

  getDestinations() {
    return this._load({url: `destinations`})
      .then(Api.toJSON);
  }

  getOffers() {
    return this._load({url: `offers`})
      .then(Api.toJSON);
  // .then((offers) => offers.map(TripsModel.adaptOffersToClient));
  }
  updateTrip(point) {
    return this._load({
      url: `points/${point.id}`,
      method: Method.PUT,
      body: JSON.stringify(TripsModel.adaptToServer(point)),
      headers: new Headers({"Content-Type": `application/json`})
    })
      .then(Api.toJSON)
      .then(TripsModel.adaptToClient);
  }

  addTrip(point) {
    return this._load({
      url: `points`,
      method: Method.POST,
      body: JSON.stringify(TripsModel.adaptToServer(point)),
      headers: new Headers({"Content-Type": `application/json`})
    })
      .then(Api.toJSON)
      .then(TripsModel.adaptToClient);
  }

  deleteTrip(point) {
    return this._load({
      url: `points/${point.id}`,
      method: Method.DELETE
    });
  }
  _load({ // приватный метод, который принимает настройки
    url,
    method = Method.GET,
    body = null,
    headers = new Headers()
  }) {
    headers.append(`Authorization`, this._authorization);

    return fetch(
        `${this._endPoint}/${url}`,
        {method, body, headers}
    )
      .then(Api.checkStatus)
      .catch(Api.catchError);
  }

  static checkStatus(response) { // проверка статуса из периода 200
    if (
      response.status < SuccessHTTPStatusRange.MIN ||
      response.status > SuccessHTTPStatusRange.MAX
    ) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }

    return response;
  }

  static toJSON(response) {
    return response.json();
  }

  static catchError(err) {
    throw err;
  }
}
