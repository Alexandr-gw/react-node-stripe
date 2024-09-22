import {Link} from 'react-router-dom'

 function CancelPage() {
    return (
      <div id="error-page">
        <h3>Canceled!</h3>
        <p>Checkout has been canceled. Go to <Link to='/'> home </Link> page</p>
      </div>
    );
  }

  export default CancelPage