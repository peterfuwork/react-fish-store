import React, { Component } from 'react';
import Category from './Category';
import Single from './Single';
import Filtered from './Filtered';
import Form from './Form';
import { BrowserRouter, Route } from "react-router-dom";

class App extends Component {
  constructor() {
    super();

    this.state = {
      fish: [],
      newProductName: "",
      newProductPrice: 0,
      newProductType: "",
      newProductDesc: "",
      newProductImageLink: ""
    }
  }

  async componentDidMount() {
    const data = await fetch('http://localhost:3001/fish/')
    .then(data => data.json());
    this.setState({
      fish: data.fish
    })
  }

  

  post = async (name, price, type, desc, image) => {
    const newBody = {
      name,
      price,
      type,
      desc,
      image
    }
    await fetch('http://localhost:3001/fishPOST/', {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      method: "POST",
      body: JSON.stringify(newBody)
    })
    .then(response => response.json())
    .then((response) => {
      console.log('response',response)
      this.setState({
        fish: [...this.state.fish, response]
      })
    })
  }

  onChangeName = (e) => {
    this.setState({
      newProductName: e.target.value
    });
  }
  onChangePrice = (e) => {
    this.setState({
      newProductPrice: e.target.value
    });
  }
  onChangeType = (e) => {
    this.setState({
      newProductType: e.target.value
    });
  }
  onChangeDesc = (e) => {
    this.setState({
      newProductDesc: e.target.value
    });
  }
  onChangeImage = (e) => {
    this.setState({
      newProductImageLink: e.target.value
    });
  }

  onHandleSubmit = (e) => {
    e.preventDefault();
    const name = this.state.newProductName;
    const price = this.state.newProductPrice;
    const type = this.state.newProductType;
    const desc = this.state.newProductDesc;
    const image = this.state.newProductImageLink;

    this.post(name, price, type, desc, image);
    this.setState({
      newProductName: "",
      newProductPrice: 0,
      newProductType: "",
      newProductDesc: "",
      newProductImageLink: ""
    })
  }

  render() { 
    return (
      <BrowserRouter>
        <div className="App">
          <div className="container">
            <section className="row products">
              <Route 
                exact 
                path="/" 
                component={() => 
                  <Category 
                    fish={this.state.fish}
                  />
                }
              />
              <Route 
                exact 
                path="/marinefish/type/:type"
                component={(props) => 
                  <Filtered 
                    fish={this.state.fish}
                    {...props}
                  />
                }
              />
              <Route
                exact
                path="/marinefish/id/:id"
                component={(props) =>
                  <Single 
                    fish={this.state.fish}
                    {...props}
                  />
                }
              />
              <Route exact 
                path="/form"
                render={(props) =>
                  <Form
                    onChangeName={this.onChangeName}
                    onChangePrice={this.onChangePrice}
                    onChangeType={this.onChangeType}
                    onChangeDesc={this.onChangeDesc}
                    onChangeImage={this.onChangeImage}
                    newProductName={this.state.newProductName}
                    newProductPrice={this.state.newProductPrice}
                    newProductType={this.state.newProductType}
                    newProductDesc={this.state.newProductDesc}
                    newProductImageLink={this.state.newProductImageLink}
                    onHandleSubmit={this.onHandleSubmit}
                  />
                }
              />
              
            </section>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;