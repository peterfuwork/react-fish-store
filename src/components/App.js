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
      filteredFish: [],
      comments: {},
      newProductName: "",
      newProductPrice: 0,
      newProductType: "",
      newProductDesc: "",
      newProductImageLink: "",
      newComment:"",
      isEditButtonClick: false,

      editMsg: "",
      editMsgCid: "",
      editRatingValue: "",

      ratingValue: "",

      currentPage: 1,
      fishPerPage: 6
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
    console.log('e',e);

    this.post(name, price, type, desc, image);
    this.setState({
      newProductName: "",
      newProductPrice: 0,
      newProductType: "",
      newProductDesc: "",
      newProductImageLink: ""
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
      ratingValue: ""
    })
    console.log('ratingValue', this.state.ratingValue);
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
    this.updateMsg(postCode, cid, newText, user, rating, arrIndex);
    this.setState({
      isEditButtonClick: false,
      editRatingValue: ""
    })
    console.log('editMsg', this.state.editMsg)
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
      ratingValue: Number(e.target.value)
    });
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
                      ratingValue={this.state.ratingValue}
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
                      {...props}
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