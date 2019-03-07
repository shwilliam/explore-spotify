import React from 'react'
import { searchTracks } from '../assets/utils/spotify'

import { withSearchContext } from '../context/search'

class SearchForm extends React.PureComponent {
  state = {
    inputQuery: '',
    loading: false
  }

  handleInput = (event) => {
    const { loading } = this.state
    if (loading) return

    this.setState({ inputQuery: event.target.value })
  }

  handleSubmit = (event) => {
    const { searchContext } = this.props
    const { inputQuery, loading } = this.state

    event.preventDefault()

    if (loading) return

    this.setState({ loading: true })

    if (!inputQuery || !inputQuery.trim().length) return

    function formatQuery (query) {
      return query.split(' ')
        .map(word => word.trim())
        .filter(word => Boolean(word.length))
        .join('+')
    }

    searchTracks(formatQuery(inputQuery))
      .then(res => res.json())
      .then((data) => {
        this.setState({ loading: false })
        if (!data.tracks) {
          alert('Token expired. Please refresh the page.') // eslint-disable-line
        } else if (!data.tracks.items.length) {
          alert('No songs matched your search. Please try again.'); // eslint-disable-line
        } else {
          searchContext.updateSearchResults(data.tracks.items)
        }
      })
      .catch((error) => {
        console.error(error); // eslint-disable-line
      })
  }

  render () {
    const { inputQuery, loading } = this.state
    const { handleSubmit, handleInput } = this

    return (
      <form onSubmit={handleSubmit} className={loading ? 'loading' : ''}>
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
    )
  }
}

export default withSearchContext(SearchForm)
