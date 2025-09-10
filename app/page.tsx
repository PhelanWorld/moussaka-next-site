"use client";

import { useState, useMemo } from 'react';

const whatsapp = "447900000000";

function useOrdersOpen() {
  return useMemo(() => {
    const now = new Date();
    // Calculate next Thursday 12:00 (order cutoff)
    const d = new Date();
    const today = d.getDay();
    const offset = (4 - today + 7) % 7; // 4 = Thu
    d.setDate(d.getDate() + offset);
    d.setHours(12, 0, 0, 0);
    return now < d;
  }, []);
}

function whatsappLink(size: string, qty: number) {
  const text = encodeURIComponent(`Hi! I'd like to order ${qty} ${size} tray of Moussaka.\nName:\nMobile:\nPostcode:\nTimeslot:`);
  return `https://wa.me/${whatsapp}?text=${text}`;
}

export default function Page() {
  const ordersOpen = useOrdersOpen();
  const [qtyHalf, setQtyHalf] = useState(1);
  const [qtyFull, setQtyFull] = useState(1);

  return (
    <main className="max-w-2xl mx-auto p-4 text-[#1f1b16] bg-[#F5EFE6]">
      <h1 className="text-3xl font-bold">Homemade Moussaka, Baked to Order in Tufnell Park</h1>
      <p className="mt-2 text-lg">Order by Thursday lunch; collect or get it delivered at the weekend.</p>
      {ordersOpen ? (
        <a className="mt-4 inline-block px-4 py-2 bg-[#4A1F3D] text-white rounded" href={whatsappLink('full', 1)}>
          Order Now
        </a>
      ) : (
        <p className="mt-4 text-red-700">Orders closed for this weekend</p>
      )}

      <h2 className="mt-8 text-2xl font-semibold">Menu & Pricing</h2>
      <div className="mt-4">
        <h3 className="font-semibold">Half Tray (feeds 3–4): £25</h3>
        <label className="mr-2">Qty</label>
        <input
          type="number"
          min={1}
          value={qtyHalf}
          onChange={(e) => setQtyHalf(Number(e.target.value))}
          className="w-16 border rounded px-2 py-1"
        />
        <a
          className="ml-4 inline-block px-3 py-1 bg-[#4A1F3D] text-white rounded"
          href={whatsappLink('half', qtyHalf)}
        >
          Order Half
        </a>
      </div>
      <div className="mt-4">
        <h3 className="font-semibold">Full Tray (feeds 6–8): £45</h3>
        <label className="mr-2">Qty</label>
        <input
          type="number"
          min={1}
          value={qtyFull}
          onChange={(e) => setQtyFull(Number(e.target.value))}
          className="w-16 border rounded px-2 py-1"
        />
        <a
          className="ml-4 inline-block px-3 py-1 bg-[#4A1F3D] text-white rounded"
          href={whatsappLink('full', qtyFull)}
        >
          Order Full
        </a>
      </div>

      <h2 className="mt-8 text-2xl font-semibold">Delivery & Collection</h2>
      <p className="mt-2">We cover N7 / N19 / NW5 and nearby.</p>
      <ul className="list-disc ml-5">
        <li>Collection: Free</li>
        <li>Delivery within 1 mile: £3</li>
        <li>Delivery 1‑2 miles: £5</li>
      </ul>
      <p className="mt-1 text-sm">Timeslots: Sat 12‑3pm / Sun 12‑3pm</p>

      <h2 className="mt-8 text-2xl font-semibold">Allergens & Safety</h2>
      <ul className="list-disc ml-5 text-sm">
        <li>Contains: Milk, Eggs</li>
        <li>Nut-free recipes but not allergen-free environment</li>
        <li>Registered home food business; EHO guidance followed</li>
      </ul>

      <h2 className="mt-8 text-2xl font-semibold">About the Cook</h2>
      <p className="mt-2 text-sm">Cypriot roots, small-batch cooking, quality sourcing. Restaurant-quality comfort food from your neighbour’s oven.</p>

      <footer className="mt-10 text-sm opacity-70">
        <div>© {new Date().getFullYear()} Letters of Love</div>
        <div>Privacy • Cookies • Registered home food business (Tufnell Park)</div>
      </footer>
    </main>
  );
}
