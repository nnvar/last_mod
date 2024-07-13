import NavBar from "@/components/NavBar";
import { useEffect, useState } from "react";
import Link from 'next/link';

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
      setCartItems((prevState) => {
        const updatedCart = prevState.cart.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 };
          }
          return item;
        }).filter(item => item.quantity > 0);
        return { cart: updatedCart };
      });
    } else {
      console.error('Failed to remove item from cart');
    }
  }

  async function incrementQuantity(id, quantity) {
    const res = await fetch(`/api/cart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, quantity: 1 }),
    });

    if (res.ok) {
      setCartItems((prevState) => ({
        cart: prevState.cart.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        ),
      }));
    } else {
      console.error('Failed to increment item quantity');
    }
  }

  return (
    <>
      <NavBar />
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
              <p>Qty: {item.quantity}</p>
              <button onClick={() => incrementQuantity(item.id, item.quantity)}>Increment</button>
              <button onClick={() => removeFromCart(item.id)}>Remove</button>
            </div>
          );
        })}
      </div>
      <Link href="/checkout">
      <button>Checkout</button>
      </Link>
    </>
  );
}
