import { 
    FETCH_FISH,
    ADD_FISH, 
    CLICK_PAGE,
    FILTER_FISH,
    CLICK_ACCORDION,
    CREATE_RANDOMFISH
} from '../actions/types';

const initialState = {
    fish: [],
    filteredFish: [],
    currentPage: 1,
    fishPerPage: 6,
    shownAccordion: {},
    randomFish: []
}

export default function(state = initialState, action) {
    switch (action.type) {
        case FETCH_FISH:
            return {
                ...state,
                fish: action.payload.fish,
                filteredFish: action.payload.fish
            };
        case ADD_FISH:
            return {
                ...state,
                fish: [ ...state.fish, action.payload ],
                filteredFish: [ ...state.fish, action.payload ]
            };
        case CLICK_PAGE:
            return {
                ...state,
                currentPage: action.payload
            };
        case FILTER_FISH:
            return {
                ...state,
                filteredFish: action.payload
            };
        case CLICK_ACCORDION:
            return {
                ...state,
                shownAccordion: { 
                    [action.payload]: !state.shownAccordion[action.payload] 
                }
            };
        case CREATE_RANDOMFISH:
            return {
                ...state,
                randomFish: action.payload
            };
        default:
            return state;
    }
}
