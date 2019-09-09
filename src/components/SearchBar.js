import React from 'react';

const SearchBar = (props) => {
  return (
    <div>
      <div>
        <input type="search" value={props.searchValue} onChange={(e) => props.onSearch(e.target.value)} placeholder="Search for a stock" />
      </div>
      <strong>Sort by:</strong>
      <label>
        <input type="radio" value="Alphabetically" checked={props.sortValue === "Alphabetically"} onChange={(e) => props.onSort(e.target.value)}/>
        Alphabetically
      </label>
      <label>
        <input type="radio" value="Price" checked={props.sortValue === "Price"} onChange={(e) => props.onSort(e.target.value)}/>
        Price
      </label>
      <br/>

      <label>
        <strong>Filter:</strong>
        <select value={props.filterValue} onChange={(e) => props.onFilter(e.target.value)}>
          <option value="All">All</option>
          <option value="Tech">Tech</option>
          <option value="Sportswear">Sportswear</option>
          <option value="Finance">Finance</option>
        </select>
      </label>


    </div>
  );
}


export default SearchBar;
