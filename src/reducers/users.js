import { 
    LOGIN,
    LOGINERROR,
    SIGNUP
} from "../actions/types";

const initialState = {
    currentUser: {
        userId: 1,
        username: "superman102"
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
        case SIGNUP:
            return {
                ...state,
                currentUser: action.payload
            };
        default:
            return state;
    }
}