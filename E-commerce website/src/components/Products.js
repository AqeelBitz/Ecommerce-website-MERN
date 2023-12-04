import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'

const Products = () => {
    const [product, setProduct] = useState([])
    useEffect(() => {
        getProducts();
    }, [])

    const getProducts = async () => {
        let result = await fetch("http://localhost:5000/products");
        result = await result.json();
        setProduct(result)
    }
    const deleteProduct=async(id)=>{
        console.log("ID: ",id)
        let result = await fetch(`http://localhost:5000/products/${id}`,{
            method:"delete"
        })
        result = await result.json();
        if(result){
            getProducts();
        }
    }
    const handleChange=async(event)=>{
        const key = event.target.value;
        if(key){
        let result = await fetch(`http://localhost:5000/search/${key}`);
        result = await result.json();
        if(result){
            setProduct(result);
        }
    }
    else{
        getProducts();
    }
    }
    // console.log(product)
    return (
        <div className="table-container">
        <h3 className="mb-4">Products</h3>
        <input type="text" className='search-bar' placeholder='Search Products' onChange={handleChange}/>
        <table className="product-table">
          <thead>
            <tr>
              <th>S. No</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Company</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {product.length>0?product.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>{item.category}</td>
                <td>{item.company}</td>
                <td>
                  <button className="button-del" onClick={() => deleteProduct(item._id)}>Delete</button>
                  <button className="button-update"><Link to={`/update/${item._id}`}>Update</Link></button>
                </td>
              </tr>
            )):<h3 className='no-result'>No Result Found!</h3>}
          </tbody>
        </table>
      </div>
      
    )
}

export default Products