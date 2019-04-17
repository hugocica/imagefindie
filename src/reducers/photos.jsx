import {
    FETCH_LIST_PHOTOS,
    REQUEST_LOADING_LIST_PHOTOS,
    REQUEST_REJECTED_LIST_PHOTOS
} from '../actions/list/action';

const INITIAL_STATE = {
    listPhotos: [],
    fetching: false,
    fetched: false,
    error: null,
};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case REQUEST_LOADING_LIST_PHOTOS:
            return {
                ...state,
                fetching: true,
                fetched: INITIAL_STATE.fetched
            };
        case REQUEST_REJECTED_LIST_PHOTOS:
            return {
                ...state,
                fetching: INITIAL_STATE.fetching,
                fetched: INITIAL_STATE.fetched,
                error: action.payload
            };
        case FETCH_LIST_PHOTOS:
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
