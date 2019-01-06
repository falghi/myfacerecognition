import React from 'react';

const Navigation = ({ onRouteChange, isSignedIn }) => {
	return (
		<div>
			{
				isSignedIn ?
					<nav style={{display: 'flex', justifyContent: 'flex-end'}}>
						<p onClick={() => onRouteChange('signout')} className='f4 link dim black underline pa3 pointer'>
							Sign Out
						</p>
					</nav>
				:
					<nav style={{display: 'flex', justifyContent: 'flex-end'}}>
						<p onClick={() => onRouteChange('signin')} className='f4 link dim black underline pa3 pointer'>
							Sign In
						</p>
						<p onClick={() => onRouteChange('register')} className='f4 link dim black underline pa3 pointer'>
							Register
						</p>
					</nav>
			}
		</div>
	);
}

export default Navigation;