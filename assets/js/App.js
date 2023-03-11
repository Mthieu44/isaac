const itemDao = {
  async findAll() {
      const response = await fetch('../assets/data/item.json',
  {
    headers : { 
      'Content-Type': 'application/json',
      'Accept': 'application/json'
     }
  })
  const data = await response.json()
  return data
  }
}


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
      <div id="content">
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

class SearchBar extends React.Component {
  constructor(props){
    super(props)
    this.state = {
    }
  }

  render() {
    return (
      <input id="search" onChange={this.props.onChange} onKeyPress={this.props.onKeyPress}/>
    )
  }
}

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      isLoaded: false,
      currentItem: 0,
      search: "",
      searchId: ""
    }
    this.loadItems()
    this.handleSearchName = this.handleSearchName.bind(this)
    this.handleSearchId = this.handleSearchId.bind(this)
  }

  async loadItems() {
    try {
      const items = await itemDao.findAll()
      this.allItems = items
      this.items = this.allItems
      this.setState({
        isLoaded: true,
      })
    } catch (error) {
      console.error(error)
    }
  }

  previousItem = () => {
    let c = this.state.currentItem
    c -= 1
    if (c == -1){
      c = this.items.length - 1
    }
    if (c == -2){
      c = -1
    }
    this.setState({ currentItem: c});
  }

  nextItem = () => {
    let c = this.state.currentItem
    c += 1
    if (c == 0){
      c = -1
    }
    if (c == this.items.length){
      c = 0
    }
    this.setState({ currentItem: c});
  }

  handleSearchName(event) {
    const search = event.target.value
    const prevSearch = this.state.search
    this.setState({search: search})
    if (search) {
      if (search.length < prevSearch.length && this.state.currentItem != -1){
        let id = this.items[this.state.currentItem].id
        this.items = this.allItems.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()))
        this.setState({
          currentItem: this.items.findIndex(item => item.id === id)
        });
      }else{
        this.items = this.allItems.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()))
        if (this.items.length == 0){
          this.setState({
            isLoaded: true,
            currentItem: -1
          });
        }else{
          this.setState({
            isLoaded: true,
            currentItem: 0
          });
        }
      }
    } else {
      if (this.items.length != 0 && this.state.currentItem != -1){
        let id = this.items[this.state.currentItem].id
        this.items = this.allItems
        this.setState({
          currentItem: this.items.findIndex(item => item.id === id)
        })
      }else {
        this.items = this.allItems
        this.setState({
          currentItem: 0
        })
      }
      
    }
  }

  handleSearchId(event) {
    const search = event.target.value
    const prevSearch = this.state.searchId
    this.setState({searchId: search})
    if (search) {
      if (search.length >= prevSearch.length || this.state.currentItem == -1){
        let i = this.items.findIndex(item => item.id == search)
        this.setState({
          currentItem: i
        })
      }
    }
  }

  handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      this.handleSearchId(event);
    }
  }

  render() {
    if (!this.state.isLoaded) {
      return (
        <div id="content">
          
        </div>
      );
    }
    let item = {
      id:"0",
      name: "No item",
      sub: "There's nothing here",
      quality: 0,
      stats: {},
      effects: [],
      set: [],
      pool: []
    };
    if (this.items.length != 0 && this.state.currentItem != -1){
      item = this.items[this.state.currentItem]
    }
    return (
      <div>
        <ItemShowcase prev={this.previousItem} next={this.nextItem} item={item}/>
        <SearchBar onChange={this.handleSearchName}/>
        <SearchBar onChange={this.handleSearchId} onKeyPress={this.handleKeyPress}/>
      </div>
    )
  }
}

const root = ReactDOM.createRoot(document.querySelector('#app'));
root.render(
    <App/>
);