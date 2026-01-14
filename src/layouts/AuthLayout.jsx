function AuthLayout({ children }) {
  return (
    <div className="min-h-screen flex bg-gray-100">

      {/* Left Branding Section */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-blue-700 to-indigo-800 text-white px-16 py-12 flex-col justify-between">

        {/* Top Content */}
        <div>
          <h1 className="text-4xl font-bold tracking-wide">
            GigFlow
          </h1>

          <p className="mt-4 text-xl font-medium text-blue-100 leading-snug">
            Hire smart.<br />
            Work better. Grow faster.
          </p>

          {/* Decorative Divider */}
          <div className="mt-6 w-16 h-1 bg-white/30 rounded-full"></div>

          {/* Supporting Text */}
          <p className="mt-6 text-sm text-blue-200 max-w-md leading-relaxed">
            A modern freelance marketplace designed to connect talent with
            opportunity — faster, simpler, and smarter.
          </p>
        </div>

        {/* Bottom Footer */}
        <div>
          <p className="text-xs text-blue-300">
            © {new Date().getFullYear()} GigFlow. All rights reserved.
          </p>
          <p className="text-xs text-blue-400 mt-1">
            Developed by Deeksha Nayak
          </p>
        </div>


      </div>

      {/* Right Content Section */}
      <div className="flex w-full lg:w-1/2 items-center justify-center px-6">
        <div className="w-full max-w-md bg-white rounded-xl shadow-xl p-8">
          {children}
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
