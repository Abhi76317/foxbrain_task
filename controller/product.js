const { database } = require("../utils/database")
const id = require("../utils/generate_id")

exports.createProduct = async (req, res, next) => {
    const product_id = id();
    const product_name = req.body.product_name.trim();
    const category_id = req.body.category_id;
    const description = req.body.description;
    const price = req.body.price;

    console.log("product_name",product_name)
    console.log("category_name",category_id)

    const query = `insert into product (product_name, category_id, description, price, id) values ('${product_name}', '${category_id}', '${description}', '${price}', '${product_id}')`

    database.query(query, (err, result) => {
        if (err) {
            next(err)
        }

        else {
            res.status(201).json({ message: "product added successfully" })
        }
    })

}

exports.getProductList = async (req, res, next) => {

    const query = "SELECT product.id, product_name, category_name, description, price FROM product INNER JOIN category ON product.category_id = category.id"

    database.query(query, (err, result) => {
        if (err) {
            next(err)
        }

        else {
            res.status(201).json(result)
        }
    })

}

exports.updateProduct = async (req, res, next) => {
    const id = req.params.id;
    const product_name = req.body.product_name;
    const category_id = req.body.category_id;
    const description = req.body.description;
    const price = req.body.price;


    const query = `UPDATE product SET product_name = '${product_name}', category_id = '${category_id}', description = '${description}', price = '${price}' WHERE id = '${id}' `

    database.query(query, (err, result) => {
        if (err) {
            next(err)
        }
        else if (result.affectedRows == 0) {
            const err = new Error("Date not found")
            next(err);
        }

        else {
            res.status(201).json({ message: "product updated successfully" })
        }
    })

}

exports.deleteProduct = async (req, res, next) => {
    const id = req.params.id;
    const query = `DELETE FROM product WHERE id = '${id}'`

    database.query(query, (err, result) => {
        if (err) {
            next(err)
        }
        else if (result.affectedRows == 0) {
            const err = new Error("Selected Product not found")
            next(err);
        }

        else {
            res.status(201).json({ message: "Product deleted successfully" })
        }
    })
}

exports.getProductDetail = async (req, res, next) => {
    const id = req.params.id;

    const query = `SELECT product.id, product_name, category_name, description, price FROM product INNER JOIN category ON product.category_id = category.id where product.id = '${id}'`

    database.query(query, (err, result) => {
        if (err) {
            next(err)
        }

        else {
            console.log("result",result.length)
            if(result.length <= 0){
                const err = new Error("Data not Found")
                err.statusCode = 500;
                next(err);
            }
            else{

                res.status(201).json(result)
            }
        }
    })

}