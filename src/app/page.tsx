import Link from 'next/link';

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">Welcome to Polymarket Dashboard</h1>
      <p className="mb-4">
        Explore and analyze prediction markets with real-time data from Polymarket.
      </p>
      <ul className="list-disc list-inside mb-4">
        <li>View current markets and their statistics</li>
        <li>Track market volumes and liquidity</li>
        <li>Stay updated with the latest prediction trends</li>
      </ul>
      <div className="flex flex-col space-y-2">
        <Link href="/dashboard" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-center">
          Go to Dashboard
        </Link>
      </div>
    </main>
  );
}
