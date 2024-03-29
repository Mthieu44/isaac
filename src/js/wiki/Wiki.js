import ItemShowcase from './ItemShowcase';
import Search from './Search';
import ItemSlider from './ItemSlider';
import React from 'react';
import Items from '../../items.json';
import Item from '../model/item';
const items = Items.map(obj => new Item(obj))

class Wiki extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      currentItem: 0,
      search: "",
      searchId: ""
    }
    this.allItems = items
    this.items = this.allItems
    this.handleSearchName = this.handleSearchName.bind(this)
    this.handleSearchId = this.handleSearchId.bind(this)
  }

  previousItem = () => {
    let c = this.state.currentItem
    c -= 1
    if (c === -1){
      c = this.items.length - 1
    }
    if (c === -2){
      c = -1
    }
    this.setState({ currentItem: c});
  }

  nextItem = () => {
    let c = this.state.currentItem
    c += 1
    if (c === 0){
      c = -1
    }
    if (c === this.items.length){
      c = 0
    }
    this.setState({ currentItem: c});
  }

  handleSearchName(event) {
    const search = event.target.value
    const prevSearch = this.state.search
    this.setState({search: search})
    if (search) {
      if (search.length < prevSearch.length && this.state.currentItem !== -1){
        let id = this.items[this.state.currentItem].id
        this.items = this.allItems.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()))
        this.setState({
          currentItem: this.items.findIndex(item => item.id === id)
        });
      }else{
        this.items = this.allItems.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()))
        if (this.items.length === 0){
          this.setState({
            currentItem: -1
          });
        }else{
          this.setState({
            currentItem: 0
          });
        }
      }
    } else {
      if (this.items.length !== 0 && this.state.currentItem !== -1){
        let id = this.items[this.state.currentItem].id
        this.items = this.allItems
        this.setState({
          currentItem: this.items.findIndex(item => item.id === id)
        })
      }else {
        this.items = this.allItems
        this.setState({
          currentItem: 0
        })
      }
      
    }
  }

  handleSearchId(event) {
    const search = event.target.value
    const prevSearch = this.state.searchId
    this.setState({searchId: search})
    if (search) {
      if (search.length >= prevSearch.length || this.state.currentItem === -1){
        let i = this.items.findIndex(item => item.id.toString() === search)
        this.setState({
          currentItem: i
        })
      }
    }else{
      if (this.state.currentItem === -1){
        this.setState({
          currentItem: 0
        })
      }
    }
  }

  handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      this.handleSearchId(event);
    }
  }

  handleSliderClick = (event) => {
    if (event.target.alt) {
      let i = this.items.findIndex(item => item.id.toString() === event.target.alt)
      this.setState({
        currentItem: i
      })
    }
  }

  render() {
    let item = new Item({
      id:"0",
      name: "No item",
      sub: "There's nothing here",
      quality: 0,
      stats: {},
      effects: [],
      set: [],
      pool: []
    });
    if (this.items.length !== 0 && this.state.currentItem !== -1){
      item = this.items[this.state.currentItem]
    }
    return (
      <>
        <ItemShowcase prev={this.previousItem} next={this.nextItem} item={item}/>
        <ItemSlider items={this.items} onClick={this.handleSliderClick} currentItem={this.state.currentItem}/>
        <Search searchName={this.handleSearchName} searchId={this.handleSearchId} keyPress={this.handleKeyPress}/>
      </>
    )
  }
}

export default Wiki;
