import { Link } from 'react-router-dom'

function SuccessPage() {
  return (
    <div id="success-page" className="min-h-screen flex flex-col justify-center items-center bg-green-50 -mt-16">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h3 className="text-3xl font-bold text-green-600 mb-4">Success!</h3>
        <p className="text-lg text-gray-700 mb-6">
          Your transaction has been completed. You can continue <Link to='/' className="text-blue-600 underline hover:text-blue-800 transition">shopping</Link>.
        </p>
        <Link to='/'>
          <button className="bg-green-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-green-700 transition">
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>

  );
}

export default SuccessPage