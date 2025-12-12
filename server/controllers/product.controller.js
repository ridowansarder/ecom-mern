import cloudinary from "../configs/cloudinary.js";
import ProductModel from "../models/product.model.js";

export const getAllProducts = async (req, res) => {
  try {
    const products = await ProductModel.find({});
    res.status(200).json({ products });
  } catch (error) {
    console.error("Get All Products Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const featuredProducts = async (req, res) => {
  try {
    const products = await ProductModel.find({ isFeatured: true }).lean();
    res.status(200).json({ products });
  } catch (error) {
    console.error("Get Featured Products Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const createProduct = async (req, res) => {
  try {
    // Get product details
    const { name, description, price, image, category } = req.body;

    // Upload image to Cloudinary
    let cloudinaryResponse = null;
    if (image) {
      cloudinaryResponse = await cloudinary.uploader.upload(image, {
        folder: "products",
      });
    }

    // Create product
    const product = await ProductModel.create({
      name,
      description,
      price,
      image: cloudinaryResponse?.secure_url
        ? cloudinaryResponse?.secure_url
        : "",
      category,
    });

    // Success response
    res.status(201).json({ product });
  } catch (error) {
    // Error response
    console.error("Create Product Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    // Find product
    const product = await ProductModel.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // delete image from Cloudinary
    if (product.image) {
      const publicId = product.image.split("/").pop().split(".")[0];
      try {
        await cloudinary.uploader.destroy(`products/${publicId}`);
        console.log("Image deleted from Cloudinary");
      } catch (error) {
        console.error("Error deleting image from Cloudinary:", error);
      }
    }

    // Delete product
    await ProductModel.findByIdAndDelete(req.params.id);

    // Success response
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    // Error response
    console.error("Delete Product Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getProductsByCategory = async (req, res) => {
  try {
    // Get products by category
    const products = await ProductModel.find({ category: req.params.category });

    // Success response
    res.status(200).json({ products });
  } catch (error) {
    // Error response
    console.error("Get Products by Category Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const toggleFeaturedProduct = async (req, res) => {
  try {
    // Find product
    const product = await ProductModel.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Toggle isFeatured
    product.isFeatured = !product.isFeatured;
    await product.save();

    // Success response
    res.status(200).json({ message: "Product updated successfully" });
  } catch (error) {
    // Error response
    console.error("Toggle Featured Product Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
