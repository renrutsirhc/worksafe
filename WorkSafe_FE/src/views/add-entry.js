import React, { Component } from 'react'
import { Button, Form, Alert, FormGroup, FormLabel, FormControl, Row, Col, Container } from 'react-bootstrap'

class AddEntry extends Component {
    constructor(props) {
        super(props)
        this.state = {value: new Date().toISOString}

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event) {
        this.setState({value: event.target.value})
    }

    handleSubmit(event) {
        event.preventDefault()
    }

    render() {
        return (
        <Container>
            <h1>Add New Entry</h1>
            <Form>
                <Row sm={1} md={2}>
                    <Col>
                        <FormGroup>
                            <FormLabel>Title</FormLabel>
                            <FormControl placeholder="Summarise the entry"/>
                        </FormGroup>
                    </Col>

                    <Col md={3}>
                        <FormGroup>
                            <FormLabel>Date</FormLabel>
                            <FormControl type="date" name="date"/>
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <FormLabel>Description</FormLabel>
                        <FormControl as="textarea" placeholder="Decribe the entry"/>
                    </Col>
                </Row>
                <Row>
                    <Col xs={5}>
                        <Form.Label>Upload files</Form.Label>
                        <Form.Control type="file" multiple />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <FormLabel>Learning</FormLabel>
                        <FormControl as="textarea" placeholder="Decribe the learning"/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <FormLabel>Mind set</FormLabel>
                        <FormControl placeholder="Mind set used"/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <FormLabel>Impact</FormLabel>
                        <FormControl as="textarea" placeholder="Impact of entry"/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <FormLabel>Next steps</FormLabel>
                        <FormControl as="textarea" placeholder="Next steps based on this entry"/>
                    </Col>
                </Row>

                <Button variant="success" type="submit">
                        Add entry
                    </Button>


            </Form>
        </Container>
        
        
        )}
}

export default AddEntry