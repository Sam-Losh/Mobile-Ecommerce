const express = require('express');
const app = express();
require('dotenv/config');
const morgan = require('morgan');
const mongoose = require('mongoose'); 
const cors = require("cors");


//middlewares
app.use(cors());
app.options("*", cors());

app.use(express.json());
app.use(morgan('tiny'));

//routes
const api = process.env.API_URL;

const categoriesRoutes = require("./routes/categories");
const productsRoutes = require("./routes/products");
const usersRoutes = require("./routes/users");
const ordersRoutes = require("./routes/orders");


app.use(`${api}/categories`, categoriesRoutes);
app.use(`${api}/products`, productsRoutes);
app.use(`${api}/users`, usersRoutes);
app.use(`${api}/orders`, ordersRoutes);

//DB
mongoose.connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'evoid0-db'
})
.then(()=>{
    console.log('YAAAAYYY!!!')
})
.catch((err)=>{
    console.log(err);
})

app.listen(3000, ()=> {
    console.log('Server Is Now Running')
})