import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Clarifai from 'clarifai';
import './App.css';

const app = new Clarifai.App({
  apiKey: '5bcab0356f10424db3014cf7c7dcfb53'
});

const defaultUser = {
  id: '',
  name: '',
  email: '',
  entries: 0,
  joined: null
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: [],
      route: 'signin',
      isSignedIn: false,
      user: defaultUser
    }
  }

  loadUser = (data) => {
    this.setState({
      user: data
    })
  }

  calculateFaceLocation = (data) => {
    const result = data.map((item, index) => {
      const clarifaiFace = item.region_info.bounding_box;
      const image = document.getElementById('inputimage');
      const width = Number(image.width);
      const height = Number(image.height);
      return {
        key: index,
        leftCol: clarifaiFace.left_col * width,
        topRow: clarifaiFace.top_row * height,
        rightCol: width - clarifaiFace.right_col * width,
        bottomRow: height - clarifaiFace.bottom_row * height,
      };
    });
    return result;
  }

  displayFaceBox = (box) => {
    this.setState({ box: box });
  }

  onInputChange = (event) => {
    // console.log('onInputChange');
    this.setState({ input: event.target.value });
  }

  PictureSubmit = () => {
    // console.log('PictureSubmit');
    this.setState({ imageUrl: this.state.input }, async () => {
      try {
        const response = await app.models.predict(
          Clarifai.FACE_DETECT_MODEL,
          this.state.imageUrl);
        
        // Add user entries by one
        fetch('http://localhost:3000/image', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            id: this.state.user.id
          })
        })
        .then(resp => resp.json())
        .then(count => {
          this.setState(Object.assign(this.state.user, { entries: Number(count) }));
        })

        this.displayFaceBox(this.calculateFaceLocation(response.outputs[0].data.regions));
      } catch(err) {
        console.log(err);
      }
    });
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.loadUser(defaultUser);
      this.setState({ isSignedIn: false });
      route = 'signin';
    } else if (route === 'home') {
      this.setState({ isSignedIn: true });
    }
    this.setState({ route: route });
  }

  render() {
    console.log(this.state.user);
    const { isSignedIn, imageUrl, route, box } = this.state;
    return (
      <div className="App">
        <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} />
        {
          route === 'signin' ?
            <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
          :
          route === 'register' ?
            <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
          :
            <div>
              <Logo />
              <Rank
                name={this.state.user.name}
                entries={this.state.user.entries}
              />
              <ImageLinkForm
                onInputChange={this.onInputChange}
                PictureSubmit={this.PictureSubmit}
              />
              <FaceRecognition
                box = {box}
                imageUrl = {imageUrl}
              />
            </div>
        }
      </div>
    );
  }
}

export default App;