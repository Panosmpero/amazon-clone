import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { listProducts, saveProduct, deleteProduct } from "../actions/productActions";
import Loading from "./Loading";

const CreateProduct = (props) => {

  const [modalVisible, setModalVisible] = useState(false);
  const [id, setId] = useState("");
  const [title, setTitle] = useState("asdasd");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [stockCount, setStockCount] = useState(0);
  const [description, setDescription] = useState("");
  const [renewed, setRenewed] = useState(false);

  // get list of Products
  const productList = useSelector((state) => state.productList);
  const { 
    loading, 
    products, 
    error 
  } = productList;

  // save a new Product
  const productSave = useSelector((state) => state.productSave);
  const {
    loading: loadingSave,
    success: successSave,
    error: errorSave,
  } = productSave;

  // delete a Product
  const productDelete = useSelector((state) => state.productDelete);
  const {
    // loading: loadingDelete,
    success: successDelete,
    // error: errorDelete,
  } = productDelete;


  const dispatch = useDispatch();

  useEffect(() => {

    if (successSave) setModalVisible(!modalVisible)
    dispatch(listProducts());

  }, [successSave, successDelete, dispatch, modalVisible]);

  // Open/Close modal
  const openModal = (product, edit=false) => {

    if (edit) setModalVisible(true)
    else setModalVisible(!modalVisible);

    // Extract Product Properties from MongoDB
    const {
      _id,
      title,
      price,
      image,
      brand,
      category,
      stockCount,
      description,
      renewed
    } = product;
    setId(_id);
    setTitle(title);
    setPrice(price);
    setImage(image);
    setBrand(brand);
    setCategory(category);
    setStockCount(stockCount);
    setDescription(description);
    setRenewed(renewed);
  };

  // Save/Update product in MongoDB
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      saveProduct({
        _id: id,
        title,
        price,
        image,
        brand,
        category,
        stockCount,
        description,
        renewed,
      })
    );
  };

  const handleDelete = (product) => {
    dispatch(deleteProduct(product._id));
  };

  return (
    <div className="create-content">
      <div className="create-product-header">
        <h3>Products</h3>
        <button onClick={() => openModal({})}>{modalVisible ? "Close Product Creator" : "Create Product"}</button>
      </div>

      {modalVisible && (
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-container">
            <div>
              <h3>Create Product</h3>
            </div>
            <div>
              {loadingSave && <Loading />}
              {errorSave && <div>{errorSave}</div>}
            </div>
            <div>
              <label htmlFor="title">Title</label>
              <input
                type="text"
                name="title"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="price">Price</label>
              <input
                type="number"
                name="price"
                id="price"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
              />
            </div>
            <div>
              <label htmlFor="image">Image</label>
              <input
                type="text"
                name="image"
                id="image"
                placeholder="/img/product_image.jpg"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="brand">Brand</label>
              <input
                type="text"
                name="brand"
                id="brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="category">Category</label>
              <input
                type="text"
                name="category"
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="stockCount">Stock Count</label>
              <input
                type="number"
                name="stockCount"
                id="stockCount"
                value={stockCount}
                onChange={(e) => setStockCount(Number(e.target.value))}
              />
            </div>
            <div>
              <label htmlFor="description">Description</label>
              <input
                type="text"
                name="description"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="renewed">Renewed?</label>
              <input
                type="checkbox"
                name="renewed"
                id="renewed"
                checked={renewed}
                onChange={(e) => setRenewed(!renewed)}
              />
            </div>
            <div>
              <button type="submit">{id ? "Update Product" : "Create Product"}</button>
            </div>
          </div>
        </form>
      )}

      {loading ? <Loading /> : error ? <div>{error.msg}</div> : (
              <div className="product-list">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Price</th>
              <th>Category</th>
              <th>Brand</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, idx) => (
              <tr key={`product-table-tr-${idx}`}>
                <td>{product._id}</td>
                <td>{product.title}</td>
                <td>{product.price}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td>
                  <button onClick={() => openModal(product, true)}>Edit</button>
                  <button onClick={() => handleDelete(product)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      )}

    </div>
  );
};

export default CreateProduct;
