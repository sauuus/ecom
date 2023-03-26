import React, { useEffect, useState } from "react";
import { useParams, useNavigate} from "react-router-dom";
import { BASE_URL } from "../env";
import { Link } from "react-router-dom";
import Product from "./Product";

const ProductDetails = (product) => {
  const params = useParams();
  const [Product, setProduct] = useState({});

  useEffect(() => {
    const getProduct = async () => {
      const response = await fetch(`${BASE_URL}/product/${params.id}`);
      const ProductDetails = await response.json()
      setProduct(ProductDetails)
      
    };
    getProduct();
  }, []);

  return (
    <>
      <div className="container">
        <div className="row">
          
            <>
              <div className="col-md-6 my-4 p-4">
                <img
                  src={Product.image}
                  alt={Product.title}
                  height="300px"
                  width="300px"
                />
              </div>

              <div className="col-md-6 p-4">
                <h4 className="text-uppercase text-black-50">
                  {" "}
                  {Product.category}{" "}
                </h4>
                <h1 className="display-5"> {Product.title}</h1>
                <p className="lead">
                  Rating: {Product.rating && Product.rating.rate}{" "}
                  <i className="fa-solid fa-star"></i>
                  {/* <i className="fa fa-star"></i> */}
                </p>
                <p className="lead">{Product.description}</p>
                
              </div>
              <Link to = {`/cart/${product._id}`}>
              <button className="bg-info" >
              <div className="hidden content" >
                      <i className="shop icon"></i>
                    </div>
                    <div className="visible content" >Add to Cart</div></button></Link>
                  
              
            </>
          
        </div>
      </div>
    </>
  );
};

export default ProductDetails;