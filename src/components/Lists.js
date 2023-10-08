import { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import API_URL from '../data/api';

const Lists = () => {
  const [lists, setLists] = useState([]);

  useEffect(() => {
    const getLists = async () => {
      const response = await fetch(API_URL);
      const data = await response.json();
      setLists(data);
    };
    getLists();
  }, []);

  return (
    <>
      <h1>Lists</h1>
      <Link to="new">
        <h2>New List</h2>
      </Link>

      {lists.map((list) => (
        <div key={list.id}>
          <Link to={`${list.id}`}>{list.name}</Link>
        </div>
      ))}

      <Outlet />
    </>
  );
};

export default Lists;
