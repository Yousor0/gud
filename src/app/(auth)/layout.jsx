import Header from '@/components/Header';

export default function RegisterLayout({ children }) {
  return (
    <>
      <Header />
      <div>{children}</div>
    </>
  );
}
