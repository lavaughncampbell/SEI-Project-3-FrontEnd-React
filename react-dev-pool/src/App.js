import React from 'react';
import './App.css';
import PostContainer from './PostContainer'
import LoginRegisterForm from './LoginRegisterForm'
import Header from './Header'



export default class App extends Component {

	constructor() {
		super()

		this.state = {
			loggedIn: false, 
			loggedInUserEmail: 
		}
	}

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
		}
	}
}

function App() {
	console.log(process.env)
  return (
    <div className="App">
      <PostContainer></PostContainer>
    </div>
  );
}

export default App;
