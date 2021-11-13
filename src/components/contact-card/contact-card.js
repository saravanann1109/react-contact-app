import React from "react"
import user from "../../images/user.png";
import { Link } from "react-router-dom";

export default class ContactCard extends React.Component {

    render() {
        const { contact, clickHandler } = this.props;
        return (
            <div className="item">
                <img className="ui avatar image" src={user} alt="user" />
                <div className="content">
                    {/* <Link
                        to={{ pathname: `/contact/${contact.id}`, state: { contact: contact } }}
                    > */}
                    <div className="header">{contact.name}</div>
                    <div>{contact.email}</div>
                    {/* </Link> */}
                </div>
                <div className="right floated content">
                    <Link
                        to={{ pathname: `/contact/${contact.id}`, state: { contact: contact } }}
                    >
                        <i className="eye icon black"></i>
                    </Link>
                    <Link
                        to={{ pathname: `/update`, state: { contact: contact } }}
                    >
                        <i className="edit outline icon black"></i>
                    </Link>
                    <i
                        className="trash alternate outline icon"
                        style={{ color: "red", marginTop: "7px" }}
                        onClick={() => clickHandler(contact.id)}
                    ></i>
                </div>
            </div>
        );
    }
}