import React, { useState, useEffect } from "react";

// import Filter from "react-filter-search";

const AllItems = () => {
  const [sortCategory, setSortCategory] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [data, setData] = useState([]);

  const baseURL = "http://localhost:5000";
  // const [output, setOutput] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `${baseURL}/api/items/allItems?category=${sortCategory}&minPrice${priceRange}&maxPrice=${priceRange}`
      );
      const json = await response.json();
      setData(json);
    };
    fetchData();
  }, [sortCategory, priceRange]);

  useEffect(() => {
    let updatedProducts = [...data];

    if (sortCategory) {
      updatedProducts = updatedProducts.filter(
        (product) => product.category === sortCategory
      );
    }

    if (priceRange) {
      updatedProducts = updatedProducts.filter(
        (product) => product.price <= priceRange
      );
    }

    setFilteredData(updatedProducts);
    console.log("filtered", filteredData);
  }, [sortCategory, priceRange]);

  // const getItems = async () => {
  //   const response = await fetch(`${baseURL}/api/items/allItems`);
  //   const json = await response.json();
  //   console.log(json);
  //   setData(json);
  // };

  // function for handleing category sorting
  const handleCategory = (event) => {
    setSortCategory(event.target.value);
    // setFilter(event.target.value);
  };

  // function for handeling range sorting
  const handlePrice = (event) => {
    setPriceRange(event.target.value);
    // setFilter(event.target.value);
  };

  // const baseURL = "http://localhost:5000";

  // const filterProducts = (cateItem) => {
  //   const updatedProducts = data.filter((curElem) => {
  //     return curElem.category === cateItem;
  //   });
  //   setOutput(updatedProducts);
  // };

  // setData(filterProducts);

  // const filterProducts = data.filter((product) => {
  //   if (sortCategory && priceRange) {
  //     return (
  //       product.sortCategory === sortCategory &&
  //       product.priceRange <= priceRange
  //     );
  //   } else if (sortCategory) {
  //     return product.sortCategory === sortCategory;
  //   } else if (priceRange) {
  //     return product.price <= priceRange;
  //   } else {
  //     return true;
  //   }
  // });

  // useEffect(() => {
  //   getItems();
  // }, []);

  return (
    <>
      {/* {filteredData.map((elem) => {
        return (
          <div className="navbar-dark" key={elem.id}>
            <li>{elem.title}</li>
          </div>
        );
      })} */}
      {/* Filtering Products */}
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
            <option value="1000">Less than or equal to 100</option>
          </select>
        </div>
      </div>

      <div className="container mt-3">
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4">
          {data.map((elem) => {
            // console.log(elem);
            return (
              <div className="col mb-4" key={elem.id}>
                <div className="card">
                  <img
                    style={{
                      width: "100%",
                      height: "200px",
                      overflow: "hidden",
                    }}
                    src={elem.imageURL}
                    className="card-img-top"
                    alt="will appear here"
                  />
                  <div className="card-body">
                    <h5 className="card-title text-center mb-3">
                      {elem.title}
                    </h5>
                    <p className="card-text text-justify">{elem.description}</p>
                    <div className="d-flex justify-content-between align-items-center">
                      <p className="card-text mb-0">
                        <strong>&#x20B9; {elem.price}</strong>
                      </p>

                      <button className="btn btn-sm btn-primary">
                        Buy Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default AllItems;
