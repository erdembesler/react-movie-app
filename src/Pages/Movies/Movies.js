import axios from "axios";
import { useEffect, useState } from "react";
import CartItem from "../../components/CartItem/CartItem";
import CustomPagination from "../../components/Pagination/CustomPagination";
import Header from "../../components/Header/Header";

import "./Movies.css";

const Movies = () => {
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [numOfPages, setNumOfPages] = useState();
  const [searchItem, setSearchItem] = useState();
  const [loading, setLoading] = useState(true);
  const today = formatDate(new Date());

  //formats date yyyy-mm-dd
  function formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }

  //gets latest movies
  const fetchMovies = async () => {
    setLoading(true);
    const { data } = await axios.get(
      `${process.env.REACT_APP_API_DOMAIN}/discover/movie?api_key=${process.env.REACT_APP_MOVIE_DB_API_KEY}&language=en-US&release_date.lte=${today}&include_adult=false&include_video=false&page=${page}&sort_by=release_date.desc`
    );

    setContent(data.results);
    setNumOfPages(data.total_pages);
    setLoading(false);
  };

  //gets searched movies
  //Searching algorithm trys to find best match according to text input (not only by title)
  const searchMovies = async (searchStr) => {
    if (searchStr) {
      setSearchItem(searchStr);
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_DOMAIN}/search/movie?api_key=${process.env.REACT_APP_MOVIE_DB_API_KEY}&language=en-US&query=${searchStr}&release_date.lte=${today}&include_adult=false&include_video=false&page=${page}&sort_by=release_date.desc`
      );
      setContent(data.results);
      setNumOfPages(data.total_pages);
      setLoading(false);
    } else {
      setSearchItem();
      fetchMovies();
    }
  };

  //handling search click
  const handleSearch = (searchStr) => {
    if (page === 1) {
      window.scroll(0, 0);
      if (searchStr !== searchItem) {
        setSearchItem(searchStr);
        searchMovies(searchStr);
      }
    } else {
      setSearchItem(searchStr);
      setPage(1);
    }
  };

  //Pagination
  const decreasePage = () => {
    if (page > 1) {
      setPage(parseInt(page) - 1);
    }
  };
  const increasePage = () => {
    if (page !== numOfPages) {
      setPage(parseInt(page) + 1);
    }
  };

  useEffect(() => {
    window.scroll(0, 0);
    searchMovies(searchItem);
    // eslint-disable-next-line
  }, [page]);

  const refreshPage = () => {
    setSearchItem("");
    if (page === 1) {
      searchMovies("");
    } else {
      setPage(1);
    }
  };

  return (
    <div>
      <Header
        searchMovies={(e) => {
          handleSearch(e);
        }}
        searchItem={searchItem}
        page={page}
        refreshPage={refreshPage}
      />
      <div className="app">
        <div className="moviesContainer">
          {loading ? (
            <div>loading..</div>
          ) : content.length ? (
            <>
              <span className="pageTitle">
                <b> Most Recent Movies</b>
              </span>
              <div className="latestMovies">
                {content.map((item) => (
                  <CartItem key={item.id} id={item.id} item={item} />
                ))}
              </div>
            </>
          ) : (
            <div className="noMovieDiv">
              <div>No movies found..</div>
              <div>
                <button className="backButton" onClick={refreshPage}>
                  BACK
                </button>
              </div>
            </div>
          )}
          {numOfPages > 1 && (
            <CustomPagination
              setPage={setPage}
              numOfPages={numOfPages}
              decreasePage={decreasePage}
              increasePage={increasePage}
              page={page}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Movies;
