
import withAuth from '../components/withAuth';

function ProtectedPage() {
  return <div>Protected Content</div>;
}

export default withAuth(ProtectedPage);
