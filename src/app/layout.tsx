import type { Metadata } from 'next';
import './globals.css';

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'Roadie | Tour-Routing Agent for Independent Musicians',
  description:
    "Roadie tells an indie artist where their fans actually are, and plans the tour to reach them using Qloo's cultural taste graph and deterministic routing.",
  keywords: [
    'tour routing',
    'indie musician',
    'booking agent',
    'qloo',
    'cultural intelligence',
    'taste graph',
    'ticketmaster',
  ],
  authors: [{ name: 'Roadie Team' }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
