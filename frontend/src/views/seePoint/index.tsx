import React from 'react';
import Header from '../../components/Header';
import { FiArrowLeft } from 'react-icons/fi';

import './seePoints.css';

const SeePoint:React.FC = () => {
    return (
        <div id="page-see-point">
            <div className="ocntent">
                <Header
                    backLink={{
                        text:"back to main",
                        link: "/",
                        icon: FiArrowLeft
                    }} />
                <main>
                    <h1>In development</h1>
                </main>
            </div>
        </div>
    )
}

export default SeePoint;