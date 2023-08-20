import axios from "axios";
import React, { useState, useEffect} from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useParams } from 'react-router-dom'; 
import "./BookComments.css";
import { Alert } from 'react-bootstrap';



 
const SERVER_API_URL = process.env.REACT_APP_SERVER_API_URL;
const BOOKS_DETAILS_URL = `${SERVER_API_URL}/books/details`;
const BOOKS_URL = `${SERVER_API_URL}/books`;
const BOOK_LIKES_URL = `${SERVER_API_URL}/books/like`;
const api = axios.create({ withCredentials: true });



const BookComments = () => {
  
  const { currentUser } = useSelector((state) => state.user);
  const { searchContent, id } = useParams();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState([]);
  const [error, setError] = useState(null);

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

  const handleLikeClick = async () => {
		console.log("like clicked");
		console.log(currentUser, "likes");
    const response = await api.put(`${BOOK_LIKES_URL}/${id}`, currentUser);
    console.log(response);
    if(response.ok){
      setLikes([...likes, {id: likes.length + 1}]);
    }
    setLiked(!liked);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (newComment.trim() !== '') {
      const body = {
        user: currentUser,
        comment: newComment
      }
      try{
        const response = await api.post(`${BOOKS_URL}/${id}`, body);
        if(response.ok){
          setComments([...comments, { id: comments.length + 1, text: newComment, name: 'username', avatar: 'user avatar' }]);
          setNewComment('');
        }
      }catch(error){
        setError(error);
      }
      
    }
  };




  
  return (
    <div className="book-comments">
      <div className="row">
      <Alert variant="danger">{error && error.message}</Alert>

        <span className="col-7"><h3>Like this book?</h3></span>
        <span className="col-3">
          <i className="bi bi-heart" 
            style={{color: liked ? "red" : ""}}
            onClick={handleLikeClick}></i>
				<span className="col-2">{liked ? likes.length + 1: likes.length}</span>
			</span>
      </div>
      
      
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
                <p className="comment-text">{comment.content}{new Date() - comment.commentTime}</p>
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
