import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import NavBar from "@/components/NavBar";

export default function Checkout() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const router = useRouter();

  useEffect(() => {
    async function loadCartData() {
      const res = await fetch("/api/cart");
      const data = await res.json();
      setCartItems(data.cart);
    }
    loadCartData();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    const res = await fetch("/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, cartItems }),
    });

    if (res.ok) {
      alert("Order submitted successfully!");
      router.push("/");
    } else {
      alert("Failed to submit order.");
    }
  }

  return (
    <>
      <NavBar />
      <h1>Checkout</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit Order</button>
      </form>
    </>
  );
}
