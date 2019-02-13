import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import PostsList from "./PostsList";
import "./styles.css";

function App() {
  const initialState = {
    value: "",
    query: "",
    posts: [],
    isLoading: false,
    hasError: false
  };

  const [posts, setPosts] = useState(initialState.posts);
  const [isLoading, setIsLoading] = useState(initialState.isLoading);
  const [query, setQuery] = useState(initialState.query);
  const [hasError, setHasError] = useState(initialState.hasError);

  const fetchPosts = async query => {
    setIsLoading(true);

    try {
      const result = await axios.get(
        `https://hn.algolia.com/api/v1/search?query=${query}`
      );
      setPosts(result.data.hits);
      setHasError(false);
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      setHasError(true);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const submitSearch = (e, query) => {
    e.preventDefault();
    fetchPosts(query);
    setQuery("");
  };

  const handleChange = (e, query) => {
    setQuery(e.target.value);
  };

  return (
    <div className="App">
      <h1>Hacker News Clone with React Hooks!</h1>
      <form>
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Search..."
        />
        <button onClick={event => submitSearch(event, query)} type="submit">
          Search
        </button>
      </form>
      {hasError && <div className="error">Oh no! Something wrong... :(</div>}
      {isLoading ? (
        <div className="loading">Loading...</div>
      ) : (
        <PostsList list={posts} />
      )}
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
