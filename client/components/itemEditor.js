
var React = require('react');
var Api = require('../api.js');

class ItemEditor extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            name: this.props.item ? this.props.item.name : '',
            link: this.props.item ? this.props.item.link : '',
            address: this.props.item ? this.props.item.address : '',
            note: this.props.item ? this.props.item.note : '',
        }

    }

    handleSubmit(e) {
        e.preventDefault();

        var item = {
            name: this.state.name,
            link: this.state.link,
            address: this.state.address,
            note: this.state.note
        }

        var self = this;
 
        if (self.props.item) {

            item.status = self.props.item.status;
            
            // Update
            Api.update(self.props.item.id, item).then(function(newItem) {
                self.props.onEditorClose(true);
            });
        }
        else {
            // Create
            Api.create(item).then(function(newItem) {
                self.props.onEditorClose(true);
            });
        }
    }

    handleDelete(e) {
        e.preventDefault();
        var self = this;

        Api.delete(self.props.item.id).then(function() {
                self.props.onEditorClose(true);
            });
    }

    handleCancel(e) {
        e.preventDefault();
        this.props.onEditorClose(false);
    }

    handleInputChange(event) {
        const value = event.target.value;
        const name = event.target.name;

        this.setState({
            [name]: value
        });
    }

    render () {

        return(
            <div>
            <form onSubmit={this.handleSubmit.bind(this)} >
                <div className="form-group">
                    <label>Name</label>
                    <input 
                        className="form-control"
                        type="text"
                        name="name"
                        value={this.state.name} 
                        onChange = {this.handleInputChange.bind(this)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Address</label>
                    <input 
                        className="form-control"
                        type="text"
                        name="address"
                        value={this.state.address} 
                        onChange = {this.handleInputChange.bind(this)} 
                    />
                </div>
                <div className="form-group">
                    <label>Link</label>
                    <input 
                        className="form-control"
                        type="text"
                        name="link"
                        value={this.state.link} 
                        onChange = {this.handleInputChange.bind(this)} 
                    />
                </div>
                <div className="form-group">
                    <label>Note</label>
                    <input 
                        className="form-control"
                        type="text"
                        name="note"
                        value={this.state.note} 
                        onChange = {this.handleInputChange.bind(this)} 
                    />
                </div>
                <br />
                <div>
                    <input type="submit" className="btn btn-primary" value="Save" />
                    <span>&nbsp;</span>
                    <button className="btn btn-primary" onClick={this.handleCancel.bind(this)}>Cancel</button>
                    {
                        this.props.item  && (
                        <button className="btn btn-primary pull-right" onClick={this.handleDelete.bind(this)}>Delete</button>)
                    }
                </div>
                <br />
            </form>
            </div>
        )
    }
}

module.exports = ItemEditor;