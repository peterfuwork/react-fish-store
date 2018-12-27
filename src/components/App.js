import React, { Component } from 'react';

class App extends Component {
  render() {
    const { children } = this.props;
    return (
      <div className="App">
        <div className="container">
          <section className="row products">
            { children }
          </section>
        </div>
      </div>
    );
  }
}

export default App;