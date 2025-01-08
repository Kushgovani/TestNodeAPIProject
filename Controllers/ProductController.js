const Product = require('../Models/ProductModel');


exports.createProduct = async (req, res) => {
    try{
        const NewProduct = {
            ...req.body,
            createdBy: req.user.userId,            
        }
        console.log(NewProduct);
        const newProduct = await Product.create(NewProduct); 
        return res.status(201).send({
            message: 'Product Added Successfully',
            NewProduct: newProduct
        });
    }catch{
        res.status(500).json({message: 'Error Product Not Add Occured'})
    }   
}

exports.getProducts = async (req,res) => {
    try{
        const findAllProduct = await Product.find();
        return res.status(200).send({
            message: 'Product Fetched Successfully',
            Product: findAllProduct
        });
    }catch{
        res.status(500).json({message: 'Error getProducts Occured'})
    }
}

exports.getProduct = async (req, res) => {
    try{
        const findProduct = await Product.find(req.params);
        if(findProduct.length > 0){
            return res.status(201).send({
                message: 'Product Fetched Successfully',
                FindProduct: findProduct
            });
        }else{
            return res.status(404).send({
                message: 'Product Not Found',
                Product: req.params
            });
        }
    }catch{
        res.status(500).json({message: 'Error getProduct Occured'})
    }
}

exports.deleteProduct = async (req,res) => {
 try{
    const deleteProduct = await Product.findOneAndDelete(req.params.id); 
    return res.status(200).send({
        message: 'Product Deleted Successfully',
        DeleteProduct: deleteProduct
    })
 }catch{
    res.status(500).json({message: 'Error deleteProduct Occured'})
 }
}

exports.updateProduct = async (req, res) => {
    try {
        //const { id } = req.params;
        // const updatedProduct = await Product.findOneAndUpdate(
        //     { _id: id },            
        //     req.body,             
        // );

        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body);
        if (updatedProduct) {
            return res.status(200).send({
                message: 'Product Updated Successfully',
                updatedProduct,
            });
        } else {
            return res.status(404).send({
                message: `Product Not Found`,
            });
        }
    } catch (error) {
        console.error('Error updating product:', error.message);
        return res.status(500).send({
            message: 'Server Error',
            error: error.message,
        });
    }
};

exports.getAggregatedProducts = async (req, res) => {
    try {
        const aggregatedData = await Product.aggregate([
            {
                $group: {
                    _id: "$category", 
                    totalProducts: { $sum: 1 }, 
                    averagePrice: { $avg: { $toDouble: "$price" } } 
                }
            }
        ]);
        console.log('aggregatedData',aggregatedData);
        // Return the aggregated data
        return res.status(200).json({
            message: 'Aggregated products retrieved successfully',
            aggregatedData: aggregatedData
        });
    } catch (error) {
        // Handle any errors
        res.status(500).json({
            message: 'An error occurred while aggregating products'
        });
    }
};