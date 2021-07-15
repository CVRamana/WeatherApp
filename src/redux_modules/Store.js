
import reducer from './reducer'
import {createStore,compose,applyMiddleware} from "redux";
import thunk from 'redux-thunk';
const enhancer = compose(applyMiddleware(thunk));
const store = createStore(reducer,enhancer)
export default store;