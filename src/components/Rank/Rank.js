import React from 'react';

const Rank = ({ name, entries, rank }) => {
	return (
		<div>
			<div>
				<div className='white f3'>
					{`${name}, your current rank is...`}
				</div>
				<div className='white f1'>
					{rank}
				</div>
				<div className='white f5'>
					{`Entries count: ${entries}`}
				</div>
			</div>
		</div>
	);
}

export default Rank;