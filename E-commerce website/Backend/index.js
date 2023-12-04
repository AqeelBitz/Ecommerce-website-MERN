const express = require("express")
const cors = require('cors')
require('./db/config')
const User = require('./models/Users')
const Product = require('./models/Product')
const app = express();

app.use(express.json());
app.use(cors())
app.get("/", (req, res) => {
    res.send("App is working fine..")
})

app.post("/register", async (req, res) => {
    const user = new User(req.body)
    console.log(req.body)
    let result = await user.save();
    result = result.toObject();
    delete result.password
    res.send(result);
})

app.post('/login', async (req, resp) => {

    if (req.body.password && req.body.email) {
        const user = await User.findOne(req.body).select("-password")
        if (user) {
            resp.send(user)
        }
        else {
            resp.send({ result: "NO user Found!" })
        }
    }
    else {
        resp.send({ result: "NO user Found!" })
    }

})

app.post("/add-product", async (req, resp) => {
    console.log(req.body);
    const product = new Product(req.body)
    let result = await product.save();
    resp.send(result)

})
app.get('/products', async (req, resp) => {
    const products = await Product.find();
    if (products.length > 0) {
        resp.send(products)
    }
    else {
        resp.send({ result: "No Data Found!" })
    }
})

app.delete('/products/:id', async (req, resp) => {
    const result = await Product.deleteOne({ _id: req.params.id });
    resp.send(result)
})

app.get('/products/:id', async (req, resp) => {
    const result = await Product.findOne({ _id: req.params.id });
    if (result) {
        resp.send(result)
    }
    else {
        resp.send("Record not found!")
    }
})
app.put('/products/:id', async (req, resp) => {
    const result = await Product.updateOne(
        { _id: req.params.id },
        { $set: req.body })
        resp.send(result);
})

app.get("/search/:key",async(req,resp)=>{
    const result = await Product.find({
        "$or":[{name:{$regex:req.params.key}},
            {category:{$regex:req.params.key}},
            {price:{$regex:req.params.key}},
            {company:{$regex:req.params.key}}]
    })
    resp.send(result);

})

app.listen(5000, () => {
    console.log("Server running at PORT 5000");
});