import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { profileOtherThunk, getBookDetailsByProfileThunk } from '../../services/auth-thunks.js';
import Nav from '../../nav.js';
import { useParams } from 'react-router-dom';
import './ProfileOther.css';
import ProfileBanner from './ProfileBanner.js';
import FollowFollower from '../ProfileInfo/FollowFollower.js';
import RelatedBooks from '../ProfileInfo/RelatedBooks.js';

const ProfileOther = () => {
    const { currentUser } = useSelector((state) => state.user);
    const { id } = useParams();
    if (!id && currentUser) {
        id = currentUser._id;
    }
    const dispatch = useDispatch();
    const status = useSelector(state => state.user.status);
    const error = useSelector(state => state.user.error);

    const otherUserData = useSelector(state => state.user.otherUser);
    
    // Use local state to store first-loaded user data
    const [initialUserData, setInitialUserData] = useState(null);

    useEffect(() => {
        if (id) {
            // Use the obtained id to request user data
            const fetchData = async () => {
                const { payload } = await dispatch(profileOtherThunk(id));
                setInitialUserData(payload);
                // console.log("current cliked user: ", payload);
            }
            fetchData();
        }
    }, [id, dispatch]);

    // Added state to store data of followUsers
    const [follows, setFollows] = useState([]);
    const [followers, setFollowers] = useState([]);
    const [hasLoadedFollows, setHasLoadedFollows] = useState(false);
    const [hasLoadedFollowers, setHasLoadedFollowers] = useState(false);
    // Added state to store data of relatedBooks
    const [likedBooksDetails, setLikedBooksDetails] = useState([]);
    const [commentedBooksDetails, setCommentedBooksDetails] = useState([]);    
    const [hasLoadedLikedBooks, setHasLoadedLikedBooks] = useState([]);
    const [hasLoadedCommentedBooks, setHasLoadedCommentedBooks] = useState([]);

    useEffect(() => {
        if (otherUserData) {
        }
        if (id) {
            dispatch(profileOtherThunk(id));
        }
    }, [dispatch, id]);

    useEffect(() => {
        setHasLoadedFollows(false);
        setHasLoadedFollowers(false);
        setHasLoadedLikedBooks(false);
        setHasLoadedCommentedBooks(false);
    }, [id]);

    useEffect(() => {
        if (status === 'succeeded' && otherUserData && !hasLoadedFollows) {
            const loadFollows = async () => {
                const followIds = otherUserData.follows || [];
                const followsData = await Promise.all(
                    followIds.map(async followId => {
                        const followData = await dispatch(profileOtherThunk(followId));
                        return {
                            ...followData.payload,
                            _id: followId
                        };
                    })
                );
                setFollows(followsData);
            };
            loadFollows();
            setHasLoadedFollows(true);
        }
    }, [status, otherUserData, hasLoadedFollows, dispatch]);
    

    useEffect(() => {
        if (status === 'succeeded' && otherUserData && !hasLoadedFollowers) {
            const loadFollowers = async () => {
                const followerIds = otherUserData.followers || [];
                const followersData = await Promise.all(
                    followerIds.map(async followerId => {
                        const followerData = await dispatch(profileOtherThunk(followerId));
                        return {
                            ...followerData.payload,
                            _id: followerId 
                        };
                    })
                );
                setFollowers(followersData);
            };
            loadFollowers();
            setHasLoadedFollowers(true);
        }
    }, [status, otherUserData, hasLoadedFollowers, dispatch]);

    useEffect(() => {
        if (status === 'succeeded' && otherUserData && !hasLoadedLikedBooks) {
            const fetchLikedBooks = async () => {
                const likedBookIds = otherUserData.likes.map(like => like.book);
                const booksData = await Promise.all(
                    likedBookIds.map(async bookId => {
                        const response = await dispatch(getBookDetailsByProfileThunk(bookId));
                        return {
                            ...response.payload,
                            _id: bookId
                        };
                    })
                );
                setLikedBooksDetails(booksData);
            };
            fetchLikedBooks();
            setHasLoadedLikedBooks(true);
        }
    }, [status, otherUserData, hasLoadedLikedBooks, dispatch]);

    useEffect(() => {
        if (status === 'succeeded' && otherUserData && !hasLoadedCommentedBooks) {
            const fetchCommentedBooks = async () => {
                const commentedBookIds = otherUserData.comments.map(comment => comment.book);
                const booksData = await Promise.all(
                    commentedBookIds.map(async bookId => {
                        const response = await dispatch(getBookDetailsByProfileThunk(bookId));
                        return {
                            ...response.payload,
                            _id: bookId
                        };
                    })
                );
                const uniqueBooksData = [];
                const seenBookIds = new Set();
            
                for (const bookData of booksData) {
                    if (!seenBookIds.has(bookData._id)) {
                        uniqueBooksData.push(bookData);
                        seenBookIds.add(bookData._id);
                    }
                }
                setCommentedBooksDetails(uniqueBooksData);
            };            
            fetchCommentedBooks();
            setHasLoadedCommentedBooks(true);
        }
    }, [status, otherUserData, hasLoadedCommentedBooks, dispatch]);

    if (status === 'loading') {
        return <div>Loading...</div>;
    }

    if (status === 'failed') {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            {id === currentUser?._id && <Nav />}
            <div className="profile-other">
                <ProfileBanner 
                    avatar={initialUserData?.avatar} 
                    username={initialUserData?.username} 
                    bannerImage={initialUserData?.bannerImage} 
                />
                <FollowFollower list={follows} avatarKey='avatar' usernameKey='username' label='Follows' />
                <FollowFollower list={followers} avatarKey='avatar' usernameKey='username' label='Followers' />
                <RelatedBooks list={likedBooksDetails} titleKey='title' authorKey='author' label='Liked Books' />
                <RelatedBooks list={commentedBooksDetails} titleKey='title' authorKey='author' label='Commented Books' />
            </div>
        </div>
    );
}

export default ProfileOther;