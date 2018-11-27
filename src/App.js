import React from 'react';

import TrackSearch from './components/TrackSearch';
import NodeGraph from './components/NodeGraph';

import { initSpotifyAPI } from './assets/helpers/spotify-helpers';

// TODO: make responsive
const { innerWidth, innerHeight } = window;

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      searchResults: null,
    };
    this.resetView = this.resetView.bind(this);
  }

  componentDidMount() {
    initSpotifyAPI();
  }

  resetView() {
    this.setState({ searchResults: null });
  }

  render() {
    const { searchResults } = this.state;

    return (
      !searchResults
        ? <TrackSearch onSearch={data => this.setState(data)} />
        : (
          <div>
            <button className="reset top-right" onClick={this.resetView} type="button">clear</button>
            <NodeGraph
              nodes={searchResults}
              width={innerWidth}
              height={innerHeight}
            />
          </div>
        )
    );
  }
}

export default App;
