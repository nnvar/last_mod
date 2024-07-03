import { db } from "@/server/db";

export default function handler(req, res) {
  if (req.method === "DELETE") {
    console.log("req query here", req.query);
    const id = req.query.id;
    const numberId = Number(id);
    db.cart.delete(numberId);
    res.status(200).json({ message: "Cart item removed" });
  } else if (req.method === "PUT") {
    const { id, quantity } = req.body;
    const numberId = Number(id);
    try {
      const item = db.cart.getById(numberId);
      if (item) {
        const newQuantity = item.quantity + quantity;
        if (newQuantity <= 0) {
          db.cart.delete(numberId);
          res.status(200).json({ message: "Cart item removed" });
        } else {
          db.cart.updateById(numberId, newQuantity);
          res.status(200).json({ message: "Cart item updated", quantity: newQuantity });
        }
      } else {
        res.status(404).json({ message: "Cart item not found" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else {
    res.status(404).json({ message: "We only support DELETE and PUT requests" });
  }
}
