'use client';

import ProfessionalCard from '../../../features/profiles/components/ProfessionalCard';

export default function ProfessionalResults({ professionals }) {
  if (professionals.length === 0) return null;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {professionals?.map((pro) => (
        <ProfessionalCard key={pro.user_id} pro={pro} />
      ))}
    </div>
  );
}
