import React from "react";

import Home from './views/home';
import CreatePoint from './views/cretatePoint';
import { BrowserRouter, Route } from 'react-router-dom';

const Routes: React.FC = () => {
    return (
        <BrowserRouter>
            <Route path="/" exact component={Home} />
            <Route path="/create-point" exact component={CreatePoint} />
        </BrowserRouter>
    );
}

export default Routes;