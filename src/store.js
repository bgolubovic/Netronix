import { createStore, applyMiddleware } from 'redux';
import reducer from "./reducers";
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';

const middleware = applyMiddleware(thunk, createLogger());

export default createStore(reducer, middleware);