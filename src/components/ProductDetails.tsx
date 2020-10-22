import React, {ReactElement, useState} from 'react'
import {Product} from "../database/Product";
import styled from "styled-components";
import {useRouteMatch} from "react-router-dom";
import {products} from "../database/products";

interface Props {
    item: Product[]
}

const ProductImage = styled.img`
  width: 10%;
  height: 10%;
  object-fit: contain;
  object-position: center;
`;

export default function ProductDetails({}: Props): ReactElement {
    const match = useRouteMatch<{ id: string }>();
    // const a = match.params;
    const item = (products.find(product => product.id.toString() === match.params.id) || products[0]) ;

    return (
            <div>
                <div className='productFigure'>
                    <h1>{item.name}</h1>
                    <ProductImage src={item.image} />
                </div>
            </div>
        );
}


// import React, {Component} from 'react'
// import {Product} from "../database/Product";
// import styled from "styled-components";
// import {Link} from "react-router-dom";
// import {useRouteMatch} from "react-router-dom";
//
// interface Props {
//     item: Product[]
// }
//
// interface State {
//     item: Product[]
// }
//
// const ProductImage = styled.img`
//   width: 100%;
//   height: 100%;
//   object-fit: contain;
//   object-position: center;
// `;
//
// export default class ProductDetails extends Component<Props, State> {
//     constructor(props: Props) {
//         super(props);
//         this.state = {
//             item: this.props.item,
//         };
//     };
//
//
//
//     render() {
//         const match = useRouteMatch<{ id: string }>();
//         const item = match.params;
//         return (
//             <div>
//                 <div className='productFigure'>
//                     <ProductImage src={item.id} />
//                 </div>
//                 {/*<div className='productHeader'>{this.match.params.name}</div>*/}
//                 {/*<div className='productBrandText'>{this.match.params.brand}</div>*/}
//                 {/*<div className='productPrice'>{this.match.params.price}</div>*/}
//             </div>
//         );
//     }
// }