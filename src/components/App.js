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

  onChangeName = (e) => {
    this.setState({
      newProductName: e.target.value
    });
  }
  onChangePrice = (e) => {
    this.setState({
      newProductPrice: Number(e.target.value)
    });
  }
  onChangeType = (e) => {
    console.log('e',e.target.value)
    this.setState({
      newProductType: e.target.value
    });
  }
  onChangeDesc = (e) => {
    console.log('e',e.target.value)
    this.setState({
      newProductDesc: e.target.value
    });
  }
  onChangeImage = (e) => {
    this.setState({
      newProductImageLink: e.target.files[0]
    });
  }
  onChangeCare = (e) => {
    console.log('e',e.target.value)
    this.setState({
      newProductCare: e.target.value
    });
  }
  onChangeTemperament = (e) => {
    console.log('e',e.target.value)
    this.setState({
      newProductTemperament: e.target.value
    });
  }
  onChangeDiet = (e) => {
    console.log('e',e.target.value)
    this.setState({
      newProductDiet: e.target.value
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
  onChangeTankSize = (e) => {
    this.setState({
      newProductTankSize: Number(e.target.value)
    });
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
    //console.log('comments',this.state.comments)
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
                      filteredFish={this.state.filteredFish}
                      comments={this.state.comments}
                      onClickFilter={this.onClickFilter}

                      onHandleClickPage={this.onHandleClickPage}
                      currentPage={this.state.currentPage}
                      fishPerPage={this.state.fishPerPage}
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
                      //{...this.state}
                      fish={this.state.fish}
                      comments={this.state.comments}
                      onHandleNewComment={this.onHandleNewComment}
                      onChangeComment={this.onChangeComment}
                      newComment={this.state.newComment}
                      onDeleteComment={this.onDeleteComment}

                      onClickEdit={this.onClickEdit}
                      onSaveComment={this.onSaveComment}
                      isEditButtonClick={this.state.isEditButtonClick}
                      onUpdateTextareaComment={this.onUpdateTextareaComment}
                      onUpdateSelectRating={this.onUpdateSelectRating}

                      editMsg={this.state.editMsg}
                      editMsgCid={this.state.editMsgCid}
                      editRatingValue={this.state.editRatingValue}

                      onHandleSelectRating={this.onHandleSelectRating}
                      selectedRatingValue={this.state.selectedRatingValue}

                      handleAccordionClick={this.handleAccordionClick}
                      shown={this.state.shown}
                      randomFish={this.state.randomFish}
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
                      onChangeCare={this.onChangeCare}
                      onChangeTemperament={this.onChangeTemperament}
                      onChangeDiet={this.onChangeDiet}
                      onChangeTankSize={this.onChangeTankSize}
                      onChangeReef={this.onChangeReef}

                      newProductName={this.state.newProductName}
                      newProductPrice={this.state.newProductPrice}
                      newProductType={this.state.newProductType}
                      newProductDesc={this.state.newProductDesc}
                      newProductImageLink={this.state.newProductImageLink}
                      newProductDiet={this.state.newProductDiet}
                      newProductCare={this.state.newProductCare}
                      newProductTemperament={this.state.newProductTemperament}
                      newProductTankSize={this.state.newProductTankSize}
                      newProductReef={this.state.newProductReef}

                      onHandleSubmit={this.onHandleSubmit}

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