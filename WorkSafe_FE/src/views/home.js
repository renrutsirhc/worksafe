import React, { Component } from "react";
import { useAuth0 } from "@auth0/auth0-react";

class Home extends Component {
    static displayName = Home.name;    

    constructor(props) {
        super(props);
        
    }

 
   

    render() {


        return (
            <div>
                <Dashboard />
            </div>
        );
    }
}

export default Home;