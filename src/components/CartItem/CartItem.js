import "./CartItem.css";
import { img_300, unavailable } from "../../config/config";
import { useState } from "react";

const Movie = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };
  return (
    <div>
      <div onClick={openModal} className="movie" style={{ cursor: "pointer" }}>
        <div className="voteDiv">
          <span className="vote">
            {item.vote_count ? item.vote_average : "-"}
          </span>
        </div>
        <img
          className="poster"
          src={item.poster_path ? `${img_300}${item.poster_path}` : unavailable}
          alt={item.title}
        />
        <div className="movieInfo">
          <b className="title">{item.title}</b>
        </div>
      </div>
      {isOpen && (
        <>
          <div className="overlay"></div>
          <div className="modal">
            <header className="modal__header">
              <h2>{item.title}</h2>
              <button onClick={closeModal} className="close-button">
                &times;
              </button>
            </header>
            <div className="about">
              <div>
                <img
                  className="poster"
                  src={
                    item.poster_path
                      ? `${img_300}${item.poster_path}`
                      : unavailable
                  }
                  alt={item.title}
                />
              </div>
              <div className="infoDiv">
                <div>
                  <span>
                    <b>Release Date: </b>{" "}
                    {new Date(
                      item.first_air_date || item.release_date
                    ).toLocaleString("en-US", {
                      day: "numeric",
                      year: "numeric",
                      month: "long",
                    })}
                  </span>
                  <br />
                  <br />
                  {item.tagline && <i className="tagline">{item.tagline}</i>}

                  <span>{item.overview}</span>
                  <br />
                  <br />
                  <span>
                    {" "}
                    <b>{item.vote_count ? item.vote_average : "-"}</b>{" "}
                    {" / 10 ("}
                    {item.vote_count}
                    {" total votes)"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Movie;
