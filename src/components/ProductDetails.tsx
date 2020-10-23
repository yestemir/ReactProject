import React, {ReactElement, useState} from 'react'
import {Product} from "../database/Product";
import styled from "styled-components";
import {useRouteMatch} from "react-router-dom";
import {products} from "../database/products";

interface Props {
    item: Product[]
}

const ProductImage = styled.img`
  width: 50%;
  height: 50%;
  object-fit: contain;
  object-position: center;
`;

export default function ProductDetails({}: Props): ReactElement {
    const match = useRouteMatch<{ id: string }>();
    const item = (products.find(product => product.id === parseInt(match.params.id)) || products[0]) ;
    console.log(parseInt(match.params.id))

    return (
        <section id="store" className="store py-5" style={{background: "transparent"}}>
            <div className="container" >
            <div>
                <div key={item.id} className='productFigure'>
                    <h1>{item.name}</h1>
                    <ProductImage src={item.image} />
                    <h5>Description: {item.description}</h5>
                    <h5>Price: {item.price}</h5>
                    <h5>Cook: {item.brand}</h5>

                </div>
            </div>
            </div>
        </section>
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