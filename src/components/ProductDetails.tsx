import React, {ReactElement, useState} from 'react'
import {Product} from "../database/Product";
import {useRouteMatch} from "react-router-dom";
import {products} from "../database/products";
import './productDetail.css';

interface Props {
    item: Product[]
    addItem: (it: Product) => void;
}

export default function ProductDetails({addItem}: Props): ReactElement {
    const match = useRouteMatch<{ id: string }>();
    const item = (products.find(product => product.id === parseInt(match.params.id)) || products[0]) ;
    console.log(parseInt(match.params.id))

    return (
        // <section id="store" className="store py-5" >
        //     <div className="container" >
        //     <div>
        //         <div key={item.id} className='productFigure'>
        //             <h1>{item.name}</h1>
        //             <img id="product-image" src={item.image} />
        //             <h5>Description: {item.description}</h5>
        //             <h5>Price: {item.price}</h5>
        //             <h5>Cook: {item.brand}</h5>
        //
        //         </div>
        //     </div>
        //     </div>
        // </section>
        <>
        <div className="cont" key={item.id} id="main">
            <div className="left-column">

                <img id="product-image" src={item.image} />
            </div>

            <div className="right-column">

                <div className="product-description">
                    {/*<span>Headphones</span>*/}
                    <h1>{item.name}</h1>
                    <p>{item.description}</p>
                </div>

                <div className="product-configuration">

                    <div className="cable-config">
                        <span>Product size</span>

                        <div className="cable-choose">
                            <button>Large</button>
                            <button>Medium</button>
                            <button>Small</button>
                        </div>
                    </div>
                </div>

                <div className="product-price">
                    <span>{item.price}$</span>
                    <button className="cart-btn" onClick={() => addItem(item)}>Add to cart</button>
                </div>
            </div>
        </div>
            </>
        );
}