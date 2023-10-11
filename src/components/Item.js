import { useState } from 'react';
import { Accordion, Button, Form } from 'react-bootstrap';

const Item = ({ item, deleteItem, updateItem }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(item.title);
  const [text, setText] = useState(item.text);

  return (
    <>
      <Accordion.Item eventKey={item.id} key={item.id}>
        <Accordion.Header>{item.title}</Accordion.Header>
        <Accordion.Body>
          {isEditing ? (
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                updateItem({ ...item, title, text });
                setIsEditing(false);
              }}
            >
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
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          ) : (
            <>
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
    </>
  );
};

export default Item;
