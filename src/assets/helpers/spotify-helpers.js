import queryString from 'query-string';

let accessToken = null;

function redirectToLogin() {
  window.location.href = 'https://explore-spotify-login.herokuapp.com/login';  // eslint-disable-line
}

// TODO: redirect on expired access token
export function initSpotifyAPI() {
  if (!accessToken) {
    accessToken = queryString.parse(window.location.search).access_token || redirectToLogin(); // eslint-disable-line
  }
  return accessToken;
}

export function searchTracks(query) {
  return fetch( // eslint-disable-line
    `https://api.spotify.com/v1/search?q=${query}&type=track`,
    { headers: { Authorization: `Bearer ${accessToken}` } },
  );
}

export function fetchRecommendations(seed) {
    return fetch( // eslint-disable-line
    `https://api.spotify.com/v1/recommendations?seed_tracks=${seed}&limit=10`,
    { headers: { Authorization: `Bearer ${accessToken}` } },
  );
}

export default { initSpotifyAPI, searchTracks, fetchRecommendations };
