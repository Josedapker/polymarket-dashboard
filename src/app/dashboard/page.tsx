import PolymarketEmbedList from '../components/PolymarketEmbedList';

export default function Dashboard() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Polymarket Dashboard</h1>
      <PolymarketEmbedList />
    </div>
  );
}