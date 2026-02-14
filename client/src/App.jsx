import { useAuth0 } from '@auth0/auth0-react';
import Dashboard from './pages/Dashboard';
import LoginPage from './components/LoginPage';

function App() {
  const { isAuthenticated, isLoading } = useAuth0();

  

  // Auth0 checking if user is logged in
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center 
                      justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 
                          border-b-2 border-blue-600 mx-auto mb-4" />
          <p className="text-gray-500 text-sm">Initializing...</p>
        </div>
      </div>
    );
  }
  return isAuthenticated ?<Dashboard /> : <LoginPage />;
}

export default App;
