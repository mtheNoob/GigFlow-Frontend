import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function MyApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await api.get("/api/my-applications");
      setApplications(res.data.data || []);
    } catch (err) {
      setError("Failed to load applications");
    } finally {
      setLoading(false);
    }
  };

  const statusBadge = (status) => {
    switch (status) {
      case "hired":
        return "bg-green-100 text-green-700";
      case "rejected":
        return "bg-red-100 text-red-700";
      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  // Loading
  if (loading) {
    return (
      <p className="text-gray-500">
        Loading your applications...
      </p>
    );
  }

  // Error
  if (error) {
    return (
      <p className="text-red-600">
        {error}
      </p>
    );
  }

  // Empty
  if (applications.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6 text-center">
        <p className="text-gray-500">
          You haven’t applied to any gigs yet.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {applications.map((app) => (
        <div
          key={app._id}
          className="bg-white rounded-xl shadow-sm p-5 flex justify-between items-start"
        >
          <div>
            <Link
              to={`/gigs/${app.gigId._id}`}
              className="text-lg font-semibold text-blue-600 hover:underline"
            >
              {app.gigId.title}
            </Link>

            <p className="text-sm text-gray-500 mt-1">
              Gig Budget: ₹{app.gigId.budget}
            </p>

            <p className="text-sm text-gray-700 mt-2">
              Your Bid: ₹{app.price}
            </p>
          </div>

          <span
            className={`text-xs px-3 py-1 rounded-full font-semibold ${statusBadge(
              app.status
            )}`}
          >
            {app.status.toUpperCase()}
          </span>
        </div>
      ))}
    </div>
  );
}

export default MyApplications;
