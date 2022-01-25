import React, { useState } from 'react';
import './style/style.css'

const defaultButtons = [
  {id: 1, bname:"all posts"},
  {id: 2, bname:"new post"},
  {id: 3, bname:"update a post"},
  {id: 4, bname:"delete a post"},
  {id: 5, bname:"search"}
];

const App = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
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
  }
  const handleUpdatePost = async (e) => {
    e.preventDefault()
  }
  const handleDeletePost = async (e) => {
    e.preventDefault()
  }
  const handleSearchPost = async (e) => {
    e.preventDefault()
  }
  function toggleButton(button) {
      setToggledButtonId(button.id);
      let theactive = button.id;
      const newpost = document.querySelector('.newpost');
      const updatepost = document.querySelector('.updatepost');
      const deletepost = document.querySelector('.deletepost');
      const searchpost = document.querySelector('.searchPost');
      const viewallposts = document.querySelector('.viewAllposts');
      theactive === 1 ? viewallposts.classList.add('active') : viewallposts.classList.remove('active');
      theactive === 2 ? newpost.classList.add('active') : newpost.classList.remove('active');
      theactive === 3 ? updatepost.classList.add('active') : updatepost.classList.remove('active');
      theactive === 4 ? deletepost.classList.add('active') : deletepost.classList.remove('active');
      theactive === 5 ? searchpost.classList.add('active') : searchpost.classList.remove('active');
  }
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
        <div className="deletepost">
          <h2>Delete a post</h2>
          <form className="form" onSubmit={handleDeletePost}>
            <label htmlFor="title">
              title:
            </label><br/>
            <input type="text" className="inputs" value={title} onChange={e => setTitle(e.target.value)} /><br/>
            <input type="submit" value="delete" className="sendButton" />
          </form>
        </div>
        <div className="viewAllposts active">
          <h2>All posts</h2>
        </div>
        <div className="searchPost">
          <h2>Search for a post</h2>
          <form className="form" onSubmit={handleSearchPost}>
            <label htmlFor="title">
              title:
            </label><br/>
            <input type="text" className="inputs" value={title} onChange={e => setTitle(e.target.value)} /><br/>
            <input type="submit" value="search" className="sendButton" />
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
