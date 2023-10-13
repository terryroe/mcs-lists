import { Link } from 'react-router-dom';

const Error = ({ message }) => {
  return (
    <>
      <h1 className="my-4">Error</h1>
      <p>An error occured.</p>
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
