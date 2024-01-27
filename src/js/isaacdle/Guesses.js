import React from "react"

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
            let poolimg = require("../../images/pools/" + this.getPoolImg(po) + ".png")
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

    timedAppear(time, boxId) {
        let box = document.getElementById(boxId)
        setTimeout(() => {
            box.style.opacity = 1
        }, time)
    }

    componentDidMount() {
        for (let i = 0; i < 7; i++) {
            this.timedAppear(i*350, `box${i+1}`)
        }
    }

    render() {
        let item = this.props.item
        return (
            <div className="guess">
                <div id="box1" className={this.testBox(item, "id")}>
                    <img src={item.image} alt={item.name} title={item.name} id="boximg"/>
                </div>
                <div id="box2" className={this.testBox(item, "type")}>{item.type}</div>
                <div id="box3" className={this.testBox(item, "quality")}>
                    <img src={item.getQualityImage()} alt={item.quality} title={`Quality ${item.quality}`} id="boxqual"/>
                </div>
                <div id="box4" className={this.testBox(item, "set")}>{this.getSet(item)}</div>
                <div id="box5" className={this.testBox(item, "pool")}>{this.getPoolImgs(item)}</div>
                <div id="box6" className={this.testBox(item, "stat")}>{this.getStats(item)}</div>
                <div id="box7" className={this.testBox(item, "effect")}>{this.getEffects(item)}</div>
                
            </div>
        )
    }
}

export default Guesses;