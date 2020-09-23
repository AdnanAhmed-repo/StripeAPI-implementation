const cors = require("cors");
const express = require("express");
const stripe = require('stripe')('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')
const uuid = require("uuid");


const app = express();



//middleware

app.use(express.json())
app.use(cors())



//routes
app.get("/", (req, res)=>{
    res.send("works");
})


app.post("/payment", (req, res) => {

    const {product, token} = req.body;
    console.log("Product", product);
    console.log("PRICE", product.price);
    const idempontencyKey = uuid()
    
    return stripe.customers.create({
        email: token.email,
        source: token.id
    }).then(customer => {
        stripe.charges.create({
            amount: product.price * 100,
            currency: 'usd',
            customer: customer.id,
            receipt_email: token.email,
            description: `purchase of product.name`

        }, {idempontencyKey})
    })
    .then(result => res.status(200).json(result))
    .catch(err => console.log(err))

})

//listen
app.listen(8282, ()=> console.log("listening at port 8282"))
