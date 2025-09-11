export default function Testimonials() {
  const items = [
    { text: "Layers were perfect and béchamel silky.", author: "Maria K., NW5" },
    { text: "Best moussaka we’ve had in London.", author: "Tom & Jess, N19" },
    { text: "Picked up hot on Sunday—family devoured it.", author: "Eleni P., N7" },
  ];
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {items.map((t, i) => (
        <figure key={i} className="rounded-2xl bg-white p-5 shadow-sm">
          <blockquote className="text-sm">&ldquo;{t.text}&rdquo;</blockquote>
          <figcaption className="mt-3 text-xs opacity-70">— {t.author}</figcaption>
        </figure>
      ))}
    </div>
  );
}
