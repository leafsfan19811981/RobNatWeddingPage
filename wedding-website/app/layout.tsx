import "./globals.css";

export const metadata = {
  title: "Robert & Natalie — Wedding",
  description: "Wedding details, RSVP, travel, and FAQs."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
