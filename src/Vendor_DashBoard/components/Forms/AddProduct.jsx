import React, { useState } from 'react';
import { API_URL } from '../../data/ApiPath';

const AddProduct = () => {
  const [productName, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState([]);
  const [bestSeller, setBestSeller] = useState(false);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('loginToken');
      const firmId=localStorage.getItem('firmId')
      if (!token || !firmId ) {
        console.log("Error in token retrieval or firmdata retrival");
      }

      const formData = new FormData();
      formData.append('productName', productName);
      formData.append('price', price);

      category.forEach((value) => {
        formData.append('category', value);
      });

      formData.append('bestSeller', bestSeller);
      formData.append('description', description);
      
      if (image) {
        formData.append('image', image); // 'image' should match the backend's expected key
      } else {
        console.log("No image file selected");
      }

      const response = await fetch(`${API_URL}/product/add-product/${firmId}`, {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        console.log("Product added");
        alert("Product added successfully");
        setName("");
        setPrice("");
        setCategory([]);
        setBestSeller(false);
        setDescription("");
        setImage(null);
      } else {
        console.log("Error in adding product");
        alert("Some server issue");
      }

    } catch (error) {
      console.log(error);
    }
  }

  const categoryHandler = (event) => {
    const value = event.target.value;
    if (category.includes(value)) {
      setCategory(category.filter((item) => item !== value));
    } else {
      setCategory([...category, value]);
    }
  }

  const handleImage = (event) => {
    const selectedImage = event.target.files[0];
    setImage(selectedImage);
  }

  return (
    <div className="firmSection">
      <form className="tableForm" onSubmit={submitHandler}>
        <h3>Add Product</h3>
        <label>Product Name</label>
        <input
          type="text"
          name="productName"
          value={productName}
          onChange={(e) => setName(e.target.value)}
        />

        <label>Price</label>
        <input
          type="text"
          name="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <div className="checkInp">
          <label>Category</label>
          <div className="inputsContainer">
            <div className="checboxContainer">
              <label>Veg</label>
              <input
                type="checkbox"
                checked={category.includes('veg')}
                value="veg"
                onChange={categoryHandler}
              />
            </div>
            <div className="checboxContainer">
              <label>Non-Veg</label>
              <input
                type="checkbox"
                checked={category.includes('non-veg')}
                value="non-veg"
                onChange={categoryHandler}
              />
            </div>
          </div>
        </div>

        <div className="checkInp">
          <label>Best Seller</label>
          <div className="inputsContainer">
            <div className="checboxContainer">
              <label>Yes</label>
              <input
                type="radio"
                name="bestSeller"
                value="true"
                checked={bestSeller===true}
                onChange={() => setBestSeller(true)}
              />
            </div>
            <div className="checboxContainer">
              <label>No</label>
              <input
                type="radio"
                name="bestSeller"
                value="false"
                checked={bestSeller===false}
                onChange={() => setBestSeller(false)}
              />
            </div>
          </div>
        </div>

        <label>Description</label>
        <input
          type="text"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label>Product Image</label>
        <input
          type="file"
          name="productImage"
          onChange={handleImage}
        />

        <br />
        <div className="btnSubmit">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
