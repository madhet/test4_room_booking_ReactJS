import TYPES from "./actions";
import restClient from "../utils/restClient";
import moment from "moment";

export function messageSetSuccess(messages) {
	return function (dispatch) {
		dispatch({ type: TYPES.MESSAGE_SET_SUCCESS, payload: { messages } });
	}
}

export function messageSetError(messages) {
	return function (dispatch) {
		dispatch({ type: TYPES.MESSAGE_SET_ERROR, payload: { messages } });
	}
}

export function messageClear() {
	return function (dispatch) {
		dispatch({ type: TYPES.MESSAGE_CLEAR });
	}
}

export function userSetSigned() {
	return function (dispatch) {
		if (localStorage.getItem("token")) {
			if (
				moment().diff(
					moment(new Date(localStorage.getItem("loggedAt"))),
					"hours"
				) < 72
			) {
				// console.log("Token is valid");
				const userId = localStorage.getItem("user");
				const userMail = localStorage.getItem("email");
				const userToken = localStorage.getItem("token");
				// console.log('local-storage', localStorage.getItem("admin"))
				const userAdmin = localStorage.getItem("admin") === 'true' ? true : false;
				dispatch({
					type: TYPES.USER_SIGNIN,
					payload: { userId, userMail, userToken, userAdmin },
				});
			} else {
				// console.log("Token is expired");
				localStorage.removeItem("loggedAt");
				localStorage.removeItem("user");
				localStorage.removeItem("email");
				localStorage.removeItem("token");
				localStorage.removeItem("admin");
				dispatch({ type: TYPES.USER_SIGNOUT });
			}
		}
	};
}

export function userSignUp(body) {
	// console.log(body);
	return function (dispatch) {
		restClient
			.userSignUp(body)
			.then(data => {
				// console.log("sign-up-data", data);
				dispatch({ type: TYPES.MESSAGE_SET_SUCCESS, payload: { messages: ['Signed up successfully', 'Sign in to book a room'] } })
			})
			.catch(error => {
				dispatch({ type: TYPES.MESSAGE_SET_ERROR, payload: { messages: [error.message] } });
			});
	};
}

export function userSignIn(body) {
	return function (dispatch) {
		restClient
			.userSignIn(body)
			.then(data => {
				// console.log("sign-in-data", data);
				localStorage.setItem("loggedAt", new Date());
				localStorage.setItem("user", data._id);
				localStorage.setItem("email", body.email);
				localStorage.setItem("token", data.token);
				// console.log('data.isAdmin', data.isAdmin)
				localStorage.setItem("admin", data.isAdmin);
				dispatch({
					type: TYPES.USER_SIGNIN,
					payload: {
						userId: data._id,
						userMail: body.email,
						userToken: data.token,
						userAdmin: data.isAdmin,
					},
				});
				dispatch({ type: TYPES.MESSAGE_SET_SUCCESS, payload: { messages: ['Welcome'] } })
			})
			.catch(error => {
				dispatch({ type: TYPES.MESSAGE_SET_ERROR, payload: { messages: [error.message] } });
			});
	};
}

export function userSignOut() {
	return function (dispatch) {
		localStorage.removeItem("loggedAt");
		localStorage.removeItem("user");
		localStorage.removeItem("email");
		localStorage.removeItem("token");
		localStorage.removeItem("admin");
		dispatch({ type: TYPES.USER_SIGNOUT });
	};
}

export function setActiveHall(hallId) {
	return function (dispatch) {
		dispatch({
			type: TYPES.HALLS_SET_ACTIVE,
			payload: { hallId },
		});
	};
}

export function getHalls() {
	return function (dispatch) {
		restClient
			.getHalls()
			.then(data => {
				// console.log('get-halls-data', data)
				dispatch({
					type: TYPES.HALLS_GET,
					payload: { halls: data.halls },
				});
				dispatch({ type: TYPES.SERVER_SET_STATUS, payload: { server: '' } });
			})
			.catch(error => {
				dispatch({ type: TYPES.MESSAGE_SET_ERROR, payload: { messages: [error.message] } });
				dispatch({ type: TYPES.SERVER_SET_STATUS, payload: { server: error.message } });
			});
	};
}

export function addHall(body) {
	return function (dispatch, getState) {
		const auth = getState().user.token;
		restClient
			.addHall(body, auth)
			.then(data => {
				// console.log('add-hall-data', data)
				dispatch({ type: TYPES.HALLS_ADD, payload: { hall: data } });
				dispatch({ type: TYPES.MESSAGE_SET_SUCCESS, payload: { messages: ['Hall created'] } })
			})
			.catch(error => {
				dispatch({ type: TYPES.MESSAGE_SET_ERROR, payload: { messages: [error.message] } });
			});
	};
}

export function delHall(hallId) {
	return function (dispatch, getState) {
		const auth = getState().user.token;
		restClient
			.delHall(hallId, auth)
			.then(data => {
				// console.log('dell-hall-data', data)
				dispatch({ type: TYPES.HALLS_DEL, payload: { hallId } });
				dispatch({ type: TYPES.MESSAGE_SET_SUCCESS, payload: { messages: ['Hall deleted'] } })
			})
			.catch(error => {
				dispatch({ type: TYPES.MESSAGE_SET_ERROR, payload: { messages: [error.message] } });
			});
	};
}

export function setActiveTicket(ticketId) {
	return function (dispatch) {
		dispatch({
			type: TYPES.TICKETS_SET_ACTIVE,
			payload: { ticketId },
		});
	};
}

export function getTickets() {
	return function (dispatch) {
		restClient
			.getTickets()
			.then(data => {
				// console.log("get-tickets-data", data);
				dispatch({
					type: TYPES.TICKETS_GET_ALL,
					payload: { tickets: data },
				});
				dispatch({ type: TYPES.SERVER_SET_STATUS, payload: { server: '' } });
			})
			.catch(error => {
				dispatch({ type: TYPES.MESSAGE_SET_ERROR, payload: { messages: [error.message] } });
				dispatch({ type: TYPES.SERVER_SET_STATUS, payload: { server: error.message } });
			});
	};
}

export function addTicket(body) {
	return function (dispatch, getState) {
		const auth = getState().user.token;
		restClient
			.addTicket(body, auth)
			.then(data => {
				// console.log("add-ticket-data", data);
				dispatch({
					type: TYPES.TICKETS_ADD,
					payload: { ticket: data },
				});
				dispatch({ type: TYPES.MESSAGE_SET_SUCCESS, payload: { messages: ['Room booked successfully'] } });
			})
			.catch(error => {
				// console.log(error);
				if (error.message === 'Busy!!!') {
					dispatch({ type: TYPES.MESSAGE_SET_ERROR, payload: { messages: ['Dates are busy!', 'Choose another ones!'] } });
				}
			});
	};
}

export function updTicket(ticketId, body) {
	return function (dispatch, getState) {
		const auth = getState().user.token;
		restClient
			.updTicket(ticketId, body, auth)
			.then(data => {
				console.log("upd-ticket-data", data);
				dispatch({
					type: TYPES.TICKETS_EDIT,
					payload: { ticket: data[0] },
				});
				dispatch({ type: TYPES.MESSAGE_SET_SUCCESS, payload: { messages: ['Ticket updated'] } })
			})
			.catch(error => {
				if (error.message === 'Busy!!!') {
					dispatch({ type: TYPES.MESSAGE_SET_ERROR, payload: { messages: ['Dates are busy!', 'Choose another ones!'] } });
				}
			});
	};
}

export function delTicket(ticketId) {
	return function (dispatch, getState) {
		const auth = getState().user.token;
		restClient
			.delTicket(ticketId, auth)
			.then(data => {
				// console.log("dell-ticket-data", data);
				dispatch({ type: TYPES.TICKETS_DEL, payload: { ticketId } });
				dispatch({ type: TYPES.MESSAGE_SET_SUCCESS, payload: { messages: ['Ticket deleted'] } })
			})
			.catch(error => {
				dispatch({ type: TYPES.MESSAGE_SET_ERROR, payload: { messages: [error.message] } });
			});
	};
}
