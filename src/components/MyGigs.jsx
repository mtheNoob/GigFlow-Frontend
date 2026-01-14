import { useEffect, useState } from "react";
import GigCard from "../components/GigCard";
import api from "../services/api";

function MyGigs() {
  const [gigs, setGigs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchMyGigs = async () => {
    try {
      setLoading(true);
      const res = await api.get("/api/my-gigs");
      setGigs(res.data.data || []);
    } catch (err) {
      setError("Failed to load your gigs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyGigs();
  }, []);

  return (
    <>
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
      </h2>

      {loading && (
        <p className="text-gray-500">Loading your gigs...</p>
      )}

      {error && (
        <p className="text-red-600">{error}</p>
      )}

      {!loading && gigs.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm p-6 text-center">
          <p className="text-gray-500">
            You haven’t posted any gigs yet.
          </p>
        </div>
      )}

      <div className="space-y-5">
        {gigs.map((gig) => (
          <GigCard
            key={gig._id}
            _id={gig._id}
            title={gig.title}
            description={gig.description}
            budget={gig.budget}
            status={gig.status}
          />
        ))}
      </div>
    </>
  );
}

export default MyGigs;
