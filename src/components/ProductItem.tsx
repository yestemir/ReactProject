import React, {Component} from 'react'
import styled from "styled-components";
import {Link} from "react-router-dom";
import {Product} from "../database/Product";
import {cart} from "../database/cart";
import {recent} from "../database/recent";

interface Props {
    item: Product
}

interface State {
    item: Product
}

const ProductImage = styled.img`
  width: 10%;
  height: 10%;
  object-fit: contain;
  object-position: center;
`;

export default class ProductItem extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            item: this.props.item,
        };
    }

    render() {
        let item: Product = {
            id: 0,
            name: this.state.item.name,
            price: this.state.item.price,
            image: this.state.item.image,
            description: this.state.item.description,
            brand: this.state.item.brand,
        };
        return (
            <div className='productContainer'>
                <div className='productFigure'>
                    <ProductImage src={this.state.item.image} />
                </div>
                <Link key={this.state.item.id} to={'/items/' + this.state.item.id} onClick={() => addItemToRecent(this.state.item)}>
                    <div className='productHeader'>{this.state.item.name}</div>
                </Link>
                <div className='productDescriptionDiv'>
                    <div className='productBrandText'>{this.state.item.brand}</div>
                    <button className='addToCart' onClick={() => addItemToCart(item)}>Add To Cart</button>
                </div>
            </div>
        );

        function addItemToCart(item: Product){
            item.id = cart.length + 1;
            // const checker = cart.find((i) => i.name === item.name);
            // if (checker) {
            //     return;
            // }
            cart.push(item);
            // console.log(item.id)
        }

        function addItemToRecent(item: Product){
            item.id = recent.length + 1;
            const checker = recent.find((i) => i.name === item.name);
            if (checker) {
                return;
            }
            item.id = recent.length + 1;
            recent.push(item);
        }
    }


}