import { Link } from 'react-router-dom';

// Display for when a url/page is not found.
const NotFound = () => {
  return (
    <>
      <h1 className="my-4">Not Found</h1>
      <p>Sorry, the page you were looking for doesn't exist.</p>
      <p>
        {/* Link back to the home page so the user can start again. */}
        Start over at the
        <Link to="/" className="ms-1">
          home page
        </Link>
        .
      </p>
    </>
  );
};

export default NotFound;
