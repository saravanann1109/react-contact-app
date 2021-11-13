import React, {useRef} from "react";
import ContactCard from "../contact-card/contact-card";
import "../contact-list/contact-list.css";
import { Link } from "react-router-dom";

const ContactList = (props) => {
    const inputEl = useRef("");
    const deleteConactHandler = (id) => {
      props.getContactId(id);
    };
  
    const renderContactList = props.contacts.map((contact) => {
      return (
        <ContactCard
          contact={contact}
          clickHandler={props.clickHandler}
          key={contact.id}
        />
      );
    });
  
    const getSearchTerm = () => {
      props.searchKeyword(inputEl.current.value);
    };
    return (
      <div className="main">
        <h2 className="contact-list-header">
          Contact List
          <Link to="/add">
            <button className="ui button blue right">Add Contact</button>
          </Link>
        </h2>
        <div className="ui search">
          <div className="ui icon input search">
            <input
              ref={inputEl}
              type="text"
              placeholder="Search Contacts"
              className="prompt"
              value={props.term}
              onChange={getSearchTerm}
            />
            <i className="search icon"></i>
          </div>
        </div>
        <div className={renderContactList.length > 5 ? 'ui celled list contact-list' : 'ui celled list' }>
          {renderContactList.length > 0
            ? renderContactList
            : "No Contacts available"}
        </div>
      </div>
    );
  };
  
  export default ContactList;