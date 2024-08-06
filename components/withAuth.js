// app/components/withAuth.js
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';

const withAuth = (WrappedComponent) => {
  return (props) => {
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
};

export default withAuth;
