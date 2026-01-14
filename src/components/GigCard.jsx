import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

function GigCard({
  _id,
  title,
  description,
  budget,
  status = "open",
  ownerId,
}) {
  const { user } = useAuth();
  const isOwner = user?._id === ownerId;

  const [showBids, setShowBids] = useState(false);
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(false);
  const [gigStatus, setGigStatus] = useState(status);
  const [hiringId, setHiringId] = useState(null);

  const toggleBids = async () => {
    if (!isOwner || !_id) return;

    if (!showBids && bids.length === 0) {
      try {
        setLoading(true);
        const res = await api.get(`/api/bids/${_id}`);
        setBids(res.data.data || []);
      } catch {
        alert("Failed to load bids");
      } finally {
        setLoading(false);
      }
    }

    setShowBids(!showBids);
  };

  const handleHire = async (bidId) => {
    try {
      setHiringId(bidId);

      await api.patch(`/api/bids/${bidId}/hire`);
      console.log("🟢 Hire API call completed");


      // 🔥 Optimistic UI update
      const updatedBids = bids.map((bid) =>
        bid._id === bidId
          ? { ...bid, status: "hired" }
          : { ...bid, status: "rejected" }
      );

      setBids(updatedBids);
      setGigStatus("assigned");
      console.log("🟢 Hire button clicked");
      console.log("🟢 Hiring bidId:", bidId);

    } catch {
      alert("Failed to hire freelancer");
    } finally {
      setHiringId(null);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition">
      {/* Header */}
      <div className="flex items-start justify-between">
        <h3 className="text-xl font-semibold text-gray-800">
          {title}
        </h3>

        <span
          className={`text-xs font-semibold px-3 py-1 rounded-full ${
            gigStatus === "open"
              ? "bg-green-100 text-green-700"
              : "bg-gray-200 text-gray-600"
          }`}
        >
          {gigStatus.toUpperCase()}
        </span>
      </div>

      {/* Description */}
      <p className="mt-3 text-gray-600">{description}</p>

      {/* Footer */}
      <div className="mt-5 flex items-center justify-between">
        <span className="text-blue-600 font-semibold">
          Budget: ₹{budget}
        </span>

        {/* 👑 CLIENT */}
        {isOwner && (
          <button
            onClick={toggleBids}
            className="text-blue-600 font-medium hover:underline"
          >
            {showBids ? "Hide Bids" : "View Bids"}
          </button>
        )}

        {/* 👤 FREELANCER */}
        {!isOwner && gigStatus === "open" && (
          <Link
            to={`/gigs/${_id}`}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            View Details
          </Link>
        )}
      </div>

      {/* 🔽 BIDS SECTION (ONLY OWNER) */}
      {isOwner && showBids && (
        <div className="mt-5 border-t pt-4 space-y-3">
          {loading && (
            <p className="text-sm text-gray-500">
              Loading bids...
            </p>
          )}

          {!loading && bids.length === 0 && (
            <p className="text-sm text-gray-500">
              No bids received yet.
            </p>
          )}

          {!loading &&
            bids.map((bid) => (
              <div
                key={bid._id}
                className={`border rounded-lg p-3 flex justify-between items-start ${
                  bid.status === "rejected" ? "opacity-50" : ""
                }`}
              >
                <div>
                  <p className="font-medium text-gray-800">
                    {bid.freelancerId?.name || "Freelancer"}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    {bid.message}
                  </p>
                  <p className="text-sm font-semibold text-blue-600 mt-1">
                    ₹{bid.price}
                  </p>

                  <span
                    className={`inline-block mt-2 text-xs px-2 py-1 rounded-full font-semibold ${
                      bid.status === "hired"
                        ? "bg-green-100 text-green-700"
                        : bid.status === "rejected"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {bid.status.toUpperCase()}
                  </span>
                </div>

                {/* HIRE BUTTON */}
                {gigStatus === "open" &&
                  bid.status === "pending" && (
                    <button
                      disabled={hiringId === bid._id}
                      onClick={() => handleHire(bid._id)}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition disabled:opacity-50"
                    >
                      {hiringId === bid._id
                        ? "Hiring..."
                        : "Hire"}
                    </button>
                  )}
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

export default GigCard;
