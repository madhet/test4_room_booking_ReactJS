import TYPES from './actions'
import { combineReducers } from 'redux'

const initialUser = {
  authUser: '',
  authUserMail: '',
  authUserToken: '',
  authUserAdmin: false,
}

function userReducer(state = initialUser, action) {
  switch (action.type) {
    case (TYPES.USER_SIGNUP): {
      break;
    }
    case (TYPES.USER_SIGNIN): {
      return {
        ...state,
        authUser: action.payload.userId,
        authUserMail: action.payload.userMail,
        authUserToken: action.payload.userToken,
        authUserAdmin: action.payload.userAdmin,
      }
    }
    case (TYPES.USER_SIGNOUT): {
      return {
        ...state,
        authUser: '',
        authUserMail: '',
        authUserToken: '',
        authUserAdmin: false,
      }
    }
    default:
      return state;
  }
}

const initialHalls = {
  halls: null,
}

function hallReducer(state = initialHalls, action) {
  switch (action.type) {
    case (TYPES.HALLS_GET): {
      return {
        ...state,
        halls: action.payload.halls
      }
    }
    case (TYPES.HALLS_ADD): {
      // console.log('USER_SIGNIN', action)
      return {
        ...state,
        hall: state.halls.concat(action.payload.hall),
      }
    }
    case (TYPES.HALLS_DEL): {
      return {
        ...state,
        halls: state.halls.filter(hall => hall._id !== action.payload.hallId),
      }
    }
    default:
      return state;
  }
}

const initialTickets = {
  tickets: null,
}

function ticketReducer(state = initialTickets, action) {
  switch (action.type) {
    case (TYPES.TICKETS_GET_ALL): {
      return {
        ...state,
        tickets: action.payload.halls
      }
    }
    case (TYPES.TICKETS_GET_RANGE): {
      // console.log('USER_SIGNIN', action)
      return {
        ...state,
        tickets: state.halls,
      }
    }
    case (TYPES.TICKETS_ADD): {
      return {
        ...state,
        tickets: state.halls,
      }
    }
    case (TYPES.TICKETS_EDIT): {
      return {
        ...state,
        tickets: state.halls,
      }
    }
    case (TYPES.TICKETS_DEL): {
      return {
        ...state,
        tickets: state.halls,
      }
    }
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  user: userReducer,
  hall: hallReducer,
  ticket: ticketReducer
})

export default rootReducer;