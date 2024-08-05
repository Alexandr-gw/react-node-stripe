import {Link} from 'react-router-dom'

 function stripeSuccessPage() {
    return (
      <div id="error-page">
        <h3>Success!</h3>
        <p>Your transaction has been complited. Continue  <Link to='/'> shopping </Link> </p>
      </div>
    );
  }

  export default stripeSuccessPage