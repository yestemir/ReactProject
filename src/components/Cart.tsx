import React, {ReactElement, useEffect, useRef, useState} from 'react';
import {Product} from "../database/Product";
import {cart} from "../database/cart";
import styled from "styled-components";
import {Link} from "react-router-dom";
import {types} from "util";

interface Props {
    items: Product[]
}

const ProductImage = styled.img`
  width: 10%;
  height: 10%;
  object-fit: contain;
  object-position: center;
`;

export default function Cart(props: Props): ReactElement {
    const[items, setItems] = useState(props.items);
    const [cartTotal, setCartTotal] = useState(0);


    useEffect(() => {
        total();
    }, [cart]);

    const total = () => {
        let totalVal = 0;
        for (let i = 0; i < cart.length; i++) {
            totalVal += cart[i].price;
        }
        setCartTotal(totalVal);
    };

    const removeFromCart = (el: Product) => {
        let hardCopy = [...items];
        hardCopy = hardCopy.filter((cartItem) => cartItem.id !== el.id);
        setItems(hardCopy);
    };

    return (
        <>
            <div>
                { items.map( (item) => {
                    console.log(item.id)
                    return(
                        <div>
                            <ProductImage src={item.image} />
                            <Link to={'/items/' + item.id}>  <div className='cartListItemName'>{item.name}</div></Link>
                            <div className='cartListItemPrice'>{item.price}</div>
                            <button onClick={() =>  removeFromCart(item)}>delete</button>
                        </div>
                    )
                }) }
                {/*<div>Total: ${cartTotal}</div>*/}
                {items.length > 0 &&
                <div className="cart-total">
                    <h5>Total price: ${cartTotal}</h5>
                    <button className="addToCart"> Order</button>
                </div>
                }
            </div>
        </>
    );

}