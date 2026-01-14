import { useEffect, useState } from "react";
import GigCard from "../components/GigCard";
import api from "../services/api";
import MainLayout from "../layouts/MainLayout";

function GigFeed() {
  const [gigs, setGigs] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchGigs = async (query = search) => {
    try {
      setLoading(true);
      setError("");

      const res = await api.get(`/api/gigs?search=${query}`);
      setGigs(res.data.data || []);
    } catch {
      setError("Failed to load gigs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGigs();
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    fetchGigs(value);
  };

  return (
    <MainLayout onGigPosted={fetchGigs}>
      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search gigs by title..."
          value={search}
          onChange={handleSearch}
          className="w-full px-4 py-3 border rounded-lg
                     focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>

      {/* Loading */}
      {loading && (
        <p className="text-gray-500">Loading gigs...</p>
      )}

      {/* Error */}
      {error && (
        <p className="text-red-600">{error}</p>
      )}

      {/* Empty */}
      {!loading && gigs.length === 0 && (
        <p className="text-gray-500">No gigs found.</p>
      )}

      {/* Gig List */}
      <div className="space-y-5">
        {gigs.map((gig) => (
          <GigCard
            key={gig._id}
            _id={gig._id}
            title={gig.title}
            description={gig.description}
            budget={gig.budget}
            status={gig.status}
            ownerId={gig.ownerId}
          />
        ))}
      </div>
    </MainLayout>
  );
}

export default GigFeed;
