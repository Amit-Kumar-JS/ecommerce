const express = require("express");
const { getAllProducts , createProduct, updateProduct, deleteproduct, getproductDetails } = require("../controller/productcontroller");

const router = express.Router();

router.route("/products").get(getAllProducts);
router.route("/product/new").post(createProduct);
router.route("/product/:id").get(getproductDetails).put(updateProduct).delete(deleteproduct);

module.exports = router;