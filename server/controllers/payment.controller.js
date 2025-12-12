import { stripe } from "../configs/stripe.js";
import OrderModel from "../models/order.model.js";


export const createCheckoutSession = async (req, res) => {
  try {
    // Get products
    const { products } = req.body;

    // Validate products array
    if (!Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ message: "Invalid products array" });
    }

    let totalAmount = 0;

    const lineItems = products.map((product) => {
      const amount = product.price * 100; // Convert to cents
      totalAmount += amount * product.quantity;

      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: product.name,
            images: [product.image],
          },
          unit_amount: amount,
        },
        quantity: product.quantity || 1,
      };
    });

    // Create stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/purchase-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/purchase-cancel`,
      metadata: {
        userId: req.user._id.toString(),
        products: JSON.stringify(
          products.map((product) => ({
            id: product.id,
            quantity: product.quantity,
            price: product.price,
          }))
        ),
      },
    });

    // Send checkout session id
    res.status(200).json({
      sessionId: session.id,
      url: session.url,
      message: "Success",
      totalAmount: totalAmount / 100,
    });
  } catch (error) {
    // Error response
    console.error("Create Checkout Session Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const checkoutSuccess = async (req, res) => {
  try {
    const { sessionId } = req.body;
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status === "paid") {
      const products = JSON.parse(session.metadata.products);
      const newOrder = new OrderModel({
        user: session.metadata.userId,
        products: products.map((product) => ({
          id: product.id,
          quantity: product.quantity,
          price: product.price,
        })),
        totalAmount: session.amount_total / 100,
        stripeSessionId: sessionId,
      });

      await newOrder.save();

      res.status(200).json({
        success: true,
        message: "Payment successful",
        orderId: newOrder._id,
      });
    }
  } catch (error) {
    // Error response
    console.error("Checkout Success Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
