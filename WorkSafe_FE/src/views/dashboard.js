import React, { Component } from 'react'

export default class Dashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            entries: [],
        }
    }

    componentDidMount() {
        getEntries();
    }

    async getEntries() {
        let result = await fetch("https://localhost:7001/api/users/auth0|61ef4114b7db1d0069b8de22/entries");
        let data = await result.json;
        this.setState({ entries: data });
    }


    render() {
        if (this.state.entries.length > 0) {
            return (
                <div class="list-group" style="width: 60%;background: #fff;margin: 30px auto;padding: 10px;border-radius: 5px;">

                    <EntryView entry={this.state.entries} />

                    <div class="d-flex" style="display: flex;flex-direction:row;width: 95%;margin: 10px auto;padding: 5px 5px;">
                        <div class="mr-auto p-2" style="width: 90%; background-color:#fff">
                            <h2>Projects</h2>
                        </div>
                        <div class="p-2" style="padding-right: 20px; background-color:#fff"><button type="button"
                            class="btn btn-success">Get Report</button></div>
                        <div class="p-2" style="background-color:#fff"><button type="button" class="btn btn-primary">New Report</button>
                        </div>
                    </div>

                    <a href="#" class="list-group-item list-group-item-action" style=" width: 95%;margin: 10px auto;padding: 5px 5px;
                box-shadow: 0 4px 8px 0 #ccc, 0 6px 20px 0 #ccc;
                border-radius: 5px; background-color:aquamarine">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">Reporting Project</h4>
                        </div>
                        <p class="mb-1">The project will implement our reporting system.</p>
                        <small>3 days ago Selina Yu</small>
                    </a>
                    <a href="#" class="list-group-item list-group-item-action" style="width: 95%;
                margin: 10px auto;
                padding: 5px 5px;
                box-shadow: 0 4px 8px 0 #ccc, 0 6px 20px 0 #ccc;
                border-radius: 5px; background-color:burlywood">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">Dashboard Project</h4>
                        </div>
                        <p class="mb-1">The project will implement our dashboard.</p>
                        <small>2 days ago Chris</small>
                    </a>
                    <a href="#" class="list-group-item list-group-item-action" style="width: 95%;
                margin: 10px auto;
                padding: 5px 5px;
                box-shadow: 0 4px 8px 0 #ccc, 0 6px 20px 0 #ccc;
                border-radius: 5px; background-color:darkgrey">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">Management Project</h4>
                        </div>
                        <p class="mb-1">The project will implement our management system.</p>
                        <small>2 days ago Tehanui</small>
                    </a>
                </div>
            )
        }
        else {
            return (
                <div>
                    <h2>No Entries to Display...</h2>
                 </div>
                )
        }
    }
}