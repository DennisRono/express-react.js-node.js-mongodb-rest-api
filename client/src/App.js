import React, { useState, useEffect } from 'react';
import './style/style.css'
import axios from "axios"

const defaultButtons = [
  {id: 1, bname:"all posts"},
  {id: 2, bname:"new post"},
  {id: 3, bname:"search"}
];

const App = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [query, setQuery] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [toggledButtonId, setToggledButtonId] = useState(1);

  const userData = {
    "title": title,
    "description": description
  }
  const handleNewPost = async (e) => {
    e.preventDefault()
    await fetch("/posts", {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
    })
    .catch(error => {
        window.alert(error);
        return;
    });
    setTitle("")
    setDescription("")
  }
  const handleUpdatePost = async (e) => {
    e.preventDefault()
  }
  const deletePost = async (articleId) => {
      await axios.delete('/posts/'+articleId)
      .then(response => console.log('Delete successful'))
      .catch(error => {
          setError(error.message);
          console.error('There was an error!', error);
      });
  }
  const handleSearchPost = async (e) => {
    e.preventDefault()
    let results = [];
    let arr = data.posts;
    for (var i = 0; i < arr.length+1; i++) {
        let obj = arr.find(o => o.title.toLowerCase().includes(query.toLowerCase()));
        results.push(obj)
        arr = arr.filter(item => item !== obj)
    }
    console.log(results);
  }
  function toggleButton(button) {
      setToggledButtonId(button.id);
      let theactive = button.id;
      const newpost = document.querySelector('.newpost');
      const searchpost = document.querySelector('.searchPost');
      const viewallposts = document.querySelector('.viewAllposts');
      theactive === 1 ? viewallposts.classList.add('active') : viewallposts.classList.remove('active');
      theactive === 2 ? newpost.classList.add('active') : newpost.classList.remove('active');
      theactive === 3 ? searchpost.classList.add('active') : searchpost.classList.remove('active');
  }
  useEffect(() => {
      axios("/posts")
      .then((response) => {
      setData(response.data);
      })
      .catch((error) => {
      console.error("Error fetching data: ", error);
      setError(error);
      })
      .finally(() => {
      setLoading(false);
      });
  }, [deletePost, toggleButton]);
  return (
    <div className="playarea">
      <div className="controls">
        {defaultButtons.map(button => {
              const isToggled = button.id === toggledButtonId;
              return (
                  <button
                      key={button.id}
                      className={isToggled ? "controlsbuttons activebutton" : "controlsbuttons"}
                      onClick={() => toggleButton(button)}>
                      {button.bname}
                  </button>
              )
          })}
      </div>
      <div className="application">
        <div className="newpost">
          <h2>Create a new post</h2>
          <form className="form" onSubmit={handleNewPost}>
            <label htmlFor="title">
              title:
            </label><br/>
            <input type="text" className="inputs" value={title} onChange={e => setTitle(e.target.value)} /><br/>
            <label htmlFor="description">
              description:
            </label><br/>
            <textarea className="inputdescr" value={description} onChange={e => setDescription(e.target.value)}  name="message"></textarea>
            <br/>
            <input type="submit" value="post" className="sendButton" />
          </form>
        </div>
        <div className="updatepost">
          <h2>Update a post</h2>
          <form className="form" onSubmit={handleUpdatePost}>
            <label htmlFor="title">
              title:
            </label><br/>
            <input type="text" className="inputs" value={title} onChange={e => setTitle(e.target.value)} /><br/>
            <label htmlFor="description">
              description:
            </label><br/>
            <textarea className="inputdescr" value={description} onChange={e => setDescription(e.target.value)}  name="message"></textarea>
            <br/>
            <button className="previous">Previous</button> <button className="next">Next</button><br/>
            <input type="submit" value="update" className="sendButton" />
          </form>
        </div>
        <div className="viewAllposts active">
          <h2>All posts</h2>
          <div>
            { error ? <p>Error fetching posts!</p>  : loading ? <p>Loading...</p> : data.posts.map(post => {
              return (
                <div key={post._id} className="postCard">
                  <h3>{post.title}</h3>
                  <p>{post.description}</p>
                  <div className="postActions">
                  <button className="previous">Update</button> <button className="next" style={{ backgroundColor: "red"}} onClick={()=>deletePost(post._id)}>Delete</button><br/>
                  </div>
                </div>
                )
            })}
            </div>
        </div>
        <div className="searchPost">
          <h2>Search for a post</h2>
          <form className="form" onSubmit={handleSearchPost}>
            <label htmlFor="title">
              title:
            </label><br/>
            <input type="text" className="inputs" value={query} onChange={e => setQuery(e.target.value)} /><br/>
            <input type="submit" value="search" className="sendButton" />
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
