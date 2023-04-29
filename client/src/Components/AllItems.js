import React, { useEffect, useState } from "react";

const AllItems = () => {
  const [sortCategory, setSortCategory] = useState("");
  const [priceRange, setPriceRange] = useState("");

  const [filteredData, setFilteredData] = useState([]);

  const baseURL = "http://localhost:5001";

  const handleSearch = async (event) => {
    // event.preventDefault();

    const data = {
      sortCategory,
      priceRange,
    };
    console.log(data);

    const response = await fetch(
      `${baseURL}/api/items/allItems?category=${sortCategory}&sort=${priceRange}`
    );
    const json = await response.json();
    console.log("filtered", json);
    setFilteredData(json);
  };

  // const fetchData = async () => {
  //   const response = await fetch(
  //     `${baseURL}/api/items/allItems?category=${sortCategory}&sort=${priceRange}`
  //   );
  //   const json = await response.json();
  //   console.log("filtered", json);
  // };

  // useEffect(() => {
  //   fetchData();
  // }, []);

  const handleCategory = (event) => {
    setSortCategory(event.target.value);
  };

  const handlePrice = (event) => {
    setPriceRange(event.target.value);
  };
  return (
    <>
      <div className="container mt-3 mb-3 w-50 d-flex">
        <div className="w-50 mx-3">
          <label htmlFor="inputCategory" style={{ color: "#4285F4" }}>
            Sort By Category
          </label>
          <select
            className="form-control"
            id="inputCategory"
            required
            value={sortCategory}
            onChange={handleCategory}
          >
            <option>Select a category</option>
            <option value="electronics">Electronics</option>
            <option value="clothing">Clothing</option>
            <option value="furniture">Furniture</option>
            <option value="books">Books</option>
          </select>
        </div>
        <div className="w-50">
          <label htmlFor="inputCategory" style={{ color: "#4285F4" }}>
            Sort By Range
          </label>
          <select
            className="form-control"
            id="inputCategory"
            required
            value={priceRange}
            onChange={handlePrice}
          >
            <option>Select a category</option>
            <option value="500">Less than or equal to 500</option>
            <option value="1000">Less than or equal to 1000</option>
          </select>
        </div>
        <button
          onClick={handleSearch}
          className="mx-3 h-50 mt-4 btn btn-outline-primary"
          type="button"
        >
          Search
        </button>
      </div>
      {/* cards rendering */}
      <div className="container w-50">
        <div className="container mb-2">
          <div className="row row-cols-1 row-cols-md-2 g-4">
            {filteredData.map((elem) => {
              return (
                <div className="col" key={elem.id}>
                  <div className="card">
                    <img
                      style={{
                        width: "100%",
                        height: "200px",
                        overflow: "hidden",
                      }}
                      src={elem.imageURL}
                      className="card-img-top"
                      alt="..."
                    />
                    <div className="card-body">
                      <h5 className="card-title">{elem.title}</h5>
                      <p className="card-text">{elem.description}</p>
                      <h5 className="card-title">र {elem.price}</h5>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default AllItems;
