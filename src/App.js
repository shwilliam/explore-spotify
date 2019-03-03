import React from 'react';

import { initSpotifyAPI } from './assets/helpers/spotify-helpers';
import GraphView from './components/GraphView';
import SearchForm from './components/SearchForm';

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
      // TODO: spinner
      return (<div>loading...</div>);
    }
    return (
      <main role="main">
        <header>
          <h1>explore spotify</h1>
          {
            searchResults && (
              <button
                className="pin-top-right"
                onClick={this.resetView}
                type="button"
              >
                reset
              </button>
            )
          }
        </header>
        {
          !searchResults
            ? (
              <SearchForm
                onSearch={state => this.setState(state)}
              />
            )
            : (
              <GraphView
                nodes={searchResults}
              />
            )
          }
      </main>
    );
  }
}

export default App;
