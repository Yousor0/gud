export default async function MediaPage({ params }) {
  const { content } = await params;

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-8">
      <p className="text-gray-500">Media page coming soon. (ID: {content})</p>
    </div>
  );
}
