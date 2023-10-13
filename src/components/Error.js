import { Link } from 'react-router-dom';

// An error element for displaying a message when there is an error.  Includes a
// link back to the Home page.
const Error = ({ message }) => {
  return (
    <>
      <h1 className="my-4">Error</h1>
      <p>An error occurred.</p>
      <p>
        Please start over at the
        <Link to="/" className="ms-1">
          home page
        </Link>
        .
      </p>
    </>
  );
};

export default Error;
