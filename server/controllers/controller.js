const products = require("../models/productModel");


exports.searchProducts = async (req, res) => {
  try {
    const { categoryName, productId } = req.query; // Use req.query to get query parameters

    let query = {};

    if (categoryName) {
      query.categoryName = categoryName;
    }

    if (productId) {
      query.productId = parseInt(productId, 10); // Ensure productId is a number
    }

    const productsData = await products.find(query);

    if (productsData.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No products found matching the criteria.",
      });
    }

    res.status(200).json({
      success: true,
      data: productsData,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server Error. Unable to fetch products.",
    });
  }
};


