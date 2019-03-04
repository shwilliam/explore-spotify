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
      return (
        <div>
          Redirecting to Spotify login...
        </div>
      );
    }
    return (
      <main role="main">
        <header className="pin-top">
          <h1>explore spotify</h1>
          {
            searchResults ? (
              <button
                className="pink border-left pin-top-right"
                onClick={this.resetView}
                type="button"
              >
                reset
              </button>
            ) : (
              <nav className="pin-top-right">
                <ul>
                  <li>
                    <a href="https://github.com/shwilliam/explore-spotify-graph/blob/master/README.md#contributing" target="_blank" rel="noopener noreferrer">
                      contribute
                    </a>
                  </li>
                  <li>
                    <a href="https://github.com/shwilliam/explore-spotify-graph/issues" target="_blank" rel="noopener noreferrer">
                      issues
                    </a>
                  </li>
                </ul>
              </nav>
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
