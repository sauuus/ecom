import React from "react";
import {useState} from 'react';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addProductWithReduxThunk } from "../store/products";

function Addproduct(){
    const [category, setCategory] =useState("");
    const [image, setImage] =useState("");
    const [title, setTitle] =useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] =useState(0);
const dispatch = useDispatch();
const navigate = useNavigate();


    // function addProduct()
    

        // console.warn(category, file, title,description,price);
        // const formData = new formData();
        // formData.append('file',file);
        // formData.append('category',category);
        // formData.append('title',title);
        // formData.append('description',description);
        // formData.append('price',price);
        // const add = async () => {
        //     setLoading(true);
        //     const response = await fetch('localhost:8000/product',{
        //     method: 'POST',
        //     body: formData}
        //     const Addproduct = await response.json());
        // alert("data has been saved");
        // add();

  // e.preventDefault();
  // axios.post(`localhost:8000/product/addProduct`).then(res=>(alert("added succesfully")))

  const addProduct = async () => {
    dispatch(addProductWithReduxThunk({ category, description, title, image, price }))
    navigate('/');
    
};
async function handleSubmit(e){
    const file =  e.target.files[0];
    
     let fd = new FormData();
     fd.append('image', file);
   
     fetch('http://localhost:8000/upload', {
       method: 'POST', body: fd
     }).then(async (fd) =>{
        const response = await fd.json()
        const imageId = response.image._id
        console.log(imageId)
        setImage(imageId)
     })
     .catch(err => {
       console.error(err);
     });
   }
// axios
//         .post(`localhost:8000/product/addProduct`, { category, title, file, price, description })
//         .then(() => {
//           setCategory("");
//           setTitle("");
//           setFile("");
//           setPrice(0);
//           setDescription(0);
//         })
      
    return(
        <div>
            <div className="col-sm-12 offset-sm-4">
                <br />
                <label ><h1><b>Adding Product to the Site</b></h1></label>
                <div className="form-group row">
                  <label className="col-sm-2 col-form-label" ><b>Category:</b></label>
                <div className="col-sm-10">
                <input type="text" className='from-control'
                onChange={(e)=>setCategory(e.target.value)} placeholder='category' /><br/>
                </div></div>
                <div className="form-group row">
                  <label className="col-sm-2 col-form-label"><b>Image:</b></label>
                  <div className="col-sm-10">
                <input type="file" className='from-control' 
                onChange={handleSubmit} placeholder='image' /><br/>
                </div></div>
                <div className="form-group row">
                  <label className="col-sm-2 col-form-label" ><b>Title:</b></label>
                <div className="col-sm-10">
                <input type="text" className='from-control'
                onChange={(e)=>setTitle(e.target.value)}placeholder='title' /><br/>
                </div></div>
                <div className="form-group row">
                  <label className="col-sm-2 col-form-label" ><b>Description:</b></label>
                <div className="col-sm-10">
                <input type="text" className='from-control'
                onChange={(e)=>setDescription(e.target.value)}placeholder='description' /><br/>
                </div></div>
                <div className="form-group row">
                  <label className="col-sm-2 col-form-label" ><b>Price:</b></label>
                <div className="col-sm-10">
                <input type="price" className='from-control'
                onChange={(e)=>setPrice(e.target.value)}placeholder='price' /><br/>
                </div></div>
                <div className="col-sm-12 offset-sm-1">
                <button onClick ={addProduct} className= "btn btn-dark">Add Product</button>
                </div>
            </div>

        </div>
    )}

export default Addproduct;

// export default class Addproduct extends React.Component {
   
//   constructor(props) {
//     super(props);

//     this.state = {
//       category: props.category,
//       file: props.file,
//       title: props.title,
//       description: props.description,
//       price: props.price,

//       category: "",
//       file: "",
//       title: "",
//       description: "",
//       price: "",
//     };
//   }
//   updateCategory(event) {
//     this.setCategory({
//       category: event.target.value,
//     });
//   }

//   updateFile(event) {
//     this.setFile({
//       file: event.target.value,
//     });
//   }
//   updateTitle(event) {
//     this.setTitle({
//       title: event.target.value,
//     });
//   }
//   updateDescription(event) {
//     this.setDescription({
//       description: event.target.value,
//     });
//   }
//   updatePrice(event) {
//     this.setPrice({
//       price: event.target.value,
//     });
//   }
//   save() {
//     var context = this;

//     $.add({
//       url: "localhost:8000/product",

//       method: "POST",

//       data: {
//         category: context.state.category,

//         file: context.state.file,
//         title: context.state.title,
//         description: context.state.description,
//         price: context.state.price,
//       },

//       success: function (response) {
//         alert("Successfully saved record!");
//       },

//       error: function (response) {
//         alert("Error in saving record!");
//       },
//     });
//   }
//   render() {
//     return (
//       <div>
//         category:
//         <input
//           type="text"
//           value={this.state.category}
//           onChange={this.updateCategory.bind(this)}
//         />
//         File:
//         <input
//           type="file"
//           value={this.state.file[0]}
//           onChange={this.updateFile.bind(this)}
//         />
//         Title:
//         <input
//           type="text"
//           value={this.state.title}
//           onChange={this.updateTitle.bind(this)}
//         />
//         Description:
//         <input
//           type="textarea"
//           value={this.state.description}
//           onChange={this.updateDescription.bind(this)}
//         />
//         Price:
//         <input
//           type="text"
//           value={this.state.price}
//           onChange={this.updatePrice.bind(this)}
//         />
//         <button onClick={this.save.bind(this)}>Save</button>
//       </div>
//     );
//   }
// }
