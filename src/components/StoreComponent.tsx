import React, { Fragment, ReactElement, useEffect, useState } from "react";
import axios from "../api/axios";
import {Product} from "../database/Product";
import ProductItem from "./ProductItem";
import RecentlyViewedProducts from "./RecentlyViewedProducts";
import {recent} from "../database/recent";
import './store.css';

interface Props {
    fetchUrl: string;
    addItem: (it: Product) => void;
}

export default function StoreComponent({ fetchUrl, addItem }: Props): ReactElement {
    const [data, setData] = useState<Product[]>([]);

    useEffect(() => {
        async function fetchData() {
            const result = await axios.get(fetchUrl);
            console.log(result);
            setData([...result.data]);
        }

        fetchData();
    }, []);

    return (
        <div>
            {/*{data.map((d) => (*/}
                <Fragment>
                        <section id="store" className="store py-5">
                            <div className="container">
                                <div className="row">
                                    <div className="col-10 mx-auto col-sm-6 text-center">
                                        <h1 className="text-capitalize">our <strong className="banner-title ">store</strong>
                                        </h1>
                                    </div>
                                </div>
                                <div className="row store-items" id="store-items">
                                    { data.map( (item) => {
                                        return <ProductItem key={item.id} item={item} addItem={addItem}/>;
                                    }) }
                                </div>
                                <RecentlyViewedProducts items={recent}/>
                            </div>
                        </section>
                </Fragment>
            {/*))}*/}
        </div>
    );
}
