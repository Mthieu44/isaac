import React from "react";

class GuessInput extends React.Component {
    render(){
        if (this.props.search.length > 0 && this.props.show){
            let items = this.props.items.filter((item) => item.name.toLowerCase().includes(this.props.search.toLowerCase()))
            return(
                <div id="guessinput">
                    <h1>Guess today's item !</h1>
                    <input 
                    
                    onKeyDown={this.props.keyPress}
                    onChange={this.props.handleSearch} 
                    onBlur={this.props.handleFocusOut}
                    ></input>
                    <SuggestionList items={items} handleSuggestionClick={this.props.handleSuggestionClick} currentSug={this.props.currentSug}/>
                </div>
            )
        }else {
            return(
                <div id="guessinput">
                    <h1>Guess today's item !</h1>
                    <input 
                    onKeyDown={this.props.keyPress} 
                    onChange={this.props.handleSearch} 
                    onBlur={this.props.handleFocusOut}
                    ></input>
                </div>
            )
        }
        
    }
}

class SuggestionList extends React.Component {
    render() {
        let list = []
        this.props.items.forEach((item, index) => {
            list.push(<Suggestion item={item} key={item.id} handleSuggestionClick={this.props.handleSuggestionClick} current={this.props.currentSug === index}/>)
        })
        let height = list.length * 32

        return (
            <div id="suggestionlist" style={{height: height, overflowY: height < 300 ? "hidden": "auto"}}>
                {list}
            </div>
        )
    }
}

class Suggestion extends React.Component {
    handleClick = () => {
        this.props.handleSuggestionClick(this.props.item)
    }
    render() {
        let classname = "suggestion"
        if (this.props.current){
            classname += " currentSug"
        }
        return (
            <div className={classname} onClick={this.handleClick} >
                <img src={this.props.item.getImage()} alt={this.props.item.name}/>
                <p>{this.props.item.name}</p>
            </div>
        )
    }
}

export default GuessInput;