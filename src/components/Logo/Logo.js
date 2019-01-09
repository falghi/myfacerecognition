import React, { Component } from 'react';
import Tilt from 'react-tilt';
import $ from 'jquery';
import brain from './brain.png';
import './Logo.css';

class Logo extends Component {
	addSomeStyles = () => {
		const windowRatio = $(window).width() / $(window).height();
		if (windowRatio > 1.06)
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