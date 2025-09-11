"use client";
import { useRef } from "react";

const IMAGES = [
  { src: "/hero-tray.jpg", alt: "Whole tray, golden top" },
  { src: "/slice-lift.jpg", alt: "Slice lift showing layers" },
  { src: "/plated.jpg", alt: "Plated serving with salad" },
  { src: "/process.jpg", alt: "Béchamel pour" },
];

export default function Gallery() {
  const dlg = useRef<HTMLDialogElement>(null);
  const img = useRef<HTMLImageElement>(null);

  return (
    <>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {IMAGES.map((i) => (
          <button
            key={i.src}
            onClick={() => {
              if (img.current && dlg.current) {
                img.current.src = i.src;
                img.current.alt = i.alt;
                dlg.current.showModal();
              }
            }}
            className="overflow-hidden rounded-xl bg-black/5"
          >
            <img
              src={i.src}
              alt={i.alt}
              className="h-32 w-full object-cover md:h-40"
            />
          </button>
        ))}
      </div>
      <dialog ref={dlg} className="rounded-2xl p-0 backdrop:bg-black/50">
        <img ref={img} alt="" />
        <form method="dialog" className="p-3 text-right">
          <button className="rounded-xl border px-3 py-1">Close</button>
        </form>
      </dialog>
    </>
  );
}
