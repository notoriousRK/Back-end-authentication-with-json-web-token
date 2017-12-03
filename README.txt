

#Backend authentication with json web token


#Usage

- Install Dependencies
npm install

- Run Server
npm start OR nodemon


##Endpoints

POST /users/register
POST /users/authenticate   // Gives back a token
GET /users/profile         // Needs json web token to authorize