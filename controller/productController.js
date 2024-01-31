
const ProductModel = require('../model/productModel');
const db = require('../config/mongoose');

module.exports.productList = async function (req, res) {

    try {

        // Fetching all the Products
        let product = await ProductModel.find({});

        // Formatting the data to clear understanding
        const formattedProducts = product.map((product) => ({
            id: product.id,
            name: product.name,
            quantity: product.quantity
        }));

        // return the formattted data on success
        return res.status(200).json({

            data: {
                Products: formattedProducts,
            }
        });

    } catch (err) {

        // To view error
        console.log("****", err);

        //Throws error on failure
        return res.status(500).json({
            message: "Error in fetching products"
        });
    }
}

module.exports.createProduct = function (req, res) {

    const products = req.body;
    
    ProductModel.create({
        name: products.product.name,
        quantity: products.product.quantity,
    });


    return res.status(200).send({
        data:
            products
    });
}


module.exports.deleteProduct = async function (req, res) {
    const productId = req.params.id;

    try {
        // Check if the product with the given ID exists
        const existingProduct = await ProductModel.findById(productId);

        if (!existingProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }


        await ProductModel.findByIdAndDelete(productId);


        res.send({ data: { message: 'Product Deleted' } });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" })
    }
}

module.exports.updateQuantity = async function (req, res) {

    const productId = req.params.id;
    const newQuantity = parseInt(req.query.number);

    // let product2 = await ProductModel.findById(productId)
    // console.log(product2) ;

    try {

        const product = await ProductModel.findByIdAndUpdate(productId, { quantity: newQuantity }, { returnOriginal: true });
        return res.status(200).send({
            data: {product: {
                id: product.id,
                name: product.name,
                quantity: product.quantity
            },
                message: "Updated Successfully"
            }
        });

    } catch (err) {
        console.error(err)
    }




}