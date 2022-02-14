import React, { Component } from "react";
import { Select } from "react-dropdown-select";
import {
    Document,
    Packer,
    Paragraph,
    TextRun,
    SectionType,
    HeadingLevel,
    AlignmentType,
    Table,
    TableRow,
    TableCell,
    WidthType,
    ExternalHyperlink,
} from "docx";
import { saveAs } from "file-saver";
import { ProjectEntriesReport, UserEntriesReport } from "../reports";
import { withAuth0 } from "@auth0/auth0-react";
import { DateTime } from "luxon";
import { Form, FormLabel, FormControl, Row, Col, Card } from "react-bootstrap";
import "../styles/report-styles.css";

class Reports extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showReport: false,
            showProjectWarning: false,
            isUser: true,
            entries: [],
            tags: [],
            selectedTags: [],
            user: props.auth0.user,
            project: null,
            projectsLoaded: false,
            startDate: null,
            endDate: null,
        };

        var startLimit, endLimit;

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
        let response = await fetch(url, options);
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
            query = query + "startDate=" + this.state.startDate + "&";
        }

        if (this.state.endDate != null) {
            query = query + "endDate=" + this.state.endDate + "&";
        }

        if (this.state.selectedTags.length > 0) {
            for (var i = 0; i < this.state.selectedTags.length; i++) {
                query = query + "tags=" + this.state.selectedTags[i] + "&";
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
        this.startLimit = startDate.toLocal().toISODate();
        this.setState({
            startDate: startDate.toISO(),
        });
        console.log(this.startLimit);
    }

    handleEndDateChange(event) {
        var endDate = DateTime.fromISO(event.target.value).toUTC();
        this.endLimit = endDate.toLocal().toISODate();
        this.setState({
            endDate: endDate.toISO(),
        });
        console.log(this.endLimit);
    }

    handleProjectChange(event) {
        if (event[0] == undefined) {
            this.setState({
                project: {
                    Id: "",
                    Title: "",
                },
                showProjectWarning: true,
            });
        } else {
            this.setState({
                project: this.getProject(event[0].value),
                showProjectWarning: false,
            });
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
            selectedTags: values.map((tag) => tag.value),
        });
        console.log(this.state);
    }

    renderElement(paragraphs, element) {
        console.log("test");
        //render this element
        switch (element.localName) {
            case "a":
                paragraphs.push(
                    new Paragraph({
                        children: [
                            new ExternalHyperlink({
                                children: [
                                    new TextRun({
                                        text: element.textContent,
                                        style: "Hyperlink",
                                    }),
                                ],
                                link: element.href,
                            })
                        ]
                    })
                );
                break;
            case "p":
                paragraphs.push(
                    new Paragraph({
                        text: element.textContent,
                        spacing: {
                            after: 200,
                        },
                    })
                );
                break;
            case "h1":
                paragraphs.push(
                    new Paragraph({
                        text: element.textContent,
                        heading: HeadingLevel.HEADING_1,
                        spacing: {
                            after: 200,
                        },
                        alignment: AlignmentType.CENTER,
                    })
                );
                break;
            case "h2":
                paragraphs.push(
                    new Paragraph({
                        text: element.textContent,
                        heading: HeadingLevel.HEADING_2,
                        spacing: {
                            after: 200,
                        },
                    })
                );
                break;
            case "h5":
                paragraphs.push(
                    new Paragraph({
                        text: element.textContent,
                        heading: HeadingLevel.HEADING_5,
                        spacing: {
                            after: 200,
                        },
                    })
                );
                break;
            case "h6":
                paragraphs.push(
                    new Paragraph({
                        text: element.textContent,
                        heading: HeadingLevel.HEADING_6,
                        spacing: {
                            after: 200,
                        },
                    })
                );
                break;
            case "tbody":
                let tableRows = this.getTableRows(element);
                //1440 DXA in an inch
                //A4 is 8.25 inches wide
                //we use 1 inch margins
                //so table is 6.25 inches wide
                const table = new Table({
                    rows: tableRows,
                    width: {
                        size: 6.25 * 1440,
                        type: WidthType.DXA
                    },
                });
                paragraphs.push(table);
        }

        //base case - no children - return
        if (element.children.length == 0) {
            return;
        }

        if (element.localName == "tr") {
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
            tableRows.push(
                new TableRow({
                    children: rowCells,
                })
            );
        }
        return tableRows;
    }

    getRowCells(element) {
        let rowCells = [];
        
        for (let i = 0; i < element.children.length; i++) {
            let paragraphs = [];
            let columnSpan = element.children[i].colSpan;
            this.renderElement(paragraphs, element.children[i]);
            rowCells.push(
                new TableCell({
                    children: paragraphs,
                    columnSpan: columnSpan,
                })
            );
        }
        return rowCells;
    }

    generateDOCX() {
        var html = document.getElementById("report");

        const paragraphs = [];

        this.renderElement(paragraphs, html);

        const doc = new Document({
            sections: [
                {
                    properties: {
                        type: SectionType.CONTINUOUS,
                    },
                    children: paragraphs,
                },
            ],
            styles: {
                paragraphStyles: [
                    {
                        id: "Normal",
                        name: "Normal",
                        next: "Normal",
                        quickFormat: true,
                        run: {
                            color: "000000",
                            font: "Verdana",
                            size: 24,
                        },
                        paragraph: {
                            spacing: {
                                line: 276,
                            },
                            indent: {
                                left: 0.5/2.54 * 1440,
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
                                after: 120,
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
                                after: 120,
                            },
                        },
                    },
                    {
                        id: "Heading5",
                        name: "Heading 5",
                        basedOn: "Normal",
                        next: "Normal",
                        quickFormat: true,
                        run: {
                            size: 24,
                            bold: true,
                            color: "943a7a",
                        },
                        paragraph: {
                            spacing: {
                                before: 240,
                                after: 120,
                            },
                        },
                        
                    },
                    {
                        id: "Heading6",
                        name: "Heading 6",
                        basedOn: "Normal",
                        next: "Normal",
                        quickFormat: true,
                        run: {
                            size: 24,
                            bold: true,
                            color: "943a7a",
                        },
                        paragraph: {
                            spacing: {
                                before: 240,
                                after: 120,
                            },
                        },

                    },
                ],
            },
        });

        Packer.toBlob(doc).then((blob) => {
            console.log(blob);
            saveAs(blob, "example.docx");
            console.log("Document created successfully");
        });
    }

    generateReport(event) {
        event.preventDefault();
        if (!this.state.isUser && this.state.project == null) {
            this.setState({ showProjectWarning: true });
        } else {
            this.getEntries();
        }
    }

    setReportType(event) {
        if (event.target.value == "User") {
            this.setState({
                isUser: true,
                showReport: false,
            });
        } else {
            this.setState({
                isUser: false,
                showReport: false,
            });
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
            return (
                <div>
                    <h2>Loading...</h2>
                </div>
            );
        }

        const projectsOptions = this.feedProjectsOptions();
        const tagsOptions = this.feedTagsOptions();

        var reportOptions = (
            <div>
                <Form>
                    <FormLabel>Report Type</FormLabel>
                    <Row>
                        <Col xs={12} sm={12} md={6}>
                            <Form.Group onChange={this.setReportType}>
                                <div className="radio-label-column">
                                    <label className="radio-label" for="radio-user">
                                        <input
                                            type="radio"
                                            value="User"
                                            name="reportType"
                                            defaultChecked="checked"
                                            id="radio-user"
                                        />
                                        User
                                    </label>
                                </div>
                                <div className="radio-label-column">
                                    <label className="radio-label" for="radio-project">
                                        <input
                                            type="radio"
                                            value="Project"
                                            name="reportType"
                                            id="radio-project"
                                        />
                                        Project
                                    </label>
                                </div>
                            </Form.Group>
                        </Col>
                        <Col xs={12} sm={12} md={6}>
                            <Select
                                placeholder="Select Project"
                                onChange={this.handleProjectChange}
                                options={projectsOptions}
                                backspaceDelete={false}
                                clearable={true}
                                dropdownHandle={false}
                                disabled={this.state.isUser}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} sm={6} md={6}>
                            <Form.Group className="mt-3">
                                <FormLabel>Start Date</FormLabel>
                                <FormControl
                                    type="date"
                                    value={localStartDate}
                                    onChange={this.handleStartDateChange}
                                    name="date"
                                    max={this.endLimit}
                                />
                            </Form.Group>
                        </Col>
                        <Col xs={12} sm={6} md={6}>
                            <Form.Group className="mt-3">
                                <FormLabel>End Date</FormLabel>
                                <FormControl
                                    type="date"
                                    value={localEndDate}
                                    onChange={this.handleEndDateChange}
                                    name="date"
                                    min={this.startLimit}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} sm={12} md={12}>
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
                        </Col>
                    </Row>
                    <div className="d-flex justify-content-end">
                        <div>
                            <button
                                type="button"
                                className="button mt-3"
                                onClick={this.generateReport}
                            >
                                Generate Report
                            </button>
                        </div>
                    </div>
                </Form>
            </div>
        );

        if (this.state.showProjectWarning) {
            return (
                <div>
                    {reportOptions}
                    <h2>Please select a project...</h2>
                </div>
            );
        }

        if (this.state.showReport && this.state.isUser) {
            return (
                <div>
                    {reportOptions}
                    <div className="d-flex justify-content-center">
                        <Card className="mt-3 report-card">
                            <div id="report">
                                <UserEntriesReport
                                    entries={this.state.entries}
                                    user={this.state.user}
                                    startDate={this.state.startDate}
                                    endDate={this.state.endDate}
                                    selectedTags={this.state.selectedTags}
                                />
                            </div>
                        </Card>
                    </div>
                    <div className="d-flex justify-content-end">
                        <div>
                            <button
                                type="button"
                                className="button mt-3"
                                onClick={this.generateDOCX}
                            >
                                Create Word Document
                            </button>
                        </div>
                    </div>
                </div>
            );
        }

        if (this.state.showReport && !this.state.isUser) {
            var entries = this.state.entries.map((entry) => (
                <h1 key={entry.Id}>
                    {entry.Title} -{" "}
                    {new DateTime.fromISO(entry.EntryDate).toLocaleString(
                        DateTime.DATETIME_FULL
                    )}
                </h1>
            ));
            return (
                <div>
                    {reportOptions}
                    <div className="d-flex justify-content-center">
                        <Card className="mt-3 report-card">
                            <div id="report">
                                <ProjectEntriesReport
                                    entries={this.state.entries}
                                    project={this.state.project}
                                    startDate={this.state.startDate}
                                    endDate={this.state.endDate}
                                    selectedTags={this.state.selectedTags}
                                />
                            </div>
                        </Card>
                    </div>
                    <div className="d-flex justify-content-end">
                        <div>
                            <button
                                type="button"
                                className="button mt-3"
                                onClick={this.generateDOCX}
                            >
                                Create Word Document
                            </button>
                        </div>
                    </div>
                </div>
            );
        }

        return <div>{reportOptions}</div>;
    }
}

export default withAuth0(Reports);
