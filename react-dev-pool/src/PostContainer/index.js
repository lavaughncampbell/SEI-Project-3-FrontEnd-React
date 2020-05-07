import React, { Component } from 'react'
import PostList from '../PostList'
import NewPostForm from '../NewPostForm'
import EditPostModal from '../EditPostModal'


// you will see (Default) export written here often instead of at the bottom 
export default class PostContainer extends Component {

	constructor(props) {
		super(props)

		this.state = {
			posts: [],
			idOfPostToEdit: -1
		}
	}

	componentDidMount() {
		// get the posts when this component is first rendered
		this.getPosts()
	}








// <-------------------------------------->
// POST INDEX 

	getPosts = async () => {
		try {
			// load posts from the post index route in our API
			// be sure to add a / to the of this url 
			// Flask/Flask - Cors expects this!!!
			const url = process.env.REACT_APP_API_URL + " /api/v1/posts/"
			console.log("about to fetch data from:");
			console.log(url);
			const postsResponse = await fetch(url, {
				credentials: 'include', 
			})
			console.log("here is the Response from the fetch call:");
			console.log(postsResponse);
			const postsJson = await postsResponse.json()
			console.log("here is the data we got in getPosts in PostContainer")
			console.log(postsJson);

			this.setState({
				posts: postsJson.data
			})


		} catch(err) {
			console.error("Error getting post data", err)
		}
	}








// <-------------------------------------->
// DELETE POSTS 
	
	deletePost = async (idOfPostToDelete) => {
		const url = process.env.REACT_APP_API_URL + "/api/v1/posts/" + idOfPostToDelete

		try {
			const deletePostResponse = await fetch(url, {
				credentials: 'include', 
				method: 'DELETE'
			})

			console.log("deleteDogResponse", deletePostResponse)
			const deletePostJson = await deletePostResponse.json()
			console.log("deletePostJson", deletePostJson)

			if(deletePostResponse.status == 200) {
				this.setState({
					posts: this.state.posts.filter(post => post.id != idOfPostToDelete)
				})
			}
		} catch(err) {
			console.error("Error deleting post")
			console.error(err) 
		}


	}





// <-------------------------------------->
// CREATE  POSTS 
	
	createPost = async (postToAdd) => {
		console.log("here is the post you are trying to add")
		console.log(postToAdd) // this is an object 


		try {
			// make a fetch call to Flask API: 
			const url = process.env.REACT_APP_API_URL + "/api/v1/posts/"
			const createPostResponse = await fetch(url, {
				credentials: 'include', 
				// method will be post
				method: 'POST',
				// we need to specify the content type is json 
				headers: {
					'Content-Type': 'application/json'
				}, 
				// should contain a body: this will be passed in 
				// we will this method down to NewPostForm 
				// as props and call it in there and pass in the state 
				// of the new post form 
				body: JSON.stringify(postToAdd) 
			})
			console.log("createPostResponse", createPostResponse)
			const createPostJson = await createPostResponse.json()
			console.log("here is what we got back after trying to add a post")
			console.log(createPostJson)

			if(createPostResponse.status === 201) {
				this.setState({
					// ... that means this.state.posts is "all the posts that are"
					posts: [...this.state.posts, createPostJson.data]
				})
			} // if the status is 201 
		} catch(err) {
			console.error("Error adding post")
			console.error(err)
		} // catch 
	} // create post 




// <-------------------------------------->
// EDIT POSTS 

	editPost = (idOfPostToEdit) => {
		console.log("you are trying to edit post with id: ", idOfPostToEdit)
		// put the id of the post we want to edit in state 
		// to conditionally render a modal 
		this.setState({
			idOfPostToEdit: idOfPostToEdit
		})
	} 



// <-------------------------------------->
// EDIT POSTS / MODAL 

	updatePost = async (updatedPostInfo) => {
    // db query to update dog
    const url = process.env.REACT_APP_API_URL + "/api/v1/posts/" + this.state.idOfPostToEdit

    try {
      const updatePostResponse = await fetch(url, {
      	credentials: 'include', 
        method: 'PUT',
        body: JSON.stringify(updatedPostInfo), 
        headers: {
          'Content-Type': 'application/json'
        }
      })
      console.log("updatePostResponse", updatePostResponse)
      const updatePostJson = await updatePostResponse.json()
      console.log("updatePostJson", updatePostJson);

      // this.setState({idOfPostToEdit: -1})
      // this.getPosts()

      // new stuff 
      if(updatePostResponse.status == 200) {
      	const posts = this.state.posts
      	const indexOfPostBeingUpdated = posts.findIndex(post => post.id == this.state.idOfPostToEdit)
      	console.log("WHY IS IT NOT UPDATING ON THE SCREEN")
      	console.log(indexOfPostBeingUpdated)
      	posts[indexOfPostBeingUpdated] = updatePostJson.data
      	this.setState({
      		posts: posts, 
      		idOfPostToEdit: -1 // close the model 
      	})
      }

    } catch(err) {
      console.error("Error updating post info")
      console.error(err)
    }

    // then replace the dog at the currently selected id in state
    // with this updatedDogInfo

  }

  closeModal = () => {
  	this.setState({
  		idOfPostToEdit: -1
  	})
  }




// <-------------------------------------->
// RENDER / RETURN VIEW  

	render() {
		console.log("here is this.state in render() in PostContainer")
		console.log(this.state)
		return(
			<React.Fragment> 
				<h2>Post Container</h2>
				<NewPostForm createPost={this.createPost} />
				<PostList
					posts={this.state.posts}
					deletePost={this.deletePost}
					editPost={this.editPost}
				/>
				{
					this.state.idOfPostToEdit !== -1
					&&
					<EditPostModal
						key={this.state.idOfPostToEdit}
						postToEdit={this.state.posts.find((post) => post.id === this.state.idOfPostToEdit)}
						updatePost={this.updatePost}
						closeModal={this.closeModal}
					/>
				}
			</React.Fragment>
		)
	}
}



