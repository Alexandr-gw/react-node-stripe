import { Link } from 'react-router-dom'

function CancelPage() {
  return (
    <div id="error-page" className="min-h-screen flex flex-col justify-center items-center bg-gray-100 -my-16">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h3 className="text-3xl font-bold text-red-600 mb-4">Canceled!</h3>
        <p className="text-lg text-gray-700 mb-6">
          Your checkout has been canceled. Don't worry, you can still go back to the <Link to='/' className="text-blue-600 underline hover:text-blue-800 transition">home page</Link> and try again.
        </p>
        <Link to='/'>
          <button className="bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-700 transition">
            Go to Home
          </button>
        </Link>
      </div>
    </div>

  );
}

export default CancelPage