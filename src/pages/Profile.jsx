import MainLayout from "../layouts/MainLayout";

function Profile() {
  return (
    <MainLayout>
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          My Profile
        </h2>
        <p className="text-gray-500 mt-1">
          View and manage your personal information
        </p>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-xl shadow-sm p-6 max-w-xl">
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-500">Full Name</p>
            <p className="text-gray-800 font-medium">John Doe</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Email Address</p>
            <p className="text-gray-800 font-medium">john@example.com</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Account Type</p>
            <p className="text-gray-800 font-medium">
              Client / Freelancer
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Member Since</p>
            <p className="text-gray-800 font-medium">
              January 2026
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default Profile;