import React, { useEffect, useState } from 'react';
import useTitle from '../../../Hooks/useTitle/useTitle';
import ProductCategory from '../ProductCategory/ProductCategory';
import bannerImg from "../../../assets/images/banner.jpg"
import NewsLetter from '../NewsLetter/NewsLetter';
import AdvertiseItem from '../AdvertiseItem/AdvertiseItem';

const Home = () => {
    useTitle("Home")

    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch("https://second-lit-server.vercel.app/products/advertised")
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [])

    return (
        <div>

            <header>
                <div className="w-full bg-cover bg-center">
                    <img src={bannerImg} alt="" />
                </div>
            </header>

            <section>
                <ProductCategory></ProductCategory>
            </section>

            {
                products.length > 0 &&
                <section>
                    <AdvertiseItem
                        products={products}
                    ></AdvertiseItem>
                </section>
            }

            <section>
                <NewsLetter></NewsLetter>
            </section>
        </div>
    );
};

export default Home;