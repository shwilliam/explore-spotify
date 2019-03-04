import React from 'react';

import { searchTracks } from '../assets/helpers/spotify-helpers';

class SearchForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      inputQuery: '',
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

    if (!inputQuery || !inputQuery.trim().length) return;

    function formatQuery(query) {
      return query.split(' ')
        .map(word => word.trim())
        .filter(word => Boolean(word.length))
        .join('+');
    }

    searchTracks(formatQuery(inputQuery))
      .then(res => res.json())
      .then(data => (
        data.tracks
          ? onSearch({ searchResults: data.tracks.items })
          : alert('Token expired. Please refresh the page.')
      ))
      .catch((error) => {
        console.error(error); // eslint-disable-line
      });
  }

  render() {
    const { inputQuery } = this.state;
    const { handleSubmit, handleInput } = this;

    return (
      <form className="Track-seach" onSubmit={handleSubmit}>
        <label htmlFor="query-input">
          <span className="sr-only">
            Search for a song
          </span>
          <input
            name="query-input"
            type="search"
            value={inputQuery}
            onChange={handleInput}
            placeholder="Search"
          />
          <button aria-label="Search" title="Search" type="submit">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="var(--blue)" strokeWidth="2" strokeLinecap="butt" strokeLinejoin="arcs">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>
        </label>
      </form>
    );
  }
}

export default SearchForm;
