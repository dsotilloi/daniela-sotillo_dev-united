import React from 'react';

import './loading.css';

function Loading() {
	return (
		<>
			<div className='wrapper'>
				<div className='border'>
					<div className='space'>
						<div className='loading'>
						</div>
					</div>
				</div>
				<p>Loading...</p>
			</div>
		</>
	)
}

export default Loading;
