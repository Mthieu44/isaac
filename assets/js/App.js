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
    }else{
      if (this.state.currentItem == -1){
        this.setState({
          currentItem: 0
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
      <div id="content">
        <ItemShowcase prev={this.previousItem} next={this.nextItem} item={item}/>
        <Search searchName={this.handleSearchName} searchId={this.handleSearchId} keyPress={this.handleKeyPress}/>
      </div>
    )
  }
}

const root = ReactDOM.createRoot(document.querySelector('#app'));
root.render(
    <App/>
);