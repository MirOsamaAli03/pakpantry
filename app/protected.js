// pages/protected.js
import ProtectedRoute from '/components/ProtectedRoute';

const ProtectedPage = () => {
  return (
    <ProtectedRoute>
      <h1>This is a protected page</h1>
    </ProtectedRoute>
  );
};

export default ProtectedPage;
