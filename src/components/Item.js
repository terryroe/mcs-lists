import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API_URL from '../data/api';

const Item = () => {
  const { listId, itemId } = useParams();
  const [item, setItem] = useState();

  useEffect(() => {
    const getItem = async () => {
      const response = await fetch(`${API_URL}/${listId}/items/${itemId}`);
      const data = await response.json();
      setItem(data);
    };
    getItem();
  }, [listId, itemId]);

  if (!item) {
    return <h2>Loading...</h2>;
  }

  return (
    <>
      <h1>{item.title}</h1>
      <p>{item.text}</p>
    </>
  );
};

export default Item;
