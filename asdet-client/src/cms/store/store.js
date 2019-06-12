import { createStore, combineReducers, applyMiddleware } from 'redux'
import * as home from './home/reducer'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

let store = createStore(
    combineReducers({...home}),
    applyMiddleware(thunk)
)

export default store;