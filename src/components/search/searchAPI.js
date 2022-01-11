export function fetchSearchAutoComplete(term = '') {
  return fetch(
    `https://cors-anywhere.herokuapp.com/https://api.deezer.com/search?q=artist:"${term}"`
  );
}

export function fetchTracks(id) {
  return fetch(
    `https://cors-anywhere.herokuapp.com/https://api.deezer.com/album/${id}`
  );
}
