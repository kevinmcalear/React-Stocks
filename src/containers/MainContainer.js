import React, { Component } from 'react';
import StockContainer from './StockContainer'
import PortfolioContainer from './PortfolioContainer'
import SearchBar from '../components/SearchBar'

class MainContainer extends Component {
  state = {
    stocks: [],
    portfolio: [],
    sortTerm: '',
    filterTerm: 'All',
    searchTerm: ''
  }

  componentDidMount() {
    fetch('http://localhost:3000/stocks')
      .then(res => res.json())
      .then(stocks => this.setState({ stocks: stocks }))
  }

  handleAddStock = (newStock) => {
    const newStockCopy = {...newStock, purchaseId: Math.random()}
    // https://stackoverflow.com/questions/31809682/difference-between-javascript-array-every-and-some
    // const alreadyExists = this.state.portfolio.some(stock => stock === newStock)
    // if (!alreadyExists) {
    this.setState({ portfolio: [...this.state.portfolio, newStockCopy]})
    // }
  }

  handleRemoveStock = (stockToBeRemoved) => {
    // ONE WAY TO ONLY REMOVE ONE ITEM:
    // let updatedPortfolio = []
    // let alreadyFound = false
    //
    // this.state.portfolio.forEach(stock => {
    //   if (stock !== stockToBeRemoved || alreadyFound) {
    //     updatedPortfolio.push(stock)
    //   } else {
    //     alreadyFound = true
    //   }
    // })

    const updatedPortfolio = this.state.portfolio.filter(stock => stock !== stockToBeRemoved)

    this.setState({ portfolio: updatedPortfolio })
  }

  handleSort = (sortValue) => {
    this.setState({ sortTerm: sortValue })
  }

  handleFilter = (filterValue) => {
    this.setState({ filterTerm: filterValue })
  }

  handleSearch = (searchValue) => {
    this.setState({ searchTerm: searchValue })
  }

  whatToRender = () => {
    let displayedStocks = this.state.stocks

    if (this.state.sortTerm === 'Alphabetically') {
      // sort Alphabetically
      displayedStocks = displayedStocks.sort((a, b) => (a.ticker > b.ticker) ? 1 : -1)
    } else if (this.state.sortTerm === 'Price') {
      // sort by Price
      displayedStocks = displayedStocks.sort((a, b) => (a.price > b.price) ? 1 : -1)
    }

    if (this.state.filterTerm !== 'All') {
      displayedStocks = displayedStocks.filter(stock => stock.type === this.state.filterTerm)
    }

    displayedStocks = displayedStocks.filter(stock => stock.name.toLowerCase().includes(this.state.searchTerm.toLowerCase().trim()))

    return displayedStocks
  }

  render() {
    console.log(this.state)
    return (
      <div>
        <SearchBar
          sortValue={this.state.sortTerm}
          onSort={this.handleSort}
          filterValue={this.state.filterTerm}
          onFilter={this.handleFilter}
          searchValue={this.state.searchTerm}
          onSearch={this.handleSearch} />

          <div className="row">
            <div className="col-8">

              <StockContainer onAddStock={this.handleAddStock} stocks={this.whatToRender()}/>

            </div>
            <div className="col-4">

              <PortfolioContainer onRemoveStock={this.handleRemoveStock} stocks={this.state.portfolio}/>

            </div>
          </div>
      </div>
    );
  }

}

export default MainContainer;
