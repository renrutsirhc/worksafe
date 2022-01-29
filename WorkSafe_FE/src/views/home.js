import React, { Component } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import ViewEntry from "./view-entry";


class Home extends Component {
    static displayName = Home.name;    

    constructor(props) {
        super(props);
        this.state = {
            forecasts: [],
            loading: true,
            entries: [],
        };
        
    }

    componentDidMount() {
        //this.populateWeatherData();
        this.getEntries();
    }

    static renderForecastsTable(forecasts) {
        return (
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Temp. (C)</th>
                        <th>Temp. (F)</th>
                        <th>Summary</th>
                    </tr>
                </thead>
                <tbody>
                    {forecasts.map(forecast =>
                        <tr key={forecast.Date}>
                            <td>{forecast.Date}</td>
                            <td>{forecast.TemperatureC}</td>
                            <td>{forecast.TemperatureF}</td>
                            <td>{forecast.Summary}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    render() {

        //let contents = this.state.loading
            //? <p><em>Loading... Please refresh once the ASP.NET backend has started. See <a href="https://aka.ms/jspsintegrationreact">https://aka.ms/jspsintegrationreact</a> for more details.</em></p>
            //: Home.renderForecastsTable(this.state.forecasts);

        return (
            <div>
                {/*<h1 id="tabelLabel" >Weather forecast</h1>*/}
                {/*<p>This component demonstrates fetching data from the server.</p>*/}
                {/*{contents}*/}
                <ViewEntry entry="{entries[0]}"/>
            </div>
        );
    }

    async getEntries() {
        const response = await fetch('https://localhost:7001/api/users/auth0|61ef4114b7db1d0069b8de22/entries');
        const data = await response.json();
        console.log(data);
        this.setState({ entries: data });
    }

    async populateWeatherData() {
        const response = await fetch('https://localhost:7001/weatherforecast');
        const data = await response.json();
        this.setState({ forecasts: data, loading: false });
    }
}

export default Home;