import React, { useCallback, useState } from "react";
import swal from "sweetalert";

const Items = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");

  const [items, setItems] = useState([]);

  const baseURL = "http://localhost:5000";

  const handleForm = useCallback(
    async (event) => {
      event.preventDefault();
      if (!name.trim()) return;
      if (!description.trim()) return;
      if (!price.trim()) return;
      if (!image.trim()) return;
      if (!category.trim()) return;

      const data = {
        name,
        description,
        price,
        image,
        category,
      };

      setItems([
        ...items,
        {
          id: Math.random(),
          content: data,
        },
      ]);
      console.log(data);
      setName("");
      setDescription("");
      setPrice("");
      setImage("");
      setCategory("");

      const response = await fetch(`${baseURL}/api/products/createProduct`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
        body: JSON.stringify(data),
      });
      const json = await response.json();
      console.log(json);

      if (response.status === 422) {
        swal({
          title: "Failed to Authenticate the Token",
          icon: "error",
        });
      }
      if (response.status === 201) {
        swal({
          title: "New Item was Successfully Added",
          icon: "success",
        });
      }
      if (response.status === 500) {
        swal({
          title: "Internal Server Error",
          icon: "error",
        });
      }
    },
    [name, description, price, image, category, items]
  );
  return (
    <>
      <div className="container mt-3 mb-3">
        <button
          className="btn btn-secondary"
          data-bs-toggle="modal"
          data-bs-target="#productModal"
        >
          Add New Products
        </button>
      </div>
      {/* <!-- Modal --> */}
      <div
        className="modal fade"
        id="productModal"
        tabIndex="-1"
        aria-labelledby="productModal"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="productModal">
                Add New Products
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form
                className="container mt-5 rounded"
                onSubmit={handleForm}
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "5px",
                  padding: "20px",
                }}
              >
                <h3 className="text-center" style={{ color: "#4285F4" }}>
                  Add Items
                </h3>
                <div className="form-group">
                  <label htmlFor="inputName" style={{ color: "#4285F4" }}>
                    Product Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputName"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder="Enter product name"
                    required
                  />
                </div>
                <div className="form-group">
                  <label
                    htmlFor="inputDescription"
                    style={{ color: "#4285F4" }}
                  >
                    Product Description
                  </label>
                  <textarea
                    className="form-control"
                    id="inputDescription"
                    rows="3"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                    placeholder="Enter product description"
                    style={{ color: "#6c757d" }}
                    required
                  ></textarea>
                </div>
                <div className="form-group">
                  <label htmlFor="inputPrice" style={{ color: "#4285F4" }}>
                    Product Price
                  </label>
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <span
                        className="input-group-text"
                        style={{ backgroundColor: "#4285F4", color: "#FFFFFF" }}
                      >
                        ₹
                      </span>
                    </div>
                    <input
                      type="number"
                      className="form-control"
                      id="inputPrice"
                      value={price}
                      onChange={(event) => setPrice(event.target.value)}
                      placeholder="Enter product price"
                      min="9"
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="inputImage" style={{ color: "#4285F4" }}>
                    Image URL
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputImage"
                    value={image}
                    onChange={(event) => setImage(event.target.value)}
                    placeholder="Enter image URL"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="inputCategory" style={{ color: "#4285F4" }}>
                    Product Category
                  </label>
                  <select
                    className="form-control"
                    id="inputCategory"
                    required
                    value={category}
                    onChange={(event) => setCategory(event.target.value)}
                  >
                    <option>Select a category</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Clothing">Clothing</option>
                    <option value="Furniture">Furniture</option>
                    <option value="Books">Books</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="btn btn-primary mt-3"
                  style={{ backgroundColor: "#4285F4" }}
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="container mt-3">
        <div className="row">
          {items.map((currElem) => {
            return (
              <div className="col-lg-4 col-md-6 mb-4" key={Math.random()}>
                <div className="card">
                  <img
                    style={{
                      width: "100%",
                      height: "200px",
                      overflow: "hidden",
                    }}
                    src={currElem.content.image}
                    className="card-img-top"
                    alt="will appear here..."
                  />
                  <div className="card-body">
                    <h5 className="card-title text-center mb-3">
                      {currElem.content.name}
                    </h5>
                    <p className="card-text text-justify">
                      {currElem.content.description}
                    </p>
                    <div className="d-flex justify-content-between align-items-center">
                      <p className="card-text mb-0">
                        <strong>&#x20B9; {currElem.content.price}</strong>
                      </p>
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

export default Items;
