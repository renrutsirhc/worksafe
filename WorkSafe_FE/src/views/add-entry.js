import React, { Component } from 'react';

class AddEntry extends Component {
    constructor(props) {
        super(props);
        this.state = {value: ""};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
    }

    render() {
        return (
        <form onSubmit={this.handleSubmit}>
            <label>Entry Title:
                <input type="text" value={this.state.value} onChange={this.handleChange} />
            </label>
            <label>Choose a project:
                <select value={this.state.value} onChange={this.handleChange}>
                    <option value="project1">Project 1</option>
                    <option value="project2">Project 2</option>
                    <option value="project3">Project 3</option>
                </select>
            </label>
            <label>Entry Description:
                <textarea value={this.state.value} onChange={this.handleChange}/>
            </label>
            <label>Learning:
                <textarea value={this.state.value} onChange={this.handleChange}/>
            </label>
            <label>Mind Set:
                <textarea value={this.state.value} onChange={this.handleChange}/>
            </label>
            <label>Impact:
                <textarea value={this.state.value} onChange={this.handleChange}/>
            </label>
            <label>Next Steps:
                <textarea value={this.state.value} onChange={this.handleChange}/>
            </label>
            <label></label>
            <input type="submit" value="Add Entry"/>
        </form>);
      }
}

export default AddEntry;