import React, {Component} from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import Articles from './components/Articles';

const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
const PARAM_PAGE = 'page=';
//the term being used to search for articles to fetch in our componentDidMount function
const DEFAULT_QUERY = 'redux';

//const url = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${DEFAULT_QUERY}&${PARAM_PAGE}${0}`;


//results will be an object that maps searchKeys to results fetched, effectively acting as a cache
class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      results: null,
      searchTerm: DEFAULT_QUERY,
      searchKey: ''
    };

    this.dismiss = this.dismiss.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.setSearchTopStories = this.setSearchTopStories.bind(this);
    this.onSubmitSearch = this.onSubmitSearch.bind(this);
    this.fetchArticles = this.fetchArticles.bind(this);
  }

  //method called after initial rendering
  //sets searchKey for state then makes asynchronous call to Fetch API; get Redux articles by default
  componentDidMount() {
    const { searchTerm } = this.state;
    this.setState({searchKey: searchTerm});
    this.fetchArticles(searchTerm);
  }

  //change the app state's searchTerm as the user types into the input
  onSearchChange(event) {
    this.setState({ searchTerm: event.target.value });
  }

  //gets the search term, sets the searchKey as the searchTerm, and fetches related articles
  //refreshes on default, need to prevent by setting button to type="button"
  onSubmitSearch(){
    const {searchTerm} = this.state;
    this.setState({searchKey: searchTerm});
    if(!this.state.results[searchTerm])
      this.fetchArticles(searchTerm);
  }

  //store all articles with our search term into our state's results obj
  //result of fetch: a promise, need to turn into json data then set to our result with setSearchTopStories
  //page set to 0 by default unless different value passed as parameter
  fetchArticles(searchTerm, page = 0){
    console.log("fetching articles, so adding to cache...");
   
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}`)
    .then(response => response.json())
    .then(result => this.setSearchTopStories(result))
    .catch(error => error);
  }

   //set the results in our state, use searchKey as the key to map the result's hits and page #
   //if the user clicks 'more', append new article to old result hits as well as the page (+1 from button onClick)
   setSearchTopStories(result) {
    const {hits, page} = result;
    const {searchKey, results} = this.state;
    
    let oldHits = [];
    if(results && results[searchKey])
     oldHits = results[searchKey].hits;

    const updatedHits = [...oldHits, ...hits];

    this.setState({ 
      results: {
        ...results,
        [searchKey]: {
          hits: updatedHits, 
          page: page
        }
      }
    });
  }

  //just a simple function for a button to log a message in the console
  logIt(){
    console.log("Logging it...");
  }

  //gets rid of the displayed article from our state's results, filters for that specific ID
  dismiss(id){
    //for the filter, we need to preserve hits that don't have this id, the hit with this id is deleted
    const mismatchID = item => {
      return id !== item.objectID;
    };

    const {searchKey, results} = this.state;
    const {page} = results[searchKey];
    const updatedHits = results[searchKey].hits.filter(mismatchID);

    //copy all key-value pairs of state.results into an object with spread
    //and then lastly, copy the hits: updatedHits to that object;
    this.setState({
      results: {
        ...results, 
        [searchKey]: {hits: updatedHits, page: page}
      }
    });
  }

  //lifecycle: constructor is called first, state result is null by default; so first render: nothing
  //next then componentDidMount is called, fetch the url and if no problems state's result is now set
  //since state change, render is called again and now there's something to display
  //always show search bar; use ternary operator to display listings or not
  render(){
    const {searchTerm, searchKey, results} = this.state;
    //if null set to 0
    //page uses guard operator and will be set to result's page only if result is truthy (not null) or set to 0
    const page = (results && results[searchKey] && results[searchKey].page) || 0;
    const result = (results && results[searchKey] && results[searchKey].hits) || [];
  
    return (
      <div className='page'>
        <h1>Articles</h1>
        <div className='interactions'>
          <SearchBar searchTerm={searchTerm} onSearchChange={this.onSearchChange} onSubmitSearch={this.onSubmitSearch}> Search </SearchBar>
        </div>
        {result ? 
          <Articles articleList={result} dismiss={this.dismiss} logIt={this.logIt} /> 
          :null
        }
        <div className="interactions">
          <button onClick={() => this.fetchArticles(searchTerm, page + 1)}> 
            More
          </button>
        </div>
      </div>
    );
  }
}

export default App;