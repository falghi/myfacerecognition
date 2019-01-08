import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import 'bootstrap/dist/js/bootstrap.bundle.min';

class Register extends Component {
	constructor(props) {
    super(props);
    this.state = {
    	registerName: '',
    	registerEmail: '',
    	registerPassword: '',
    	isFailed: false,
    	failMessage: ''
    }
  }

  onNameChange = (event) => {
  	this.setState({ registerName: event.target.value });
  }

  onEmailChange = (event) => {
  	this.setState({ registerEmail: event.target.value });
  }

  onPasswordChange = (event) => {
  	this.setState({ registerPassword: event.target.value });
  }

  onSubmitRegister = () => {
  	const { loadUser, onRouteChange } = this.props;

  	let status = -1;
  	fetch('https://dry-cove-17776.herokuapp.com/register', {
  		method: 'post',
  		headers: {'Content-Type': 'application/json'},
  		body: JSON.stringify({
  			name: this.state.registerName,
  			email: this.state.registerEmail,
  			password: this.state.registerPassword
  		})
  	})
  	.then(resp => {
  		status = resp.status;
  		return resp.json();
  	})
  	.then(data => {
  		if (status === 400) {
  			this.setState({
  				isFailed: true,
  				failMessage: data
  			})
  		}
  		else {
  			loadUser(data);
  			onRouteChange('home');
  		}
  	})
  	.catch(err => {
  		alert('Failed register');
  	});
  }

  componentDidMount = () => {
  	$(function () {
		  $('[data-toggle="tooltip"]').tooltip();
		});
  }

  render() {
  	return (
			<article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
				<main className="pa4 black-80">
				  <div className="measure">
				    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
				      <legend className="f3 fw6 ph0 mh0">Register</legend>
				      <div className="mt3">
				        <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
				        <input
				        	data-toggle="tooltip" data-placement="right"
				      		title="What would you like to be called?"
				        	onChange={this.onNameChange}
				        	className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
				        	type="text" name="name" id="name"
				        />
				      </div>
				      <div className="mt3">
				        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
				        <input
				        	data-toggle="tooltip" data-placement="right"
				      		title="Your email address"
				        	onChange={this.onEmailChange}
				        	className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
				        	type="email" name="email-address" id="email-address"
				        />
				      </div>
				      <div className="mv3">
				        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
				        <input
				      		data-toggle="tooltip" data-placement="right"
				      		title="Password must be between 10 and 30 characters (inclusive)"
				        	onChange={this.onPasswordChange}
				        	className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
				        	type="password" name="password" id="password"
				        />
				      </div>
				      {
				      	this.state.isFailed ?
					      	<pre className="alert alert-danger">
	  					    	{this.state.failMessage}
	  					    </pre>
	  						:
	  							<pre></pre>
				      }
				    </fieldset>
				    <div>
				      <input
				      	onClick={this.onSubmitRegister}
				      	className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
				      	type="submit"
				      	value="Register"
				      />
				    </div>
				  </div>
				</main>
			</article>
		);
  }
}

export default Register;