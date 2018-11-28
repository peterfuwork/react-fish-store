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
      comments: {},
      newProductName: "",
      newProductPrice: 0,
      newProductType: "",
      newProductDesc: "",
      newProductImageLink: "",
      newComment:"",
      isEditButtonClick: false,
      editMsg: "",
      editMsgCid: ""
    }
  }

  async componentDidMount() {
    const data = await fetch('http://localhost:3001/fish/')
    .then(data => data.json());
    const msgData = await fetch('http://localhost:3001/comments/')
    .then(data => data.json())
    this.setState({
      fish: data.fish,
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
        fish: [...this.state.fish, response]
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

  updateMsg = async (code, cid, text, user, arrIndex) => {
    var newBody = {
      code,
      cid,
      text,
      user,
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

  onHandleNewComment = (e, postCode, specificPostCommentLength) => {
    e.preventDefault();
    console.log('postCode',postCode)
    const comment = { 
      text: this.state.newComment,
      user: ""
    };
    console.log('comment', comment)
    this.postMsg(postCode, comment, specificPostCommentLength);

    this.setState({
      newComment: ""
    })
  }

  onClickEdit = (text, cid) => {
    this.setState({
      isEditButtonClick: true,
      editMsgCid: cid,
      editMsg: text
    })
  }

  onUpdateTextareaComment = (e) => {
    e.preventDefault();
    // console.log('postCode', postCode)
    // console.log('cid', cid)
    // console.log('text', text)
    // console.log('user', user)
    // console.log('i', arrIndex)
    
    this.setState({
      editMsg: e.target.value
    })
  }

  onSaveComment = (e, postCode, cid, newText, user, arrIndex) => {
    e.preventDefault();
    // console.log('postCode', postCode)
    // console.log('cid', cid)
    // console.log('text', text)
    this.updateMsg(postCode, cid, newText, user, arrIndex);
    this.setState({
      isEditButtonClick: false
    })
    // this.updateMsg(postCode, cid);
  }

  onDeleteComment = (e, postCode, cid) => {
    e.preventDefault();
    this.deleteMsg(postCode, cid);
  }

  render() {
    console.log('comments',this.state.comments)
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
                    comments={this.state.comments}
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
                    onClickEdit={this.onClickEdit}
                    onUpdateTextareaComment={this.onUpdateTextareaComment}
                    onSaveComment={this.onSaveComment}
                    onDeleteComment={this.onDeleteComment}
                    isEditButtonClick={this.state.isEditButtonClick}
                    editMsg={this.state.editMsg}
                    editMsgCid={this.state.editMsgCid}
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