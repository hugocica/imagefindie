import { combineReducers } from 'redux';
// import login from './login';
import photos from './photos';
import search from './search';

export default combineReducers({
    photos,
    search
});
