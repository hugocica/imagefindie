import {
    FETCH_SEARCH,
    REQUEST_LOADING_SEARCH,
    REQUEST_REJECTED_SEARCH
} from './action';
import axios from '../../utils/axios';

export function requestSearch(_query, _page = 1) {
    return dispatch => {
        dispatch(requestLoading());

        return axios
            .get('search/photos/?client_id=08901ac80961bd394dd6241da993d12f2285ce0214c38945be18d948d705097d&query='+ _query +'&page='+ _page +'&per_page=30')
            .then(response => dispatch(fetchSearc(response.data)))
            .catch(error => dispatch(requestRejected(error.message)));
    }
}

export function requestLoading() {
    return {
        type: REQUEST_LOADING_SEARCH
    };
}

export function requestRejected(response) {
    return {
        type: REQUEST_REJECTED_SEARCH,
        payload: response
    };
}

function fetchSearc(response) {
    return {
        type: FETCH_SEARCH,
        payload: response
    };
}
