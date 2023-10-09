import { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import API_URL from '../data/api';

const Lists = () => {
  const [lists, setLists] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getLists = async () => {
      setIsLoading(true);
      const response = await fetch(API_URL);
      const data = await response.json();
      setLists(data);
      setIsLoading(false);
    };
    getLists();
  }, []);

  return (
    <>
      <h1>Lists</h1>
      <Link to="new">
        <h2 className="my-3">New List</h2>
      </Link>

      {lists.length > 0 ? (
        lists.map((list) => (
          <div key={list.id}>
            <Link to={`${list.id}`}>{list.name}</Link>
          </div>
        ))
      ) : isLoading ? (
        <h2>Loading...</h2>
      ) : (
        <h2>No Lists. Create a new one!</h2>
      )}

      <Outlet />
    </>
  );
};

export default Lists;
