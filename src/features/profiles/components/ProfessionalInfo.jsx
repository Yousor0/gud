export default function ProfessionalInfo({ profile }) {
  if (profile.role !== 'professional') return null;
  if (!profile.specialties?.length && !profile.certifications?.length)
    return null;

  return (
    <div className="flex flex-col gap-4">
      {profile.specialties?.length > 0 && (
        <div>
          <h2 className="mb-2 text-sm font-semibold tracking-wide text-gray-500 uppercase">
            Specialties
          </h2>
          <div className="flex flex-wrap gap-2">
            {profile.specialties.map((s, i) => (
              <span
                key={i}
                className="bg-bg-accent rounded-full px-3 py-1 text-sm"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      )}
      {profile.certifications?.length > 0 && (
        <div>
          <h2 className="mb-2 text-sm font-semibold tracking-wide text-gray-500 uppercase">
            Certifications
          </h2>
          <div className="flex flex-wrap gap-2">
            {profile.certifications.map((c, i) => (
              <span
                key={i}
                className="bg-bg-accent rounded-full px-3 py-1 text-sm"
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
