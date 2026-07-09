import KeystaticApp from './keystatic.jsx';

export const metadata = {
  robots: { index: false, follow: false },
  title: 'Led Tehnika Admin',
};

export default function Layout() {
  return (
    <div className="min-h-screen bg-white">
      <KeystaticApp />
    </div>
  );
}
