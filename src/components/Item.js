import { useState } from 'react';
import { Accordion, Button, Form } from 'react-bootstrap';

// Component for displaying, editing, and deleting an item.
const Item = ({ item, deleteItem, updateItem }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(item.title);
  const [text, setText] = useState(item.text);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title === '') {
      alert('Item title cannot be blank.');
      return;
    }
    // Update itemm in the parent component.
    updateItem({ ...item, title, text });
    // Tell parent component editing is finished so it can update the UI.
    setIsEditing(false);
  };

  return (
    <Accordion.Item eventKey={item.id} key={item.id}>
      <Accordion.Header>{item.title}</Accordion.Header>
      <Accordion.Body>
        {isEditing ? (
          // Show the edit form when we are in editing mode.
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId={`title-${item.id}`}>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter the item title"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId={`text-${item.id}`}>
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
              className="me-3"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        ) : (
          <>
            {/* Display the item and show options for editing and deleting. */}
            <p>{item.text}</p>
            <Button
              className="me-3"
              variant="primary"
              onClick={() => {
                setIsEditing(true);
              }}
            >
              Edit
            </Button>
            <Button
              variant="danger"
              onClick={() => {
                deleteItem(item.id);
              }}
            >
              Delete
            </Button>
          </>
        )}
      </Accordion.Body>
    </Accordion.Item>
  );
};

export default Item;
