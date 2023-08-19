import axios from "axios";
import React, { useState, useEffect} from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useParams } from 'react-router-dom'; 
import "./BookComments.css";

const SERVER_API_URL = process.env.REACT_APP_SERVER_API_URL;
const BOOKS_DETAILS_URL = `${SERVER_API_URL}/books/details`;
const BOOKS_URL = `${SERVER_API_URL}/books`;
const api = axios.create({ withCredentials: true });


const BookComments = () => {
  
  const { currentUser } = useSelector((state) => state.user);
  const { searchContent, id } = useParams();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [likes, setLikes] = useState([]);

  const fetchCommentsFromDatabase = async () => {
    try{
      const response = await fetch(`${BOOKS_DETAILS_URL}/${id}`);
      if(response.ok){
        const commentsAndLikesData = await response.json();
        setComments(commentsAndLikesData.comments);
        setLikes(commentsAndLikesData.likes);
      }else{
        console.error('Failed to fetch comments and likes');
      }
    }catch(error) {
      console.error('Error fetching comments and likes:', error);
    }
  }

  useEffect(() => {
    fetchCommentsFromDatabase();
  }, [id]);

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log(currentUser);
    if (newComment.trim() !== '') {
      const body = {
        user: currentUser,
        comment: newComment
      }
      const response = await api.post(`${BOOKS_URL}/${id}`, body);
      if(response.ok){
        setComments([...comments, { id: comments.length + 1, text: newComment, name: 'Your Name', avatar: 'path_to_your_avatar.jpg' }]);
        setNewComment('');
      }
    }
  };
  return (
    <div className="book-comments">
      <h3>Likes</h3>
      <p id="likes-list">{likes.map((like, index) => (index > 0 ? ' ' : '') + like.user.username)}</p>
      <h3>Comments</h3>
      <form onSubmit={handleSubmit} className="comment-form">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Enter your comment..."
        />
        <button type="submit" >Submit</button>
      </form>
      <ul className="comment-list">
        {comments.map((comment) => (
          <li key={comment.id} className="comment-item">
            <div className="comment-header">
              <img src={comment.avatar} alt={`${comment.user.username}'s Avatar`} />
              <div className="comment-content">
                {comment.user && comment.user.username ? comment.user.username : 'Anonymous'}
                {/* <span className="comment-author">{comment.user.username}</span> */}
                <p className="comment-text">{comment.content}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit} className="comment-form">
      </form>
    </div>
  );

}

export default BookComments;
