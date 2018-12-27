import React from 'react';

import { initSpotifyAPI } from './assets/helpers/spotify-helpers';
import GraphView from './components/GraphView';
import SearchView from './components/SearchView';

// TODO: make responsive
const { innerWidth, innerHeight } = window;

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      searchResults: null,
      accessToken: initSpotifyAPI(),
    };
    this.resetView = this.resetView.bind(this);
  }

  resetView() {
    this.setState({ searchResults: null });
  }

  render() {
    const { accessToken, searchResults } = this.state;
    if (!accessToken) {
      return (<div className="spinner" />);
    }
    return (
      !searchResults
        ? <SearchView onSearch={state => this.setState(state)} />
        : (
          <GraphView
            nodes={searchResults}
            width={innerWidth}
            height={innerHeight}
            reset={this.resetView}
          />
        )
    );
  }
}

export default App;
