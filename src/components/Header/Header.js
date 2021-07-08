import "./Header.css";
import { useState, useEffect } from "react";
import Logo from "../Logo/Logo";

const Header = (props) => {
  const [searchString, setSearchString] = useState("");
  //handles on change of input
  const handleChange = (e) => {
    setSearchString(e.target.value);
  };

  //handles on enter func. of input
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      props.searchMovies(searchString);
    }
  };
  useEffect(() => {
    setSearchString(props.searchItem || "");
  }, [props.page, props.searchItem]);

  const onClickHandler = () => {
    window.scroll(0, 0);
    setSearchString("");
    props.refreshPage();
  };

  return (
    <div className="headerDiv">
      <span className="headerSpan">
        <div
          className="logoDiv"
          style={{ cursor: "pointer" }}
          onClick={onClickHandler}
        >
          <Logo />
        </div>
        <div className="searchDiv">
          <input
            className="searchInput"
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            value={searchString}
          ></input>
          <button
            className="searchButton"
            onClick={() => {
              props.searchMovies(searchString);
            }}
          >
            SEARCH
          </button>
        </div>
      </span>
    </div>
  );
};

export default Header;
