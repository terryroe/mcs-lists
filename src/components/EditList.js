import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

const EditList = ({ updateList, list, setIsEditingList }) => {
  const [name, setName] = useState(list.name);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name === '') {
      alert('List name cannot be blank.');
      return;
    }

    updateList({ name });
    resetForm();
  };

  const resetForm = () => {
    setName('');
    setIsEditingList(false);
  };

  return (
    <>
      <h4>Edit List Name</h4>
      <Form onSubmit={handleSubmit} className="mt-3">
        <Form.Group className="mb-3" controlId="title">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter the list name"
          />
        </Form.Group>
        <Button variant="secondary" className="mb-4 me-3" onClick={resetForm}>
          Cancel
        </Button>
        <Button variant="primary" type="submit" className="mb-4">
          Submit
        </Button>
      </Form>
    </>
  );
};

export default EditList;
