import React from 'react'

import TopHeader from '../components/TopHeader'
import Navigation from '../components/Navigation'
import SearchForm from '../components/SearchForm'

const SearchView = () => (
  <main role="main">
    <TopHeader>
      <Navigation/>
    </TopHeader>
    <SearchForm/>
  </main>
)

export default SearchView
