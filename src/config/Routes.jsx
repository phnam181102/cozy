import React from "react";

import { Route, Switch } from "react-router-dom";

import Home from "../pages/home/Home";
import Catalog from "../pages/catalog/Catalog";
import Detail from "../pages/detail/Detail";
import WatchMovie from "../pages/watch/Watch";

const Routes = () => {
    return (
        <Switch>
            <Route path="/watch/:category/:id" component={WatchMovie} />
            <Route path="/:category/search/:keyword" component={Catalog} />
            <Route path="/:category/search/" component={Catalog} />
            <Route path="/:category/:id" component={Detail} />
            <Route path="/:category" component={Catalog} />

            <Route path="/" exact component={Home} />
        </Switch>
    );
};

export default Routes;
