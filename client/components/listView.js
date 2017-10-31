
var React = require('react');
var ItemRow = require('./itemRow.js');

var Api = require('../api.js');

class ListView extends React.Component {

    constructor(props){
        super(props);

        this.state = { 
            heapItemData: null
        };

        this.loadListItems = this.loadListItems.bind(this);
    }

    componentDidMount(){
        this.loadListItems();
    }

    loadListItems(){
        var self = this;

        Api.getAll(this.props.itemStatus).then(function(data) {

            self.setState(function (){
                return { heapItemData: data }
            });
        });
    }

    render (){

        if (this.state.heapItemData)
        {
            var self = this;
            var list = (
                <div>
                    {
                        this.state.heapItemData.map(function (item, index) {
                            return(
                            <ItemRow 
                            key={index} 
                            item={item} 
                            onEditItem={self.props.onEditItem}
                            onArchiveItem={self.props.onArchiveItem}/>
                            )
                        })
                    }
                </div>
            );

            return list;
        }
        else
        {
            return (
                <div className="container text-center">
                    <p>Loading...</p>
                </div>
            )
        }
    }
}

module.exports = ListView;