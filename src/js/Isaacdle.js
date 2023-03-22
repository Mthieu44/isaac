import React from "react"
import "../css/isaacdle.css"
import Items from '../items.json';
import Item from './item';
const items = Items.map(obj => new Item(obj))

class GuessInput extends React.Component {
    render(){
        return(
            <div id="guessinput">
                <p>Guess today's item !</p>
                <input onKeyDown={this.props.keyPress}></input>
            </div>
        )
    }
}

class Guesses extends React.Component {
    render() {
        let guesses = []
        this.props.guesses.forEach(item => {
            guesses.push(<Guess item={item} key={item.id}/>)
        });

        return (
            <div id="guesses">
                <div id="header">
                    <p>Item</p>
                    <p>Type</p>
                    <p>Quality</p>
                    <p>Set</p>
                    <p>Pool</p>
                    <p>Stats</p>
                    <p>Effects</p>
                </div>
                {guesses}
            </div>
        )
    }
}

class Guess extends React.Component {
    getPoolImg = (str) => {
        if (str.includes("(boss)")){return "boss"}
        str = str.replace(/\s+/g, '_')
        str = str.toLowerCase();
        return str;
    }

    render() {
        let item = this.props.item
        let set = ""
        if (item.set.length === 0){set = "None"}
        else {
            item.set.forEach(s => set += s)
        }

        let poolimgs = []
        item.pool.sort()
        item.pool.forEach(po => {
            let poolimg = require("../images/pools/" + this.getPoolImg(po) + ".png")
            poolimgs.push(<img key={poolimg} src={poolimg} alt={po} title={po} className="pool"></img>)
        });
        let stats = "";
        for (let [statKey, statValue] of Object.entries(item.stats)) {
            stats += `${statValue} ${statKey}, `
        }
        let effects = ""
        item.effects.forEach(ef => {
            effects += `${ef}, `
        })
        return (
            <div className="guess">
                <div className="box">
                    <img src={item.image} alt={item.name} title={item.name} id="boximg"/>
                </div>
                <div className="box">{item.type}</div>
                <div className="box">
                    <img src={item.getQualityImage()} alt={item.quality} title={`Quality ${item.quality}`} id="boxqual"/>
                </div>
                <div className="box">{set}</div>
                <div className="box">{poolimgs}</div>
                <div className="box">{stats}</div>
                <div className="box">{effects}</div>
                
            </div>
        )
    }
}

class Isaacdle extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            guesses: [],
            items: [...items],
            answer: items[Math.floor(Math.random()*items.length)]
        }
    }

    handleEnter = (event) => {
        if (event.key === "Enter"){
            let i = this.state.items.findIndex(item => item.name.toLowerCase() === event.target.value.toLowerCase())
            if (i !== -1){
                let guesses = this.state.guesses
                let items = this.state.items
                guesses.push(items[i])
                items.splice(i, 1)
                this.setState({
                    guesses: guesses,
                    items: items
                })
                event.target.value = ""
            }
            
        }
    }

    render() {
        return(
            <>
                <GuessInput keyPress={this.handleEnter}/>
                <Guesses guesses={this.state.guesses}/>
            </>
        )
    }
}

export default Isaacdle