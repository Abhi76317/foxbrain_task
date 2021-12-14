const express = require("express");
const router = express.Router();
const category = require("../controller/category")

router.post("/category/add", category.createCategory)

router.get("/category/get", category.getCategoryList)

router.patch("/category/update/:id", category.updateCategory);

router.delete("/category/delete/:id", category.deleteCategory);

module.exports = router;