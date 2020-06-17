# Messages via WebSocket

Every message is an object contains 3 keys (type, room, payload)

## Type:

The type of the message which consist of:

- join.
- chatting.
- drawing.

### Room:

Is the room name create or joined by the user.

### payload:

- The paylaod of the data sent by websocket.

---

# API endpoints

# Users

### Register a new user:

- api endpoint (http://localhost:4000/users/register) with (POST) method.
- request body accepts an object with the following keys (name, email, password, confirm_password).
- on success response is json with {"message": "user registered successfully"}.
- on fail response is json with {"message": error Object}.

### login user:

- api endpoint (http://localhost:4000/users/login) with (POST) method.
- request body accepts an object with the following keys (email, password).
- on success response is json with {"message": "login success", "token": "JWT token"}.
- on client side the token must be decoded with JWT decoder which should translates to (userID, userName, userEmail).
- the client side must keep the token on localstorage which will be checked on every protected route from server side.
- the JWT token expires after 1 hour and after that the user needs to login again.
- on fail response is json with {"message": "login failed"}.

### edit user:

- Not completed.

# Rooms

### Get all rooms:

- api endpoint (http://localhost:4000/rooms) with (GET) method.
- on success response is json with {"message": "success", rooms: Array}.
- on fail response is json with {"message": "no rooms"}.
