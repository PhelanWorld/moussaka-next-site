"use client";

import { useMemo, useState } from 'react';

const CONFIG = {
  business: {
    name: "Homemade Moussaka, Baked to Order in Tufnell Park",
    whatsappNumber: "447900000000",
    instagram: "",
  },
  pricing: {
    half: 25,
    full: 45,
  },
  delivery: {
    radiusText: "We cover N7 / N19 / NW5 and nearby.",
    fees: [
      { label: "Collection", price: 0 },
      { label: "Delivery within 1 mile", price: 3 },
      { label: "Delivery 1–2 miles", price: 5 },
    ],
    timeslots: ["Sat 12–3pm", "Sun 12–3pm"],
  },
  cutoff: {
    weekday: 4,
    hour: 12,
    minute: 0,
    tz: "Europe/London",
  },
  payments: {
    stripeHalf: "",
    stripeFull: "",
  },
};

function useCutoffState() {
  return useMemo(() => {
    const now = new Date();
    const d = new Date(now);
    const day = d.getDay();
    const diff = CONFIG.cutoff.weekday - day;
    d.setDate(d.getDate() + diff);
    d.setHours(CONFIG.cutoff.hour, CONFIG.cutoff.minute, 0, 0);
    const ordersOpen = now < d;
    return { ordersOpen, closesAt: d };
  }, []);
}

function whatsAppOrderLink(opts: { size: 'half' | 'full'; qty?: number; delivery?: string }) {
  const qty = opts.qty ?? 1;
  const text = encodeURIComponent(
    `Hi! I'd like to order a ${opts.size === 'half' ? 'Half tray' : 'Full tray'} of Moussaka (${qty}x).\n` +
      `Option: ${opts.delivery ?? 'Collection'}.\n\nName:\nMobile:\nPostcode:\nPreferred timeslot:`
  );
  return `https://wa.me/${CONFIG.business.whatsappNumber}?text=${text}`;
}

export default function Page() {
  const { ordersOpen } = useCutoffState();
  const [qtyHalf, setQtyHalf] = useState(1);
  const [qtyFull, setQtyFull] = useState(1);

  return (
    <main className="min-h-screen bg-[#F5EFE6] text-[#1f1b16]">
      {/* HERO */}
      <section className="mx-auto max-w-5xl px-4 py-12 md:py-16">
        <h1 className="text-3xl md:text-5xl font-semibold tracking-tight">
          {CONFIG.business.name}
        </h1>
        <p className="mt-3 text-lg md:text-xl">
          Order by Thursday lunch; collect or get it delivered at the weekend. Proper layers. Proper béchamel.
        </p>
        <p className="mt-2 text-sm opacity-80">
          Small weekly batch • North London delivery • Real kitchen, real food
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          {ordersOpen ? (
            <a
              className="rounded-2xl px-5 py-3 bg-[#4A1F3D] text-white hover:opacity-95"
              href={whatsAppOrderLink({ size: 'full', qty: 1 })}
              target="_blank"
              rel="noreferrer"
            >
              Order Now
            </a>
          ) : (
            <a
              className="rounded-2xl px-5 py-3 bg-[#4A1F3D] text-white hover:opacity-95"
              href="https://forms.gle/"
              target="_blank"
              rel="noreferrer"
            >
              Notify me
            </a>
          )}
          <a
            className="rounded-2xl px-5 py-3 border border-[#4A1F3D]/30 hover:bg-white/60"
            href="#menu"
          >
            See menu & pricing
          </a>
          <span className="ml-2 inline-flex items-center rounded-full bg-[#6D7B52]/10 px-3 py-1 text-sm">
            Only 10 trays each weekend
          </span>
        </div>

        {!ordersOpen && (
          <p className="mt-3 text-sm">
            Orders closed for this weekend. Cutoff is Thu 12:00. <span className="opacity-70">(Reopens Monday morning.)</span>
          </p>
        )}
      </section>

      {/* HOW IT WORKS */}
      <section className="mx-auto max-w-5xl px-4 py-10">
        <h2 className="text-2xl md:text-3xl font-semibold">How it works</h2>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <h3 className="font-semibold">Pre-order</h3>
            <p className="text-sm mt-1">
              Choose half or full tray by <strong>Thu 12:00</strong>.
            </p>
          </div>
          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <h3 className="font-semibold">We bake</h3>
            <p className="text-sm mt-1">Freshly made in a small weekly batch.</p>
          </div>
          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <h3 className="font-semibold">Collect/Deliver</h3>
            <p className="text-sm mt-1">
              Pick up locally or we deliver in North London.
            </p>
          </div>
        </div>
      </section>

      {/* MENU */}
      <section id="menu" className="mx-auto max-w-5xl px-4 py-10">
        <h2 className="text-2xl md:text-3xl font-semibold">Menu & pricing</h2>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold">Half Tray (feeds 3–4)</h3>
            <p className="mt-1">£{CONFIG.pricing.half}</p>
            <p className="mt-2 text-sm opacity-80">
              Aubergine, potatoes, spiced mince, silky béchamel.
            </p>
            <div className="mt-4 flex items-center gap-2">
              <label className="text-sm">Qty</label>
              <input
                type="number"
                min={1}
                value={qtyHalf}
                onChange={(e) => setQtyHalf(parseInt(e.target.value || '1'))}
                className="w-16 rounded-md border px-2 py-1"
              />
              <a
                className="ml-auto rounded-xl px-4 py-2 bg-[#4A1F3D] text-white hover:opacity-95"
                href={
                  CONFIG.payments.stripeHalf
                    ? CONFIG.payments.stripeHalf
                    : whatsAppOrderLink({ size: 'half', qty: qtyHalf })
                }
                target="_blank"
                rel="noreferrer"
              >
                Order Half
              </a>
            </div>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold">Full Tray (feeds 6–8)</h3>
            <p className="mt-1">£{CONFIG.pricing.full}</p>
            <p className="mt-2 text-sm opacity-80">
              Aubergine, potatoes, spiced mince, silky béchamel.
            </p>
            <div className="mt-4 flex items-center gap-2">
              <label className="text-sm">Qty</label>
              <input
                type="number"
                min={1}
                value={qtyFull}
                onChange={(e) => setQtyFull(parseInt(e.target.value || '1'))}
                className="w-16 rounded-md border px-2 py-1"
              />
              <a
                className="ml-auto rounded-xl px-4 py-2 bg-[#4A1F3D] text-white hover:opacity-95"
                href={
                  CONFIG.payments.stripeFull
                    ? CONFIG.payments.stripeFull
                    : whatsAppOrderLink({ size: 'full', qty: qtyFull })
                }
                target="_blank"
                rel="noreferrer"
              >
                Order Full
              </a>
            </div>
          </div>
        </div>

        <p className="mt-4 text-sm opacity-80">
          Contains: milk, eggs. Prepared in a domestic kitchen (not allergen-free).
        </p>
      </section>

      {/* DELIVERY */}
      <section className="mx-auto max-w-5xl px-4 py-10">
        <h2 className="text-2xl md:text-3xl font-semibold">
          Delivery & collection
        </h2>
        <p className="mt-2">{CONFIG.delivery.radiusText}</p>
        <ul className="mt-3 space-y-1 text-sm">
          {CONFIG.delivery.fees.map((f) => (
            <li key={f.label}>
              {f.label}: {f.price === 0 ? 'Free' : `£${f.price}`}
            </li>
          ))}
        </ul>
        <p className="mt-3 text-sm">
          Timeslots: {CONFIG.delivery.timeslots.join(' / ')}
        </p>
      </section>

      {/* SOCIAL PROOF / ABOUT */}
      <section className="mx-auto max-w-5xl px-4 py-10 grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold">Allergens & food safety</h3>
          <ul className="mt-2 list-disc pl-5 text-sm space-y-1">
            <li>Contains: Milk, Eggs.</li>
            <li>Nut-free recipes but not an allergen-free environment.</li>
            <li>Ingredients + reheating/storage printed on the lid.</li>
            <li>Registered home food business; EHO guidance followed.</li>
          </ul>
        </div>
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold">About the cook</h3>
          <p className="mt-2 text-sm">
            Cypriot roots, small-batch cooking, quality sourcing. Restaurant-quality comfort food from your neighbour’s oven.
          </p>
          {CONFIG.business.instagram && (
            <p className="mt-3 text-sm">
              <a
                className="underline"
                href={CONFIG.business.instagram}
                target="_blank"
                rel="noreferrer"
              >
                Instagram
              </a>
            </p>
          )}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="mx-auto max-w-5xl px-4 pb-16">
        <div className="rounded-2xl bg-[#4A1F3D] text-white p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center gap-4">
          <div className="text-lg md:text-xl font-semibold">
            Order for this weekend
          </div>
          <div className="text-sm opacity-90">
            Orders close Thu 12:00 or when sold out.
          </div>
          <div className="md:ml-auto">
            {ordersOpen ? (
              <a
                className="rounded-xl px-5 py-3 bg-white text-[#4A1F3D] hover:opacity-90 inline-block"
                href={whatsAppOrderLink({ size: 'full', qty: 1 })}
                target="_blank"
                rel="noreferrer"
              >
                Start order on WhatsApp
              </a>
            ) : (
              <a
                className="rounded-xl px-5 py-3 bg-white text-[#4A1F3D] hover:opacity-90 inline-block"
                href="https://forms.gle/"
                target="_blank"
                rel="noreferrer"
              >
                Sold out? Get early access
              </a>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="mx-auto max-w-5xl px-4 pb-10 opacity-70 text-sm">
        <div>© {new Date().getFullYear()} Letters of Love</div>
        <div className="mt-1">
          Privacy • Cookies • Registered home food business (Tufnell Park)
        </div>
      </footer>
    </main>
  );
}
