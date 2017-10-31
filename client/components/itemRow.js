
var React = require('react');
var Api = require('../api.js');

class ItemRow extends React.Component {

    constructor(props) {
        super(props);
    }

    handleEdit(item) {
        this.props.onEditItem(item);
    }

    handleArchive(item) {
        this.props.onArchiveItem(item);
    }

    render () {

        var map = 'https://www.google.com/maps/place/' + this.props.item.address;

        var archiveIconClass = this.props.item.status == 'active' ? 
            'glyphicon glyphicon-saved' : 'glyphicon glyphicon-open';

        return(
            <div className="panel panel-default">
                <div className="panel-heading">
                <span>
                    {this.props.item.name}
                </span>
                &nbsp;&nbsp;
                <span 
                    className="glyphicon glyphicon-edit" 
                    style={{cursor: 'pointer', fontSize: '20px'}}
                    onClick={this.handleEdit.bind(this, this.props.item)} >
                </span>
                &nbsp;&nbsp;
                <span 
                    className={archiveIconClass}
                    style={{cursor: 'pointer', fontSize: '20px'}}
                    onClick={this.handleArchive.bind(this, this.props.item)} >
                </span>
                </div>
                <div className="panel-body">
                    <p><a href={map}>{this.props.item.address}</a></p>
                    <p><a href={this.props.item.link}>{this.props.item.link}</a></p>
                    <p>{this.props.item.note}</p>   
                </div>
            </div>
        )
    }
}

module.exports = ItemRow;