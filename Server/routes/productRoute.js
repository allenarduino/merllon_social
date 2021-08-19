const express = require("express");
const router = express.Router();
const db = require("../database");
const auth = require("../middlewares/auth");
const path = require("path");
const cloudinary = require("../middlewares/cloudinary");
const upload = require("../middlewares/multer");

//Create Product

const type = upload.single("product_img");
router.post("/create_product", type, auth, async function(req, res) {
  const result = await cloudinary.uploader.upload(req.file.path);
  console.log(result);
  const target_path = result.secure_url;
  const name = req.body.name;
  const user_id = req.user_id;
  const price = req.body.price;
  const phone_number = req.body.phone_number;
  const description = req.body.description;
  const inputData = [
    name,
    price,
    target_path,
    description,
    phone_number,
    user_id
  ];
  const sql = `INSERT INTO products(name,price,product_img,description,phone_number,user_id) 
  VALUES (?,?,?,?,?,?)`;
  db.query(sql, inputData, function(err, data) {
    console.log(inputData);
    res.status(200).json({
      message: "Product Created"
    });
  });
});

// For displaying products on homepage
router.get("/products", (req, res) => {
  const sql = `SELECT* FROM products,users WHERE users.user_id=products.user_id 
  ORDER BY products.id DESC`;
  db.query(sql, function(err, data) {
    res.status(200).json({ products: data });
  });
});

//For user to view his/her own products
router.get("/my_products", auth, (req, res) => {
  const user_id = req.user_id;
  const sql = `SELECT* FROM products,users WHERE  products.user_id=? 
  AND users.user_id=products.user_id
  ORDER BY products.id DESC`;
  db.query(sql, [user_id], function(err, data) {
    res.status(200).json({ my_products: data });
  });
});

//For user to delete a post
router.delete("/delete_product", (req, res) => {
  const product_id = req.body.product_id;
  console.log(product_id);
  const sql = `DELETE FROM products WHERE id=?`;
  db.query(sql, [product_id], function(err, data) {
    res.status(200).json({
      mesaage: "Product Deleted"
    });
  });
});

module.exports = router;
