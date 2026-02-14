import { useAuth0 } from '@auth0/auth0-react';

const LogoutButton = () => {
  const { logout, user } = useAuth0();

  return (
    <div className="flex items-center gap-3">

      {/* Show logged in user's email */}
      <span className="text-sm text-gray-500 hidden sm:block">
        {user?.email}
      </span>

      {/* User profile picture from Auth0 */}
      {user?.picture && (
        <img
          src={user.picture}
          alt={user.name}
          className="w-8 h-8 rounded-full border-2 border-gray-200"
        />
      )}

      {/* Sign out button */}
      <button
        onClick={() => logout({
          logoutParams: {
            returnTo: window.location.origin
          }
        })}
        className="bg-gray-100 hover:bg-red-50 text-gray-600 
                   hover:text-red-600 text-sm font-medium 
                   px-4 py-2 rounded-lg transition-all duration-200 
                   border border-gray-200 hover:border-red-200"
      >
        Sign Out
      </button>
    </div>
  );
};

export default LogoutButton;