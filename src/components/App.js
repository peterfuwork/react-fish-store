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
      newProductImageLink: "",
      messages:[],
      newMessage:""
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
      this.setState({
        fish: [...this.state.fish, response]
      })
    })
  }
  
  postMsg = async (id, message) => {
    var newBody = {
      id,
      message
    };
    console.log('newBody', newBody.id)
    await fetch('http://localhost:3001/messagePOST/', {
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
      // const singleFish = this.state.fish[id-1].messages
      // console.log('singleFish',singleFish);
      this.setState({
        fish: [
          ...this.state.fish.slice(0, id-1), 
          { 
            id: this.state.fish[id-1].id,
            name: this.state.fish[id-1].name,
            price: this.state.fish[id-1].price,
            desc: this.state.fish[id-1].desc,
            type: this.state.fish[id-1].type,
            image: this.state.fish[id-1].image,
            messages: this.state.fish[id-1].messages.concat(response)
          }, 
          ...this.state.fish.slice(id)
        ]
      })
      console.log('fish',this.state.fish);
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

  onChangeMessage = (e) => {
    this.setState({
      newMessage: e.target.value
    });
  }
  onHandleNewMessage = (e, fishId) => {
    e.preventDefault();
    console.log('fishId',fishId)
    const message = { text: this.state.newMessage };
    console.log('message', message)
    this.postMsg(fishId, message);

    this.setState({
      newMessage: ""
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
                render={(props) =>
                  <Single 
                    fish={this.state.fish}
                    onHandleNewMessage={this.onHandleNewMessage}
                    onChangeMessage={this.onChangeMessage}
                    newMessage={this.state.newMessage}
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