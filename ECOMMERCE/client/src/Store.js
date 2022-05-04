import {createStore,combineReducers,applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { productsReducer } from './Assets/Reducers/ProductReducers';

const reducer = combineReducers({
    Products:productsReducer,
});

let initialState = {};

const middleware = [thunk]

const store = createStore(reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware)));

    export default store

