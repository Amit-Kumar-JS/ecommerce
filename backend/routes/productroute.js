const express = require("express");
const { getAllProducts , createProduct, updateProduct, deleteproduct, getproductDetails } = require("../controller/productcontroller");
const { isAuthenticatedUser, authorizeRoles} = require("../middlewares/Auth");

const router = express.Router();

router.route("/products").get(getAllProducts);
router.route("/product/new").post(isAuthenticatedUser,authorizeRoles("admin"),createProduct);
router.route("/product/:id").get(getproductDetails).put(isAuthenticatedUser,authorizeRoles("admin"),updateProduct).delete(isAuthenticatedUser,authorizeRoles("admin"),deleteproduct);

module.exports = router;