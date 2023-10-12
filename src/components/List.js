import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import API_URL from '../data/api';
import { Accordion, Button, Form } from 'react-bootstrap';
import Item from './Item';

const List = () => {
  const { listId } = useParams();
  const [list, setList] = useState({});
  const [items, setItems] = useState([]);
  const [isAddingNewItem, setIsAddingNewItem] = useState(false);
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (title === '') {
      alert('The new item must have a title');
      return;
    }

    createItem({ title, text });
    resetForm();
  };

  const resetForm = () => {
    setIsAddingNewItem(false);
    setTitle('');
    setText('');
  };

  const createItem = async (newItem) => {
    const response = await fetch(`${API_URL}/${listId}/items`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newItem),
    });
    const data = await response.json();
    setItems(items.concat(data));
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
      <h1 className="my-3">
        {list.name}
        <Button
          variant="primary"
          className="mx-3"
          onClick={() => navigate('./edit')}
        >
          Edit List
        </Button>
        <Button
          variant="danger"
          onClick={() => window.confirm('Delete list and all its items?')}
        >
          Delete List
        </Button>
      </h1>

      {isAddingNewItem ? (
        <>
          <Form onSubmit={handleSubmit}>
            <h4>Add New Item</h4>
            <Form.Group className="mb-3" controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter the item title"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="text">
              <Form.Label>Text</Form.Label>
              <Form.Control
                as="textarea"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter the item text"
              />
            </Form.Group>
            <Button
              variant="secondary"
              type="button"
              className="me-3 mb-3"
              onClick={resetForm}
            >
              Cancel
            </Button>
            <Button variant="primary" type="submit" className="mb-3">
              Submit
            </Button>
          </Form>
        </>
      ) : (
        <Button
          variant="primary"
          className="my-3"
          onClick={() => setIsAddingNewItem(true)}
        >
          New Item
        </Button>
      )}

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
