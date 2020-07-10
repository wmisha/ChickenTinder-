import { combineReducers } from 'redux';
import account from './account'
import title from './title'

const rootReducer = combineReducers({
    account,
    title
})

export default rootReducer;