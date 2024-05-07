# App Name: Book Search Website

### "Book Search App" is an innovative online platform designed to enhance your reading experience. With a comprehensive search feature, users can easily explore a vast collection of books, accessing essential information such as summaries, author details, and user reviews. Our platform also offers personalized features, including user login, book bookmarking, commenting, and the ability to follow other users, fostering a vibrant community of book enthusiasts. Whether you're searching for your next literary adventure or connecting with like-minded readers, "Book Library" provides a seamless and engaging platform for all your reading needs.

### Authors: Yina Yi, Jiaxin Yan

# Describe the JSON data model based on MongoDB

### users Collection:
```
{
  "username": "yina",
  "email": "yinayi@gmail.com",
  "avatarUrl": "/static/media/avatar1.8c120828286d4d3547f5.jpg",
  "password": "yi",
  "isAdmin": true,
  "isContentAdmin": true,
  "isBanned": false,
  "follows": [
    {
      "$oid": "64dfaf005aabcee43b233e62"
    },
    {
      "$oid": "64dfafb55aabcee43b233e6e"
    },
    {
      "$oid": "64e1357dd733159418eacae5"
    }
  ],
  "likes": [
    {
      "book": "OL262460W",
      "_id": {
        "$oid": "64e4f2519bf94e54a2e5d3ad"
      }
    },
    {
      "book": "OL21544955W",
      "_id": {
        "$oid": "64e4fbc951b5395a1587971f"
      }
    },
    {
      "book": "OL26609179W",
      "_id": {
        "$oid": "64e551938c60143752c95a15"
      }
    }
  ],
  "bookComments": [
    {
      "content": "Hi",
      "book": "OL26609179W",
      "_id": {
        "$oid": "64e551a88c60143752c95b44"
      }
    }
  ],
  "__v": 1,
  "loginTime": 824,
  "firstname": "yina",
  "lastname": "yi",
  "followers": []
}
```

### books Data Model:
```
{
  "_id": "OL471870W",
  "title": "Sad Cypress",
  "author": [
    "Agatha Christie"
  ],
  "first_publish_year": 1939,
  "cover_id": 6559532,
  "cover_img": "https://covers.openlibrary.org/b/id/6559532-L.jpg",
  "edition_count": 73,
  "subject_places": [],
  "subject_times": [],
  "subjects": [],
  "liked": false,
  "likes": [],
  "bookComments": [],
  "__v": 0
}
```

# Screenshots

### Home Screen
Light Mode:
<img src="https://github.com/yiyina/library-react-web-app/assets/55360195/7bda2f54-d4b1-4a63-890c-7251c18713fc" width="100%">

Dark Mode:
<img src="https://github.com/yiyina/library-react-web-app/assets/55360195/041b5912-9640-4cbe-951e-fe594abd5456" width="100%">

### Search Screen
<img src="https://github.com/yiyina/library-react-web-app/assets/55360195/fa35ea2d-8d1f-43a0-bbca-5eed98833947" width="100%">
<img src="https://github.com/yiyina/library-react-web-app/assets/55360195/175183f9-a76b-4023-add0-296f67996791" width="100%">

### Profile Screen
<img src="https://github.com/yiyina/library-react-web-app/assets/55360195/36132228-67dd-4b4e-8cb0-4bfe2411f461" width="100%">
