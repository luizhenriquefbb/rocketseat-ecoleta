import React from "react";

import {Link} from 'react-router-dom';
import { FiLogIn, FiMapPin } from "react-icons/fi";


import './Home.css'
import Header from "../../components/Header";

const Home: React.FC =  (props:any) => {
    return <>
        <div id="page-home">
            <div className="content">
                <Header />

                <main>
                    <h1> Your marketplace of waste collection </h1>
                    <p>
                        We help people to find collection places in an efficiency way
                    </p>

                    <Link to="create-point">
                        <span>
                            <FiLogIn />
                        </span>
                        <strong>Create waste collection</strong>
                    </Link>
                    <Link to="see-point" className="see-point">
                        <span>
                            <FiMapPin />
                        </span>
                        <strong>See places to go</strong>
                    </Link>
                </main>
            </div>
        </div>
    </>
}

export default Home;