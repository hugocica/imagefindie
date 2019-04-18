import {
    FETCH_LIST_PHOTOS,
    REQUEST_LOADING_LIST_PHOTOS,
    REQUEST_REJECTED_LIST_PHOTOS
} from './action';
import axios from '../../utils/axios';

export function requestAllPhotos(_page = 1, _order_by = 'latest') {
    return dispatch => {
        dispatch(requestLoading());

        return axios
            .get('photos/?client_id=08901ac80961bd394dd6241da993d12f2285ce0214c38945be18d948d705097d&per_page=10&page='+ _page + '&order_by='+ _order_by)
            .then(response => dispatch(fetchAllPhotos(response.data)))
            .catch(error => dispatch(requestRejected(error.message)));
    }
}

export function requestLoading() {
    return {
        type: REQUEST_LOADING_LIST_PHOTOS
    };
}

export function requestRejected(response) {
    return {
        type: REQUEST_REJECTED_LIST_PHOTOS,
        payload: response
    };
}

function fetchAllPhotos(response) {
    return {
        type: FETCH_LIST_PHOTOS,
        payload: response
    };
}
