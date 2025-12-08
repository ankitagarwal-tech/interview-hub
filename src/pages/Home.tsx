import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-8">
      <h1 className="text-6xl font-bold">Interview Hub</h1>
      <Link 
        to="/nested-check-box" 
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        Nested Checkbox
      </Link>
    </div>
  );
}

export default Home;
