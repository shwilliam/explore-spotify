import React from 'react';
import glamorous from 'glamorous';

import { searchTracks } from '../assets/helpers/spotify-helpers';
import colors from '../assets/styles/colors';

const StyledInput = glamorous.input({
  font: 'sans-serif',
  fontSize: '24px',
  textAlign: 'center',
  width: '100%',
  maxWidth: '280px',
  border: 0,
  padding: '12px 0',
  lineHeight: '28px',
  borderRadius: 0,
  borderBottom: `2px solid ${colors.lightBlue}`,
  background: 'none',
  transition: 'all .15s ease',
  ':hover': {
    backgroundColor: '#989ED4',
  },
  ':focus': {
    background: 'none',
    outline: 'none',
    borderBottom: `2px solid ${colors.blue}`,
  },
});

const FloatingForm = glamorous.form({
  textAlign: 'center',
  height: '80vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

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
      <FloatingForm className="Track-seach" onSubmit={handleSubmit}>
        {/* eslint-disable-next-line */}
        <label htmlFor="query-input">
          <h1 className="hidden">
            {/* read by screen reader */}
            search for a song
          </h1>
          <StyledInput
            name="query-input"
            type="text"
            value={inputQuery}
            onChange={handleInput}
            placeholder="enter a song title"
            autoFocus
          />
          {error && <span className="error top-right">:( please refresh</span>}
          {loading && <span className="loading top-right">loading</span>}
        </label>
      </FloatingForm>
    );
  }
}

export default SearchForm;
