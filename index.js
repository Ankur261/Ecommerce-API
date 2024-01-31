const express = require('express') ;

const app = express() ;

app.use(express.json());

// Middleware to parse URL-encoded data
app.use(express.urlencoded({ extended: true }));
app.use('/products', require('./routes/productRoute')) ;



app.listen(3000, () => {
    console.log('this server is running on port 3000')
})