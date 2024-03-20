import { combineReducers } from 'redux';
import sessions            from './Sessions';
import language from './Language';

export default combineReducers({
    sessions,
    language
});
