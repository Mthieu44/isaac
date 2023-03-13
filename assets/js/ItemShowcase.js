// Composant Item
class ItemImage extends React.Component {

    getTitle = (str) => {
        if (str == "<3"){return "less_than_three"}
        str = str.replace(/\s+/g, '_')
        str = str.toLowerCase();
        str = str.replace(/[^a-z0-9_]/g, '');
        return str;
    }

    getUrl = (str) => {
        if (str == "<3"){return "https://bindingofisaacrebirth.fandom.com/wiki/Less_Than_Three"}
        str = str.replace(/\s+/g, '_')
        str = encodeURIComponent(str)
        return "https://bindingofisaacrebirth.fandom.com/wiki/" + str;
    }

    render() {
        let base_src = "assets/images/items/"
        return (
        <div id="item">
            <a target="_blank" href={this.props.src=="questionmark"? "https://bindingofisaacrebirth.fandom.com/wiki/Items":this.getUrl(this.props.src)} title="Click to see more details">
            <img id="pic" src={base_src + this.getTitle(this.props.src) + ".png"} alt="Item image"/>
            </a>
            <img id="pedestal" alt="pedestal" src="assets/images/pedestal.png"/>
        </div>
        )
    }
    }

    class ItemName extends React.Component {
    render() {
        return (
        <div className="top">
            <h1>{this.props.name}</h1>
            <h2>{this.props.sub}</h2>
            <h2>ID : {this.props.id}</h2>
        </div>
        )
    }
    }

    class ItemDesc extends React.Component {
    render() {
        let stats = this.props.stats;
        let effects = this.props.effects;
        let statElements = [];

        for (let [statKey, statValue] of Object.entries(stats)) {
        statElements.push(<li key={statKey}>{statValue} {statKey}</li>);
        }

        let effectElements = effects.map(effect => <li key={effect}>{effect}</li>);

        return (
        <div id="desc">
            <h3 id="quality">Quality : {this.props.quality}</h3>
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
            <img src="assets/images/arrow_right.png" alt="Next" onClick={this.props.onClick}/>
        </div>
        )
    }
    }

    class PrevArrow extends React.Component {
    render() {
        return (
        <div id="arrow_left">
            <img src="assets/images/arrow_left.png" alt="Previous" onClick={this.props.onClick}/>
        </div>
        )
    }
    }

    // Composant App
    class ItemShowcase extends React.Component {
    render() {
        return (
        <div id="itemSection">
            <ItemName name={this.props.item.name} sub={this.props.item.sub} id={this.props.item.id}/>
            <div className="bottom">
                <PrevArrow onClick={this.props.prev}/>
                <ItemImage src={this.props.item.name}/>
                <ItemDesc quality={this.props.item.quality} stats={this.props.item.stats} effects={this.props.item.effects}/>
                <NextArrow onClick={this.props.next}/>
            </div>
        </div>
        );
    }
}