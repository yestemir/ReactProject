import { OrdersActions } from "../actions/orders.actions";
import { Order } from '../../database/Order';

interface OrdersState {
  orders: Array<Order>;
}

const initialState: OrdersState = {
  orders: [],
};

const ordersReducer = (state: OrdersState = initialState, action: any) => {
  switch (action.type) {
    case OrdersActions.SET_ORDERS:
      return {
        ...state,
        orders: action.payload,
      };
    default:
      return state;
  }
};

export default ordersReducer;
