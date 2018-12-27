import { reset } from 'redux-form';
import { 
        ADD_FISH, 
        FETCH_FISH,
        FILTER_FISH,
        CLICK_PAGE,
        CLICK_ACCORDION,
        FETCH_COMMENTS,
        ADD_COMMENT,
        DELETE_COMMENT,
        CLICK_EDIT,
        CHANGE_MSG,
        CHANGE_RATING,
        UPDATE_COMMENT,
        CREATE_RANDOMFISH
} from './types';

export const addFish = (formProps, callback) => async dispatch => {
    const newBody = new FormData();
    newBody.append('name', formProps.name);
    newBody.append('price', formProps.price);
    newBody.append('type', formProps.type);
    newBody.append('desc', formProps.desc);
    newBody.append('image', formProps.image, formProps.image.name);
    newBody.append('care_level', formProps.care_level);
    newBody.append('temperament', formProps.temperament);
    newBody.append('diet', formProps.diet);
    newBody.append('reef_safe', formProps.reef_safe);
    newBody.append('minimum_tank_size', formProps.minimum_tank_size);

    const response = await fetch('http://localhost:3001/fishPOST/', {
        method: "POST",
        body: newBody
    });
    const newFish = await response.json();
    dispatch({ 
        type: ADD_FISH,
        payload: newFish
    });
    callback();
};

export const fetchFish = () => async dispatch => {
    const response = await fetch('http://localhost:3001/fish/');
    const fish = await response.json();
    dispatch({
        type: FETCH_FISH,
        payload: fish
    });
}

export const filterFish = (event, fish) => dispatch => {
    if (event.target.value === "all") {
        dispatch({
            type: FILTER_FISH,
            payload: fish
        });
    } else {
        const filtered = fish.filter(singleFish => singleFish.type === event.target.value);
        dispatch({
            type: FILTER_FISH,
            payload: filtered
        });
    }
}

export const clickPage = (event) => dispatch => {
    dispatch({
        type: CLICK_PAGE,
        payload: Number(event.target.id)
    });
}

export const clickAccordion = (panelNumber) => async dispatch => {
    dispatch({
        type: CLICK_ACCORDION,
        payload: panelNumber
    });
}

export const fetchComments = () => async dispatch => {
    const response = await fetch('http://localhost:3001/comments/');
    const comments = await response.json();
    dispatch({
        type: FETCH_COMMENTS,
        payload: comments
    });
}

export const addComment = (formProps, fishPostCode) => async dispatch => {

    if(formProps.rating === undefined){
        formProps.rating = "";
    } else {
        formProps.rating = Number(formProps.rating)
    }
    
    const newBody = {
        code: fishPostCode,
        comment: {
            text: formProps.text,
            user: "",
            rating: formProps.rating
        }
    };
    const response = await fetch('http://localhost:3001/messagePOST/', {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      method: "POST",
      body: JSON.stringify(newBody)
    });
    const newPost = await response.json();
    dispatch({
        type: ADD_COMMENT,
        payload: newPost,
        fishPostCode
    });
    dispatch(reset('addcomment'));
}

export const deleteComment = (fishPostCode, deleteCommentcode) => async dispatch => {
    const newBody = {
        code: fishPostCode,
        cid: deleteCommentcode
    };
    const response = await fetch('http://localhost:3001/messageDELETE/', {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      method: "DELETE",
      body: JSON.stringify(newBody)
    });
    const newPost = await response.json();
    dispatch({
        type: DELETE_COMMENT,
        payload: newPost,
        fishPostCode
    });
}

export const clickEdit = (editText, editRating, editId) => dispatch => {
    const editComment = {
        editText,
        editRating,
        editId
    };
    dispatch({
        type: CLICK_EDIT,
        payload: editComment
    });
}

export const changeMsg = (event) => dispatch => {
    dispatch({
        type: CHANGE_MSG,
        payload: event.target.value
    });
}

export const changeRating = (event) => dispatch => {
    dispatch({
        type: CHANGE_RATING,
        payload: event.target.value
    });
}

export const updateComment = (fishPostCode, updateCommentcode, text, user, rating, updateCommentArrIndex) => async dispatch => {
    if(rating === ""){
        rating = "";
    } else {
        rating = Number(rating)
    }
    const newBody = {
        code: fishPostCode,
        cid: updateCommentcode,
        text,
        user,
        rating,
        arrIndex: updateCommentArrIndex
    };
    const response = await fetch('http://localhost:3001/messagePUT/', {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      method: "PUT",
      body: JSON.stringify(newBody)
    });
    const newPost = await response.json();
    dispatch({
        type: UPDATE_COMMENT,
        payload: newPost,
        fishPostCode
    });
}

export const createRandomFish = () => async dispatch => {
    const response = await fetch('http://localhost:3001/fish/');
    const products = await response.json();

    const values = Object.values(products.fish);
    const randomValue = values[parseInt(Math.random() * values.length)];
    const randomValue2 = values[parseInt(Math.random() * values.length)];
    const randomValue3 = values[parseInt(Math.random() * values.length)];

    dispatch({
        type: CREATE_RANDOMFISH,
        payload: [randomValue, randomValue2, randomValue3]
    });
}