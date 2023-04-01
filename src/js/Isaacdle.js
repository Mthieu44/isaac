import React from "react"
import "../css/isaacdle.css"
import Items from '../items.json';
import Item from './item';
const items = Items.map(obj => new Item(obj))

class GuessInput extends React.Component {
    render(){
        if (this.props.search.length > 0 && this.props.show){
            let items = this.props.items.filter((item) => item.name.toLowerCase().includes(this.props.search.toLowerCase()))
            return(
                <div id="guessinput">
                    <h1>Guess today's item !</h1>
                    <input 
                    value={this.props.search}
                    onKeyDown={this.props.keyPress} 
                    onChange={this.props.handleSearch} 
                    onBlur={this.props.handleFocusOut}
                    ></input>
                    <SuggestionList items={items} handleSuggestionClick={this.props.handleSuggestionClick}/>
                </div>
            )
        }else {
            return(
                <div id="guessinput">
                    <h1>Guess today's item !</h1>
                    <input 
                    value={this.props.search}
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
        this.props.items.forEach(item => {
            list.push(<Suggestion item={item} key={item.id} handleSuggestionClick={this.props.handleSuggestionClick}/>)
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
        return (
            <div className="suggestion" onClick={this.handleClick} >
                <img src={this.props.item.getImage()} alt={this.props.item.name}/>
                <p>{this.props.item.name}</p>
            </div>
        )
    }
}

class Guesses extends React.Component {
    render() {
        let guesses = []
        this.props.guesses.reverse().forEach(item => {
            guesses.push(<Guess item={item} key={item.id} answer={this.props.answer}/>)
        });

        return (
            <div id="guesses">
                <div id="header">
                    <p className="smallbox">Item</p>
                    <p className="smallbox">Type</p>
                    <p className="smallbox">Quality</p>
                    <p className="smallbox">Set</p>
                    <p className="smallbox">Pool</p>
                    <p className="largebox">Stats</p>
                    <p className="largebox">Effects</p>
                </div>
                <div id="guessesinside">
                    {guesses}
                </div>
                
            </div>
        )
    }
}

class Guess extends React.Component {
    getPoolImgs(item) {
        let poolimgs = []
        item.pool.sort()
        item.pool.forEach(po => {
            let poolimg = require("../images/pools/" + this.getPoolImg(po) + ".png")
            poolimgs.push(<img key={poolimg} src={poolimg} alt={po} title={po} className="pool"></img>)
        });
        return poolimgs
    }

    getPoolImg = (str) => {
        if (str.includes("(boss)")){return "boss"}
        str = str.replace(/\s+/g, '_')
        str = str.toLowerCase();
        return str;
    }

    getSet(item){
        let set = ""
        item.set.forEach(s => set += `${s} `)
        return set === "" ? "None" : set
    }

    getStats(item){
        let stats = "";
        item.getIsaacdleStats().forEach(s => {
            stats += `${s}, `
        })
        return stats === "" ? "None" : stats
    }

    getEffects(item){
        let effects = ""
        item.getIsaacdleEffects().forEach(ef => {
            effects += `${ef}, `
        })
        return effects === "" ? "None" : effects
    }

    compareLists(list1, list2) {
        const set1 = new Set(list1);
        const set2 = new Set(list2);
        const intersection = new Set([...set1].filter(x => set2.has(x)));
        if (set1.size === set2.size && intersection.size === set1.size) {return "green"}
        else if (intersection.size === 0){return "red"}
        else {return "orange"}
      }

    testBox(item, param) {
        let classname = "box"
        let answer = this.props.answer
        switch (param) {
            case "id":
                classname += item.id === answer.id ? " smallbox green": " smallbox red"
                break;
            case "type":
                classname += item.type === answer.type ? " smallbox green": " smallbox red"
                break;
            case "quality":
                classname += item.quality === answer.quality ? " smallbox green": " smallbox red"
                break;
            case "set":
                classname += ` smallbox ${this.compareLists(item.set, answer.set)}`
                break;
            case "pool":
                let ipool = []
                item.pool.forEach(po => {
                    if (po.includes("(boss)")){ipool.push("Boss")}
                    else {ipool.push(po)}
                })
                let apool = []
                answer.pool.forEach(po => {
                    if (po.includes("(boss)")){apool.push("Boss")}
                    else {apool.push(po)}
                })

                classname += ` smallbox ${this.compareLists(ipool, apool)}`
                break;
            case "stat":
                classname += ` largebox ${this.compareLists(item.getIsaacdleStats(), answer.getIsaacdleStats())}`
                break;
            case "effect":
                classname += ` largebox ${this.compareLists(item.getIsaacdleEffects(), answer.getIsaacdleEffects())}`
                break;
            default:
                break;
        }
        return classname
    }

    render() {
        let item = this.props.item
        return (
            <div className="guess">
                <div className={this.testBox(item, "id")}>
                    <img src={item.image} alt={item.name} title={item.name} id="boximg"/>
                </div>
                <div className={this.testBox(item, "type")}>{item.type}</div>
                <div className={this.testBox(item, "quality")}>
                    <img src={item.getQualityImage()} alt={item.quality} title={`Quality ${item.quality}`} id="boxqual"/>
                </div>
                <div className={this.testBox(item, "set")}>{this.getSet(item)}</div>
                <div className={this.testBox(item, "pool")}>{this.getPoolImgs(item)}</div>
                <div className={this.testBox(item, "stat")}>{this.getStats(item)}</div>
                <div className={this.testBox(item, "effect")}>{this.getEffects(item)}</div>
                
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
            answer: items[Math.floor(Math.random()*items.length)],
            search: "",
            show: false
        }
        console.log(this.state.answer);
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
                    items: items,
                    search: ""
                })
            }
            
        }
    }
    handleFocusOut = () => {
        setTimeout(() => {
            this.setState({
                show: false
            })
        }, 200);
        
    }

    handleSearch = (e) => {
        this.setState({
            search: e.target.value,
            show: true
        })
    }

    handleSuggestionClick = (item) => {
        let input = document.querySelector("input")
        input.focus()
        this.setState({
            search: item.name,
            show: false
        })
    }

    render() {
        return(
            <>
                <GuessInput 
                keyPress={this.handleEnter} 
                items={this.state.items} 
                search={this.state.search}
                show={this.state.show}
                handleSearch={this.handleSearch}
                handleSuggestionClick={this.handleSuggestionClick}
                handleFocusOut={this.handleFocusOut}/>
                <Guesses guesses={this.state.guesses} answer={this.state.answer}/>
            </>
        )
    }
}

export default Isaacdle