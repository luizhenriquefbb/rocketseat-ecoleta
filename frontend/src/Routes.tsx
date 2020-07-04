import React from "react";
import { BrowserRouter, Route } from 'react-router-dom';

import Home from './views/home';
import CreatePoint from './views/cretatePoint';
import SeePoint from './views/seePoint';
import PointDetail from './views/pointDetail';

const Routes: React.FC = () => {
    return (
        <BrowserRouter>
            <Route path="/" exact component={Home} />
            <Route path="/create-point" exact component={CreatePoint} />
            <Route path="/see-point" exact component={SeePoint} />
            <Route path="/point_detail/:point_id" exact component={PointDetail} />
        </BrowserRouter>
    );
}

export default Routes;