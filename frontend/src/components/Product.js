import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { add } from "../store/Cart/CartSlice";
import { deleteProductById } from "../store/products";
// import React, {useState, useEffect} from 'react'
// import {useParams, useNavigate} from 'react-router-dom'
import UpdateProduct from "./UpdateProduct";

const Product = ({ product }) => {
  const { title, price, category, image,id } = product;

  const dispatch = useDispatch();

  // const deleteCurrentProduct = () => {
  //   fetch(`http://localhost:8000/product/delete/${id}`, {
  //       method: "Post",
  //     });
  //     dispatch(deleteProduct(id))
 

  //   }
  const deleteCurrentProduct = () => {
    dispatch(deleteProductById(product));
  };
 
    const cartAdd = (product) => {
      dispatch(add(product));gi
    };
 
  // const updateProduct= async ()=>{
  //   console.warn(title,price,description,category)
  //   let result = await fetch(`http://localhost:8080/product/updateproduct/${params.id}`,{
  //     method:'Put',
  //     body:JSON.stringify({title,price,description,category}),
  //     headers:{
  //       'Content-Type':"application/json"
  //     }
  //   })
  //   result = await result.json()
  //   console.warn(result)
  //   navigate('/')
  //    }

  return (
   
    <div className="col pb-5">
      <div className="card">
        <Link to={`/details/${product._id}`}>
          <img
            className="card-img-top"
            src={image}
            alt="Card img cap"
            style={{
              height: "15rem",
              width: "12rem",
            }}
          />
           </Link>
          <div className="card-body">
            <h5 className="card-title">
              {title.slice(0, 20)}... - ${price}
            </h5>
            <div className="badge badge-dark text-success">{category}</div>
            {/* <p className="card-text">{description}</p> */}
            <Link to = {`/cart/`}>
            <span
              className="btn btn-secondary my-2"
              onClick={() => cartAdd(product)}
            >
            +
            </span></Link>
            <span
              className="btn btn-light text-danger my-2"
              onClick= {deleteCurrentProduct}
            >
              Delete
            </span>
            <Link to = {`/updateproduct/${product._id}`}>
            <span
              className="btn btn-light text-info my-2"
           
            >
             Update
            </span></Link>
          </div>
       
      </div>
    </div>
    
  );
};

export default Product;
