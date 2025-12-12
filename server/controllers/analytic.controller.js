import UserModel from "../models/user.model.js";
import OrderModel from "../models/order.model.js";
import ProductModel from "../models/product.model.js";

export const getAnalyticsData = async () => {
  const totalUsers = await UserModel.countDocuments();
  const totalProducts = await ProductModel.countDocuments();
  const salesData = await OrderModel.aggregate([
    {
      $group: {
        _id: null,
        totalSales: { $sum: 1 },
        totalRevenue: { $sum: "$totalAmount" },
      },
    },
  ]);

  const { totalSales, totalRevenue } = salesData[0] || {
    totalSales: 0,
    totalRevenue: 0,
  };

  return {
    users: totalUsers,
    products: totalProducts,
    totalSales,
    totalRevenue,
  };
};
