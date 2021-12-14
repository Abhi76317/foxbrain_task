const express = require("express");
const router = express.Router();
const product = require("../controller/product")

router.post("/product/add", product.createProduct)

router.get("/product/get", product.getProductList)

router.get("/product/get/detail/:id", product.getProductDetail)

router.patch("/product/update/:id", product.updateProduct)

router.delete("/product/delete/:id", product.deleteProduct)


module.exports = router;