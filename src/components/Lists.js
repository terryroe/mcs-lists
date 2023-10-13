import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, ListGroup } from 'react-bootstrap';
// Get the api url from a share location.
import API_URL from '../data/api';

// Element for displaying/adding lists.
const Lists = () => {
  const [lists, setLists] = useState([]);
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isAddingNewList, setIsAddingNewList] = useState(false);
  const navigate = useNavigate();

  // Get a list of lists on page load.
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

  // When the list name is submitted, handle creating a list with that name.
  const handleSubmit = (e) => {
    e.preventDefault();

    // Don't let lists be created without a name.
    if (name === '') {
      alert('List name must not be blank.');
      return;
    }

    createList({ name });
    resetForm();
  };

  // Clear the name input and change state of isAddingNewList to false.
  const resetForm = () => {
    setName('');
    setIsAddingNewList(false);
  };

  // Add the new list to the api.  Navigate to the new list when finished.
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
      <h1 className="my-4">Lists</h1>
      {isAddingNewList ? (
        // Display a new list form to add a new list.
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
      ) : (
        // Set state to show the new list form.
        <Button className="mb-3" onClick={() => setIsAddingNewList(true)}>
          New List
        </Button>
      )}

      {lists.length > 0 ? (
        // Display the list of existing lists.
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
