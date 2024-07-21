import {Link} from 'react-router-dom'

 function ErrorPage() {
    return (
      <div id="error-page">
        <h3>Oops!</h3>
        <p>Sorry, an unexpected error has occurred. Go to <Link to='/'> home </Link> page</p>
      </div>
    );
  }

  export default ErrorPage