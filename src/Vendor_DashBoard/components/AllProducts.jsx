import React, { useState, useEffect } from 'react';
import { API_URL } from '../data/ApiPath';

const AllProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const firmId = localStorage.getItem('firmId');
            const response = await fetch(`${API_URL}/product/${firmId}/products`);
            const data = await response.json();
            console.log(data)
            if (response.ok) {
                setProducts(data.product);
            } else {
                alert(data.message || "please login or rigester your account");
            }
        } catch (error) {
            alert("Error while fetching products");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const deleteProduct = async (productId) => {
        try {
            const response = await fetch(`${API_URL}/product/${productId}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                alert("Product deleted successfully");
                setProducts((prev) => prev.filter((product) => product._id !== productId));
             } else {
                const data = await response.json();
               alert(data.message || "Failed to delete product");
            }
        } catch (error) {
            alert("Error while deleting product");
            console.error(error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div>
            {loading ? (
                <p>Loading products...</p>
            ) : products.length === 0 ? (
                <p>No Products are available.</p>
            ) : (
                <div className="tableContainer">
                    <table className="productTable">
                        <thead>
                            <tr>
                                <th>Product Name</th>
                                <th>Price</th>
                                <th>Image</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((item) => (
                                <tr key={item._id}>
                                    <td data-label="Product Name">{item.productName}</td>
                                    <td data-label="Price">${item.price}</td>
                                    <td data-label="Image">
                                        {item.image && (
                                            <img
                                                src={`${API_URL}/uploads/${item.image}`}
                                                alt={item.productName}
                                                width="100" // Optional: Adjust image size if needed
                                            />
                                        )}
                                    </td>
                                    <td data-label="Action">
                                        <button
                                            onClick={() => deleteProduct(item._id)}
                                            style={{ background: 'linear-gradient(135deg, #f44336, #e91e63)' }}
                                        >
                                            Delete
                                        </button>
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
export default AllProducts;