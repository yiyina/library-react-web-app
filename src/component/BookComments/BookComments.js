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
  const [timeAgo, setTimeAgo] = useState('');

  const fetchCommentsFromDatabase = async () => {
    try{
      const response = await fetch(`${BOOKS_DETAILS_URL}/${id}`);
      if(response.ok){
        const commentsAndLikesData = await response.json();
        const currentTime = new Date(); // Current time
        // console.log(currentTime);
        // console.log(commentsAndLikesData.comments[0].commentTime);
        // console.log(new Date(commentsAndLikesData.comments[0].commentTime));
        // console.log(currentTime - new Date(commentsAndLikesData.comments[0].commentTime))
        const commentsAndLikesData_time = commentsAndLikesData.comments.map(comment => ({
          ...comment,
          timeAgo: getTimeAgo(currentTime, new Date(comment.commentTime))
        }));
        setComments(commentsAndLikesData_time);
        setLikes(commentsAndLikesData.likes);
      }else{
        console.error('Failed to fetch comments and likes');
      }
    }catch(error) {
      console.error('Error fetching comments and likes:', error);
    }
  }

  const getTimeAgo = (currentTime, commentTime) => {
    const timeDifference = currentTime - commentTime;
    const minutesDifference = Math.floor(timeDifference / (1000 * 60));
    // return minutesDifference;
    // Update the time ago string based on the difference
    if (minutesDifference < 1) {
      return ('Just now');
    } else if (minutesDifference < 60) {
      return (`${minutesDifference} minutes ago`);
    } else {
      return (`${Math.floor(minutesDifference / 60)} hours ago`);
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
                {comment.user && comment.user.username ? comment.user.username : 'Anonymous'}{' '}{comment.timeAgo}
                {/* <span className="comment-author">{comment.user.username}</span> */}
                <div className="row">
                  <span className="col 9"><p className="comment-text">{comment.content}</p></span> 
                
                </div>
                
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
