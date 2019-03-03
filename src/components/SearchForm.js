import React from 'react';

import { searchTracks } from '../assets/helpers/spotify-helpers';

class SearchForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      inputQuery: '',
      error: null,
      loading: false,
    };

    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInput(event) {
    this.setState({ inputQuery: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();

    const { onSearch } = this.props;
    const { inputQuery } = this.state;

    function formatQuery(query) {
      return query.split(' ')
        .map(word => word.trim())
        .filter(word => Boolean(word.length))
        .join('+');
    }

    this.setState({ loading: true }, () => {
      searchTracks(formatQuery(inputQuery))
        .then(res => res.json())
        .then(({ tracks }) => {
          this.setState({ loading: false }, () => {
            onSearch({ searchResults: tracks.items });
          });
        })
        .catch((error) => {
          this.setState({ error });
          console.error(error);  // eslint-disable-line
        });
    });
  }

  render() {
    const { inputQuery, error, loading } = this.state;
    const { handleSubmit, handleInput } = this;

    return (
      <form className="Track-seach" onSubmit={handleSubmit}>
        {/* eslint-disable-next-line */}
        <label htmlFor="query-input">
          <span className="sr-only">
            Search for a song
          </span>
          <input
            name="query-input"
            type="text"
            value={inputQuery}
            onChange={handleInput}
            placeholder="Search"
            autoFocus
          />
          {error && <span>Something went wrong. Please refresh the page.</span>}
          {loading && <span>Loading...</span>}
        </label>
      </form>
    );
  }
}

export default SearchForm;
