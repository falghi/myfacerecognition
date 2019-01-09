import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

class Signin extends Component {
	constructor(props) {
    super(props);
    this.state = {
    	signInEmail: '',
    	signInPassword: '',
    	isFailed: false
    }
  }

  onEmailChange = (event) => {
  	this.setState({ signInEmail: event.target.value });
  }

  onPasswordChange = (event) => {
  	this.setState({ signInPassword: event.target.value });
  }

  onSubmitSignIn = () => {
  	const { loadUser, onRouteChange } = this.props;
  	
  	fetch(process.env.REACT_APP_API_URL + '/signin', {
  		method: 'post',
  		headers: {'Content-Type': 'application/json'},
  		body: JSON.stringify({
  			email: this.state.signInEmail,
  			password: this.state.signInPassword
  		})
  	})
  	.then(resp => resp.json())
  	.then(data => {
  		if (data !== 'failed') {
  			loadUser(data);
  			onRouteChange('home');
  		}
  		else
  			this.setState({ isFailed: true });
  	});
  }

  render() {
  	const { onRouteChange } = this.props;

  	return (
			<article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
				<main className="pa4 black-80">
				  <div className="measure">
				    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
				      <legend className="f3 fw6 ph0 mh0">Sign In</legend>
				      <div className="mt3">
				        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
				        <input
				        	onChange={this.onEmailChange}
				        	className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
				        	type="email" name="email-address" id="email-address"
				        />
				      </div>
				      <div className="mv3">
				        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
				        <input
				        	onChange={this.onPasswordChange}
					        className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
					        type="password" name="password" id="password"
				        />
				      </div>
				      {
				      	this.state.isFailed ?
					      	<pre className="alert alert-danger">
	  					    	Wrong Email/Password
	  					    </pre>
	  						:
	  							<pre></pre>
				      }
				    </fieldset>
				    <div className="">
				      <input
				      	onClick={this.onSubmitSignIn}
				      	className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
				      	type="submit"
				      	value="Sign in"
				      />
				    </div>
				    <div className="lh-copy mt3">
				      <p
				      	onClick={() => onRouteChange('register')}
				      	className="f6 link dim black db pointer"
				      >Register</p>
				    </div>
				  </div>
				</main>
			</article>
		);
	}
}

export default Signin;