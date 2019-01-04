import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ box, imageUrl }) => {
	return (
		<div className='center ma'>
			<div className='absolute mt2'>
				<img id='inputimage' alt='' src={imageUrl} width='500px' height='auto' />
				{
					box.map(item => {
						return (
							<div
								className='bounding-box' key={item.key}
								style={{top: item.topRow, right: item.rightCol, bottom: item.bottomRow, left: item.leftCol}}
							></div>
						);
					})
				}
			</div>
		</div>
	);
}

export default FaceRecognition;