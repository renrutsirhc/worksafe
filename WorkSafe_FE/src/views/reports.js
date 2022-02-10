import React, { Component } from "react";
import { Select } from "react-dropdown-select";
import { Document, Packer, Paragraph, TextRun, SectionType, HeadingLevel, AlignmentType, Table, TableRow, TableCell } from "docx";
import { saveAs } from "file-saver";
import { ProjectEntriesReport, UserEntriesReport } from "../reports"
import { withAuth0 } from "@auth0/auth0-react";
import { DateTime } from "luxon";
import { Form, FormLabel, FormControl, Row, Col, Card } from "react-bootstrap";

class Reports extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showReport: false,
            isUser: true,
            entries: [],
            tags: [],
            selectedTags: [],
            user: props.auth0.user,
            project: null,
            projectsLoaded: false,
            startDate: null,
            endDate: null,
        }

        this.generateDOCX = this.generateDOCX.bind(this);
        this.renderElement = this.renderElement.bind(this);
        this.generateReport = this.generateReport.bind(this);
        this.setReportType = this.setReportType.bind(this);
        this.handleProjectChange = this.handleProjectChange.bind(this);
        this.handleStartDateChange = this.handleStartDateChange.bind(this);
        this.handleEndDateChange = this.handleEndDateChange.bind(this);
        this.handleTagChange = this.handleTagChange.bind(this);
    }

    componentDidMount() {
        this.getTags();
        this.getProjects();
    }

    async getTags() {
        const { getAccessTokenSilently } = this.props.auth0;
        var token = await getAccessTokenSilently();
        var options = {
            headers: {
                Authorization: "Bearer " + token,
            },
        };
        let response = await fetch("api/tags", options);
        if (response.ok) {
            let result = await response.json();
            this.setState({ tags: result });
        } else {
            this.handleShowError();
        }
    }

    async getProjects() {
        const { getAccessTokenSilently } = this.props.auth0;
        var token = await getAccessTokenSilently();
        var options = {
            headers: {
                Authorization: "Bearer " + token,
            },
        };
        let response = await fetch("/api/projects", options);
        if (response.ok) {
            let result = await response.json();
            this.setState({ projects: result, projectsLoaded: true });
        } else {
            this.handleShowError();
        }
    }

    async getEntries() {
        if (!this.state.isUser && this.state.project == null) {
            return;
        }

        const { getAccessTokenSilently } = this.props.auth0;
        var token = await getAccessTokenSilently();
        var options = {
            headers: {
                Authorization: "Bearer " + token,
            },
        };
        var url = this.getUrlString();
        let response = await fetch(
            url,
            options
        );
        if (response.ok) {
            let result = await response.json();
            console.log(result);
            this.setState({ entries: result });
            this.setState({ showReport: true });
        } else {
            this.handleShowError();
        }
    }

    getUrlString() {
        var url = "";
        if (this.state.isUser) {
            url = "/api/users/" + this.state.user.sub + "/entries";
        } else if (this.state.project != null) {
            url = "/api/projects/" + this.state.project.Id + "/entries";
        }

        url = url + this.getQueryString();

        return url;
    }

    getQueryString() {
        var query = "";
        if (this.state.startDate != null) {
            query = query + "startDate=" + this.state.startDate + "&"
        }

        if (this.state.endDate != null) {
            query = query + "endDate=" + this.state.endDate + "&"
        }

        if (this.state.selectedTags.length > 0) {
            for (var i = 0; i < this.state.selectedTags.length; i++) {
                query = query + "tags=" + this.state.selectedTags[i] + "&"
            }
        }

        if (query.length != 0) {
            query = "?" + query;
            query = query.substring(0, query.length - 1);
        }

        return query;
    }

    handleStartDateChange(event) {
        var startDate = DateTime.fromISO(event.target.value).toUTC();
        this.setState({
            startDate: startDate.toISO(),
        });
    }

    handleEndDateChange(event) {
        var endDate = DateTime.fromISO(event.target.value).toUTC();
        this.setState({
            endDate: endDate.toISO(),
        });
    }

    handleProjectChange(event) {
        if (event[0] == undefined) {
            this.setState({
                project: {
                    Id: "",
                    Title: "",
                },
            })
        } else {
            this.setState({ project: this.getProject(event[0].value) })
        }
    }

    getProject(id) {
        for (var i = 0; i < this.state.projects.length; i++) {
            if (this.state.projects[i].Id == id) {
                return this.state.projects[i];
            }
        }
        return null;
    }

    handleTagChange(values) {
        this.setState({
            selectedTags: values.map((tag) => tag.value)
        });
    }

    renderElement(paragraphs, element) {
        console.log('test');
        //render this element
        switch (element.localName) {
            case 'p':
                paragraphs.push(new Paragraph(
                    {
                        text: element.textContent,
                        spacing: {
                            after: 200,
                        },
                    })
                );
                break;
            case 'td':
                paragraphs.push(new Paragraph(
                    {
                        text: element.textContent,
                    })
                );
                break;
            case 'th':
                paragraphs.push(new Paragraph(
                    {
                        text: element.textContent,
                    })
                );
                break;
            case 'h1':
                paragraphs.push(new Paragraph(
                    {
                        text: element.textContent,
                        heading: HeadingLevel.HEADING_1,
                        spacing: {
                            after: 200,
                        },
                        alignment: AlignmentType.CENTER,
                    })
                );
                break;
            case 'h2':
                paragraphs.push(new Paragraph(
                    {
                        text: element.textContent,
                        heading: HeadingLevel.HEADING_2,
                        spacing: {
                            after: 200,
                        },
                    })
                );
                break;
            case 'table':
                let tableRows = this.getTableRows(element);
                const table = new Table({
                    rows: tableRows,
                });
                paragraphs.push(table);
        }

        //base case - no children - return
        if (element.children.length == 0) {
            return;
        }

        if (element.localName == 'tr') {
            return;
        }

        //loop through children and call recursively
        for (let i = 0; i < element.children.length; i++) {
            this.renderElement(paragraphs, element.children[i]);
        }
    }

    getTableRows(element) {
        let tableRows = [];
        for (let i = 0; i < element.children.length; i++) {
            let rowCells = this.getRowCells(element.children[i]);
            tableRows.push(new TableRow({
                children: rowCells,
            }))
        }
        return tableRows;
    }

    getRowCells(element) {
        let rowCells = []
        for (let i = 0; i < element.children.length; i++) {
            let paragraphs = [];
            this.renderElement(paragraphs, element.children[i]);
            rowCells.push(new TableCell({
                children: paragraphs,
            }))
        }
        return rowCells;
    }


    generateDOCX() {


        var html = document.getElementById("report");

        const paragraphs = [];

        this.renderElement(paragraphs, html);

        const doc = new Document({
            sections: [{
                properties: {
                    type: SectionType.CONTINUOUS,
                },
                children: paragraphs,
            }],
            styles: {
                paragraphStyles: [
                    {
                        id: "Normal",
                        name: "Normal",
                        next: "Normal",
                        quickFormat: true,
                        run: {
                            color: "000000",
                            font: "Calibri",
                            size: 24,
                        },
                        paragraph: {
                            spacing: {
                                line: 276,
                            },
                            indent: {
                                left: 720,
                            },
                        },
                    },
                    {
                        id: "Heading1",
                        name: "Heading 1",
                        basedOn: "Normal",
                        next: "Normal",
                        quickFormat: true,
                        run: {
                            size: 52,
                            bold: true,
                        },
                        paragraph: {
                            spacing: {
                                before: 240,
                                after: 120
                            },
                        },
                    },
                    {
                        id: "Heading2",
                        name: "Heading 2",
                        basedOn: "Normal",
                        next: "Normal",
                        quickFormat: true,
                        run: {
                            size: 32,
                            bold: true,
                        },
                        paragraph: {
                            spacing: {
                                before: 240,
                                after: 120
                            },
                        },
                    },
                ]
            }
        });



        Packer.toBlob(doc).then(blob => {
            console.log(blob);
            saveAs(blob, "example.docx");
            console.log("Document created successfully");
        });
    };


    generateReport() {
        this.getEntries();
    }

    setReportType(event) {
        if (event.target.value == "User") {
            this.setState({
                isUser: true,
                showReport: false,
            })
        } else {
            this.setState({
                isUser: false,
                showReport: false,
            })
        }
    }

    feedProjectsOptions() {
        var options = this.state.projects.map((project) => {
            return {
                value: project.Id,
                label: project.Title,
            };
        });
        // console.log(options);
        return options;
    }

    feedTagsOptions() {
        var options = this.state.tags.map((tag) => {
            return {
                label: tag,
                value: tag,
            };
        });
        return options;
    }



    render() {
        const startDate = DateTime.fromISO(this.state.startDate);
        const localStartDate = startDate.toLocal().toISODate();

        const endDate = DateTime.fromISO(this.state.endDate);
        const localEndDate = endDate.toLocal().toISODate();

        if (!this.state.projectsLoaded) {
            return <h1>Loading...</h1>;
        }

        const placeHolderOption = "";
        const projectsOptions = this.feedProjectsOptions();
        const tagsOptions = this.feedTagsOptions();

        var reportOptions = <div>
            <Form>
                <Row sm={1} md={2}>

                    <Form.Group onChange={this.setReportType}>

                        <div className="radio-label-column">
                            <label className="radio-label" for="radio-user">
                                <input type="radio" value="User" name="reportType" defaultChecked="checked" id="radio-user" />
                                User
                            </label>
                            

                        </div>
                        <div>
                            <label className="radio-label" for="radio-project">
                                <input type="radio" value="Project" name="reportType" id="radio-project" />
                                Project
                            </label>
                          
                        </div>
                    </Form.Group>
                    <Select
                        className="project-select"
                        placeholder="Select Project"
                        onChange={this.handleProjectChange}
                        options={projectsOptions}
                        backspaceDelete={false}
                        clearable={true}
                        dropdownHandle={false}
                    />
                </Row>
                <Row>

                </Row>
                <Row>
                    <Col>
                        <Form.Group>
                            <FormLabel>Start Date</FormLabel>
                            <FormControl
                                type="date"
                                value={localStartDate}
                                onChange={this.handleStartDateChange}
                                name="date"
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <FormLabel>End Date</FormLabel>
                            <FormControl
                                type="date"
                                value={localEndDate}
                                onChange={this.handleEndDateChange}
                                name="date"
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Form.Group className="mt-3">
                        <Form.Label>Tags</Form.Label>
                        <Select
                            placeholder="Select Tag"
                            options={tagsOptions}
                            onChange={(values) => this.handleTagChange(values)}
                            clearable={true}
                            dropdownHandle={false}
                            multi={true}
                            create={false}
                            color="#AAAAAA"
                        />
                    </Form.Group>
                </Row>
            </Form>

            <button className="button" onClick={this.generateReport}>Generate Report</button>
        </div>


        if (!this.state.isUser && this.state.project == null) {
            return (
                <div>
                    {reportOptions}
                    <h2>Please select a project...</h2>
                </div>
            )
        }

        if (this.state.showReport && this.state.isUser) {
            var entries = this.state.entries.map((entry) => <h1 key={entry.Id}>{entry.Title} - {new DateTime.fromISO(entry.EntryDate).toLocaleString(DateTime.DATETIME_FULL)}</h1>)
            return (
                <div>
                    {reportOptions}
                    <div id="report">
                        <UserEntriesReport entries={this.state.entries} user={this.state.user} />
                    </div>
                    <div>
                        {/*this is temporary testing*/}
                        {entries}
                    </div>
                </div>
            )
        }

        if (this.state.showReport && !this.state.isUser) {
            var entries = this.state.entries.map((entry) => <h1 key={entry.Id}>{entry.Title} - {new DateTime.fromISO(entry.EntryDate).toLocaleString(DateTime.DATETIME_FULL)}</h1>)
            return (
                <div>
                    {reportOptions}
                    <div id="report">
                        <ProjectEntriesReport entries={this.state.entries} project={this.state.project} />
                    </div>
                    <div>
                        {/*this is temporary testing*/}
                        {entries}
                    </div>
                </div>
            )
        }

        return (
            <div>
                {reportOptions}
            </div>
        );
    }
}

export default withAuth0(Reports);