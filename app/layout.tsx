import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Digital Business Card',
  description: 'Interactive 3D Digital Business Card',
  metadataBase: new URL('https://localhost:3000'),
  openGraph: {
    title: 'Digital Business Card',
    description: 'Interactive 3D Digital Business Card',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-surface font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
