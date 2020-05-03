import React, { Component } from 'react'

// you will see (Default) export written here often instead of at the bottom 
export default class PostContainer extends Component {

	constructor(props) {
		super(props)

		this.state = {
			dogs: []
		}
	}

	componentDidMount() {
		// get the posts when this component is first rendered
		this.getPosts()
	}

	getPosts = async () => {
		try {
			// load posts from the post index route in our API
			// be sure to add a / to the of this url 
			// Flask/Flask - Cors expects this!!!
			const url = process.env.REACT_APP_API_URL + " /api/v1/posts/"
			console.log("about to fetch data from:");
			console.log(url);
			const postResponse = await fetch(url)
			console.log("here is the Response from the fetch call:");
			console.log(postResponse);
			const postsJson = await postResponse.json()
			console.log("here is the data we got in getPosts in PostContainer")
			console.log(postsJson);
		} catch(err) {
			console.error("Error getting dog data", err)
		}
	}

	render() {
		return(
			<h2>Post Container</h2>
		)
	}
}