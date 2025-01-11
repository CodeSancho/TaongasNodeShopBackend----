import express from "express"
const app = express();
const port= 4000
// const morgan = require('morgan');
// const bodyParser = require('body-parser')
// //const mongoose = require('mongoose')

//const simpleRoutes = require('./api/routes/simple')
app.get("/health", (req,res,next) =>{
res.status.json({

  message: "succesful"
})


})

app.listen(port, () => {

  `app running on port ${port}`
})


// //const uri = 'mongodb+srv://taomtonga7:5osbGDlKMomKRefX@nodeshop.ydwgc.mongodb.net/?retryWrites=true&w=majority&appName=nodeshop'
// //mongoose.connect(uri)
//   .then(() => console.log('Connected to MongoDB'))
//   .catch(err => console.error('Error connecting to MongoDB:', err));

// const productsRoutes = require('./api/routes/products');
// const orderRoutes = require('./api/routes/orders');

// app.use(morgan('dev'))
// app.use(bodyParser.urlencoded({extended: false}))
// app.use(bodyParser.json());


// app.use((req, res, next) => {

// res.header('Acess-Control-Allow-Orders', '*');
// res.header('Acess-Control-Allow-Headers', 
//   "Origin ,X-Requested-With ,Content-Type, Accept,Authorization"
// )

// })
  

// app.use('/orders', orderRoutes);
// app.use('/products', productsRoutes);

// app.use((req,res,next) => {

// const error = new Error('not found');
// error.status = 404;
// next(error);


// })

// app.use((error, req, res, next)=>{

// res.status(error.status|| 500);
// res.json({

// error: {

//   message : error.message
// }

// })

// })

// module.exports = app;