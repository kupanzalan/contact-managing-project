"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import texts from '../public/data/texts.json';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push('/contact-list');
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="spinnerOverlay">
        <div className="spinnerCenter">
          <span className="loader"></span>
        </div>
        <div className="uploadingImageLoader">{texts.loadingApp}</div>
      </div>
    </main>
  )
}
