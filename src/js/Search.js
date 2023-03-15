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
        <input id="search" onChange={this.props.onChange} onKeyDown={this.props.onKeyPress}/>
      )
    }
  }

class Search extends React.Component{
    render() {
        return (
            <div id="searchSection">
                <SearchBar onChange={this.props.searchName}/>
                <SearchBar onChange={this.props.searchId} onKeyPress={this.props.keyPress}/>
            </div>
        )
    }
}

export default Search
