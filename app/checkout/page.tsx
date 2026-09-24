"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  icon?: string;
  state?: string;
  market?: string;
  seller?: string;
};

export default function CheckoutPage() {
  const [cart, setCart] = useState<CartItem[]>([]);

  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [state, setState] = useState("");
  const [lga, setLga] = useState("");
  const [instructions, setInstructions] = useState("");

  useEffect(() => {
    const savedCart = localStorage.getItem("marketlinkCart");

    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);

        if (Array.isArray(parsedCart)) {
          setCart(parsedCart);
        }
      } catch (error) {
        console.error("Failed to load cart:", error);
      }
    }
  }, []);

  const subtotal = cart.reduce(
    (total, item) =>
      total +
      Number(item.price) * Number(item.quantity),
    0
  );

  const deliveryFee = cart.length > 0 ? 3000 : 0;

  const total = subtotal + deliveryFee;

  function placeOrder() {
    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    if (!customerName.trim()) {
      alert("Please enter your full name.");
      return;
    }

    if (!phone.trim()) {
      alert("Please enter your phone number.");
      return;
    }

    if (!address.trim()) {
      alert("Please enter your delivery address.");
      return;
    }

    if (!state) {
      alert("Please select your state.");
      return;
    }

    if (!lga.trim()) {
      alert("Please enter your LGA.");
      return;
    }

    const trackingId =
      "MLK-NG-" +
      Math.floor(
        100000 + Math.random() * 900000
      );

    const order = {
      id: Date.now(),

      trackingId,

      customer: {
        name: customerName.trim(),
        phone: phone.trim(),
        address: address.trim(),
        state,
        lga,
        instructions: instructions.trim(),
      },

      items: cart,

      subtotal,

      deliveryFee,

      total,

      status: "Ordered",

      createdAt: new Date().toISOString(),
    };

    const existingOrders = JSON.parse(
      localStorage.getItem("marketlinkOrders") || "[]"
    );

    localStorage.setItem(
      "marketlinkOrders",
      JSON.stringify([
        order,
        ...existingOrders,
      ])
    );

    localStorage.removeItem("marketlinkCart");

    alert(
      `Order placed successfully!\n\nTracking ID: ${trackingId}`
    );

    window.location.href = "/orders";
  }

  return (
    <main className="min-h-screen bg-gray-50 p-5 md:p-10">
      <div className="mx-auto max-w-5xl">

        {/* HEADER */}

        <div className="mb-8">

          <Link
            href="/cart"
            className="font-bold text-green-700"
          >
            ← Back to Cart
          </Link>

          <h1 className="mt-5 text-3xl font-bold">
            Checkout
          </h1>

          <p className="mt-2 text-gray-600">
            Enter your delivery information before
            placing your order.
          </p>

        </div>

        {cart.length === 0 ? (

          /* EMPTY CART */

          <div className="rounded-3xl bg-white p-10 text-center shadow-sm">

            <div className="text-5xl">
              🛒
            </div>

            <h2 className="mt-4 text-2xl font-bold">
              Your cart is empty
            </h2>

            <p className="mt-2 text-gray-600">
              Add some products before checking out.
            </p>

            <Link
              href="/marketplace"
              className="mt-6 inline-block rounded-xl bg-green-700 px-6 py-3 font-bold text-white"
            >
              Browse Marketplace
            </Link>

          </div>

        ) : (

          <div className="grid gap-8 lg:grid-cols-3">

            {/* CUSTOMER INFORMATION */}

            <div className="lg:col-span-2">

              <div className="rounded-3xl bg-white p-6 shadow-sm md:p-8">

                <h2 className="text-2xl font-bold">
                  Delivery Information
                </h2>

                <p className="mt-2 text-sm text-gray-500">
                  Where should we deliver your order?
                </p>

                {/* NAME */}

                <div className="mt-6">

                  <label className="mb-2 block font-semibold">
                    Full Name
                  </label>

                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) =>
                      setCustomerName(e.target.value)
                    }
                    placeholder="Enter your full name"
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-green-600"
                  />

                </div>

                {/* PHONE */}

                <div className="mt-5">

                  <label className="mb-2 block font-semibold">
                    Phone Number
                  </label>

                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) =>
                      setPhone(e.target.value)
                    }
                    placeholder="e.g. 08012345678"
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-green-600"
                  />

                </div>

                {/* STATE */}

                <div className="mt-5">

                  <label className="mb-2 block font-semibold">
                    State
                  </label>

                  <select
                    value={state}
                    onChange={(e) =>
                      setState(e.target.value)
                    }
                    className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:border-green-600"
                  >

                    <option value="">
                      Select your state
                    </option>

                    <option>
                      Abia
                    </option>

                    <option>
                      Adamawa
                    </option>

                    <option>
                      Akwa Ibom
                    </option>

                    <option>
                      Anambra
                    </option>

                    <option>
                      Bauchi
                    </option>

                    <option>
                      Bayelsa
                    </option>

                    <option>
                      Benue
                    </option>

                    <option>
                      Borno
                    </option>

                    <option>
                      Cross River
                    </option>

                    <option>
                      Delta
                    </option>

                    <option>
                      Ebonyi
                    </option>

                    <option>
                      Edo
                    </option>

                    <option>
                      Ekiti
                    </option>

                    <option>
                      Enugu
                    </option>

                    <option>
                      Gombe
                    </option>

                    <option>
                      Imo
                    </option>

                    <option>
                      Jigawa
                    </option>

                    <option>
                      Kaduna
                    </option>

                    <option>
                      Kano
                    </option>

                    <option>
                      Katsina
                    </option>

                    <option>
                      Kebbi
                    </option>

                    <option>
                      Kogi
                    </option>

                    <option>
                      Kwara
                    </option>

                    <option>
                      Lagos
                    </option>

                    <option>
                      Nasarawa
                    </option>

                    <option>
                      Niger
                    </option>

                    <option>
                      Ogun
                    </option>

                    <option>
                      Ondo
                    </option>

                    <option>
                      Osun
                    </option>

                    <option>
                      Oyo
                    </option>

                    <option>
                      Plateau
                    </option>

                    <option>
                      Rivers
                    </option>

                    <option>
                      Sokoto
                    </option>

                    <option>
                      Taraba
                    </option>

                    <option>
                      Yobe
                    </option>

                    <option>
                      Zamfara
                    </option>

                    <option>
                      Federal Capital Territory
                    </option>

                  </select>

                </div>

                {/* LGA */}

                <div className="mt-5">

                  <label className="mb-2 block font-semibold">
                    LGA
                  </label>

                  <input
                    type="text"
                    value={lga}
                    onChange={(e) =>
                      setLga(e.target.value)
                    }
                    placeholder="Enter your LGA"
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-green-600"
                  />

                </div>

                {/* ADDRESS */}

                <div className="mt-5">

                  <label className="mb-2 block font-semibold">
                    Delivery Address
                  </label>

                  <textarea
                    value={address}
                    onChange={(e) =>
                      setAddress(e.target.value)
                    }
                    placeholder="House number, street, area, landmark..."
                    rows={4}
                    className="w-full resize-none rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-green-600"
                  />

                </div>

                {/* INSTRUCTIONS */}

                <div className="mt-5">

                  <label className="mb-2 block font-semibold">
                    Delivery Instructions
                    <span className="ml-2 text-sm font-normal text-gray-400">
                      Optional
                    </span>
                  </label>

                  <textarea
                    value={instructions}
                    onChange={(e) =>
                      setInstructions(e.target.value)
                    }
                    placeholder="Example: Call me when you arrive."
                    rows={3}
                    className="w-full resize-none rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-green-600"
                  />

                </div>

              </div>

            </div>

            {/* ORDER SUMMARY */}

            <div>

              <div className="sticky top-5 rounded-3xl bg-white p-6 shadow-sm">

                <h2 className="text-xl font-bold">
                  Order Summary
                </h2>

                <div className="mt-5 space-y-4">

                  {cart.map((item) => (

                    <div
                      key={item.id}
                      className="flex justify-between gap-3 border-b pb-4"
                    >

                      <div>

                        <p className="font-semibold">
                          {item.icon || "📦"}{" "}
                          {item.name}
                        </p>

                        <p className="mt-1 text-sm text-gray-500">
                          Quantity: {item.quantity}
                        </p>

                      </div>

                      <strong>
                        ₦
                        {(
                          Number(item.price) *
                          Number(item.quantity)
                        ).toLocaleString()}
                      </strong>

                    </div>

                  ))}

                </div>

                {/* TOTALS */}

                <div className="mt-6 space-y-3">

                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      Subtotal
                    </span>

                    <strong>
                      ₦{subtotal.toLocaleString()}
                    </strong>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      Delivery
                    </span>

                    <strong>
                      ₦{deliveryFee.toLocaleString()}
                    </strong>
                  </div>

                  <div className="border-t pt-4">

                    <div className="flex justify-between text-xl">

                      <strong>
                        Total
                      </strong>

                      <strong className="text-green-700">
                        ₦{total.toLocaleString()}
                      </strong>

                    </div>

                  </div>

                </div>

                {/* PLACE ORDER */}

                <button
                  onClick={placeOrder}
                  className="mt-6 w-full rounded-xl bg-green-700 px-5 py-4 font-bold text-white hover:bg-green-800"
                >
                  Place Order
                </button>

                <p className="mt-4 text-center text-xs text-gray-500">
                  Your delivery information will be
                  shared with the rider assigned to
                  your order.
                </p>

              </div>

            </div>

          </div>

        )}

      </div>
    </main>
  );
}