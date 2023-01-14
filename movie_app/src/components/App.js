import React, { useReducer, useEffect } from 'react';
import '../App.css';
import Header from './Header.js';
import Movie from './Movie.js';
import Search from './Search.js';

const MOVIE_API_URL = "https://www.omdbapi.com/?s=super&apikey=4c71b1b2"; 

const initialState = {
  loading: true,
  movies: [],
  errorMsg: null
};

const reducer = (state, action) => {
  switch(action.type) {
  case "SEARCH_MOVIES_REQUEST":
    return {
      ...state,
      loading: true,
      errorMsg:null
    };
  case "SEARCH_MOVIES_SUCCESS":
    return {
      ...state,
      loading: false,
      movies: action.payload
    };
  case "SEARCH_MOVIES_FAIL":
    return {
      ...state,
      loading: false,
      errorMsg: action.payload
    };
  default:
    return state;
  }
};

const App = () => {
  const[state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    fetch(MOVIE_API_URL)
    .then(response => response.json())
    .then(jsonResponse => {
      dispatch({
        type: "SEARCH_MOVIES_SUCCESS",
        payload: jsonResponse.Search
      })
    });
  }, []);

  const search = searchValue => {
    dispatch({
      type: "SEARCH_MOVIES_REQUEST"
    });

    fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey=4c71b1b2`)
      .then(response => response.json())
      .then(jsonResponse => {
        console.log(jsonResponse);
        if(jsonResponse.Response === "True") {
          dispatch({
            type: "SEARCH_MOVIES_SUCCESS",
            payload: jsonResponse.Search
          });
        } else {
          dispatch({
            type: "SEARCH_MOVIES_FAIL",
            payload: jsonResponse.Error
          });
        }
      });
  };

  const { movies, errorMsg, loading } = state;

  return (
    <div className="App">
      <Header text="movieApp"/>
      <Search search={search}/>
      <p className = "App-intro">Sharing a few of favorite movies</p>
      <div className="movies">
        {loading && !errorMsg ? (<span>loading...</span>) : errorMsg ? (
          <div className="errorMessage">{errorMsg}</div>) : (
          movies.map((movie, index) => (
            <Movie key={`${index}-${movie.Title}`} movie={movie}/>
            ))
          )}        
      </div>
    </div>
  );
};

export default App;
