import { useEffect, useState } from 'react';
import { Link, Outlet, useParams } from 'react-router-dom';
import API_URL from '../data/api';
import { Alert, NavLink, Button } from 'react-bootstrap';

const List = () => {
  const { listId } = useParams();
  const [list, setList] = useState({});
  const [items, setItems] = useState([]);

  useEffect(() => {
    const getList = async () => {
      const response = await fetch(`${API_URL}/${listId}`);
      const data = await response.json();
      setList(data);
      getItems();
    };
    const getItems = async () => {
      const response = await fetch(`${API_URL}/${listId}/items`);
      const data = await response.json();
      setItems(data);
    };
    getList();
  }, [listId]);

  return (
    <>
      <h1>{list.name}</h1>

      {items.map((item) => (
        <Alert
          key={item.id}
          className="d-flex align-items-center justify-content-between"
        >
          <Link to={`items/${item.id}`} as={Link}>
            {item.title}
          </Link>
          <Button>Delete me</Button>
        </Alert>
      ))}

      <Outlet />
    </>
  );
};

export default List;
