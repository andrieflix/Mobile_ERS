'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RespondersPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to main users page with responder filter applied
    router.push('/users?type=RESPONDER');
  }, [router]);

  return (
    <div className="h-[calc(100vh-6rem)] flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );
} 