"use client";

import { useMemo, useState } from "react";
import Map from "./components/Map";
import EmailCapture from "./components/EmailCapture";
import Testimonials from "./components/Testimonials";
import Gallery from "./components/Gallery";

const CONFIG = {
  whatsapp: "447900000000", // CHANGE: digits only, no "+"
  pricing: { half: 25, full: 45 },
  capacity: 10,
};

function useCutoff() {
  return useMemo(() => {
    const now = new Date();
    const d = new Date();
    const day = d.getDay(); // 0 Sun .. 4 Thu
    const diff = 4 - day;
    d.setDate(d.getDate() + diff);
    d.setHours(12, 0, 0, 0);
    return { open: now < d, closesAt: d };
  }, []);
}

function wa(size: "half" | "full", qty = 1) {
  const text = encodeURIComponent(
    `Hi! I'd like to order a ${size === "half" ? "Half" : "Full"} tray (${qty}x).\nOption: Collection/Delivery\nName:\nMobile:\nPostcode:\nTimeslot:`
  );
  return `https://wa.me/${CONFIG.whatsapp}?text=${text}`;
}

export default function Page() {
  const { open } = useCutoff();
  const [qtyH, setQtyH] = useState(1);
  const [qtyF, setQtyF] = useState(1);
  const traysLeft = 7; // demo

  return (
    <main className="mx-auto max-w-5xl px-4 py-10 space-y-12">
      {/* Top Nav */}
      <header className="flex items-center justify-between">
        <div className="font-semibold">Homemade Moussaka</div>
        <nav className="flex gap-4 text-sm opacity-80">
          <a href="#menu">Menu</a>
          <a href="#delivery">Delivery</a>
          <a href="#gallery">Gallery</a>
          <a href="#faq">FAQ</a>
        </nav>
      </header>

      {/* Hero */}
      <section>
        <h1 className="text-3xl md:text-5xl font-semibold">
          Homemade Moussaka, Baked to Order in Tufnell Park
        </h1>
        <p className="mt-3 text-lg">
          Order by Thursday lunch; collect or get it delivered at the weekend. Proper layers. Proper béchamel.
        </p>
        <div className="mt-5 flex items-center gap-3">
          {open ? (
            <a
              className="rounded-2xl bg-[#4A1F3D] px-5 py-3 text-white"
              href={wa("full", 1)}
              target="_blank"
            >
              Order Now
            </a>
          ) : (
            <a
              className="rounded-2xl bg-[#4A1F3D] px-5 py-3 text-white"
              href="#notify"
            >
              Notify me for next weekend
            </a>
          )}
          <span className="rounded-full bg-[#6D7B52]/10 px-3 py-1 text-sm">
            {traysLeft} trays left · closes Thu 12:00
          </span>
        </div>
      </section>

      {/* Menu */}
      <section id="menu" className="space-y-4">
        <h2 className="text-2xl md:text-3xl font-semibold">Menu & Pricing</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h3 className="font-semibold">Half Tray (3–4)</h3>
            <p className="opacity-80">£{CONFIG.pricing.half}</p>
            <div className="mt-3 flex items-center gap-2">
              <label className="text-sm">Qty</label>
              <input
                className="w-16 rounded-md border px-2 py-1"
                type="number"
                min={1}
                value={qtyH}
                onChange={(e) => setQtyH(parseInt(e.target.value || "1"))}
              />
              <a
                className="ml-auto rounded-xl bg-[#4A1F3D] px-4 py-2 text-white"
                href={wa("half", qtyH)}
                target="_blank"
              >
                Order Half
              </a>
            </div>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h3 className="font-semibold">Full Tray (6–8)</h3>
            <p className="opacity-80">£{CONFIG.pricing.full}</p>
            <div className="mt-3 flex items-center gap-2">
              <label className="text-sm">Qty</label>
              <input
                className="w-16 rounded-md border px-2 py-1"
                type="number"
                min={1}
                value={qtyF}
                onChange={(e) => setQtyF(parseInt(e.target.value || "1"))}
              />
              <a
                className="ml-auto rounded-xl bg-[#4A1F3D] px-4 py-2 text-white"
                href={wa("full", qtyF)}
                target="_blank"
              >
                Order Full
              </a>
            </div>
          </div>
        </div>
        <p className="text-sm opacity-80">
          Contains: milk, eggs. Prepared in a domestic kitchen (not allergen-free).
        </p>
      </section>

      {/* Delivery & Map */}
      <section id="delivery" className="space-y-4">
        <h2 className="text-2xl md:text-3xl font-semibold">Delivery & Collection</h2>
        <p>We cover N7 / N19 / NW5 and nearby.</p>
        <Map />
        <ul className="mt-3 space-y-1 text-sm">
          <li>Collection: Free</li>
          <li>Delivery within 1 mile: £3</li>
          <li>Delivery 1–2 miles: £5</li>
          <li>Timeslots: Sat 12–3pm / Sun 12–3pm</li>
        </ul>
      </section>

      {/* Testimonials */}
      <section className="space-y-4">
        <h2 className="text-2xl md:text-3xl font-semibold">What locals say</h2>
        <Testimonials />
      </section>

      {/* Gallery */}
      <section id="gallery" className="space-y-4">
        <h2 className="text-2xl md:text-3xl font-semibold">Gallery</h2>
        <Gallery />
      </section>

      {/* Allergens & About */}
      <section className="grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold">Allergens & Safety</h3>
          <ul className="mt-2 list-disc pl-5 text-sm space-y-1">
            <li>Contains: Milk, Eggs.</li>
            <li>Nut-free recipes but not an allergen-free environment.</li>
            <li>Registered home food business; EHO guidance followed.</li>
          </ul>
        </div>
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold">About the Cook</h3>
          <p className="mt-2 text-sm">
            Cypriot roots, small-batch cooking, quality sourcing. Restaurant-quality comfort food from your neighbour’s oven.
          </p>
        </div>
      </section>

      {/* Email capture */}
      <section id="notify" className="space-y-3">
        <h2 className="text-xl font-semibold">Sold out? Get early access</h2>
        <EmailCapture />
      </section>

      {/* Footer */}
      <footer className="border-t pt-6 text-sm opacity-70">
        <div>© {new Date().getFullYear()} Letters of Love</div>
        <div className="mt-1">
          <a className="underline" href="/privacy">
            Privacy
          </a>{" "}
          • {" "}
          <a className="underline" href="/terms">
            T&Cs
          </a>{" "}
          • Registered home food business (Tufnell Park)
        </div>
      </footer>
    </main>
  );
}
