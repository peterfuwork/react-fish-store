import React, { Component } from 'react';
import Category from './Category';
import Single from './Single';
import Filtered from './Filtered';
import Form from './Form';
import Demo from './Demo';
import SimpleSlider from './SimpleSlider';
import { BrowserRouter, Route } from "react-router-dom";

class App extends Component {
  constructor() {
    super();

    this.state = {
      fish: [],
      filteredFish: [],
      randomFish:[],
      comments: {},
      newProductName: "",
      newProductPrice: "",
      newProductType: "",
      newProductDesc: "",
      newProductImageLink: "",
      newProductCare: "",
      newProductTemperament: "",
      newProductDiet: "",
      newProductTankSize: "",
      newProductReef: false,

      newComment:"",
      isEditButtonClick: false,

      editMsg: "",
      editMsgCid: "",
      editRatingValue: "",

      selectedRatingValue: "",

      currentPage: 1,
      fishPerPage: 6,
      shown: {}
    }
  }

  async componentDidMount() {
    const data = await fetch('http://localhost:3001/fish/')
    .then(data => data.json());
    const msgData = await fetch('http://localhost:3001/comments/')
    .then(data => data.json())

    this.setState({
      fish: data.fish,
      filteredFish: data.fish,
      comments: msgData.comments
    })
    
    this.getRandomFish();
  }

  getRandomFish = () => {
    const values = Object.values(this.state.fish);
    const randomValue = values[parseInt(Math.random() * values.length)];
    const randomValue2 = values[parseInt(Math.random() * values.length)];
    const randomValue3 = values[parseInt(Math.random() * values.length)];
    this.setState({
      randomFish: [randomValue, randomValue2, randomValue3]
    });
  }

  post = async (name, price, type, desc, image, care_level, temperament, diet, reef_safe, minimum_tank_size) => {
    const newBody = new FormData();
    newBody.append('name', name);
    newBody.append('price', price);
    newBody.append('type', type);
    newBody.append('desc', desc);
    newBody.append('image', image, image.name);
    newBody.append('care_level', care_level);
    newBody.append('temperament', temperament);
    newBody.append('diet', diet);
    newBody.append('reef_safe', reef_safe);
    newBody.append('minimum_tank_size', minimum_tank_size);

    await fetch('http://localhost:3001/fishPOST/', {
      method: "POST",
      body: newBody
    })
    .then((response) => response.json())
    .then((response) => {
      console.log('response',response);
      this.setState({
        fish: [...this.state.fish, response],
        filteredFish: [...this.state.fish, response]
      })
    })
  }
  
  postMsg = async (code, comment, postLength) => {
    var newBody = {
      code,
      comment,
      postLength
    };
    console.log('newBody', newBody.code)
    await fetch('http://localhost:3001/messagePOST/', {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      method: "POST",
      body: JSON.stringify(newBody)
    })
    .then(response => {
      return response.json();
    })
    .then((response) => {
      console.log('response',response)
      
      console.log('code',code)
      this.setState( prevState => ({
          comments: {
            ...prevState.comments,
            [code]: response
          }
        })
      )
    })
  }

  updateMsg = async (code, cid, text, user, rating, arrIndex) => {
    var newBody = {
      code,
      cid,
      text,
      user,
      rating,
      arrIndex
    };
    await fetch('http://localhost:3001/messagePUT/', {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      method: "PUT",
      body: JSON.stringify(newBody)
    })
    .then(response => {
      return response.json();
    })
    .then((response) => {
      this.setState(prevState => ({
          comments: {
            ...prevState.comments,
            [code]: response
          }
        })
      )
      console.log('response',response)
    })
  }

  deleteMsg = async (code, cid) => {
    var newBody = {
      code,
      cid
    };
    await fetch('http://localhost:3001/messageDELETE/', {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      method: "DELETE",
      body: JSON.stringify(newBody)
    })
    .then(response => {
      return response.json();
    })
    .then((response) => {
      this.setState(prevState => ({
          comments: {
            ...prevState.comments,
            [code]: response
          }
        })
      )
      console.log('response',response)
    })
  }

  onClickFilter = (e) => {
    if (e.target.value === "all") {
      this.setState({
        filteredFish: this.state.fish
      });
    } else {
      const filtered = this.state.fish.filter(singleFish => singleFish.type === e.target.value);
      this.setState({
        filteredFish: filtered
      });
    }
  }

  onHandleInput = (e) => {
    const { value, name } = e.target;
    this.setState({
      [name]: value
    })
  }
  onChangeImage = (e) => {
    this.setState({
      newProductImageLink: e.target.files[0]
    });
  }
  onChangeReef = (e) => {
    console.log('e',e.target.value);
    if(e.target.value === "Yes") {
      this.setState({
        newProductReef: true
      });
    } else if(e.target.value === "No") {
      this.setState({
        newProductReef: false
      });
    } else {
      this.setState({
        newProductReef: null
      });
    }
  }

  onHandleSubmit = (e) => {
    e.preventDefault();
    const name = this.state.newProductName;
    const price = this.state.newProductPrice;
    const type = this.state.newProductType;
    const desc = this.state.newProductDesc;
    const image = this.state.newProductImageLink;

    const care_level = this.state.newProductCare;
    const temperament = this.state.newProductTemperament;
    const diet = this.state.newProductDiet;
    const reef_safe = this.state.newProductReef;
    const minimum_tank_size = this.state.newProductTankSize;
    

    this.post(name, price, type, desc, image, care_level, temperament, diet, reef_safe, minimum_tank_size);
    e.target.reset();
    this.setState({
      newProductName: "",
      newProductPrice: "",
      newProductType: "",
      newProductDesc: "",
      newProductImageLink: "",
      newProductCare: "",
      newProductTemperament: "",
      newProductDiet: "",
      newProductReef: null,
      newProductTankSize: ""
    })
   
  }

  onChangeComment = (e) => {
    this.setState({
      newComment: e.target.value
    });
  }

  onHandleNewComment = (e, postCode, specificPostCommentLength, ratingValue) => {
    e.preventDefault();
    console.log('ratingValue', ratingValue)
    const comment = { 
      text: this.state.newComment,
      user: "",
      rating: ratingValue
    };
    console.log('comment', comment)
    this.postMsg(postCode, comment, specificPostCommentLength, ratingValue);
    this.setState({
      newComment: "",
      selectedRatingValue: ""
    })
    console.log('selectedRatingValue', this.state.selectedRatingValue);
  }

  onClickEdit = (text, rating, cid) => {
    this.setState({
      isEditButtonClick: true,
      editMsgCid: cid,
      editMsg: text,
      editRatingValue: rating
    })
  }

  onUpdateTextareaComment = (e) => {
    e.preventDefault();
    this.setState({
      editMsg: e.target.value
    })
  }

  onUpdateSelectRating = (e) => {
    e.preventDefault();
    this.setState({
      editRatingValue: e.target.value
    })
  }

  onSaveComment = (e, postCode, cid, newText, user, rating, arrIndex) => {
    e.preventDefault();
    
    if (rating === "") {
      // if rating has no content
      this.updateMsg(postCode, cid, newText, user, rating, arrIndex);
      this.setState({
        isEditButtonClick: false,
        editRatingValue: ""
      })
    } else {
      // if rating has number in string
      this.updateMsg(postCode, cid, newText, user, Number(rating), arrIndex);
      this.setState({
        isEditButtonClick: false,
        editRatingValue: ""
      })
    }

    console.log('editMsg', this.state.editRatingValue)
    // this.updateMsg(postCode, cid);
  }

  onDeleteComment = (e, postCode, cid) => {
    e.preventDefault();
    this.deleteMsg(postCode, cid);
  }

  onHandleClickPage = (e) => {
    this.setState({
        currentPage: Number(e.target.id)
    });
  }

  onHandleSelectRating = (e) => {
    console.log('efdasfdasfasf',e.target.value);
    this.setState({
      selectedRatingValue: Number(e.target.value)
    });
  }

  handleAccordionClick = (panelNumber) => {
    this.setState({
      shown: {
          [panelNumber]: !this.state.shown[panelNumber]
      }
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
                      onClickFilter={this.onClickFilter}
                      onHandleClickPage={this.onHandleClickPage}
                      {...this.state}
                    />
                  }
                />
                <Route 
                  exact 
                  path="/marinefish/type/:type"
                  component={(props) => 
                    <Filtered 
                      {...this.state}
                      {...props}
                    />
                  }
                />
                <Route
                  exact
                  path="/marinefish/id/:id"
                  render={(props) =>
                    <Single 
                      onHandleNewComment={this.onHandleNewComment}
                      onChangeComment={this.onChangeComment}
                      onDeleteComment={this.onDeleteComment}

                      onClickEdit={this.onClickEdit}
                      onSaveComment={this.onSaveComment}
                      onUpdateTextareaComment={this.onUpdateTextareaComment}
                      onUpdateSelectRating={this.onUpdateSelectRating}

                      onHandleSelectRating={this.onHandleSelectRating}

                      handleAccordionClick={this.handleAccordionClick}
                      {...this.state}
                      {...props}
                    />
                  }
                />
                <Route exact 
                  path="/form"
                  render={(props) => 
                    <Form
                      onChangeImage={this.onChangeImage}
                      onChangeReef={this.onChangeReef}
                      onHandleInput={this.onHandleInput}
                      onHandleSubmit={this.onHandleSubmit}

                      {...this.state}
                      {...props}
                    />
                  }
                />

                <Route exact 
                  path="/demo"
                  component={(props) =>
                    <Demo />
                  }
                />

                <Route exact 
                  path="/slider"
                  component={(props) =>
                    <SimpleSlider />
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