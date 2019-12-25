import TYPES from './actions'
import { combineReducers } from 'redux'

const initialUser = {
  id: '',
  mail: '',
  token: '',
  admin: false,
}

function userReducer(state = initialUser, action) {
  switch (action.type) {
    case (TYPES.USER_SIGNUP): {
      break;
    }
    case (TYPES.USER_SIGNIN): {
      return {
        // ...state,
        id: action.payload.userId,
        mail: action.payload.userMail,
        token: action.payload.userToken,
        admin: action.payload.userAdmin,
      }
    }
    case (TYPES.USER_SIGNOUT): {
      return {
        // ...state,
        id: '',
        mail: '',
        token: '',
        admin: false,
      }
    }
    default:
      return state;
  }
}
// const initialHalls = {
//   halls: null,
// }
function hallReducer(state = [], action) {
  switch (action.type) {
    case (TYPES.HALLS_GET): {
      // console.log('payload', action.payload)
      // console.log('payload', action.payload)
      return [
        ...state,
        ...action.payload.halls
      ]
    }
    case (TYPES.HALLS_ADD): {
      // console.log('USER_SIGNIN', action)
      return [
        ...state,
        action.payload.hall,
      ]
    }
    case (TYPES.HALLS_DEL): {
      // console.log('del hall state', state)
      // console.log('del hall payload', action.payload)
      return [
        // ...state,
        ...state.filter(hall => hall._id !== action.payload.hallId),
      ]
    }
    default:
      return state;
  }
}
// const initialTickets = {
//   tickets: null,
// }
function ticketReducer(state = [], action) {
  switch (action.type) {
    case (TYPES.TICKETS_GET_ALL): {
      return [
        ...state,
        ...action.payload.tickets
      ]
    }
    case (TYPES.TICKETS_GET_RANGE): {
      // console.log('USER_SIGNIN', action)
      return [
        ...state,
        state.tickets,
      ]
    }
    case (TYPES.TICKETS_ADD): {
      return [
        ...state,
        action.payload.ticket,
      ]
    }
    case (TYPES.TICKETS_EDIT): {
      return [
        state.map(ticket => ticket._id === action.payload.ticket._id ? action.payload.ticket : ticket),
      ]
    }
    case (TYPES.TICKETS_DEL): {
      return [
        state.filter(ticket => ticket._id === action.payload.ticketId),
      ]
    }
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  user: userReducer,
  halls: hallReducer,
  tickets: ticketReducer
})

export default rootReducer;