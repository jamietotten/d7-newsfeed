import React, { useReducer, useEffect } from "react";
import "../App.css";
import { NEWS_API_KEY } from "../config/config.js";
import Header from "./Header";
import NewsArticle from "./NewsArticle";
import Search from "./Search";

const DEFAULT_SEARCH = "loser"; // aka TRUMP
const PAGE_SIZE = "5";
const NEWS_API_URL = `https://newsapi.org/v2/everything?q=${DEFAULT_SEARCH}&language=en&sortBy=publishedAt&apiKey=${NEWS_API_KEY}&pageSize=${PAGE_SIZE}`;

const initialState = {
  loading: true,
  articles: [],
  errorMessage: null
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SEARCH_NEWS_ARTICLES_REQUEST":
      return {
        ...state,
        loading: true,
        errorMessage: null
      };
    case "SEARCH_NEWS_ARTICLES_SUCCESS":
      return {
        ...state,
        loading: false,
        articles: action.payload
      };
    case "SEARCH_NEWS_ARTICLES_FAILURE":
      return {
        ...state,
        loading: false,
        errorMessage: `If you click search with no search term, you're in fact searching for everything, like everything in the entire universe.
        Please provide a search term and try again. 🙏`
      };
    default:
      return state;
  }
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    fetch(NEWS_API_URL)
      .then(response => response.json())
      .then(jsonResponse => {
        dispatch({
          type: "SEARCH_NEWS_ARTICLES_SUCCESS",
          payload: jsonResponse.articles
        });
      });
  }, []);

  const search = searchValue => {
    dispatch({
      type: "SEARCH_NEWS_ARTICLES_REQUEST"
    });

    fetch(`https://newsapi.org/v2/everything?q=${searchValue}&language=en&sortBy=publishedAt&apiKey=${NEWS_API_KEY}&pageSize=${PAGE_SIZE}`)
      .then(response => response.json())
      .then(jsonResponse => {
        if (jsonResponse.status === "ok") {
          dispatch({
            type: "SEARCH_NEWS_ARTICLES_SUCCESS",
            payload: jsonResponse.articles
          });
        } else {
          dispatch({
            type: "SEARCH_NEWS_ARTICLES_FAILURE",
            error: jsonResponse.message
          });
        }
      });
  };

  const { articles, errorMessage, loading } = state;

  return (
    <div className="app">
      <Header text="" />
      <Search search={search} />
      <div className="news-articles">
      {
        loading && !errorMessage ? (<span>loading...</span>) :
          errorMessage ? (<div className="error-message">{errorMessage}</div>) :
          (
            articles.map((article, index) => (
              <NewsArticle key={`${index}-${article.title}`} article={article} />
            ))
          )
      }
      </div>
    </div>
  );
};


export default App;
