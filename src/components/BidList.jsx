import { useEffect, useState } from "react";
import api from "../services/api";

function BidList({ gigId, gigStatus, onGigAssigned }) {
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hiring, setHiring] = useState(null);

  const fetchBids = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/api/bids/${gigId}`);
      setBids(res.data.data || []);
    } catch (err) {
      console.error("Failed to load bids");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBids();
  }, [gigId]);

  const handleHire = async (bidId) => {
    try {
      setHiring(bidId);
      await api.patch(`/api/bids/${bidId}/hire`);

      // Update UI instantly
      const updated = bids.map((bid) =>
        bid._id === bidId
          ? { ...bid, status: "hired" }
          : { ...bid, status: "rejected" }
      );

      setBids(updated);
      onGigAssigned(); // notify parent
    } catch (err) {
      alert("Hiring failed");
    } finally {
      setHiring(null);
    }
  };

  if (loading) {
    return <p className="text-gray-500">Loading bids...</p>;
  }

  if (bids.length === 0) {
    return (
      <p className="text-gray-500 text-center mt-4">
        No bids received yet.
      </p>
    );
  }

  return (
    <div className="space-y-4 mt-4">
      {bids.map((bid) => (
        <div
          key={bid._id}
          className={`border rounded-lg p-4 flex justify-between items-start ${
            bid.status === "rejected" ? "opacity-50" : ""
          }`}
        >
          <div>
            <p className="font-medium text-gray-800">
              {bid.freelancerId.name}
            </p>
            <p className="text-sm text-gray-600 mt-1">
              {bid.message}
            </p>
            <p className="mt-2 font-semibold text-blue-600">
              ₹{bid.price}
            </p>

            {bid.status !== "pending" && (
              <span
                className={`inline-block mt-2 text-xs px-2 py-1 rounded-full font-semibold ${
                  bid.status === "hired"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {bid.status.toUpperCase()}
              </span>
            )}
          </div>

          {gigStatus === "open" && bid.status === "pending" && (
            <button
              disabled={hiring === bid._id}
              onClick={() => handleHire(bid._id)}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition disabled:opacity-50"
            >
              {hiring === bid._id ? "Hiring..." : "Hire"}
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

export default BidList;
