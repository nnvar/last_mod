import { db } from "@/server/db";

export default function handler(req, res) {
  if (req.method === "POST") {
    const { name, email, cartItems } = req.body;

    if (!name || !email || !cartItems) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newOrder = {
      id: Date.now(), // Or any other unique identifier
      name,
      email,
      cartItems,
      date: new Date().toISOString(),
    };

    db.orders.add(newOrder);

    res.status(200).json({ message: "Order submitted successfully" });
  } else {
    res.status(405).json({ message: "Only POST method is supported" });
  }
}
