import React, { Component } from 'react'
import { Form, Button, Label, Segment } from 'semantic-ui-react'

export default class NewPostForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      description: '',
      comment: ''
    }
  }

  handleChange = (event) => {
    // console.log(event.target.name);
    // console.log(event.target.value);

    // const state = this.state
    // state[event.target.name] = event.target.value
    // this.setState(state)

    // you can do the above using ES6 computed properties syntax
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    // call a method passed down from the parent
    // to make state data from this component available
    // in the parent component (DogContainer)
    // THIS IS CALLED LIFTING UP STATE 
    this.props.createPost(this.state)
    // clear the form
    this.setState({
      description: '',
      comment: '',
      user: ''
    })

  }

  render() {
    return (
      <Segment>
        <h4>New Post:</h4>
        <Form onSubmit={this.handleSubmit} >
          <Label>Description:</Label>
          <Form.Input 
            type="text"
            name="description"
            value={this.state.description}
            placeholder="What's on your mind?"
            onChange={this.handleChange}  
          />
          <Label>Comment:</Label>
          <Form.Input 
            type="text"
            name="comment"
            value={this.state.comment}  
            placeholder="Comment Here"
            onChange={this.handleChange}
          />
          <Button type="Submit">Post</Button>
        </Form>
      </Segment>
    )
  }
}