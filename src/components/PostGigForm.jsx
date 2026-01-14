import { useState } from "react";
import api from "../services/api";

function PostGigForm({ onSubmit }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await api.post("/api/gigs", {
        title,
        description,
        budget,
      });

      if (res.data.data) {
        onSubmit(); // close modal / refresh
      } else {
        setError(res.data.message || "Failed to post gig");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Error */}
      {error && (
        <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">
          {error}
        </p>
      )}

      {/* Title */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Gig Title
        </label>
        <input
          type="text"
          placeholder="e.g. Frontend Developer Needed"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="mt-1 w-full px-4 py-2 border rounded-lg 
                     focus:ring-2 focus:ring-blue-600 focus:outline-none"
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          rows="4"
          placeholder="Describe the work requirements..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 w-full px-4 py-2 border rounded-lg 
                     focus:ring-2 focus:ring-blue-600 focus:outline-none"
        />
      </div>

      {/* Budget */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Budget (₹)
        </label>
        <input
          type="number"
          placeholder="50000"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          required
          className="mt-1 w-full px-4 py-2 border rounded-lg 
                     focus:ring-2 focus:ring-blue-600 focus:outline-none"
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className={`w-full py-2 rounded-lg font-medium transition ${
          loading
            ? "bg-blue-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700 text-white"
        }`}
      >
        {loading ? "Posting..." : "Post Gig"}
      </button>
    </form>
  );
}

export default PostGigForm;
