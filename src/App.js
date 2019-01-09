import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import './App.css';

const initialState = {
  input: '',
  imageUrl: '',
  box: [],
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: null
  },
  userRank: ''
};

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  loadUser = async (data) => {
    this.setState({
      user: data,
      userRank: await this.getUserRank(data.entries)
    })
  }

  getUserRank = async (entries) => {
    const resp = await fetch(process.env.REACT_APP_API_URL + '/rank', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        entries: entries
      })
    });

    const data = await resp.json();
    return data.rank;
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
        const resp = await fetch(process.env.REACT_APP_API_URL + '/image', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            id: this.state.user.id,
            imageUrl: this.state.imageUrl
          })
        });
        
        if (resp.status === 400)
          throw new Error('error');

        const data = await resp.json();
        this.setState({
          user: Object.assign(this.state.user, { entries: data.count }),
          userRank: await this.getUserRank(data.count)
        });
        this.displayFaceBox(this.calculateFaceLocation(data.clarifai.outputs[0].data.regions));

      } catch(err) {
        alert('Error submitting picture');
      }
    });
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState(initialState);
      route = 'signin';
    } else if (route === 'home') {
      this.setState({ isSignedIn: true });
    }
    this.setState({ route: route });
  }

  render() {
    // console.log(this.state.user);
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
                rank={this.state.userRank}
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