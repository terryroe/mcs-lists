import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Accordion, Button } from 'react-bootstrap';
import API_URL from '../data/api';
import Item from './Item';
import NewItem from './NewItem';
import EditList from './EditList';

// A component for managing a list and the items it contains.
const List = () => {
  // Get the id of the list from the url.
  const { listId } = useParams();
  const [list, setList] = useState({});
  const [items, setItems] = useState([]);
  const [isAddingNewItem, setIsAddingNewItem] = useState(false);
  const [isEditingList, setIsEditingList] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Get the list associated with the listId from the api.
    const getList = async () => {
      try {
        const response = await fetch(`${API_URL}/${listId}`);
        // Handle api errors.
        if (!response.ok) {
          throw new Error(response.status);
        }
        const data = await response.json();
        setList(data);
        getItems();
      } catch (e) {
        console.error('Error getting List --', e);
        // Display the error page.
        navigate('/error');
      }
    };
    // Get the items associated with the list (listId) from the api.
    const getItems = async () => {
      try {
        const response = await fetch(`${API_URL}/${listId}/items`);
        // Handle api errors.
        if (!response.ok) {
          throw new Error(response.status);
        }
        const data = await response.json();
        setItems(data);
      } catch (e) {
        console.error('Error getting Items --', e);
        // Display the error page.
        navigate('/error');
      }
    };
    getList();
  }, [listId, navigate]);

  // Pass this function to NewItem component so it can be called to update the
  // list of items in this component.
  const addNewItem = (itemToAdd) => {
    setItems(items.concat(itemToAdd));
  };

  // Pass this function to EditList component so it can be called to update the
  // list in this component.
  const updateList = async (listToUpdate) => {
    setList({ ...list, ...listToUpdate });
    await fetch(`${API_URL}/${listId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(listToUpdate),
    });
  };

  // Pass this function to the Item component so it can be called to update the
  // item in this component and update the list of items with the updated item.
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

  // Handle deleting a list.
  const deleteList = async () => {
    if (
      !window.confirm(
        'Are you sure you want to delete this list and all of its items?'
      )
    ) {
      return;
    }

    // If we delete the list, we want to remove all the items from the list
    // first.
    items.forEach(async (item) => {
      await fetch(`${API_URL}/${listId}/items/${item.id}`, {
        method: 'DELETE',
      });
    });

    // Delete the list from the api.
    await fetch(`${API_URL}/${listId}`, {
      method: 'DELETE',
    });

    // Go back to the list of lists.
    navigate('/lists');
  };

  // Pass this function to the Item component so it can be called to remove the
  // item in this component.
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

      {isEditingList ? (
        // Use the EditList component for making changes to a list.
        <EditList
          updateList={updateList}
          list={list}
          setIsEditingList={setIsEditingList}
        />
      ) : (
        <>
          {/* Allow for editing and deleting lists. */}
          <Button
            variant="secondary"
            className="me-3"
            onClick={() => setIsEditingList(true)}
          >
            Edit List
          </Button>
          <Button variant="danger" className="me-3" onClick={deleteList}>
            Delete List
          </Button>
        </>
      )}

      <h2 className="my-3">List Items</h2>
      {isAddingNewItem ? (
        // Use the NewItem component for creating a new item in a list.
        <NewItem
          addNewItem={addNewItem}
          setIsAddingNewItem={setIsAddingNewItem}
        />
      ) : (
        // Start the process of adding a new item.
        <Button
          variant="primary"
          className="mb-3"
          onClick={() => setIsAddingNewItem(true)}
        >
          New Item
        </Button>
      )}
      {items.length === 0 ? (
        <h3>Create some new items</h3>
      ) : (
        // Display a list of all items utilizing the Item component for each.
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
      )}
    </>
  );
};

export default List;
