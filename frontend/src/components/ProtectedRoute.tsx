import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
    isLoggedIn: boolean,
    children: React.ReactNode
}

function ProtectedRoute({ isLoggedIn, children }: ProtectedRouteProps) {
  if (!isLoggedIn) {
    return <Navigate to="/signin" replace />;
  }

  return children;
}

export default ProtectedRoute;