import { 
    LOGIN,
    LOGINERROR
} from "../actions/types";

const initialState = {
    currentUser: {
        userId: null,
        username: "",
        password: ""
    },
    error: ""
}

export default function(state = initialState, action) {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                currentUser: action.payload
            };
        case LOGINERROR:
            return {
                ...state,
                error: action.payload.error
            };
        default:
            return state;
    }
}