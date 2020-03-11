import React, { Component } from 'react';
import './Leaderboard.css';

class Leaderboard extends Component {
	constructor() {
		super();
		this.state = { playerList: [] };

		window.addEventListener('resize', () => {
			this.setState(this.state);
		});
		this.updateID = null;
		this.updateData();
	}

	addSomeStyles = () => {
		if (window.innerWidth >= 950)
			return { position: 'fixed', textAlign: 'right', zIndex: -1 };
		else
			return { position: 'static' };
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
				this.updateID = setTimeout(this.updateData, 1000);
			});

		} catch(err) {
			this.updateID = setTimeout(this.updateData, 3000);
		}
	}

	getData = () => {
		let lastRank = 1;
		return this.state.playerList.map( ({ name, entries }, id, arr) => {
			return (
				<tr key={id}>
		      <td className='pv2 ph3 tc'>
		      	{lastRank = id > 0 && arr[id].entries === arr[id-1].entries ? lastRank : id + 1}
		      </td>
		      <td className='pv2 ph3 tl'>{name}</td>
		      <td className='pv2 ph3 tc'>{entries}</td>
		    </tr>
			);
		})
	}

	componentWillUnmount() {
		clearTimeout(this.updateID);
	}

	render() {
		return (
			<div style={this.addSomeStyles()} className='w-100'>
				<div className='leaderboard dib tc'>
					<div className='pv1 ph4 f4 b ba dib mb3 b--black-10'>TOP 10</div>
					<table className='b--black-10' border='1'>
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
			</div>
		);
	}
}

export default Leaderboard;