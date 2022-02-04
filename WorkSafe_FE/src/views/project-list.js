import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import "bootstrap/dist/js/bootstrap.js";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { Button } from "react-bootstrap";
import ProjectParent from "./project-parent.js"
import { withAuth0 } from "@auth0/auth0-react";

class ProjectList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            loading: true,
            projects: [],
            addProject: false,
            user: props.auth0.user,
        }

        this.handleShowAddProject = this.handleShowAddProject.bind(this);
        this.handleUpdateProject = this.handleUpdateProject.bind(this);
        this.handleAddProject = this.handleAddProject.bind(this);

    }

    componentDidMount() {
        this.getProjects();
    }

    async getProjects() {
        let result = await fetch("/api/projects");
        
        let data = await result.json();
        this.setState({ projects: data });
        this.setState({ loading: false });
    }

    handleShowAddProject() {
        if (this.state.addProject == true) {
            this.setState({ addProject: false })
        } else {
            this.setState({ addProject: true })
        }

    }

    handleAddProject(project) {
        var projects = this.state.projects;
        projects.push(project);
        projects.sort((project1, project2) => {
            var date1 = new Date(project1.TimeStamp);
            var date2 = new Date(project2.TimeStamp);
            if (date1.getTime() > date2.getTime()) {
                return -1;
            } else if (date1.getTime() < date2.getTime()) {
                return 1;
            } else {
                return 0;
            }

        })
        this.setState({ projects: projects });
    }

    handleUpdateProject(project) {
        var projects = this.state.projects;
        for (let i = 0; i < entries.length; i++) {
            if (projects[i].Id == project.Id) {
                projects[i] = project;
                this.setState({ projects: projects });
                break;
            }
        }
    }


    render() {
        var projects = this.state.projects.map(project => (
            <ProjectParent key={project.Id} project={project} handleUpdateProject={this.handleUpdateProject} />
        ));

        if (this.state.loading) {
            return (
                <div>
                    <h2>Loading...</h2>
                </div>
            );
        }

        if (this.state.addProject) {
            return (
                <AddProject userId={this.state.user.sub} handleShowAddProject={this.handleShowAddProject} handleAddProject={this.handleAddProject} />
            )
        }

        if (this.state.projects.length > 0) {
            return (
                <div>
                    <Button variant="success" onClick={this.handleShowAddProject}>Add Project</Button>
                    <div className="list-group">
                        <div className="d-flex">
                            <div className="mr-auto">
                                <h2>Projects</h2>
                            </div>
                        </div>
                        {projects}
                    </div>
                </div>
            );
        }

        return (
            <div>
                <Button variant="success" onClick={this.handleShowAddProject}>Add Project</Button>
                <h2>No Entries to Display...</h2>
            </div>
        );
    }
}

export default withAuth0(ProjectList);
