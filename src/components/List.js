import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import API_URL from '../data/api';
import { Accordion, Button } from 'react-bootstrap';
import Item from './Item';
import NewItem from './NewItem';

const List = () => {
  const { listId } = useParams();
  const [list, setList] = useState({});
  const [items, setItems] = useState([]);
  const [isAddingNewItem, setIsAddingNewItem] = useState(false);
  const navigate = useNavigate();

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

  const addNewItem = (itemToAdd) => {
    setItems(items.concat(itemToAdd));
  };

  const updateItem = async (itemToUpdate) => {
    setItems(
      items.map((item) =>
        item.id === itemToUpdate.id ? { ...item, ...itemToUpdate } : item
      )
    );
    await fetch(`${API_URL}/${listId}/items/${itemToUpdate.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(itemToUpdate),
    });
  };

  const deleteItem = async (itemId) => {
    if (!window.confirm('Are you sure you want to delete this item?')) {
      return;
    }
    setItems(items.filter((item) => item.id !== itemId));
    await fetch(`${API_URL}/${listId}/items/${itemId}`, {
      method: 'DELETE',
    });
  };

  return (
    <>
      <h1 className="mt-2">{list.name}</h1>
      {isAddingNewItem ? (
        <NewItem
          addNewItem={addNewItem}
          setIsAddingNewItem={setIsAddingNewItem}
        />
      ) : (
        <Button
          variant="primary"
          className="my-3 me-3"
          onClick={() => setIsAddingNewItem(true)}
        >
          New Item
        </Button>
      )}

      <Button
        variant="secondary"
        className="me-3"
        onClick={() => navigate('./edit')}
      >
        Edit List
      </Button>
      <Button
        variant="danger"
        className="me-3"
        onClick={() => window.confirm('Delete list and all its items?')}
      >
        Delete List
      </Button>
      <Accordion>
        {items.map((item) => (
          <Item
            key={item.id}
            item={item}
            deleteItem={deleteItem}
            updateItem={updateItem}
          />
        ))}
      </Accordion>
    </>
  );
};

export default List;
