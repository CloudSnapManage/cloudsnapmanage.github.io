"use client";

import { useState, useEffect } from 'react';

// A sample birthdate for Shrijan.
const BIRTH_DATE = "2000-05-15";

export function Age() {
  const [age, setAge] = useState<number | null>(null);

  useEffect(() => {
    // This code runs only on the client, after hydration.
    const birthDate = new Date(BIRTH_DATE);
    const today = new Date();
    let calculatedAge = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      calculatedAge--;
    }
    setAge(calculatedAge);
  }, []); // Empty dependency array ensures this runs once on mount.

  if (age === null) {
    // Render a placeholder during SSR and initial client render to avoid layout shift.
    return <span className="inline-block w-8 h-6 rounded-md animate-pulse bg-muted" />;
  }

  return <span>{age}</span>;
}
