import React, { Component } from 'react';
import Tilt from 'react-tilt';
import brain from './brain.png';
import './Logo.css';

class Logo extends Component {
	constructor() {
		super();
		this.state = {};
		window.addEventListener('resize', () => {
			this.setState(this.state);
		});
	}

	addSomeStyles = () => {
		if (window.innerWidth > 880)
			return { position: 'fixed' };
		else
			return { position: 'static' };
	}

	render() {
		return (
			<div style={this.addSomeStyles()} className='ma4 mt0'>
				<Tilt className="Tilt br2 shadow-2" options={{ max : 55 }} style={{ height: 150, width: 150 }} >
					<div className="Tilt-inner pa3"> <img style={{paddingTop: '5px'}} src={brain} alt='logo' /> </div>
				</Tilt>
			</div>
		);
	}
}

export default Logo;