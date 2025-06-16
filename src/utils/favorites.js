// utils/favorites.js
const FAVORITES_KEY = "favorites";

export function getFavorites() {
  const fav = localStorage.getItem(FAVORITES_KEY);
  return fav ? JSON.parse(fav) : [];
}

export function addFavorite(photo) {
  const favs = getFavorites();
  if (!favs.find((f) => f.id === photo.id)) {
    favs.push(photo);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favs));
  }
}

export function removeFavorite(id) {
  let favs = getFavorites();
  favs = favs.filter((f) => f.id !== id);
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favs));
}

export function isFavorite(id) {
  return getFavorites().some((f) => f.id === id);
}
