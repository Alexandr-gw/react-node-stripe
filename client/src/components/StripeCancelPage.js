import {Link} from 'react-router-dom'

 function stripeCancelPage() {
    return (
      <div id="error-page">
        <h3>Canceled!</h3>
        <p>Checkout has been canceled. Go to <Link to='/'> home </Link> page</p>
      </div>
    );
  }

  export default stripeCancelPage