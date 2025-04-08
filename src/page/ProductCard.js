import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function ProductCard() {
  const [image, setImage] = useState('');
  const [name, setName] = useState('');
  const { id } = useParams();  
  useEffect(() => {
    
    axios.get(`http://localhost:8000/api/product/${id}`)
      .then((resp) => {
        if (resp?.data?.data?.image[0]?.path) {
          setImage(resp.data.data.image[0].path);
        }
        setName(resp.data.name || 'No name available'); 
      })
      .catch((err) => {
        console.log(err, 'Error fetching product data');
      });
  }, [id]);  


  return (
    <>
    <div>
      <div className="card" style={{ width: "18rem" }}>
          <img
            src={`http://localhost:8000/api/product/${image}`}  
            className="card-img-top"
            alt=''/>
            <p >No image available</p>  
           
        <div className="card-body">
          <h5 className="card-title">{name || 'Product Name'}</h5>  
          <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          <a href="#" className="btn btn-primary">Go somewhere</a>
        </div>
        
        
      </div>
      
    </div>
    </>
  );
}
// import React, { useEffect, useState } from 'react';
// import {
//   MDBCol,
//   MDBContainer,
//   MDBRow,
//   MDBCard,
//   MDBCardText,
//   MDBCardBody,
//   MDBCardImage,
//   MDBBtn,
// },
// import { useParams } from 'react-router-dom';

// export default function Productcard() {
//   const [product, setProduct] = useState({
//     name: '',
//     price: '',
//     description: '',
//     imageUrl: ''
//   });
//   const [isEmpty, setIsEmpty] = useState(false);
//   const { id } = useParams();  // Getting the product ID from the URL

//   useEffect(() => {
//     // Fetching the product data by ID
//     fetch(`http://localhost:8000/api/product/${id}`)
//       .then(response => response.json())
//       .then(result => {
//         if (result) {
//           setProduct({
//             name: result.name,
//             price: result.price,
//             description: result.description,
//             image: result.filepath || 'uploads\\1744011848902-neurology.jpeg' // Default image if no image is found
//           });
//         } else {
//           setIsEmpty(true); 
//         }
//       })
//       .catch(error => console.error('Error:', error));
//   }, [id]); 

//   if (isEmpty) {
//     return <p>No product found.</p>;  // If no product, show this message
//   }

//   return (
//     <section className="card">
//       <MDBContainer className="py-5">
//         <MDBRow>
//           <MDBCol lg="4">
//             <MDBCard className="mb-4">
//               <MDBCardBody className="text-center">
//                 <MDBCardImage
//                   src={`http://localhost:8000/api/product/${product.image}`}  // Corrected image URL
//                   alt="Product Image"
//                   style={{ width: '200px' }}
//                   fluid
//                 />
//                 <p className="text-muted mb-1">{product.name}</p>
//                 <div className="d-flex justify-content-center mb-2">
//                   <MDBBtn>Follow</MDBBtn>  {/* Follow Button */}
//                   <MDBBtn outline className="ms-1">Message</MDBBtn>  {/* Message Button */}
//                 </div>
//               </MDBCardBody>
//             </MDBCard>
//           </MDBCol>

//           <MDBCol lg="8">
//             <MDBCard className="mb-4">
//               <MDBCardBody>
//                 <MDBRow>
//                   <MDBCol sm="3">
//                     <MDBCardText>Name</MDBCardText>
//                   </MDBCol>
//                   <MDBCol sm="9">
//                     <MDBCardText className="text-muted">{product.name}</MDBCardText>
//                   </MDBCol>
//                 </MDBRow>
//                 <hr />
//                 <MDBRow>
//                   <MDBCol sm="3">
//                     <MDBCardText>Price</MDBCardText>
//                   </MDBCol>
//                   <MDBCol sm="9">
//                     <MDBCardText className="text-muted">{product.price}</MDBCardText>
//                   </MDBCol>
//                 </MDBRow>
//                 <hr />
//                 <MDBRow>
//                   <MDBCol sm="3">
//                     <MDBCardText>Description</MDBCardText>
//                   </MDBCol>
//                   <MDBCol sm="9">
//                     <MDBCardText className="text-muted">{product.description}</MDBCardText>
//                   </MDBCol>
//                 </MDBRow>
//                 <hr />
//               </MDBCardBody>
//             </MDBCard>
//           </MDBCol>
//         </MDBRow>
//       </MDBContainer>
//     </section>
//   );
// }