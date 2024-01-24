import React from "react";  
import larrow from '../images/arrow_left.png'
import rarrow from '../images/arrow_right.png'
import pedestal from '../images/pedestal.png'
import q0 from '../images/qualities/quality0.png'
import q1 from '../images/qualities/quality1.png'
import q2 from '../images/qualities/quality2.png'
import q3 from '../images/qualities/quality3.png'
import q4 from '../images/qualities/quality4.png'
import '../css/itemSection.css';
const qs = [q0, q1, q2, q3, q4]

class ItemImage extends React.Component {
    render() {
        return (
        <div id="item">
            <a target="_blank" rel="noreferrer" href={this.props.item.link} title="Click to see more details">
                <img id="pic" src={this.props.item.image} alt="Item"/>
            </a>
            <Charge charge={this.props.item.charge} />
            <img id="pedestal" alt="pedestal" src={pedestal}/>
        </div>
        )
    }
}

class Charge extends React.Component {
    render() {
        if (this.props.charge){
            let img
            switch (this.props.charge) {
                case "Unlimited":
                    img = <img src={require(`../images/charge/1.png`)} alt="Charge bar" title="Unlimited"/>
                    break;
                case "One-time":
                    img = <img src={require(`../images/charge/0.png`)} alt="Charge bar" title="One-time use"/>
                    break;
                case "Variable":
                    img = <img src={require(`../images/charge/variable.gif`)} alt="Charge bar" title="Variable charge"/>
                    break;
            
                default:
                    if (this.props.charge.includes("seconds")){
                        img = <img src={require(`../images/charge/timed.png`)} alt="Charge bar" title={this.props.charge}/>
                    }else {
                        img = <img src={require(`../images/charge/${this.props.charge}.png`)} alt="Charge bar" title={`${this.props.charge} rooms`}/>
                    }
                    
                    break;
            }
    
            return (
                <div id="charge">
                    {img}
                </div>
            )
        }
    }
}

class ItemQualityPool extends React.Component {
    getPoolImg = (str) => {
        if (str.includes("(boss)")){return "boss"}
        str = str.replace(/\s+/g, '_')
        str = str.toLowerCase();
        return str;
    }

    render() {
        let poolimgs = []
        this.props.pool.sort()
        this.props.pool.forEach(po => {
            let poolimg = require("../images/pools/" + this.getPoolImg(po) + ".png")
            poolimgs.push(<img key={poolimg} src={poolimg} alt={po} title={po} className="pool"></img>)
        });

        return (
            <div id="qualpool">
                <img src={qs[this.props.quality]} alt="quality" title={"Quality " + this.props.quality} id="quality"></img>
                <p>-</p>
                {poolimgs}
            </div>
        )
    }
}

class ItemName extends React.Component {
    render() {
        return (
        <div className="top">
            <h1>{this.props.item.name}</h1>
            <h2>{this.props.item.sub}</h2>
            <h3>ID : {this.props.item.id}</h3>
            <ItemQualityPool quality={this.props.item.quality} pool={this.props.item.pool}/>
        </div>
        )
    }
}

class ItemDesc extends React.Component {
    render() {
        let stats = this.props.item.stats;
        let effects = this.props.item.effects;
        let statElements = [];

        for (let [statKey, statValue] of Object.entries(stats)) {
        statElements.push(<li key={statKey}>{statValue} {statKey}</li>);
        }

        let effectElements = effects.map(effect => <li key={effect}>{effect}</li>);

        return (
        <div id="desc">
            <h3>Stats :</h3>
            <ul>{statElements}</ul>
            <h3>Effects :</h3>
            <ul>{effectElements}</ul>
        </div>
        );
    }
}

class NextArrow extends React.Component {
    render() {
        return (
        <div id="arrow_right">
            <img src={rarrow} alt="Next" onClick={this.props.onClick}/>
        </div>
        )
    }
}

class PrevArrow extends React.Component {
    render() {
        return (
        <div id="arrow_left">
            <img src={larrow} alt="Previous" onClick={this.props.onClick}/>
        </div>
        )
    }
}

class ItemShowcase extends React.Component {
    render() {
        let item = this.props.item
        return (
        <div id="itemSection">
            <ItemName item={item}/>
            <div className="bottom">
                <PrevArrow onClick={this.props.prev}/>
                <ItemImage item={item}/>
                <ItemDesc item={item}/>
                <NextArrow onClick={this.props.next}/>
            </div>
        </div>
        );
    }
}

export default ItemShowcase