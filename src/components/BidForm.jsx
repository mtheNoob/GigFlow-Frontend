// // function BidForm() {
// //   return (
// //     <div className="bg-white rounded-xl shadow-sm p-6">
// //       <h3 className="text-lg font-semibold text-gray-800">
// //         Submit Your Bid
// //       </h3>

// //       <form className="mt-4 space-y-4">
// //         {/* Message */}
// //         <div>
// //           <label className="block text-sm font-medium text-gray-700">
// //             Proposal Message
// //           </label>
// //           <textarea
// //             rows="4"
// //             placeholder="Explain why you're a good fit for this gig..."
// //             className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none"
// //           />
// //         </div>

// //         {/* Price */}
// //         <div>
// //           <label className="block text-sm font-medium text-gray-700">
// //             Bid Amount (₹)
// //           </label>
// //           <input
// //             type="number"
// //             placeholder="45000"
// //             className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none"
// //           />
// //         </div>

// //         <button
// //           type="submit"
// //           className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
// //         >
// //           Submit Bid
// //         </button>
// //       </form>
// //     </div>
// //   );
// // }

// // export default BidForm;
// // import { useState } from "react";
// // import api from "../services/api";

// // function BidForm({ gigId, onBidSuccess }) {
// //   const [message, setMessage] = useState("");
// //   const [price, setPrice] = useState("");
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState("");

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setError("");
// //     setLoading(true);

// //     try {
// //       const res = await api.post("/api/bids", {
// //         gigId,
// //         message,
// //         price,
// //       });

// //       if (res.data.data) {
// //         setMessage("");
// //         setPrice("");
// //         onBidSuccess(); // refresh gig details
// //       } else {
// //         setError(res.data.message || "Failed to submit bid");
// //       }
// //     } catch (err) {
// //       setError("Something went wrong. Please try again.");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="bg-white rounded-xl shadow-sm p-6">
// //       <h3 className="text-lg font-semibold text-gray-800 mb-4">
// //         Submit Your Bid
// //       </h3>

// //       {/* Error */}
// //       {error && (
// //         <p className="mb-4 text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">
// //           {error}
// //         </p>
// //       )}

// //       <form onSubmit={handleSubmit} className="space-y-4">
// //         {/* Message */}
// //         <div>
// //           <label className="block text-sm font-medium text-gray-700">
// //             Proposal Message
// //           </label>
// //           <textarea
// //             rows="4"
// //             placeholder="Explain why you're a good fit for this gig..."
// //             value={message}
// //             onChange={(e) => setMessage(e.target.value)}
// //             required
// //             className="mt-1 w-full px-4 py-2 border rounded-lg 
// //                        focus:ring-2 focus:ring-blue-600 focus:outline-none"
// //           />
// //         </div>

// //         {/* Price */}
// //         <div>
// //           <label className="block text-sm font-medium text-gray-700">
// //             Bid Amount (₹)
// //           </label>
// //           <input
// //             type="number"
// //             placeholder="45000"
// //             value={price}
// //             onChange={(e) => setPrice(e.target.value)}
// //             required
// //             className="mt-1 w-full px-4 py-2 border rounded-lg 
// //                        focus:ring-2 focus:ring-blue-600 focus:outline-none"
// //           />
// //         </div>

// //         {/* Submit */}
// //         <button
// //           type="submit"
// //           disabled={loading}
// //           className={`w-full py-2 rounded-lg font-medium transition ${
// //             loading
// //               ? "bg-blue-400 cursor-not-allowed"
// //               : "bg-blue-600 hover:bg-blue-700 text-white"
// //           }`}
// //         >
// //           {loading ? "Submitting..." : "Submit Bid"}
// //         </button>
// //       </form>
// //     </div>
// //   );
// // }

// // export default BidForm;
// import { useState } from "react";
// import api from "../services/api";

// function BidForm({ gigId, onBidSuccess }) {
//   const [message, setMessage] = useState("");
//   const [price, setPrice] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [submitted, setSubmitted] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       await api.post("/api/bids", {
//         gigId,
//         message,
//         price,
//       });

//       setSubmitted(true);
//       onBidSuccess?.();
//     } catch (err) {
//       alert(err.response?.data?.message || "Failed to submit bid");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (submitted) {
//     return (
//       <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-green-700">
//         ✅ You have successfully submitted your bid.
//       </div>
//     );
//   }

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       <textarea
//         required
//         value={message}
//         onChange={(e) => setMessage(e.target.value)}
//         placeholder="Explain why you're a good fit..."
//         className="w-full p-3 border rounded-lg"
//       />

//       <input
//         required
//         type="number"
//         value={price}
//         onChange={(e) => setPrice(e.target.value)}
//         placeholder="Bid Amount (₹)"
//         className="w-full p-3 border rounded-lg"
//       />

//       <button
//         disabled={loading}
//         className="w-full bg-blue-600 text-white py-2 rounded-lg"
//       >
//         {loading ? "Submitting..." : "Submit Bid"}
//       </button>
//     </form>
//   );
// }

// export default BidForm;
import { useState } from "react";
import api from "../services/api";

function BidForm({ gigId, onBidSuccess }) {
  const [message, setMessage] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post("/api/bids", {
        gigId,
        message,
        price,
      });

      setSubmitted(true);
      onBidSuccess?.();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to submit bid");
    } finally {
      setLoading(false);
    }
  };

  /* ✅ Success State */
  if (submitted) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-xl p-5 text-green-700">
        <h4 className="font-semibold mb-1">Bid Submitted</h4>
        <p className="text-sm">
          Your proposal has been sent to the client successfully.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Submit Your Bid
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Message */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Proposal Message
          </label>
          <textarea
            required
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Explain why you're a good fit for this gig..."
            className="w-full px-4 py-3 border rounded-lg 
                       focus:ring-2 focus:ring-blue-600 
                       focus:outline-none resize-none"
          />
        </div>

        {/* Price */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Bid Amount (₹)
          </label>
          <input
            required
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="45000"
            className="w-full px-4 py-3 border rounded-lg 
                       focus:ring-2 focus:ring-blue-600 
                       focus:outline-none"
          />
        </div>

        {/* Actions */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={loading}
            className={`px-6 py-2 rounded-lg font-medium transition
              ${
                loading
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
          >
            {loading ? "Submitting..." : "Submit Bid"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default BidForm;
