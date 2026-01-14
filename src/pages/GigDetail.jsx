import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import BidForm from "../components/BidForm";
import BidList from "../components/BidList";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

function GigDetail() {
  const { id } = useParams();
  const { user } = useAuth();

  const [gig, setGig] = useState(null);
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

const fetchGigDetails = async () => {
  try {
    setLoading(true);
    setError("");

    // 1️⃣ Fetch gig
    const gigRes = await api.get("/api/gigs");
    const foundGig = gigRes.data.data.find(
      (g) => g._id === id
    );

    if (!foundGig) {
      setError("Gig not found");
      return;
    }

    setGig(foundGig);

    // 2️⃣ Fetch bids ONLY if owner
    if (user && foundGig.ownerId === user.id) {
      const bidRes = await api.get(`/api/bids/${id}`);
      setBids(bidRes.data.data || []);
    } else {
      setBids([]); // freelancer → no bid list
    }

  } catch (err) {
    setError("Failed to load gig details");
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    fetchGigDetails();
  }, [id]);

  if (loading) {
    return (
      <MainLayout>
        <p className="text-gray-500">Loading gig...</p>
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout>
        <p className="text-red-600">{error}</p>
      </MainLayout>
    );
  }

  const isOwner = user && gig.ownerId === user.id;

  return (
    <MainLayout>
      {/* Gig Info */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex justify-between items-start">
          <h2 className="text-2xl font-semibold text-gray-800">
            {gig.title}
          </h2>

          <span
            className={`text-sm px-3 py-1 rounded-full ${
              gig.status === "open"
                ? "bg-green-100 text-green-700"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {gig.status.toUpperCase()}
          </span>
        </div>

        <p className="mt-4 text-gray-600">
          {gig.description}
        </p>

        <p className="mt-4 text-blue-600 font-semibold">
          Budget: ₹{gig.budget}
        </p>
      </div>

      {/* Freelancer Bid Form */}
      {!isOwner && (
        <div className="mt-6">
          {gig.status === "open" ? (
            <BidForm
              gigId={id}
              onBidSuccess={fetchGigDetails}
            />
          ) : (
            <div className="bg-gray-100 border border-gray-300 rounded-xl p-6 text-center">
              <p className="text-gray-600 font-medium">
                This gig has already been assigned.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Client Bid List */}
      {isOwner && (
        <div className="mt-6">
         
          <BidList
  gigId={gig._id}
  gigStatus={gig.status}
  onGigAssigned={fetchGigDetails}
/>

        </div>
      )}
    </MainLayout>
  );
}

export default GigDetail;
