const { Router } = require("express");
const { getProducts } = require("../controllers/productsController");
const db = require("../DB.js");
const router = Router();
router.get("/", getProducts);

module.exports = router;
