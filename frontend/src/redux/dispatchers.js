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
    restClient.userSignUp(body).then(data => {
      console.log('sign-up-data', data)
    })
  }
}

export function userSignIn(body) {
  return function (dispatch) {
    restClient.userSignIn(body).then(data => {
      console.log('sign-in-data', data)
      localStorage.setItem('user', data._id)
      localStorage.setItem('email', body.email)
      localStorage.setItem('token', data.token)
      localStorage.setItem('admin', data.isAdmin)
      dispatch({ type: TYPES.USER_SIGNIN, payload: { userId: data._id, userMail: body.email, userToken: data.token, userAdmin: data.isAdmin } })
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
    restClient.getHalls().then(data => {
      console.log('halls', data)
      dispatch({ type: TYPES.HALLS_GET, payload: { halls: data } })
    })
  }
}

export function addHall(body, auth) {
  return function (dispatch) {
    restClient.addHall(body, auth).then(data => {
      console.log('add hall', data)
      dispatch({ type: TYPES.HALLS_ADD, payload: { hall: data } })
    })
  }
}

