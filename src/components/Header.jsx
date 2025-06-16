import { Link } from "react-router-dom";
import { useState } from "react";

function Header({ showSearch, onSearch, initialQuery = "" }) {
  const [query, setQuery] = useState(initialQuery);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch && onSearch(query);
  };

  return (
    <>
      {/* Шапка строго в контейнере */}
      <nav className="navbar navbar-dark bg-dark">
        <div className="container-lg d-flex justify-content-between align-items-center py-4">
          <Link
            to="/"
            className="text-decoration-none text-start"
            style={{ display: "block" }}
          >
            <span className="fw-bold fs-2" style={{ letterSpacing: "1px" }}>
              <span style={{ color: "#FFD600" }}>ART</span>{" "}
              <span style={{ color: "#FFFFFF" }}>GALLERY</span>
            </span>
            <div className="fs-5 text-white-50">SAN FRANCISCO</div>
          </Link>
          <Link
            to="/favorites"
            className="text-white fs-4 d-flex align-items-center"
            style={{ gap: 8, textDecoration: "none" }}
          >
            <i className="bi bi-heart" style={{ fontSize: 26 }}></i>
            <span className="d-none d-sm-inline">Избранное</span>
          </Link>
        </div>
      </nav>

      {/* Блок с фоном на всю ширину, а контент строго в .container */}
      {showSearch && (
        <div
          className="w-100"
          style={{
            background:
              "url('/your-van-gogh-image.jpg') center/cover no-repeat",
            padding: "48px 0",
          }}
        >
          <div className="container-lg">
            <form
              onSubmit={handleSubmit}
              className="mx-auto bg-white rounded-3 shadow d-flex align-items-center"
              style={{
                maxWidth: 500,
                width: "100%",
                padding: "12px 24px",
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
        </div>
      )}
    </>
  );
}

export default Header;
