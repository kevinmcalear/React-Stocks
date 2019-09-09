import React, { Component } from 'react';
import Stock from '../components/Stock'

class PortfolioContainer extends Component {

  render() {
    return (
      <div>
        <h2>My Portfolio</h2>
          {
            this.props.stocks.map((stock, index) => <Stock key={`${stock.id}-${index}`} onSelectedStock={this.props.onRemoveStock} stock={stock} />)
          }
      </div>
    );
  }

}

export default PortfolioContainer;
