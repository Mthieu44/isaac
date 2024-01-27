import React from "react"
import "../../css/isaacdle.css"
import Items from '../../items.json';
import Item from '../model/item';
import Guesses from "./Guesses";
import GuessInput from "./GuessInput";
const items = Items.map(obj => new Item(obj))

function getEpochDay() {
    let epoch = Date.now()
    let epochDay = Math.floor(epoch / 86400000)
    return epochDay
}

class Isaacdle extends React.Component {
    constructor(props){
        super(props)
        if (localStorage.getItem("foundToday") === getEpochDay().toString()){
            console.log("found today")
            this.state = {
                guesses: [],
                items: [...items],
                answer: items[Math.floor(Math.random()*items.length)],
                search: "",
                show: false,
                currentSug: -1
            }
        } else {
            this.state = {
                guesses: [],
                items: [...items],
                answer: items[(getEpochDay() * 8471) % items.length],
                search: "",
                show: false,
                currentSug: -1
            }
        }
    }

    handleKeyPress = (event) => {
        if (event.key === "Enter"){
            let i = this.state.items.findIndex(item => item.name.toLowerCase() === event.target.value.toLowerCase())
            if (i !== -1){
                let guesses = this.state.guesses
                let items = this.state.items
                guesses.push(items[i])
                items.splice(i, 1)
                event.target.value = ""
                this.setState({
                    guesses: guesses,
                    items: items,
                    search: "",
                    currentSug: -1
                })
            }
        }else if (event.key === "ArrowDown" && this.state.show){
            event.preventDefault()
            let c = this.state.currentSug + 1
            let items = this.state.items.filter((item) => item.name.toLowerCase().includes(this.state.search.toLowerCase()))
            let max = items.length
            if (c === max){
                c = -1
            }
            if (c === -1){
                event.target.value = this.state.search
            }else{
                event.target.value = items[c].name
            }
            this.setState({
                currentSug: c,
            })
        }else if (event.key === "ArrowUp" && this.state.show){
            event.preventDefault()
            let c = this.state.currentSug - 1
            let items = this.state.items.filter((item) => item.name.toLowerCase().includes(this.state.search.toLowerCase()))
            let max = items.length
            if (c === -2){
                c = max - 1
            }
            if (c === -1){
                event.target.value = this.state.search
            }else{
                event.target.value = items[c].name
            }
            this.setState({
                currentSug: c,
            })
        }
    }
    handleFocusOut = () => {
        setTimeout(() => {
            if (document.querySelector("input") != null) {
                document.querySelector("input").value = this.state.search
            }
            this.setState({
                show: false,
                currentSug: -1
            })
        }, 200);
        
    }

    handleSearch = (e) => {
        this.setState({
            search: e.target.value,
            show: true,
            currentSug: -1
        })
    }

    handleSuggestionClick = (item) => {
        let input = document.querySelector("input")
        input.focus()
        this.setState({
            search: item.name,
            show: false,
            currentSug: -1
        })
    }

    render() {
        console.log(this.state.answer)
        if (this.state.guesses.findIndex(item => item.name === this.state.answer.name) !== -1) {
            localStorage.setItem("foundToday", getEpochDay())
        }
        return(
            <>
                <GuessInput 
                keyPress={this.handleKeyPress} 
                items={this.state.items} 
                search={this.state.search}
                show={this.state.show}
                currentSug={this.state.currentSug}
                handleSearch={this.handleSearch}
                handleSuggestionClick={this.handleSuggestionClick}
                handleFocusOut={this.handleFocusOut}/>
                <Guesses guesses={this.state.guesses} answer={this.state.answer}/>
            </>
        )
    }
}

export default Isaacdle