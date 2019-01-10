import React, { Component } from 'react';
import './Leaderboard.css';

class Leaderboard extends Component {
	constructor() {
		super();
		this.state = { playerList: [] };

		window.addEventListener('resize', () => {
			this.setState(this.state);
		});
		this.updateData();
	}

	addSomeStyles = () => {
		const windowRatio = window.innerWidth / window.innerHeight;
		if (windowRatio > 1.68)
			return { position: 'fixed', textAlign: 'right' };
		else
			return { position: 'static', textAlign: 'center' };
	}

	updateData = async () => {
		// console.log("updateData()");
		try {
			const resp = await fetch(process.env.REACT_APP_API_URL + '/leaderboard', {
	  		method: 'post',
	  		headers: {'Content-Type': 'application/json'}
	  	});
			const data = await resp.json();
			data.sort((a, b) => b.entries - a.entries);
			const players = data.slice(0, 10);
			this.setState({ playerList: players }, () => {
				setTimeout(this.updateData, 1000);
			});

		} catch(err) {
			setTimeout(this.updateData, 3000);
		}
	}

	getData = () => {
		return this.state.playerList.map( ({ name, entries }, id) => {
			return (
				<tr>
		      <td className='pv2 ph3 tc'>{id + 1}</td>
		      <td className='pv2 ph3 tl'>{name}</td>
		      <td className='pv2 ph3 tc'>{entries}</td>
		    </tr>
			);
		})
	}

	render() {
		return (
			<div style={this.addSomeStyles()} className='w-100'>
				<table className='b--black-10 dib mh4' border='1'>
				  <thead>
				    <tr>
				      <th className='pv2 ph3 tc'>RANK</th>
				      <th className='pv2 ph3 tc'>NAME</th>
				      <th className='pv2 ph3 tc'>TOTAL SUBMISSION</th>
				    </tr>
				  </thead>
				  <tbody>
				  	{this.getData()}
				  </tbody>
				</table>
			</div>
		);
	}
}

export default Leaderboard;