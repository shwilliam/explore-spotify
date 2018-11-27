import React from 'react';

import TrackSearch from './components/TrackSearch.jsx';
import NodeGraph from './components/NodeGraph.jsx';

import { initSpotifyAPI } from './assets/helpers/spotify-helpers';

// TODO: make responsive
const { innerWidth, innerHeight } = window;  // eslint-disable-line

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      searchResults: null,
    };
  }

  componentDidMount() {
    initSpotifyAPI();
  }

  render() {
    const { searchResults } = this.state;

    return (
      !searchResults
        ? <TrackSearch onSearch={data => this.setState(data)} />
        : (
          <NodeGraph
            nodes={searchResults}
            width={innerWidth}
            height={innerHeight}
          />
        )
    );
  }
}

export default App;
