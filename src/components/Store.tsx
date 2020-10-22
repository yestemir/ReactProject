import React, {Component} from 'react';
import styled from "styled-components";
import {Product} from "../database/Product";
import ProductItem from "./ProductItem";
import RecentlyViewedProducts from "./RecentlyViewedProducts";
import {recent} from "../database/recent";

interface Props {
    item: Product[]

}

interface State {
    item: Product[]
}

const ProductImage = styled.img`
  width: 10%;
  height: 10%;
  object-fit: contain;
  object-position: center;
`;

export default class Store extends Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            item: this.props.item,
        };
    }


    // TODO: how to get item
    render() {
        return (
            <>
                <div>
                { this.state.item.map( (item) => {
                    return <ProductItem key={item.id} item={item} />;
                }) }
                </div>
                <RecentlyViewedProducts items={recent}/>
            </>
        );
    }
}