const ACCESS_KEY = "AopjptjhOik7tIhrxUYG2zNgig_Fr53cF-9H4EkZ_HY";

const API_URL = "https://api.unsplash.com";

export async function getRandomPhotos(count = 9) {
  const response = await fetch(
    `${API_URL}/photos/random?count=${count}&client_id=${ACCESS_KEY}`
  );
  if (!response.ok) throw new Error("Не удалось получить фотографии");
  return await response.json();
}

export async function searchPhotos(query, count = 9) {
  const response = await fetch(
    `${API_URL}/search/photos?query=${encodeURIComponent(
      query
    )}&per_page=${count}&client_id=${ACCESS_KEY}`
  );
  if (!response.ok) throw new Error("Не удалось выполнить поиск");
  const data = await response.json();
  return data.results;
}

export async function getPhotoById(id) {
  const response = await fetch(
    `${API_URL}/photos/${id}?client_id=${ACCESS_KEY}`
  );
  if (!response.ok) throw new Error("Не удалось получить фото");
  return await response.json();
}
