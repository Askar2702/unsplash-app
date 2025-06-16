import React, { useState, useEffect } from "react";
import { getRandomPhotos, searchPhotos } from "../api/unsplash";
import { Link } from "react-router-dom";

function Home() {
  const [photos, setPhotos] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getRandomPhotos()
      .then(setPhotos)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      setLoading(true);
      searchPhotos(query)
        .then(setPhotos)
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  };

  return (
    <div>
      {/* Фон поиска строго на всю ширину экрана */}
      <div
        style={{
          background: "url('/van-gogh.jpg') center/cover no-repeat",
          padding: "100px 50px",
        }}
      >
        <form
          onSubmit={handleSearch}
          className="mx-auto bg-white rounded-3 shadow d-flex align-items-center w-100 px-2 px-sm-3 px-md-4"
          style={{
            maxWidth: 500,
            padding: "12px 0",
          }}
        >
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Поиск"
            className="form-control border-0"
            style={{
              background: "transparent",
              fontSize: 18,
              boxShadow: "none",
            }}
          />
          <button
            type="submit"
            className="btn btn-light ms-2 d-flex align-items-center justify-content-center"
            style={{
              minWidth: 48,
              minHeight: 48,
              fontSize: 22,
              padding: 0,
            }}
          >
            <i className="bi bi-search" style={{ color: "#222" }}></i>
          </button>
        </form>
      </div>

      {loading && <div className="text-center my-5">Загрузка...</div>}
      {!loading && photos.length === 0 && (
        <div className="text-center my-5">Ничего не найдено 😢</div>
      )}

      <div className="container mt-4">
        <div className="row g-4">
          {photos.map((photo) => (
            <div className="col-12 col-md-4" key={photo.id}>
              <Link to={`/photo/${photo.id}`}>
                <img
                  src={photo.urls.small}
                  alt={photo.alt_description}
                  className="img-fluid rounded-3 w-100"
                  style={{
                    height: 200,
                    objectFit: "cover",
                  }}
                />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
