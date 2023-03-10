// Composant Item
class ItemShowcase extends React.Component {

  getTitle = (str) => {
    str = str.replace(/\s+/g, '_')
    str = str.toLowerCase();
    str = str.replace(/[^a-z0-9_]/g, '');
    return str;
  }

  getUrl = (str) => {
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
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      currentItem: 1,
    };
    this.items;
    fetch('../assets/data/item.json',
    {
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
    })
    .then(res => res.json())
    .then(data => {
      this.items = data; 
      this.setState({isLoaded: true})
    })
  }

  

  previousItem = () => {
    let c = this.state.currentItem
    c -= 1
    if (c == 0){
      c = this.items.length
    }
    this.setState({ currentItem: c});
  }

  nextItem = () => {
    let c = this.state.currentItem
    c += 1
    if (c == this.items.length + 1){
      c = 1
    }
    this.setState({ currentItem: c});
  }

  render() {
    if (!this.state.isLoaded) {
      return (
        <div id="content">
          
        </div>
      );
    }
    if (this.items != null){
      let item = this.items[this.state.currentItem - 1]
        return (
          <div id="content">
            <ItemName name={item.name} sub={item.sub}/>
            <div className="bottom">
              <PrevArrow onClick={this.previousItem}/>
              <ItemShowcase src={item.name}/>
              <ItemDesc quality={item.quality} stats={item.stats} effects={item.effects}/>
              <NextArrow onClick={this.nextItem}/>
            </div>
          </div>
        );
    }else {
      return (
        <div id="content">
          <ItemName name="NO ITEMS" sub="An error maybe ?"/>
          <div className="bottom">
            <PrevArrow onClick={this.previousItem}/>
            <ItemShowcase src="questionmark"/>
            <ItemDesc quality="0" stats={{}} effects={[]}/>
            <NextArrow onClick={this.nextItem}/>
          </div>
        </div>
      );
    }
  }
}

const root = ReactDOM.createRoot(document.querySelector('#app'));
root.render(
    <App/>
);