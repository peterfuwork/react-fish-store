import { 
    FETCH_COMMENTS,
    ADD_COMMENT,
    DELETE_COMMENT,
    CLICK_EDIT,
    CHANGE_MSG,
    CHANGE_RATING,
    UPDATE_COMMENT
} from "../actions/types";

const initialState = {
    comments: [],
    isEditButtonClick: false,
    editMsgCid: "",
    editMsg: "",
    editRatingValue: "",
}

export default function(state = initialState, action) {
    switch (action.type) {
        case FETCH_COMMENTS:
            return {
                ...state,
                comments: action.payload.comments
            };
        case ADD_COMMENT:
            return {
                ...state,
                comments: [
                    ...state.comments,
                    action.payload
                ]
            };
        case DELETE_COMMENT:
            return {
                ...state,
                comments: [
                    ...action.payload
                ]
            };
        case CLICK_EDIT:
            return {
                ...state,
                isEditButtonClick: !state.isEditButtonClick,
                editMsgCid: action.payload.editId,
                editMsg: action.payload.editText,
                editRatingValue: action.payload.editRating
            };
        case CHANGE_MSG:
            return {
                ...state,
                editMsg: action.payload
            };
        case CHANGE_RATING:
            return {
                ...state,
                editRatingValue: action.payload
            };
        case UPDATE_COMMENT:
            return {
                ...state,
                isEditButtonClick: !state.isEditButtonClick,
                comments: [
                    ...action.payload
                ]
            };
        default:
            return state;
    }
}