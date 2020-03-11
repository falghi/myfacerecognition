import React from 'react';

const Rank = ({ name, entries, rank }) => {
	return (
		<div className="your-rank-is">
			<div>
				<div className='white f3'>
					{`${name}, your current rank is...`}
				</div>
				<div className='white f1'>
					{rank}
				</div>
				<div className='white f5'>
					{`Total Submission: ${entries}`}
				</div>
			</div>
		</div>
	);
}

export default Rank;