import React, { Component } from "react";
import { Select } from "react-dropdown-select";
import { Document, Packer, Paragraph, TextRun, SectionType, HeadingLevel, AlignmentType, Table, TableRow, TableCell } from "docx";
import { saveAs } from "file-saver";
import { ProjectEntriesReport, UserEntriesReport } from "../reports";
import { withAuth0 } from "@auth0/auth0-react";
import "../styles/report-styles.css";

class Reports extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showReport: false,
      isUser: true,
      entries: [],
      user: props.auth0.user,
      project: {},
      projectsLoaded: false
    };

    this.generateDOCX = this.generateDOCX.bind(this);
    this.renderElement = this.renderElement.bind(this);
    this.generateReport = this.generateReport.bind(this);
    this.setReportType = this.setReportType.bind(this);
    this.handleProjectChange = this.handleProjectChange.bind(this);
  }

  componentDidMount() {
    this.getTags();
    this.getProjects();
    this.getEntries();
  }

  async getTags() {
    const { getAccessTokenSilently } = this.props.auth0;
    var token = await getAccessTokenSilently();
    var options = {
      headers: {
        Authorization: "Bearer " + token
      }
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
        Authorization: "Bearer " + token
      }
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
    const { getAccessTokenSilently } = this.props.auth0;
    var token = await getAccessTokenSilently();
    var options = {
      headers: {
        Authorization: "Bearer " + token
      }
    };
    let response = await fetch("/api/users/" + this.state.user.sub + "/entries", options);
    if (response.ok) {
      let result = await response.json();
      console.log(result);
      this.setState({ entries: result });
      this.setState({ loading: false });
    } else {
      this.handleShowError();
    }
  }

  handleProjectChange(event) {
    this.setState(prevState => {
      let Entry = Object.assign({}, prevState.Entry);
      if (event[0] == undefined) {
        Entry.project = {
          project: {
            Id: "",
            Title: ""
          }
        };
      } else Entry.project = this.getProject(event[0].value);
      return { Entry };
    });
  }

  getProject(id) {
    for (var i = 0; i < this.state.projects.length; i++) {
      if (this.state.projects[i].Id == id) {
        return this.state.projects[i];
      }
    }
    return null;
  }

  renderElement(paragraphs, element) {
    console.log("test");
    //render this element
    switch (element.localName) {
      case "p":
        paragraphs.push(
          new Paragraph({
            text: element.textContent,
            spacing: {
              after: 200
            }
          })
        );
        break;
      case "td":
        paragraphs.push(
          new Paragraph({
            text: element.textContent
          })
        );
        break;
      case "th":
        paragraphs.push(
          new Paragraph({
            text: element.textContent
          })
        );
        break;
      case "h1":
        paragraphs.push(
          new Paragraph({
            text: element.textContent,
            heading: HeadingLevel.HEADING_1,
            spacing: {
              after: 200
            },
            alignment: AlignmentType.CENTER
          })
        );
        break;
      case "h2":
        paragraphs.push(
          new Paragraph({
            text: element.textContent,
            heading: HeadingLevel.HEADING_2,
            spacing: {
              after: 200
            }
          })
        );
        break;
      case "table":
        let tableRows = this.getTableRows(element);
        const table = new Table({
          rows: tableRows
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
          children: rowCells
        })
      );
    }
    return tableRows;
  }

  getRowCells(element) {
    let rowCells = [];
    for (let i = 0; i < element.children.length; i++) {
      let paragraphs = [];
      this.renderElement(paragraphs, element.children[i]);
      rowCells.push(
        new TableCell({
          children: paragraphs
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
            type: SectionType.CONTINUOUS
          },
          children: paragraphs
        }
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
              font: "Calibri",
              size: 24
            },
            paragraph: {
              spacing: {
                line: 276
              },
              indent: {
                left: 720
              }
            }
          },
          {
            id: "Heading1",
            name: "Heading 1",
            basedOn: "Normal",
            next: "Normal",
            quickFormat: true,
            run: {
              size: 52,
              bold: true
            },
            paragraph: {
              spacing: {
                before: 240,
                after: 120
              }
            }
          },
          {
            id: "Heading2",
            name: "Heading 2",
            basedOn: "Normal",
            next: "Normal",
            quickFormat: true,
            run: {
              size: 32,
              bold: true
            },
            paragraph: {
              spacing: {
                before: 240,
                after: 120
              }
            }
          }
        ]
      }
    });

    Packer.toBlob(doc).then(blob => {
      console.log(blob);
      saveAs(blob, "example.docx");
      console.log("Document created successfully");
    });
  }

  generateReport() {
    this.setState({
      showReport: true
    });
  }

  setReportType(event) {
    if (event.target.value == "User") {
      this.setState({
        isUser: true
      });
    } else {
      this.setState({
        isUser: false
      });
    }
  }

  feedProjectsOptions() {
    var options = this.state.projects.map(project => {
      return {
        value: project.Id,
        label: project.Title
      };
    });
    // console.log(options);
    return options;
  }

  render() {
    if (!this.state.projectsLoaded) {
      return <h1>Loading...</h1>;
    }

    const placeHolderOption = "";
    const projectsOptions = this.feedProjectsOptions();

    if (this.state.showReport && this.state.isUser) {
      console.log("Here");
      console.log(this.state.entries);
      console.log("Here");
      return (
        <div>
          <div>
            <div onChange={this.setReportType}>
              <input type="radio" value="User" name="reportType" /> User
              <input type="radio" value="Project" name="reportType" /> Project
            </div>
            <div>
              <Select placeholder={placeHolderOption} onChange={this.handleProjectChange} options={projectsOptions} backspaceDelete={false} clearable={true} dropdownHandle={false} />
            </div>
          </div>

          <button className="button mt-3 mb-4" onClick={this.generateReport}>
            Generate Report
          </button>
          <div id="report">
            <UserEntriesReport entries={this.state.entries} />
          </div>
        </div>
      );
    }

    if (this.state.showReport && !this.state.isUser) {
      return (
        <div>
          <div>
            <div onChange={this.setReportType}>
              <input type="radio" value="User" name="reportType" /> User
              <input type="radio" value="Project" name="reportType" /> Project
            </div>
            <div>
              <Select placeholder={placeHolderOption} onChange={this.handleProjectChange} options={projectsOptions} backspaceDelete={false} clearable={true} dropdownHandle={false} />
            </div>
          </div>

          <button className="button mt-3 mb-4" onClick={this.generateReport}>
            Generate Report
          </button>
          <div id="report">
            <ProjectEntriesReport entries={this.state.entries} />
          </div>
        </div>
      );
    }

    return (
      <div>
        <div>
          <div onChange={this.setReportType}>
            <input type="radio" value="User" name="reportType" /> User
            <input type="radio" value="Project" name="reportType" /> Project
          </div>
          <div>
            <Select placeholder={placeHolderOption} onChange={this.handleProjectChange} options={projectsOptions} backspaceDelete={false} clearable={true} dropdownHandle={false} />
          </div>
        </div>

        <button className="button mt-3 mb-4" onClick={this.generateReport}>
          Generate Report
        </button>
      </div>
    );
  }
}

export default withAuth0(Reports);
