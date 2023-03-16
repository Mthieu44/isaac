import React from "react"
import '../css/searchSection.css';

class SearchBar extends React.Component {
    constructor(props){
      super(props)
      this.state = {
      }
    }
  
    render() {
      return (
        <input className="search" onChange={this.props.onChange} onKeyDown={this.props.onKeyPress}/>
      )
    }
  }

class Search extends React.Component{
    render() {
        return (
            <div id="searchSection">
              <div id="searchName">
                <p>Filter items by their name :</p>
                <SearchBar onChange={this.props.searchName}/>
              </div>
              <div id="searchId">
                <p>Go to an item by their id :</p>
                <SearchBar onChange={this.props.searchId} onKeyPress={this.props.keyPress}/>
              </div>
                
                
            </div>
        )
    }
}

export default Search
