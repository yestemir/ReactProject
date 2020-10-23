import React, {ReactElement, useEffect, useRef, useState} from 'react';
import {Product} from "../database/Product";
import {cart} from "../database/cart";
import styled from "styled-components";
import {Link} from "react-router-dom";
import {types} from "util";
import {User} from "../database/User";

interface Props {
    user: User
    removeItem: (index: number) => void;
}

const ProductImage = styled.img`
  width: 10%;
  height: 10%;
  object-fit: contain;
  object-position: center;
`;

export default function Cart({user, removeItem}: Props): ReactElement {
    // const[items, setItems] = useState(props.items);
    // const [cartTotal, setCartTotal] = useState(0);


    // useEffect(() => {
    //     total();
    // }, [cart]);
    //
    // const total = () => {
    //     let totalVal = 0;
    //     for (let i = 0; i < cart.length; i++) {
    //         totalVal += cart[i].price;
    //     }
    //     setCartTotal(totalVal);
    // };

    useEffect(() => {
        total();
    }, [user]);

    const total = () => {
        let totalVal = user.basket.reduce((sum, it) => sum + it.price, 0);
        return totalVal;
    };

    // const removeFromCart = (el: Product) => {
    //     let hardCopy = [...items];
    //     hardCopy = hardCopy.filter((cartItem) => cartItem.id !== el.id);
    //     setItems(hardCopy);
    // };

    return (
        <>
            <section id="store" className="store py-5" style={{background: "white"}}>
                <div className="container" >
                    <div>
                {user.basket.map((item, index) => (
                    <div style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginTop: "20px",
                    }}>
                        <ProductImage src={item.image} />
                        <Link to={"/items/" + item.id}>
                            {" "}
                            <div className="cartListItemName">{item.name}</div>
                        </Link>
                        <div className="cartListItemPrice">{item.price}</div>
                        <button onClick={() => removeItem(index)}>Delete</button>
                    </div>
                ))}
                {/*<div>Total: ${cartTotal}</div>*/}
                {user.basket.length > 0 && (
                    <div className="cart-total">
                        <h5>Total price: ${total()}</h5>
                        <button className="addToCart"> Order</button>
                    </div>
                )}
            </div>
                </div>
            </section>
        </>

        // <>
        //     <div>
        //         { items.map( (item) => {
        //             console.log(item.id)
        //             return(
        //                 <div>
        //                     <ProductImage src={item.image} />
        //                     <Link to={'/items/' + item.id}>  <div className='cartListItemName'>{item.name}</div></Link>
        //                     <div className='cartListItemPrice'>{item.price}</div>
        //                     <button onClick={() =>  removeFromCart(item)}>delete</button>
        //                 </div>
        //             )
        //         }) }
        //         {/*<div>Total: ${cartTotal}</div>*/}
        //         {items.length > 0 &&
        //         <div className="cart-total">
        //             <h5>Total price: ${cartTotal}</h5>
        //             <button className="addToCart"> Order</button>
        //         </div>
        //         }
        //     </div>
        // </>
    );

}