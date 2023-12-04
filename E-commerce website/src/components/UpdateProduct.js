import React, { useEffect, useState } from 'react'
import { useParams,useNavigate } from 'react-router-dom'


const UpdateProduct = () => {

    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [category, setCategory] = useState('')
    const [company, setCompany] = useState('')
    const [error, setError] = useState(false)
    const navigate = useNavigate();
    const params = useParams();
    useEffect(()=>{
        // console.log(params);
        getProductDetails();
    },[params.id])

    const getProductDetails=async()=>{
        let result = await fetch(`http://localhost:5000/products/${params.id}`);
        result = await result.json();
        setName(result.name);
        setPrice(result.price);
        setCategory(result.category);
        setCompany(result.company);
        // console.log(result);
    }

    const UpdateItem = async () => {
        // console.log({name,price,category,company})
        let result = await fetch(`http://localhost:5000/products/${params.id}`,{
            method:"PUT",
            body:JSON.stringify({name,price,category,company}),
            headers:{"Content-Type":"application/json"}
        })
        result = await result.json();
        console.log(result);
        navigate('/');
    }
    return (
        <div className="product-container">
            <div className='product-item'>

                <h3 className="mb-4">Add Product</h3>
                <div>
                    <input
                        value={name}
                        onChange={(e) => { setName(e.target.value) }}
                        name="name"
                        type="text"
                        className="input"
                        placeholder="Product Name"
                    />
                </div>
                <div>
                    <input
                        value={price}
                        onChange={(e) => { setPrice(e.target.value) }}
                        name="price"
                        type="price"
                        className="input"
                        placeholder="Product price"
                    />
                </div>

                <div>
                    <input
                        value={category}
                        onChange={(e) => { setCategory(e.target.value) }}
                        name="category"
                        type="category"
                        className="input"
                        placeholder="Product category"
                    />
                </div>

                <input
                    value={company}
                    onChange={(e) => { setCompany(e.target.value) }}
                    name="company"
                    type="company"
                    className=" input"
                    placeholder="Product company"
                />
                <div>
                </div>
                <div className="d-grid mt-4">
                    <button type="button" className="btn btn-primary" onClick={UpdateItem}>
                        Update Product
                    </button>
                </div>
            </div>
        </div>
    )
}

export default UpdateProduct