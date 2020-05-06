import React, { Component } from 'react';
import './App.css';
import PostContainer from './PostContainer'
import LoginRegisterForm from './LoginRegisterForm'
import Header from './Header'



export default class App extends Component {

	constructor() {
		super()

		this.state = {
			loggedIn: false, 
			loggedInUserEmail: ''
		}
	}



// <-------------------------------------->
// REGISTER API ROUTE 

	register = async (registerInfo) => {
		console.log("register() in App.js called with the following info", registerInfo); 
		const url = process.env.REACT_APP_API_URL + "/api/v1/users/register"

		try {
			const registerResponse = await fetch(url, {
				// now that our back end has sessions and is expecting cookies 
				// INCLUDE THIS crendentials: 'include' in every fetch call
				// it will send your cookie
				// in unit 2 this was being done automatically for you by the browser
				// IF YOU LEAVE IT OUT, YOU WILL NOT BE AUTHENTICATED 
				crendentials: 'include', 
				method: 'POST', 
				body: JSON.stringify(registerInfo), 
				headers: {
					'Content-Type': 'application/json'
				}
			})
			console.log("registerResponse", registerResponse); 
			const registerJson = await registerResponse.json()
			console.log("registerJson", registerJson); 



			if(registerResponse.status === 201) {
				this.setState({
					loggedIn: true, 
					loggedInUserEmail: registerJson.data.email
				})
			}
		}	catch(err) {
			console.error("Error trying to register with API")
			console.error(err)
		}

	}



// <-------------------------------------->
// LOGIN API ROUTE 
	login = async (loginInfo) => {
		console.log("login() in App.js called with the following info", loginInfo)
		const url = process.env.REACT_APP_API_URL + '/api/v1/users/login'

		try {
			const loginResponse = await fetch(url, {
				crendentials: 'include', // sends cookie
				method: 'POST', 
				body: JSON.stringify(loginInfo), 
				headers: {
					'Content-Type': 'application/json'
				}
			})

			console.log("loginResponse", loginResponse)
			const loginJson = await loginResponse.json() 
			console.log("loginJson", loginJson); 

			if(loginResponse.status === 200) {
				this.setState({
					loggedIn: true, 
					loggedInUserEmail: loginJson.data.email
				})
			}
		}	catch(error) {
			console.error("Error trying to log in with API")
			console.error(error)
		}

	}



// <-------------------------------------->
// LOGOUT API ROUTE 
	logout = async () => {
		try {
			const url = process.env.REACT_APP_API_URL + "/api/v1/users/logout"

			const logoutResponse = await fetch(url, {
				crendentials: 'include'
			})
			console.log("logoutResponse", logoutResponse)
			const logoutJson = await logoutResponse.json() 
			console.log("logoutJson", logoutJson); 

		if(logoutResponse.status === 200) {
			this.setState({
				loggedIn: false, 
				loggedInUserEmail: ''
			})

		}

	}	catch(error) {
		console.error("Error logging out with API")
		console.error(error)
	}

}

// <-------------------------------------->
// RENDER VIEW 
render() {
	return (
		<div className="App">
		{
			this.state.loggedIn
			?
			<React.Fragment>
				<Header email={this.state.loggedInUserEmail} logout={this.logout} />
				<PostContainer />
			</React.Fragment>
			:
			<LoginRegisterForm
				login={this.login}
				register={this.register}
			/>
		}
		</div>
	); 
}
}

