import NavBar from "@/components/NavBar";
import { useEffect, useState } from "react";

export default function Cart() {
  const [cartItems, setCartItems] = useState({ cart: [] });

  useEffect(() => {
    async function loadData() {
      const res = await fetch("/api/cart");
      const data = await res.json();
      setCartItems(data);
    }
    loadData();
  }, []);

  async function removeFromCart(id) {
    const res = await fetch(`/api/cart/${id}`, { method: "DELETE" });
    if (res.ok) {
      setCartItems((prevState) => ({
        cart: prevState.cart.filter((item) => item.id !== id),
      }));
    } else {
      console.error('Failed to remove item from cart');
    }
  }

  return (
    <>
    <NavBar/>
      <h1>Cart</h1>
      <h4>Here is our cart:</h4>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          padding: "10px",
        }}
      >
        {cartItems.cart.map((item) => {
          return (
            <div
              key={item.id}
              style={{
                width: "300px",
                border: "1px solid black",
                borderRadius: "10px",
                margin: "10px",
                padding: "10px",
              }}
            >
              <h3>{item.id}</h3>
              <p>{item.quantity}</p>
              <button onClick={() => removeFromCart(item.id)}>Remove</button>
            </div>
          );
        })}
      </div>
    </>
  );
}
