import React, { Component } from 'react'
import { Form, Button, Label, Segment } from 'semantic-ui-react'

export default class EditPostModal extends Component {
	constructor(props) {
    super(props)

    console.log("props in constructor in EditPostModal")
    console.log(props)

    this.state = {
      description: props.postToEdit.description,
      comment: props.postToEdit.comment
    }
  }

  handleChange = (event) => {
  	this.setState({
  		[event.target.name]: event.target.value
  	})
  }

  render() {
    return(
      <Segment> 
        <h3>Enter new info</h3>
        <Form>
          <Form.Input 
            type="text"
            name="description"
            value={this.state.description}
            placeholder="What's on your mind?"
            onChange={this.handleChange}
          />
          <Label>Breed:</Label>
          <Form.Input 
            type="text"
            name="comment"
            value={this.state.comment}  
            placeholder="Comment Here"
            onChange={this.handleChange}
          />
          <Button type="Submit">Update Post</Button>
        </Form>
      </Segment>
    )    
  }
} 