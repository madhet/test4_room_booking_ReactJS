import TYPES from './actions'
import restClient from '../utils/restClient'

export function userSetSigned() {
  return function (dispatch) {
    if (localStorage.getItem('token')) {
      const userId = localStorage.getItem('user')
      const userMail = localStorage.getItem('email')
      const userToken = localStorage.getItem('token')
      const userAdmin = localStorage.getItem('admin')
      dispatch({ type: TYPES.USER_SIGNIN, payload: { userId, userMail, userToken, userAdmin } })
    }
  }
}

export function userSignUp(body) {
  console.log(body)
  return function (dispatch) {
    restClient.userSignUp(body)
      .then(data => {
        console.log('sign-up-data', data)
      })
      .catch(error => {
        console.log(error)
      })
  }
}

export function userSignIn(body) {
  return function (dispatch) {
    restClient.userSignIn(body)
      .then(data => {
        console.log('sign-in-data', data)
        localStorage.setItem('user', data._id)
        localStorage.setItem('email', body.email)
        localStorage.setItem('token', data.token)
        localStorage.setItem('admin', data.isAdmin)
        dispatch({ type: TYPES.USER_SIGNIN, payload: { userId: data._id, userMail: body.email, userToken: data.token, userAdmin: data.isAdmin } })
      })
      .catch(error => {
        console.log(error)
      })
  }
}

export function userSignOut() {
  return function (dispatch) {
    localStorage.removeItem("user");
    localStorage.removeItem("email");
    localStorage.removeItem("token");
    localStorage.removeItem("admin");
    dispatch({ type: TYPES.USER_SIGNOUT })
  }
}

export function getHalls() {
  return function (dispatch) {
    restClient.getHalls()
      .then(data => {
        // console.log('get-halls-data', data)
        dispatch({ type: TYPES.HALLS_GET, payload: { halls: data.halls } })
      })
      .catch(error => {
        console.log(error)
      })
  }
}

export function addHall(body, auth) {
  return function (dispatch) {
    restClient.addHall(body, auth)
      .then(data => {
        // console.log('add-hall-data', data)
        dispatch({ type: TYPES.HALLS_ADD, payload: { hall: data } })
      })
      .catch(error => {
        console.log(error)
      })
  }
}

export function delHall(hallId, auth) {
  return function (dispatch) {
    restClient.delHall(hallId, auth)
      .then(data => {
        // console.log('dell-hall-data', data)
        dispatch({ type: TYPES.HALLS_DEL, payload: { hallId } })
      })
      .catch(error => {
        console.log(error)
      })
  }
}

export function getTickets() {
  return function (dispatch) {
    restClient.getTickets()
      .then(data => {
        console.log('get-tickets-data', data)
        dispatch({ type: TYPES.TICKETS_GET_ALL, payload: { tickets: data } })
      })
      .catch(error => {
        console.log(error)
      })
  }
}

export function addTicket(body, auth) {
  return function (dispatch) {
    restClient.addTicket(body, auth)
      .then(data => {
        console.log('add-ticket-data', data)
        dispatch({ type: TYPES.TICKETS_ADD, payload: { ticket: data } })
      })
      .catch(error => {
        console.log(error)
      })
  }
}

export function updTicket(body, auth) {
  return function (dispatch) {
    restClient.updTicket(body, auth)
      .then(data => {
        console.log('upd-ticket-data', data)
        dispatch({ type: TYPES.TICKETS_ADD, payload: { ticket: data } })
      })
      .catch(error => {
        console.log(error)
      })
  }
}

export function delTicket(ticketId, auth) {
  return function (dispatch) {
    restClient.delTicket(ticketId, auth)
      .then(data => {
        console.log('dell-ticket-data', data)
        dispatch({ type: TYPES.HALLS_DEL, payload: { ticketId } })
      })
      .catch(error => {
        console.log(error)
      })
  }
}

