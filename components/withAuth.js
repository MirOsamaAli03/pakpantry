// app/components/withAuth.js
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';

const withAuth = (WrappedComponent) => {
  const AuthComponent = (props) => {
    const { currentUser } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!currentUser) {
        router.push('/signin');
      }
    }, [currentUser, router]);

    if (!currentUser) {
      return null; // Or a loading spinner
    }

    return <WrappedComponent {...props} />;
  };

  // Assign a display name to the HOC for better debugging
  if (process.env.NODE_ENV !== 'production') {
    AuthComponent.displayName = `withAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;
  }

  return AuthComponent;
};

export default withAuth;
