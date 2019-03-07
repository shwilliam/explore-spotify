import queryString from 'query-string'

let accessToken = null

function redirectToLogin () {
  window.location.href = 'https://explore-spotify-login.herokuapp.com/login'
}

export function initSpotifyAPI () {
  if (!accessToken) {
    accessToken = queryString.parse(window.location.search).access_token || redirectToLogin()
  }
  return accessToken
}

export function searchTracks (query) {
  return fetch(
    `https://api.spotify.com/v1/search?q=${query}&type=track`,
    { headers: { Authorization: `Bearer ${accessToken}` } }
  )
}

export function fetchRecommendations (seed) {
  return fetch(
    `https://api.spotify.com/v1/recommendations?seed_tracks=${seed}&limit=5`,
    { headers: { Authorization: `Bearer ${accessToken}` } }
  )
}

export default { initSpotifyAPI, searchTracks, fetchRecommendations }
