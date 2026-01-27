export default function RegisterLayout({ children }) {
  return (
    <div>
      <header>
        <h1 className="text-2xl font-extrabold">Header 1 </h1>
      </header>
      {children}
      <footer>This is the foot </footer>
    </div>
  );
}
