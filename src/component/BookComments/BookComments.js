import React, { useState, useEffect } from 'react';
import "./BookComments.css";

const BookComments = () => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  const fetchCommentsFromDatabase = () => {
    // 这里从后端获取数据
    const mockComments = [
      {
        id: 1,
        text: 'This book is great!',
        name: 'John Doe',
        avatar: 'path_to_avatar.jpg',
        profileUrl: '/profile/1', 
      },
      {
        id: 2,
        text: 'Another comment!',
        name: 'Jane Smith',
        avatar: 'path_to_avatar.jpg',
        profileUrl: '/profile/2', 
      }
      // ... 其他评论
    ];
    setComments(mockComments);
  };

  useEffect(() => {
    fetchCommentsFromDatabase();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim() !== '') {
      setComments([...comments, { id: comments.length + 1, text: newComment, name: 'Your Name', avatar: 'path_to_your_avatar.jpg' }]);
      setNewComment('');
    }
  };

  return (
    <div className="book-comments">
      <h3>Comments</h3>
      <ul className="comment-list">
        {comments.map((comment) => (
          <li key={comment.id} className="comment-item">
            <div className="comment-header">
              <img src={comment.avatar} alt={`${comment.name}'s Avatar`} />
              <div className="comment-content">
                <span className="comment-author">{comment.name}</span>
                <p className="comment-text">{comment.text}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit} className="comment-form">
        {/* ... */}
      </form>
    </div>
  );
}

export default BookComments;
