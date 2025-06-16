import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPhotoById } from "../api/unsplash";
import { addFavorite, removeFavorite, isFavorite } from "../utils/favorites";

function Photo() {
  const { id } = useParams();
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [favorite, setFavorite] = useState(isFavorite(id));

  useEffect(() => {
    setLoading(true);
    getPhotoById(id)
      .then(setPhoto)
      .catch(() => setError("Не удалось загрузить фото"))
      .finally(() => setLoading(false));
  }, [id]);

  const handleFavorite = () => {
    if (favorite) {
      removeFavorite(photo.id);
      setFavorite(false);
    } else {
      addFavorite(photo);
      setFavorite(true);
    }
  };

  if (loading) return <div className="text-center my-5">Загрузка...</div>;
  if (error) return <div className="text-center text-danger my-5">{error}</div>;
  if (!photo) return null;

  return (
    <div
      className="photo-page-bg d-flex flex-column align-items-center py-5 px-2"
      style={{
        width: "100%",
        minHeight: "100vh",
      }}
    >
      <div
        className="w-100 d-flex justify-content-center"
        style={{ maxWidth: 900, margin: "0 auto 24px auto" }}
      >
        {/* Инфоблок */}
        <div
          className="d-flex align-items-center gap-3 px-4 py-3"
          style={{
            background: "rgba(40,40,40,0.92)",
            borderRadius: "20px",
            color: "#fff",
            fontSize: 20,
            fontWeight: 600,
            marginRight: "auto",
            boxShadow: "0 2px 16px #0002",
          }}
        >
          <img
            src={
              photo.user.profile_image?.large ||
              photo.user.profile_image?.medium
            }
            alt={photo.user.name}
            style={{
              width: 48,
              height: 48,
              borderRadius: "50%",
              objectFit: "cover",
              border: "2px solid #fff",
            }}
          />
          <div>
            <div style={{ fontWeight: "bold", fontSize: 20 }}>
              {photo.user.name}
            </div>
            <a
              href={photo.user.links.html}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "#FFD600",
                fontSize: 15,
                textDecoration: "none",
              }}
            >
              @{photo.user.username}
            </a>
          </div>
        </div>
        {/* Кнопка избранного справа */}
        <button
          className={`btn ${
            favorite ? "btn-danger" : "btn-outline-light"
          } ms-3`}
          style={{
            borderRadius: "20px",
            minWidth: 48,
            minHeight: 48,
            fontWeight: 600,
            fontSize: 24,
            background: "rgba(40,40,40,0.92)",
            color: favorite ? "#fff" : "#fff",
            boxShadow: "0 2px 16px #0002",
          }}
          onClick={handleFavorite}
        >
          <i className={`bi ${favorite ? "bi-heart-fill" : "bi-heart"}`}></i>
        </button>
      </div>

      {/* Картинка */}
      <div
        style={{
          width: "100%",
          maxWidth: "900px",
          height: "60vh",
          background: "#222",
          borderRadius: "24px",
          boxShadow: "0 4px 24px #0002",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <img
          src={photo.urls.regular}
          alt={photo.alt_description}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: "24px",
          }}
        />
      </div>
    </div>
  );
}

export default Photo;
