import {
    FETCH_SEARCH,
    REQUEST_LOADING_SEARCH,
    REQUEST_REJECTED_SEARCH
} from '../actions/search/action';

const INITIAL_STATE = {
    listPhotos: [],
    fetching: false,
    fetched: false,
    error: null,
};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case REQUEST_LOADING_SEARCH:
            return {
                ...state,
                fetching: true,
                fetched: INITIAL_STATE.fetched
            };
        case REQUEST_REJECTED_SEARCH:
            return {
                ...state,
                fetching: INITIAL_STATE.fetching,
                fetched: INITIAL_STATE.fetched,
                error: action.payload
            };
        case FETCH_SEARCH:
            return {
                ...state,
                listPhotos: action.payload,
                fetching: INITIAL_STATE.fetching,
                fetched: true
            };
        default:
            return state;
    }
}
