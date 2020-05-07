import React, { Component } from 'react'
import { Form, Button, Label, Segment, Modal, Header } from 'semantic-ui-react'
import '../index.css'

export default class EditPostModal extends Component {
  constructor(props) {
    super(props)

    console.log("props in constructor in EditPostModal");
    console.log(props);

    // WARNING: the ONLY time it's ok to copy props into state
    // is when you are loading data into an edit Modal
    // right when it first renders
    // otherwise NEVER do it

    // it's considered an anti-pattern because you run the risk of
    // overwriting any data that was in the state of the child 
    // and losing the data
    // https://reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html

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

  handleSubmit = (event) => {
    event.preventDefault()
    this.props.updatePost(this.state)
  }

  render() {

    // let's make this modal render with semantic ui!
    // https://react.semantic-ui.com/modules/modal/

    return(
      <Modal open={true} closeIcon={true} onClose={this.props.closeModal}> 
        <Header>
          <h3>Enter new info</h3>
        </Header>
        <Modal.Content>
          <Form onSubmit={this.handleSubmit}>
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
            <Modal.Actions>
              <Button type="Submit">Update Post</Button>
            </Modal.Actions>
          </Form>
        </Modal.Content>
      </Modal>
    )    
  }
}