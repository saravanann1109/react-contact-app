import { React, useState, useEffect } from 'react';
import AddContact from './add-contact/addContact';
import './App.css';
import ContactList from './contact-list/contact-list';
import ContactDetail from './contact-detail/contact-detail';
import Header from './header/header';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import api from '../api/contacts';

function App() {
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const uid = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  const retriveContacts = async () => {
    const response = await api.get("/contacts");
    return response.data;
  };

  const addContactHandler = async (contact, mode) => {
    let isAdd = mode === 'add';
    if (isAdd && contacts.findIndex(x => x.name === contact.name || x.email === contact.email) > -1) {
      return "error";
    }

    if (isAdd) {
      let request = { ...contact, id: uid(), };
      const response = await api.post("/contacts", request);
      setContacts([...contacts, response.data]);
    }
    else {
      const responce = await api.put(`/contacts/${contact.id}`, contact);
      const { id, name, email } = responce.data;
      let index = contacts.findIndex(x => x.id === id);
      contacts[index].email = email;
      contacts[index].name = name;
      setContacts([...contacts]);
    }
  }

  const clickHandler = async (id) => {
    await api.delete(`/contacts/${id}`);
    let filteredContacts = contacts.filter(x => x.id !== id);
    setContacts(filteredContacts);
  }

  useEffect(() => {
    const getAllContacts = async () => {
      const allContacts = await retriveContacts();
      if (allContacts) {
        setContacts(allContacts);
      }
    };
    getAllContacts();
  }, []);

  const searchHandler = (searchTerm) => {
    setSearchTerm(searchTerm);
    if (searchTerm !== "") {
      const newContactList = contacts.filter((contact) => {
        return Object.values(contact)
          .join(" ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      });
      setSearchResults(newContactList);
    } else {
      setSearchResults(contacts);
    }
  };

  return (
    <div className="ui raised very padded text container segment">
      <div className="ui container">
        <Router>
          <Header />
          <Switch>
            <Route path='/' exact render={(props) => (
              <ContactList {...props} 
              contacts={searchTerm.length < 1 ? contacts : searchResults}
                clickHandler={clickHandler}
                term={searchTerm}
                searchKeyword={searchHandler}
              />
            )}>
            </Route>

            <Route path='/add' render={(props) => (
              <AddContact {...props} addContactHandler={addContactHandler} />
            )} >
            </Route>
            <Route path="/contact/:id" component={ContactDetail} />
            <Route path='/update' render={(props) => (
              <AddContact {...props} addContactHandler={addContactHandler} />
            )} >
            </Route>
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default App;
