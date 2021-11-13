import React from "react";


export default class AddContact extends React.Component {
    state = {
        id: '',
        name: '',
        email: ''
    };

    mode = 'add';
    contact = null;

    formSubmit = (event) => {
        event.preventDefault();
    }

    onAdd = (e) => {
        if (this.state.name === '' || this.state.email === '') {
            alert("please enter mandatory fields");
            return;
        }

        let error = this.props.addContactHandler(this.state, this.mode);

        if (error === "error") {
            alert("please add a unique contact name or address!!!.");
            return;
        }

        this.onClickBack();
    }

    onClickBack = () => {
        this.props.history.push('/');
    }

    clearState = () => {
        this.setState({ name: '', email: '' });
    }
    componentDidMount() {
        if (this.props.location && this.props.location.state && this.props.location.state.contact) {
            this.contact = this.props.location.state.contact;
            this.mode = 'update';
            this.setState({ name: this.contact.name, email: this.contact.email, id: this.contact.id });
        }
    }

    render() {



        return (
            <div className="ui container">
                <h3 className="ui header">{this.mode === 'add' ? "Add " : "Update "}Contact</h3>
                <form className="ui form" onSubmit={this.formSubmit}>
                    <div className="field">
                        <label>First Name</label>
                        <input type="text" name="first-name" placeholder="First Name"
                            value={this.state.name}
                            onChange={(e) => { this.setState({ name: e.target.value }) }} />
                    </div>
                    <div className="field">
                        <label>Email</label>
                        <input type="text" name="last-name" placeholder="Email"
                            value={this.state.email}
                            onChange={(e) => { this.setState({ email: e.target.value }) }} />
                    </div>
                    <button className="ui blue button right floated" onClick={this.onAdd} >
                        {this.mode === 'add' ? "Add " : "Update "}
                    </button>
                    <button className="ui button black right floated" onClick={this.onClickBack}>
                        Cancel
                    </button>
                    <button className="ui button red right floated" onClick={this.clearState}>
                        Clear
                    </button>
                </form>
            </div>
        );
    }
}