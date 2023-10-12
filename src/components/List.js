import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Accordion, Button } from 'react-bootstrap';
import API_URL from '../data/api';
import Item from './Item';
import NewItem from './NewItem';
import EditList from './EditList';

const List = () => {
  const { listId } = useParams();
  const [list, setList] = useState({});
  const [items, setItems] = useState([]);
  const [isAddingNewItem, setIsAddingNewItem] = useState(false);
  const [isEditingList, setIsEditingList] = useState(false);

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

  const updateList = async (listToUpdate) => {
    setList({ ...list, ...listToUpdate });
    await fetch(`${API_URL}/${listId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(listToUpdate),
    });
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

      {isEditingList ? (
        <EditList
          updateList={updateList}
          list={list}
          setIsEditingList={setIsEditingList}
        />
      ) : (
        <>
          <Button
            variant="secondary"
            className="me-3"
            onClick={() => setIsEditingList(true)}
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
        </>
      )}

      <h2 className="my-3">List Items</h2>
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
