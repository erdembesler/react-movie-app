import React, { useState, useEffect } from "react";
import "./CustomPagination.css";

export default function CustomPagination({
  setPage,
  numOfPages = 10,
  decreasePage,
  increasePage,
  page,
}) {
  const [pageChild, setPageChild] = useState(page);

  const decreasePageNo = () => {
    decreasePage();
  };
  const increasePageNo = () => {
    increasePage();
  };

  //Handles input changes
  const handeInputChange = (event) => {
    setPageChild(event.target.value);
  };
  useEffect(() => {
    setPageChild(page);
  }, [page]);

  //handles on enter of pagination's quick jumping functionality
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      //1. if number
      if (isNaN(event.target.value)) return;
      //2. if greater than maxjumpNumber
      if (parseInt(event.target.value) > numOfPages) {
        setPage(numOfPages);
        setPageChild(numOfPages);

        return;
      }
      //3. if smaller than 1
      if (parseInt(event.target.value) < 1) {
        setPage(1);
        setPageChild(1);
        return;
      }
      setPage(event.target.value);
    }
  };

  return (
    <div
      className="paginationContainer"
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        marginTop: 20,
      }}
    >
      <button
        className={page === 1 ? "paginationButtonDisabled" : "paginationButton"}
        disabled={page === 1}
        onClick={decreasePageNo}
      >
        {"<"}
      </button>
      <input
        className="inputQuickJumper"
        type="number"
        min="1"
        value={pageChild}
        onChange={handeInputChange}
        onKeyDown={handleKeyDown}
      />
      <button
        className={
          page === numOfPages ? "paginationButtonDisabled" : "paginationButton"
        }
        disabled={page === numOfPages}
        onClick={increasePageNo}
      >
        {">"}
      </button>
    </div>
  );
}
