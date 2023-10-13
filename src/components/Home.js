import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <>
      <h1 className="my-4">Home</h1>
      <p>
        This is an application to create and manage lists of items for any
        purpose.
      </p>
      <Link to="/lists">All Lists</Link>
    </>
  );
};

export default Home;
