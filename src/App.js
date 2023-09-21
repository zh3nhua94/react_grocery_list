import React, {useState} from 'react';
import Header from './Header';
import Content from './Content';
import Footer from './Footer';
import AddItem from './AddItem';
import SearchItem from './SearchItem';

function App() {
  const [items, setItems] = useState(() => {
    if(localStorage.getItem('shoppinglist') == null) {
      console.log('no shopping list yet');
      return '';
    }
    return JSON.parse(localStorage.getItem('shoppinglist'));
  });
  const [newItem, setNewItem] = useState('');
  const [search, setSearch] = useState('');

  const setAndSaveItems = (saveItem) => {
    setItems(saveItem);
    localStorage.setItem('shoppinglist', JSON.stringify(saveItem));
  }

  const handleCheck = (id) => {
      const listItems = items.map((item) => {
          return item.id === id ? {...item, checked: !item.checked} : item;
      });
      setAndSaveItems(listItems);
  }

  const handleDelete = (id) => {
      const listItems = items.filter((item) => {
          return item.id !== id;
      })
      setAndSaveItems(listItems);
  }

  const addItem = (item) => {
    const id = items.length ? items[items.length - 1].id + 1 : 1;
    const myNewItem = {
      id,
      checked: false,
      item
    }
    const listItems = [...items, myNewItem];
    setAndSaveItems(listItems);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!newItem) return;
    addItem(newItem);
    setNewItem('');
  }

  return (
    <div className="App">
      <Header title="Grocery List" />
      <AddItem 
        newItem={newItem}
        setNewItem={setNewItem}
        handleSubmit={handleSubmit}
      />
      <SearchItem
        search={search}
        setSearch={setSearch}
      />
      <Content 
        items={items.filter(item => ((item.item).toLowerCase()).includes(search.toLowerCase()))}
        handleCheck={handleCheck}
        handleDelete={handleDelete}
      />
      <Footer length={items.length} />
    </div>
  );
}

export default App;
