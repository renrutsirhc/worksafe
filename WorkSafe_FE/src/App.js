import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";

import { NavBar, Footer, Loading } from "./components";
import { Home, Profile, ExternalApi} from "./views";
import AddEntry from './views/add-entry';

import { withAuth0 } from "@auth0/auth0-react";
import ProtectedRoute from "./auth/protected-route";
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
    render() {
        const { isLoading } = this.props.auth0;

        if (isLoading) {
            return <Loading />;
        }
        
        return (
            <div id="app" className="d-flex flex-column h-100">
            <NavBar />
            <div className="container flex-grow-1">
                <div className="mt-5">
                <Switch>
                    <Route path="/" exact component={Home} />
                    <ProtectedRoute path="/profile" component={Profile} />
                    <ProtectedRoute path="/external-api" component={ExternalApi} />
                    <ProtectedRoute path ="/add-entry" component={AddEntry} />
                </Switch>
                </div>
            </div>
            <Footer />
            </div>
        );
    }
}

export default withAuth0(App);