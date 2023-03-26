import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../../env";
import UpdateProduct from "../../components/UpdateProduct";

export const productState = {
  loading: false,
  error: "",
  products: [],
};

//how to create an action
// createAction//

//async api calling this is also a  action
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await fetch(`${BASE_URL}/product`);
    const data = await response.json();
    //reduxt thunk data pass
    return data;
  }
);
//delete 
const DeleteAPI = (id) => {
  let timer;
  return new Promise((resolve, reject) => {
    timer = setTimeout(() => {
      fetch(`http://localhost:8000/product/delete/${id}`, {
       method : 'Delete'
     })
      resolve({
        message: `product having id -> ${id} is deleted successfully`
      });
      clearTimeout(timer);
    }, 1000);
  });
};

export const deleteProductById = createAsyncThunk(
  "product/delete",
  async (id, thunkAPI) => {
    try {
      const res = await fetch(`http://localhost:8000/product/delete/${id}`, {
        method : 'Delete'
      });

  thunkAPI.dispatch(deleteProduct(id));
  return true;
      
    } catch (error) {
      
    }
   
}
);

//update
// const UpdateAPI = (id) => {
//   let timer;
//   return new Promise((resolve, reject) => {
//     timer = setTimeout(() => {
//       fetch(`http://localhost:8000/product/updateproduct/${id}`, {
//        method : 'Put'
//      })
//       resolve({
//         message: `product having id -> ${id} is updated successfully`
//       });
//       clearTimeout(timer);
//     }, 1000);
//   });
// };

// export const updateProductById = createAsyncThunk(
//   "product/updateproduct",
//   async (id, thunkAPI) => {
//     const res = await UpdateAPI(id);
// console.log(res);
// thunkAPI.dispatch(UpdateProduct(id));
// return true;
// }
// );
 
//addproducts
//thunk=dispatch componentsame
export const addProductWithReduxThunk = createAsyncThunk(
  "product/add", async(product, thunkAPI) =>{
    try {
      const result = await fetch( `${BASE_URL}/product/addproduct`, {
    method: "Post",
    body: JSON.stringify(product ),
    headers: { "Content-type": "application/json" }
  });
  const helloProduct = await result.json();
  thunkAPI.dispatch(add(helloProduct))  //action hitting another action
  return helloProduct; //action fullfilled
    } catch (error) {
      
    }
  }
)

// const addProduct = async () => {
//   console.log(category, description, title, image ,price);
//   await fetch("http://localhost:8000/product/addProduct", {
//     method: "Post",
//     body: JSON.stringify({ category, description, title, image, price }),
//     headers: { "Content-type": "application/json" }
//   });
// }
//Product slice
export const productsSlice = createSlice({
  name: "products",
  initialState: productState,
  reducers: {
    // to mutate or change the redux state datas...
    deleteProduct: (state, action) => {
      const productId = action.payload;
      const tempProducts = [...state.products].filter(
        (pd) => pd.id !== productId
      );
      state.products = tempProducts;
    },
    //to search the product
    searchProduct: (state, action) => {
      const searchTerm = action.payload;
      if (!searchTerm) {
        return;
      }
      const searchedProduct = [...state.products].filter((pd) =>
        pd.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      state.products = searchedProduct;
    },

    add(state, action) {
      state.products.push(action.payload);
    },

    // to sort the products..
    sortProduct: (state, action) => {
      const type = action.payload;
      if (type) {
        const sortProduct = [...state.products].sort((a, b) =>
          a.title.localeCompare(b.title)
        );
        state.products = sortProduct;
      } else {
        const sortProduct = [...state.products].sort((a, b) =>
          b.title.localeCompare(a.title)
        );
        state.products = sortProduct;
      }
    },

    sortProductPrice: (state, action) => {
      const type = action.payload;
      if (type) {
        const sortPrice = [...state.products].sort((a, b) => a.price - b.price);
        state.products = sortPrice;
      } else {
        const sortPrice = [...state.products].sort((a, b) => b.price - a.price);
        state.products = sortPrice;
      }
    },
    
  },
  //maintain redux state for asyc apis
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.error = "";
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
        state.error = "";
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.products = [];
        state.error = action.payload;
      });
  },
});

//export actions
export const {
  deleteProduct,
  searchProduct,
  add,
  sortProduct,
  sortProductPrice,
} = productsSlice.actions;

export default productsSlice.reducer;
