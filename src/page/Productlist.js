import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [viewProduct, setViewProduct] = useState(null);
  const navigate = useNavigate();

  const API = "http://localhost:8000/api/product";

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(API);
      setProducts(res.data.data);
    } catch (err) {
      console.error("Failed to load products:", err);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`${API}/${id}`);
      fetchProducts();
    } catch (err) {
      console.error("Failed to delete product:", err);
    }
  };
  const fetchSingleProduct = async (id) => {
    try {
      const res = await axios.get(`http://localhost:8000/api/product/${id}`);
      const data = res.data;

      console.log(data.data.image);
      
  
      setViewProduct({
        image: `http://localhost:8000/uploads/${data.data.image}`,
        name: data.name || 'No name available',
      });
    } catch (err) {
      console.error("Error fetching product data", err);
    }
  }
 

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Product List</h2>

      <div className="mb-3 text-end">
        <input
          type="text"
          className="form-control w-25 d-inline"
          placeholder="Search by name"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      <table className="table table-bordered text-center">
        <thead className="table-light">
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Description</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <tr key={product._id}>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.description}</td>
                <td>
                  <button
                    className="btn btn-link btn-sm"
                    onClick={() => fetchSingleProduct(product._id)}
                  >
                    View
                  </button>
                  
                </td>
                <td>
                  <button
                    className="btn btn-sm btn-danger me-2"
                    onClick={() => deleteProduct(product._id)}
                  >
                    Delete
                  </button>
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() => navigate(`/product/${product._id}`)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No Products Found</td>
            </tr>
          )}
        </tbody>
      </table>
      {viewProduct && (
        <div className="mt-4 d-flex justify-content-center">
          <div className="card" style={{ width: "18rem" }}>
          <img
         src={viewProduct.image}
         className="card-img-top"
         alt={viewProduct.name}
         
/>
            <div className="card-body">
              <h5 className="card-title">{viewProduct.name}</h5>
              <p className="card-text">
                Some quick example text to build on the card title.
              </p>
              <button
                className="btn btn-secondary"
                onClick={() => setViewProduct(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
       )} 
    </div>
  );
}
// import React, { Component } from 'react';
// import { Link } from 'react-router-dom'; 

// export default class Productlist extends Component {
//   constructor() {
//     super();
//     this.state = {
//       data: [],
//     };
//   }

//   listData() {
//     fetch('http://localhost:8000/api/product')
//       .then((response) => response.json())
//       .then((json) => {
//         this.setState({ data: json });
//       });
//   }

//   componentDidMount() {
//     this.listData();
//   }

//   deleteHandle(id) {
//     console.log('Delete data', id);
//     fetch('http://localhost:8000/api/product/' + id, { method: 'DELETE' })
//       .then((response) => response.json())
//       .then((json) => {
//         console.log(json);
//         this.listData();
//       });
//   }

//   render() {
//     return (
//       <>
//         <h1 className="page-heading">Product List</h1>
//         <div className="table-container">
//           <table className="product-table">
//             <thead>
//               <tr>
//                 <th>Name</th>
//                 <th>Type</th>
//                 <th>Price</th>
//                 <th>Description</th>
//                 <th>Operation</th>
//               </tr>
//             </thead>
//             <tbody>
//               {this.state.data.map((item) => {
//                 return (
//                   <tr className="list" key={item._id}>
//                     <td>{item.name}</td>
//                     <td>{item.type}</td>
//                     <td>{item.price}</td>
//                     <td>{item.description}</td>
//                     <td>
//                       <Link to={`/product/${item._id}`} className="edit-button">Edit</Link>
//                       <Link to={`/productcard/${item._id}`} className="view-button">View</Link> {/* View Button */}

//                       {/* <Link to={`/viewProduct/${item._id}`} className="view-button">View</Link> View Button */}
//                       <button onClick={() => this.deleteHandle(item._id)} className="delete-button">Del</button>
//                     </td>
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </table>
//         </div>
//       </>
//     );
//   }
// }