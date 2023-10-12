import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API_URL from '../data/api';
import { Button, Form, ListGroup } from 'react-bootstrap';

const Lists = () => {
  const [lists, setLists] = useState([]);
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isAddingNewList, setIsAddingNewList] = useState(false);
  const navigate = useNavigate();

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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name === '') {
      alert('List title must not be blank');
      return;
    }

    createList({ name });
    resetForm();
  };

  const resetForm = () => {
    setName('');
    setIsAddingNewList(false);
  };

  const createList = async (newList) => {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newList),
    });
    const data = await response.json();
    setLists(lists.concat(data));
    navigate(`./${data.id}`);
  };

  return (
    <>
      <h1>Lists</h1>
      {isAddingNewList ? (
        <>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="new-list">
              <Form.Label>New List Name</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter the list name"
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
        <Button className="my-3" onClick={() => setIsAddingNewList(true)}>
          New List
        </Button>
      )}

      {lists.length > 0 ? (
        <ListGroup>
          {lists.map((list) => (
            <ListGroup.Item key={list.id} action href={`/lists/${list.id}`}>
              {list.name}
            </ListGroup.Item>
          ))}
        </ListGroup>
      ) : isLoading ? (
        <h2>Loading...</h2>
      ) : (
        <h2>No Lists. Create a new one!</h2>
      )}
    </>
  );
};

export default Lists;
