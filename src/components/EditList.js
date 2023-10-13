import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

// Component to manage editing a list.
const EditList = ({ updateList, list, setIsEditingList }) => {
  const [name, setName] = useState(list.name);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Don't let lists be saved with a blank name.
    if (name === '') {
      alert('List name cannot be blank.');
      return;
    }

    // Update the list in the parent component.
    updateList({ name });
    resetForm();
  };

  // Reset the form so it's ready for the next edit.
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
