import './globals.css';
export const metadata = {
  title: 'Homemade Moussaka — Tufnell Park',
  description: 'Order by Thursday lunch; collect or get North London delivery at the weekend. Proper layers. Proper béchamel.'
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body>{children}</body>
    </html>
  );
}
