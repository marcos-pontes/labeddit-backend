# Labook Project
Labook is a social network aimed at promoting connection and interaction among people. Those who sign up for the application can create and like posts

# Used Technologies
- NodeJS
- Typescript
- Express
- SQL e SQLite
- Knex
- Object-Oriented Programming (POO)
- Layered Architecture
- UUID Generation
- Hash Generation
- Authentication and Authorization
- Routing

  ## Endpoints
    - [ ]  signup
    - [ ]  login
    - [ ]  create post
    - [ ]  create comment
    - [ ]  get posts
    - [ ]  get comment
    - [ ]  get posts by id
    - [ ]  edit post
    - [ ]  delete post
    - [ ]  like / dislike post

## Link to postman documentation
- https://documenter.getpostman.com/view/26594016/2s9YJgULa9

# Example Request

### Users

#### Signup

- **Method**: POST
- **Endpoint**: `/users/signup`
- **Request Body**:
  - `name` (string): User's name.
  - `email` (string): User's email.
  - `password` (string): User's password.
- **Response**:
  - Status: 200 OK
  - Body: Registration success message and authentication token.
 
    ### Example Request
```typescript
// request POST /users/signup
// body JSON
{
  "name": "Beltrana",
  "email": "beltrana@email.com",
  "password": "secretpassword"
}

// response
// status 201 CREATED
{
  token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQyODc1OGIw
LTNmMTktNGE0ZS1iMzIyLTIxZjhmMDRlMTAxMSIsIm5hbWUiOiJBc3Ryb2RldiBTaWx
2YSIsInJvbGUiOiJOT1JNQUwiLCJpYXQiOjE2OTMwNjk0NDAsImV4cCI6MTY5MzY3ND
I0MH0.6wNFnHR4kZff2KhKT7TxeX4qLutnLwe5YDO-5EAn2rU"
}
```

#### Login

- **Method**: POST
- **Endpoint**: `/users/login`
- **Request Body**:
  - `email` (string): User's email.
  - `password` (string): User's password.
- **Response**:
  - Status: 200 OK
  - Body: Login success message and authentication token.
 
    ### Example Request
```typescript
// request POST /users/login
// body JSON
{
  "email": "beltrana@email.com",
  "password": "secretpassword"
}

// response
// status 200 OK
{
  token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQyODc1OGIw
LTNmMTktNGE0ZS1iMzIyLTIxZjhmMDRlMTAxMSIsIm5hbWUiOiJBc3Ryb2RldiBTaWx
2YSIsInJvbGUiOiJOT1JNQUwiLCJpYXQiOjE2OTMwNjk0NDAsImV4cCI6MTY5MzY3ND
I0MH0.6wNFnHR4kZff2KhKT7TxeX4qLutnLwe5YDO-5EAn2rU"
}
```


 ### Posts

#### Create Post

- **Method**: POST
- **Endpoint**: `/posts`
- **Request Body**:
  - `content` (string): The content of the post.
  - `token` (string): User's authentication token.
- **Response**:
  - Status: 200 OK
 
    ### Example Request
```typescript
// request POST /posts
// headers.authorization = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQyODc1OGIw
LTNmMTktNGE0ZS1iMzIyLTIxZjhmMDRlMTAxMSIsIm5hbWUiOiJBc3Ryb2RldiBTaWx
2YSIsInJvbGUiOiJOT1JNQUwiLCJpYXQiOjE2OTMwNjk0NDAsImV4cCI6MTY5MzY3ND
I0MH0.6wNFnHR4kZff2KhKT7TxeX4qLutnLwe5YDO-5EAn2rU"
// body JSON
{
    "content": "Gone happy hour!"
}

// response
// status 201 CREATED
```
  
#### Create Comment

- **Method**: POST
- **Endpoint**: `/posts/comment`
- **Request Body**:
  - `content` (string): The content of the post.
  - `token` (string): User's authentication token.
- **Response**:
  - Status: 200 OK
 
    ### Example Request
```typescript
// request POST /posts
// headers.authorization = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQyODc1OGIw
LTNmMTktNGE0ZS1iMzIyLTIxZjhmMDRlMTAxMSIsIm5hbWUiOiJBc3Ryb2RldiBTaWx
2YSIsInJvbGUiOiJOT1JNQUwiLCJpYXQiOjE2OTMwNjk0NDAsImV4cCI6MTY5MzY3ND
I0MH0.6wNFnHR4kZff2KhKT7TxeX4qLutnLwe5YDO-5EAn2rU"
// body JSON
{
    "content": "Gone happy hour!"
}

// response
// status 201 CREATED
```


#### Get Posts

- **Method**: GET
- **Endpoint**: `/posts`
- **Request Headers**:
  - `token` (string): User's authentication token.
- **Response**:
  - Status: 200 OK
 
    ### Example Request
```typescript
// request GET /posts
// headers.authorization = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQyODc1OGIw
LTNmMTktNGE0ZS1iMzIyLTIxZjhmMDRlMTAxMSIsIm5hbWUiOiJBc3Ryb2RldiBTaWx
2YSIsInJvbGUiOiJOT1JNQUwiLCJpYXQiOjE2OTMwNjk0NDAsImV4cCI6MTY5MzY3ND
I0MH0.6wNFnHR4kZff2KhKT7TxeX4qLutnLwe5YDO-5EAn2rU"

// response
// status 200 OK
[
    {
        "id": "uuidv4",
        "content": "Studying OOP today!",
        "likes": 2,
        "dislikes" 1,
        "createdAt": "2023-01-20T12:11:47:000Z"
        "updatedAt": "2023-01-20T12:11:47:000Z"
        "creator": {
            "id": "uuidv4",
            "name": "Fulano"
        }
    },
    {
        "id": "uuidv4",
        "content": "kkkkkkkkkrying",
        "likes": 0,
        "dislikes" 0,
        "createdAt": "2023-01-20T15:41:12:000Z"
        "updatedAt": "2023-01-20T15:49:55:000Z"
        "creator": {
            "id": "uuidv4",
            "name": "Ciclana"
        }
    }
]
```
  #### Get Comments

- **Method**: GET
- **Endpoint**: `/posts/comments`
- **Request Headers**:
  - `token` (string): User's authentication token.
- **Response**:
  - Status: 200 OK
 
    ### Example Request
```typescript
// request GET /posts
// headers.authorization = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQyODc1OGIw
LTNmMTktNGE0ZS1iMzIyLTIxZjhmMDRlMTAxMSIsIm5hbWUiOiJBc3Ryb2RldiBTaWx
2YSIsInJvbGUiOiJOT1JNQUwiLCJpYXQiOjE2OTMwNjk0NDAsImV4cCI6MTY5MzY3ND
I0MH0.6wNFnHR4kZff2KhKT7TxeX4qLutnLwe5YDO-5EAn2rU"

// response
// status 200 OK
[
    {
        "id": "uuidv4",
        "content": "Studying OOP today!",
        "likes": 2,
        "dislikes" 1,
        "createdAt": "2023-01-20T12:11:47:000Z"
        "updatedAt": "2023-01-20T12:11:47:000Z"
        "creator": {
            "id": "uuidv4",
            "name": "Fulano"
        }
    },
    {
        "id": "uuidv4",
        "content": "kkkkkkkkkrying",
        "likes": 0,
        "dislikes" 0,
        "createdAt": "2023-01-20T15:41:12:000Z"
        "updatedAt": "2023-01-20T15:49:55:000Z"
        "creator": {
            "id": "uuidv4",
            "name": "Ciclana"
        }
    }
]
```
  


#### Edit Post

- **Method**: PUT
- **Endpoint**: `/posts/edit`
- **Request Body**:
  - `idToEdit` (string): ID of the post to be edited.
  - `content` (string): Updated content of the post.
  - `token` (string): User's authentication token.
- **Response**:
  - Status: 200 OK
 
    ### Example Request
```typescript
// request PUT /posts/:id
// headers.authorization = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQyODc1OGIw
LTNmMTktNGE0ZS1iMzIyLTIxZjhmMDRlMTAxMSIsIm5hbWUiOiJBc3Ryb2RldiBTaWx
2YSIsInJvbGUiOiJOT1JNQUwiLCJpYXQiOjE2OTMwNjk0NDAsImV4cCI6MTY5MzY3ND
I0MH0.6wNFnHR4kZff2KhKT7TxeX4qLutnLwe5YDO-5EAn2rU"
// body JSON
{
    "content": "Gone happy hour!"
}

// response
// status 200 OK
```

#### Delete Post

- **Method**: DELETE
- **Endpoint**: `/posts/delete`
- **Request Body**:
  - `idToDelete` (string): ID of the post to be deleted.
  - `token` (string): User's authentication token.
- **Response**:
  - Status: 200 OK
 
    ### Example Request
```typescript
// request DELETE /posts/:id
// headers.authorization = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQyODc1OGIw
LTNmMTktNGE0ZS1iMzIyLTIxZjhmMDRlMTAxMSIsIm5hbWUiOiJBc3Ryb2RldiBTaWx
2YSIsInJvbGUiOiJOT1JNQUwiLCJpYXQiOjE2OTMwNjk0NDAsImV4cCI6MTY5MzY3ND
I0MH0.6wNFnHR4kZff2KhKT7TxeX4qLutnLwe5YDO-5EAn2rU"

// response
// status 200 OK
```

#### Like/Dislike Post

- **Method**: POST
- **Endpoint**: `/posts/like-dislike`
- **Request Body**:
  - `idPost` (string): ID of the post to be liked/disliked.
  - `token` (string): User's authentication token.
  - `like` (boolean): Indicates whether the action is a like (true) or dislike (false).
- **Response**:
  - Status: 200 OK
 
    ### Example Request
### Like (funcionalidade 1)
```typescript
// request PUT /posts/:id/like
// headers.authorization = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQyODc1OGIw
LTNmMTktNGE0ZS1iMzIyLTIxZjhmMDRlMTAxMSIsIm5hbWUiOiJBc3Ryb2RldiBTaWx
2YSIsInJvbGUiOiJOT1JNQUwiLCJpYXQiOjE2OTMwNjk0NDAsImV4cCI6MTY5MzY3ND
I0MH0.6wNFnHR4kZff2KhKT7TxeX4qLutnLwe5YDO-5EAn2rU"
// body JSON
{
    "like": true
}

// response
// status 200 OK
```

### Dislike (funcionalidade 2)
```typescript
// request PUT /posts/:id/like
// headers.authorization = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQyODc1OGIw
LTNmMTktNGE0ZS1iMzIyLTIxZjhmMDRlMTAxMSIsIm5hbWUiOiJBc3Ryb2RldiBTaWx
2YSIsInJvbGUiOiJOT1JNQUwiLCJpYXQiOjE2OTMwNjk0NDAsImV4cCI6MTY5MzY3ND
I0MH0.6wNFnHR4kZff2KhKT7TxeX4qLutnLwe5YDO-5EAn2rU"
// body JSON
{
    "like": false
}

// response
// status 200 OK
```
  
