import { useAuth0 } from '@auth0/auth0-react';

const LoginPage = () => {
  const { loginWithRedirect, isLoading } = useAuth0();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 
                    flex items-center justify-center px-4">
      <div className="bg-white dark:bg-gray-800  rounded-3xl shadow-xl p-8 sm:p-12 
                      w-full max-w-md text-center">

        {/* Icon */}
        <div className="text-6xl mb-6">🌤</div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">
          Weather Analytics
        </h1>
        <p className="text-gray-500 dark:text-gray-500 mb-8">
          Sign in to view real-time weather comfort rankings
          for cities around the world
        </p>

        {/* Login Button */}
        <button
          onClick={() => loginWithRedirect()}
          disabled={isLoading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white 
                     font-semibold py-3 px-6 rounded-xl transition-all 
                     duration-200 disabled:opacity-50 disabled:cursor-not-allowed
                     shadow-md hover:shadow-lg text-lg"
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="animate-spin rounded-full h-5 w-5 
                               border-b-2 border-white" />
              Loading...
            </span>
          ) : (
            'Sign In'
          )}
        </button>

        {/* Note */}
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-6">
          Access is restricted to authorized users only.
        </p>
      </div>
    </div>
  );
};

export default LoginPage;