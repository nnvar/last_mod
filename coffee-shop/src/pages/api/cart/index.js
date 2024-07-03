import { db } from "@/server/db";

export default function handler(req, res) {
  if (req.method === "GET") {
    const cartItems = db.cart.get();
    res.status(200).json({ cart: cartItems });
  } else if (req.method === "POST") {
    const { id, quantity } = req.body;
    const existingItem = db.cart.getById(id);

    if (existingItem) {
      // If item is already in the cart, update the quantity
      const newQuantity = existingItem.quantity + quantity;
      db.cart.updateById(id, newQuantity);
      res.status(200).json({ message: "Item quantity updated in cart" });
    } else {
      // If item is not in the cart, add it
      db.cart.add({ id, quantity });
      res.status(200).json({ message: "Item added to cart" });
    }
  } else {
    res.status(404).json({ message: "We only support GET and POST requests" });
  }
}
