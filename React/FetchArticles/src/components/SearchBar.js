import React from 'react';

//a functional stateless component, because we have no need to keep track of state
//we don't use this.state or this.setState, let App handle it
//input are the props (children in this case is the text "Search")

function SearchBar({ searchTerm, onSearchChange, onSubmitSearch, children }){
    return (
        <form>
            <input type="text" value={searchTerm} onChange={onSearchChange} />
            <button type="button" onClick={onSubmitSearch}>
                {children}
            </button>
        </form>
    ); 
}

export default SearchBar;