import React, { useEffect, useState } from "react";
import { getFavorites, removeFavorite } from "../utils/favorites";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header"; // если есть компонент шапки

function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setFavorites(getFavorites());
  }, []);

  const handleRemove = (id) => {
    removeFavorite(id);
    setFavorites(getFavorites());
  };

  if (favorites.length === 0) {
    return (
      <div>
        {/* <Header />  // если хочешь шапку и тут */}
        <div style={{ textAlign: "center", marginTop: 40 }}>
          Нет избранных фотографий 😢
          <br />
          <button
            style={{
              marginTop: 20,
              padding: "10px 20px",
              borderRadius: 8,
              cursor: "pointer",
              fontSize: 16,
            }}
            onClick={() => navigate("/")}
          >
            На главную
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* <Header /> */}
      <h2
        className="fw-bold text-center my-4"
        style={{ textAlign: "center", margin: 24 }}
      >
        Избранное
      </h2>
      <div className="photo-grid">
        {favorites.map((photo) => (
          <div
            key={photo.id}
            style={{
              display: "inline-block",
              margin: 12,
              verticalAlign: "top",
              textAlign: "center",
            }}
          >
            <Link to={`/photo/${photo.id}`}>
              <img
                src={photo.urls.small}
                alt={photo.alt_description}
                style={{
                  width: 300,
                  height: 200,
                  objectFit: "cover",
                  borderRadius: 12,
                  boxShadow: "0 2px 10px #0001",
                  cursor: "pointer",
                }}
              />
            </Link>
            <button
              style={{
                marginTop: 8,
                width: "50%",
                padding: "8px",
                borderRadius: 8,
                fontSize: 15,
                cursor: "pointer",
                background: "#ececec",
                border: "1px solid #ddd",
              }}
              onClick={() => handleRemove(photo.id)}
            >
              Удалить из избранного
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Favorites;
