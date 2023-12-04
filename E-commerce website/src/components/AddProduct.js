import React, { useState } from 'react'


const AddProduct = () => {

    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [category, setCategory] = useState('')
    const [company, setCompany] = useState('')
    const [error, setError] = useState(false)


    const addItem = async () => {
        if (!name || !price || !category || !company) {
            setError(true)

        }
        else{

            console.log({ name, price, category, company })
            const userId = JSON.parse(localStorage.getItem("user"))._id;
            let result = await fetch("http://localhost:5000/add-product", {
                method: "post",
                body: JSON.stringify({ name, price, category, userId, company }),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            result = result.json();
            console.log(result);
    
        }
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
                
                    {error && !name && <span className='invalid'>Enter Name</span>}
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
                    {error && !price && <span className='invalid'>Enter Price</span>}
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
                    {error && !category && <span className='invalid'>Enter Category</span>}
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
                    {error && !company && <span className='invalid'>Enter Company</span>}
                </div>
                <div className="d-grid mt-4">
                    <button type="button" className="btn btn-primary" onClick={addItem}>
                        Add Product
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AddProduct