import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import { Header, Footer, Loading } from "./components";
import { Home, Profile, Projects, ExternalApi, Login } from "./views";

import { withAuth0 } from "@auth0/auth0-react";
import ProtectedRoute from "./auth/protected-route";

class App extends Component {
    constructor(props) {
        super(props);
    }



    render() {
        const { isLoading } = this.props.auth0;
        const { isAuthenticated } = this.props.auth0;



        if (isLoading) {
            return <Loading />;
        }

        if (!isAuthenticated) {
            return (
                <div id="app" className="d-flex flex-column h-100">
                    <div className="container flex-grow-1">
                        <div className="mt-5">
                            <Login />
                        </div>
                    </div>
                    <Footer />
                </div>
            );
        }

        return (
            <div id="app" className="d-flex flex-column h-100">
                <Header />
                <div className="container flex-grow-1">
                    <div className="mt-5">
                        <Switch>
                            <ProtectedRoute path="/projects" component={Projects} />
                            <ProtectedRoute path="/profile" component={Profile} />
                            <ProtectedRoute path="/external-api" component={ExternalApi} />
                            <ProtectedRoute path="/" component={Home} />
                        </Switch>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

export default withAuth0(App);
