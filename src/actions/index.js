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
        CREATE_RANDOMFISH,
        LOGIN,
        LOGINERROR,
        SIGNUP,
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

export const addComment = (formProps, fid, uid) => async dispatch => {

    if(formProps.rating === undefined){
        formProps.rating = "";
    } else {
        formProps.rating = Number(formProps.rating)
    }
    
    const newBody = {
        fid,
        text: formProps.text,
        uid,
        rating: formProps.rating
    };
    const response = await fetch('http://localhost:3001/messagePOST/', {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      method: "POST",
      body: JSON.stringify(newBody)
    });
    const newComment = await response.json();
    dispatch({
        type: ADD_COMMENT,
        payload: newComment
    });
    dispatch(reset('addcomment'));
}

export const deleteComment = (fid, cid) => async dispatch => {
    const newBody = {
        fid,
        cid
    };
    const response = await fetch('http://localhost:3001/messageDELETE/', {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      method: "DELETE",
      body: JSON.stringify(newBody)
    });
    const allNewComments = await response.json();
    dispatch({
        type: DELETE_COMMENT,
        payload: allNewComments
    });
}

export const clickEdit = (editText, editRating, editId) => dispatch => {
    if(editRating === null) {
        editRating = "";
    }
    
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

export const updateComment = (fid, cid, text, uid, rating) => async dispatch => {
    if(rating === ""){
        rating = null;
    } else {
        rating = Number(rating)
    }
    const newBody = {
        fid,
        cid,
        text,
        uid,
        rating
    };
    const response = await fetch('http://localhost:3001/messagePUT/', {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      method: "PUT",
      body: JSON.stringify(newBody)
    });
    const allNewComments = await response.json();
    dispatch({
        type: UPDATE_COMMENT,
        payload: allNewComments
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

export const login = (formProps, callback) => async dispatch => {
    const newBody = {
        username: formProps.username,
        password: formProps.password
    };
    const response = await fetch('http://localhost:3001/login/', {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      method: "POST",
      body: JSON.stringify(newBody)
    });
    const user = await response.json();
    if(user.id === undefined) {
        dispatch({
            type: LOGINERROR,
            payload: user
        });
    } else {
        dispatch({
            type: LOGIN,
            payload: user
        });
        callback();
    }
}

export const signup = (formProps, callback) => async dispatch => {
    const newBody = {
        first_name: formProps.first_name,
        last_name: formProps.last_name,
        birth_year: Number(formProps.birth_year),
        email: formProps.email,
        username: formProps.username,
        password: formProps.password
    };
    const response = await fetch('http://localhost:3001/signup/', {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      method: "POST",
      body: JSON.stringify(newBody)
    });
    const user = await response.json();
    dispatch({
        type: SIGNUP,
        payload: user
    });
    callback();
}