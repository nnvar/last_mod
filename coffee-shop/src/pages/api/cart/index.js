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
  } else if (req.method === "DELETE") {
    const id = parseInt(req.query.id, 10);
    const existingItem = db.cart.getById(id);

    if (existingItem) {
      if (existingItem.quantity > 1) {
        db.cart.updateById(id, existingItem.quantity - 1);
        res.status(200).json({ message: "Item quantity decremented" });
      } else {
        db.cart.delete(id);
        res.status(200).json({ message: "Item removed from cart" });
      }
    } else {
      res.status(404).json({ message: "Item not found in cart" });
    }
  } else {
    res.status(404).json({ message: "We only support GET, POST, and DELETE requests" });
  }
}
