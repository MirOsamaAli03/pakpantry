// components/Logout.js
"use client";

import { Button } from '@mui/material';
import { signOut } from 'firebase/auth';
import { auth } from '@/app/firebase/fire';
import { useRouter } from 'next/navigation';

export default function Logout() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert('Logged out successfully!');
      router.push('/login'); // Redirect to login page after logout
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Button variant="outlined" color="inherit" onClick={handleLogout}>
      Logout
    </Button>
  );
}
