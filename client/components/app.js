
import React from 'react';
import Modal from 'react-modal';
import ListView from './listView.js';
import ItemEditor from './itemEditor.js';
import Api from '../api.js'

const diaglogStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

class App extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            showItemDialog: false,
            showArchivedList: false,
            itemEditing: null
        };
    }

    onNewItemButtonClick(event) {
        this.setState(function(prevState){
            return { 
                itemEditing: null,
                showItemDialog: !prevState.showItemDialog }
        })
    }

    onEditItemButtonClick(item) {
        this.setState(function(prevState){
            return { 
                itemEditing: item,
                showItemDialog: !prevState.showItemDialog }
        })
    }

    onArchiveItemButtonClick(item) {
        var self = this;

        Api.archive(item).then(function(newItem) {
            self.activeListView.loadListItems();

            if (self.state.showArchivedList) {
                self.archivedListView.loadListItems();
            }
        });       
    }

    onShowArchivedListButtonClick(){
        this.setState(function(){
            return { 
                showArchivedList: true
             }
        });
    }

    onHideArchivedListButtonClick(){
        this.setState(function(){
            return { 
                showArchivedList: false
             }
        });
    }

    onEditorClose(refresh)
    {
        this.setState(function(prevState){
            return { showItemDialog: false }
        })

        if (refresh)
        {
            this.activeListView.loadListItems();
        }
    }

    render () {

        self = this;
        return (
            <div className="container">
                <div className="container text-center" style={{paddingTop: "15px"}}>
                    <img src="together.jpg" height="160" />
                </div>
                <div className="container">
                    <div>
                        <p 
                            className="glyphicon glyphicon-plus-sign" 
                            style={{cursor: 'pointer', fontSize: '3em'}}
                            onClick={this.onNewItemButtonClick.bind(this)}>
                        </p>
                    </div>
                    <Modal
                        isOpen={this.state.showItemDialog}
                        contentLabel="Modal"
                        //style={diaglogStyles}
                    >
                        <ItemEditor  
                            item={this.state.itemEditing}
                            onEditorClose={this.onEditorClose.bind(this)} />
                    </Modal>
                    <ListView 
                        ref={function(_listView){self.activeListView = _listView}}
                        onEditItem={this.onEditItemButtonClick.bind(this)}
                        onArchiveItem={this.onArchiveItemButtonClick.bind(this)}
                        itemStatus='active'/>
                    {
                        !this.state.showArchivedList && (
                        <div>
                            <p 
                                className="glyphicon glyphicon-chevron-down" 
                                    style={{cursor: 'pointer', fontSize: '2em'}}
                                    onClick={this.onShowArchivedListButtonClick.bind(this)}>
                            </p>
                        </div>
                        )
                    }
                    {
                        this.state.showArchivedList && (
                        <div>
                            <p 
                                className="glyphicon glyphicon-chevron-up" 
                                    style={{cursor: 'pointer', fontSize: '2em'}}
                                    onClick={this.onHideArchivedListButtonClick.bind(this)}>
                            </p>
                        </div>)
                    }
                    {
                        this.state.showArchivedList && (
                        <ListView 
                            ref={function(_listView){self.archivedListView = _listView}}
                            onEditItem={this.onEditItemButtonClick.bind(this)}
                            onArchiveItem={this.onArchiveItemButtonClick.bind(this)}
                            itemStatus='archived'/>
                        )
                    }
                </div>
            </div>
        );
    }
}

module.exports = App;