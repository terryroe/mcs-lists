import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import API_URL from '../data/api';
import { useParams } from 'react-router-dom';

const NewItem = ({ addNewItem, setIsAddingNewItem }) => {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const { listId } = useParams();

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
    addNewItem(data);
  };

  return (
    <Form onSubmit={handleSubmit} className="mt-3">
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
        className="me-3 mb-4"
        onClick={resetForm}
      >
        Cancel
      </Button>
      <Button variant="primary" type="submit" className="mb-4">
        Submit
      </Button>
    </Form>
  );
};

export default NewItem;
