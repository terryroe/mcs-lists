import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API_URL from '../data/api';
import { Accordion, Button } from 'react-bootstrap';

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

  const handleDelete = async (itemId) => {
    setItems(items.filter((item) => item.id !== itemId));
    await fetch(`${API_URL}/${listId}/items/${itemId}`, {
      method: 'DELETE',
    });
  };

  return (
    <>
      <h1 className="my-3">{list.name}</h1>

      <Accordion>
        {items.map((item, index) => (
          <Accordion.Item eventKey={index} key={item.id}>
            <Accordion.Header>{item.title}</Accordion.Header>
            <Accordion.Body>
              <p>{item.text}</p>
              <Button
                onClick={() => {
                  handleDelete(item.id);
                }}
              >
                Delete me
              </Button>
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </>
  );
};

export default List;
