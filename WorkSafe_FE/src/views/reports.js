import React, { Component } from "react";
import { Document, Packer, Paragraph, TextRun, SectionType, HeadingLevel, AlignmentType, Table, TableRow, TableCell } from "docx";
import { saveAs } from "file-saver";



class Reports extends Component {
    constructor(props) {
        super(props);
        this.generateDOCX = this.generateDOCX.bind(this);
        this.renderElement = this.renderElement.bind(this);
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


    render() {
        return (
            <div>
                <button className="button" onClick={this.generateDOCX}>DOCX Report test</button>
                <div id="report">
                    <h1>H1 Title</h1>
                    <h2>sub-title</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis gravida pharetra nisl eu ullamcorper. Aenean interdum varius felis, sed lacinia magna iaculis at. Sed consequat ante eget imperdiet porttitor. Quisque posuere, elit id blandit aliquam, nisl augue viverra lectus, eget posuere dui leo in sapien. Aliquam ultricies odio a est lacinia imperdiet. Sed eget tellus in risus pulvinar semper. In eu fringilla quam, euismod scelerisque est. Cras nec efficitur purus.</p>
                    <p>Suspendisse pulvinar dignissim fermentum. Ut interdum dui dui, sed pellentesque nisl vestibulum quis. Etiam eget imperdiet ligula. Aliquam turpis tellus, tincidunt eget ex vel, congue tempus orci. Nullam aliquet non turpis in lacinia. Vestibulum lobortis leo eros, sed consectetur dolor sodales ut. Ut et nulla et sapien lacinia molestie vitae volutpat est. Quisque suscipit ex vitae magna tempus, sed faucibus sem tincidunt. Nunc et posuere ante. </p>
                    <p>Quisque lacinia ex ac scelerisque gravida. Vivamus mollis augue eget tellus volutpat ullamcorper. Etiam volutpat arcu vitae urna blandit blandit. Vivamus erat arcu, mattis id nisl eget, accumsan mollis lectus. Cras malesuada erat nec bibendum ullamcorper. Mauris ultrices eleifend purus at vestibulum. Aenean feugiat justo eget lacinia blandit. Nulla ac ipsum eget mauris tincidunt hendrerit. Proin pellentesque finibus massa id bibendum. In ultricies, sapien sed vestibulum facilisis, ipsum est lacinia ligula, et lacinia augue augue at est. Integer interdum nulla sit amet commodo fringilla. Suspendisse potenti. </p>
                    <p>Cras tempor interdum arcu malesuada finibus. Phasellus id felis porttitor, lacinia lorem congue, porttitor sapien. Vestibulum imperdiet nisl a tortor malesuada, dapibus dapibus nulla fringilla. Etiam at ex orci. Pellentesque eu vulputate odio. In hac habitasse platea dictumst. Pellentesque ullamcorper, dolor ac placerat maximus, ipsum diam efficitur justo, sit amet venenatis purus sem id lectus. Curabitur et justo in arcu lacinia consequat. Pellentesque eget leo ornare, blandit odio non, tempor dui. Suspendisse ipsum augue, elementum in pulvinar eget, ullamcorper pellentesque augue. Morbi fermentum metus eget mi mollis, nec venenatis augue sodales. Maecenas pellentesque tortor sit amet laoreet dapibus. Suspendisse augue orci, elementum eget augue vitae, volutpat pretium urna.</p>
                    <p>Pellentesque ac pellentesque enim. Donec tincidunt tortor dolor, eu porttitor urna luctus ultricies. Mauris quis pretium ipsum. Nullam eget mollis mi. Pellentesque laoreet eros nisl, quis commodo ipsum elementum in. Curabitur quam mauris, convallis at bibendum at, maximus et ipsum. Donec dictum, elit eu sollicitudin varius, ex sem mattis urna, hendrerit tristique lectus ex at nisl. Sed a bibendum ante, ut venenatis nulla. Sed faucibus bibendum felis non hendrerit. Proin in neque ac velit pellentesque vulputate ac eu massa. Vestibulum sit amet erat id ante porta tincidunt id non elit. Maecenas ante erat, suscipit in tortor a, suscipit auctor lectus. Aliquam et urna ut turpis hendrerit mollis quis at nulla. Nullam volutpat nec dui non faucibus. </p>
                    <table>
                        <tr>
                            <th>Company</th>
                            <th>Contact</th>
                            <th>Country</th>
                        </tr>
                        <tr>
                            <td>Alfreds Futterkiste</td>
                            <td>Maria Anders</td>
                            <td>Germany</td>
                        </tr>
                        <tr>
                            <td>Centro comercial Moctezuma</td>
                            <td>Francisco Chang</td>
                            <td>Mexico</td>
                        </tr>

                    </table>
                </div>
            </div>
        );
    }
}

export default Reports;