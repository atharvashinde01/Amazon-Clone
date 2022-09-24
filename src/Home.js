import React from 'react';
import "./Home.css";

import Product from './Product';

function Home() {
    return (
        <div className="home">
            <div className="home__container">
                <img
                    className="home__image"
                    src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg"
                    alt=""
                />

                <div className="home__row">
                    <Product
                        id="1"
                        title="Microsoft Surface Book 2 Intel Core i7 8th Gen 15 inch Touchscreen 2-in-1 Laptop (16GB/256GB/Windows 10 Pro/Integrated Graphics/Platinum/1.642kg)"
                        price={222499}
                        rating={5}
                        image="https://m.media-amazon.com/images/I/619-tSIK3TL._AC_UY218_.jpg"
                    />
                    <Product
                        id="2"
                        title="Apple MacBook Pro (16-inch, 16GB RAM, 512GB Storage, 2.6GHz 9th Gen Intel Core i7) - Space Grey"
                        price={195902}
                        rating={5}
                        image="https://m.media-amazon.com/images/I/71L2iBSyyOL._AC_UY218_.jpg"
                    />
                </div>

                <div className="home__row">
                    <Product
                        id="3"
                        title="OnePlus 8 Pro (Onyx Black 12GB RAM+256GB Storage)"
                        price={59999.00}
                        rating={4}
                        image="https://m.media-amazon.com/images/I/61YSMhOd5EL._AC_UY218_.jpg"
                    />
                    <Product
                        id="4"
                        title="Samsung Galaxy Z Fold2 5G (Mystic Bronze, 12GB RAM, 256GB Storage)"
                        price={149999}
                        rating={5}
                        image="https://images-eu.ssl-images-amazon.com/images/S/gladiator-image-upload-prod/a/A21TJRUUN4KGV/97a97c6dbd4ba4dc57ed84cf3c260e2e._CR0,0,400,400_AC_SL180_QL70_.jpg"
                    />
                    <Product
                        id="5"
                        title="Apple iPhone 11 Pro (512GB) - Space Grey"
                        price={140300}
                        rating={4}
                        image="https://m.media-amazon.com/images/I/61m6DjujESL._AC_UY218_.jpg"
                    />
                </div>

                <div className="home__row">
                    <Product
                        id="6"
                        title="Samsung 163 cm (65 Inches) Q Series 4K Ultra HD QLED Smart TV QA65Q8CNAK (Black) (2018 model)"
                        price={258999}
                        rating={5}
                        image="https://images-na.ssl-images-amazon.com/images/I/91i6SX47ClL._SL1500_.jpg"
                    />
                </div>

            </div>
        </div>
    )
}

export default Home
