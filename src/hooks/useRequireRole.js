import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';

export function useRequireRole(requiredRole) {
  const { profile, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    if (!profile || profile.role !== requiredRole) {
      router.push('/');
    }
  }, [profile, loading]);
}
