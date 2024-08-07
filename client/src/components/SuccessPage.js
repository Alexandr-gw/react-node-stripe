import {Link} from 'react-router-dom'

 function SuccessPage() {
    return (
      <div id="error-page">
        <h3>Success!</h3>
        <p>Your transaction has been complited. Continue  <Link to='/'> shopping </Link> </p>
      </div>
    );
  }

  export default SuccessPage