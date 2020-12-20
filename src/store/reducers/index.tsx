import { combineReducers } from "redux";
import ordersReducer from './orders.reducer';


const rootReducer = combineReducers({
    orders: ordersReducer
});

export default rootReducer;