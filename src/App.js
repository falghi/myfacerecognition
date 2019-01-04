import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import './App.css';

const app = new Clarifai.App({
  apiKey: '5bcab0356f10424db3014cf7c7dcfb53'
});

const particlesOptions = {
  particles: {
    number: {
      value: 50,
      density: {
        enable: true,
        value_area: 400
      }
    }
  }
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
    }
  }

  calculateFaceLocation = (data) => {
    data.forEach(item => {
      const clarifaiFace = item.region_info.bounding_box;
      console.log(clarifaiFace);
      const image = document.getElementById('inputimage');
      const width = Number(image.width);
      const height = Number(image.height);
      return {
        leftCol: clarifaiFace.left_col * width,
        topRow: clarifaiFace.top_row * height,
        rightCol: width - clarifaiFace.rightCol * width,
        bottomRow: height - clarifaiFace.bottomRow * height,
      }
    });
  }

  onInputChange = (event) => {
    console.log('onInputChange');
    this.setState({ input: event.target.value });
  }

  onButtonSubmit = () => {
    console.log('onButtonSubmit');
    this.setState({ imageUrl: this.state.input }, async () => {
      try {
        const response = await app.models.predict(
          Clarifai.FACE_DETECT_MODEL,
          this.state.imageUrl);
        this.calculateFaceLocation(response.outputs[0].data.regions);
      } catch(err) {
        console.log(err);
      }
    });
  }

  render() {
    return (
      <div className="App">
        <Particles
          className='particles'
          params={particlesOptions}
        />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm
          onInputChange={this.onInputChange}
          onButtonSubmit={this.onButtonSubmit}
        />
        <FaceRecognition
          imageUrl = {this.state.imageUrl}
        />
      </div>
    );
  }
}

export default App;
