import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import './index.css';

import { Header } from './components/iu/Header'
import { BrandView } from './components/brands/BrandView';
import { InventoryView } from './components/inventories/InventoryView';
import { StateView } from './components/states/StateView';
import { TypeView } from './components/types/TypeView';
import { UserView } from './components/users/UserView';
import { InventoryUpdate } from './components/inventories/InventoryUpdate';
import { UserUpdate } from './components/users/UserUpdate';
import { TypeUpdate } from './components/types/TypeUpdate';
import { StateUpdate } from './components/states/StateUpdate';
import { BrandUpdate } from './components/brands/BrandUpdate';

const App = () => {
    return <Router>
        <Header />
        <Switch>
            <Route exact path='/' component={ InventoryView } />
            <Route exact path='/marcas' component={ BrandView } />
            <Route exact path='/estados' component={ StateView } />
            <Route exact path='/tipos' component={ TypeView } />
            <Route exact path='/usuarios' component={ UserView } />
            <Route exact path='/inventarios/editar/:InventoryId' component={ InventoryUpdate } />
            <Route exact path='/usuarios/editar/:UserId' component={ UserUpdate } />
            <Route exact path='/tipos/editar/:TypeId' component={ TypeUpdate } />
            <Route exact path='/estados/editar/:StateId' component={ StateUpdate } />
            <Route exact path='/marcas/editar/:BrandId' component={ BrandUpdate } />
            <Redirect to='/' />
        </Switch>
    </Router>
}

export {
    App,
}