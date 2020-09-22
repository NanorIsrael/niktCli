import {createStore,combineReducers,applyMiddleware} from 'redux';
import {productsReducer} from './productReducer'
import thunk from 'redux-thunk'
import {Auth} from './Auth'

export const configStore = () =>{

    const store= createStore(
        combineReducers({
            products:productsReducer,
            auth:Auth
        }),
        applyMiddleware(thunk)
    )
    return store;
}