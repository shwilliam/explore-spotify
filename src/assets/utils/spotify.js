let accessToken = null

export function updateAccessToken (token) {
  accessToken = token
  return token
}

export function redirectToLogin () {
  window.location.href = 'https://explore-spotify-login.herokuapp.com/login'
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

export default { updateAccessToken, redirectToLogin, searchTracks, fetchRecommendations }
