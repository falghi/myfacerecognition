import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './ImageLinkForm.css';

class ImageLinkForm extends Component {

	componentDidMount = () => {
  	$(function () {
		  $('[data-toggle="tooltip"]').tooltip();
		});
  }

	render() {
		const { onInputChange, PictureSubmit, pictureSubmitFail } = this.props;

		return (
			<div>
				<p className='f3 pt4'>
					{'MyFaceRecognition will detect faces in your pictures. Give it a try.'}
				</p>
				<div className='center'>
					<div className='form center pa4 br3 shadow-5'>
						<input
							className='f4 pa2 w-70 center' type='text'
							onChange={onInputChange}
							data-toggle="tooltip" data-placement="top"
				      title="Insert image URL here"
						/>
						<button className='w-30 grow f4 link ph3 pv2 dib white bg-blue' onClick={PictureSubmit}>Detect</button>
					</div>
				</div>
				{
	      	pictureSubmitFail ?
		      	<pre className="alert alert-danger dib mt2">
				    	Invalid image URL
				    </pre>
					:
						<pre></pre>
	      }
			</div>
		);
	}
}

export default ImageLinkForm;