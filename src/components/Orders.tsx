import React, { ReactElement } from "react";
import { Order } from "../database/Order";
import { connect } from "react-redux";

interface Props {
  orders: Order[];
}

function Orders({ orders }: Props): ReactElement {
  return (
    <div>
      {orders.map((item, index) => (
        <div className="order" key={index}>
          <div className="order__products">
            {item.products.map((product, i) => (
              <div className="order__product" key={i}>
                {product.name}
              </div>
            ))}
          </div>
          <div className="order__info">Grand Total: {item.grantTotal}</div>
          <div className="order__info">Tax: {item.tax}</div>
          <div className="order__info">Delivery: {item.delivery}</div>
          <div className="order__info">Date: {item.orderDate.toDateString()}</div>
        </div>
      ))}
    </div>
  );
}

function mapStateToProps(state: any) {
  return {
    orders: state.orders.orders,
  };
}

export default connect(mapStateToProps, {})(Orders);
