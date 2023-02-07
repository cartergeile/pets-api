express-auth-template
A template for starting projects with express as an API. Includes authentication and common middlewares.

Installation
Download this template.
Move the .zip file to your sei/projects/ directory and Unzip it (creating a folder) -- NOTE: if the folder was already unzipped, use the mv command line to move it to the sei/projects/ directory.
Rename the directory from express-auth-template -> your-app-name.
Rename README.md to REF.md and use as a reference, create a new README and fill with your own content.
Move into the new project and git init.
Replace all instances of 'express-auth-template' with your app name.
Install dependencies with npm install.
Ensure that you have nodemon installed by running npm install -g nodemon.
Once everything is working, make an initial commit.
Structure
Dependencies are stored in package.json.

The most important file for understanding the structure of the template is server.js. This is where the actual Express app object is created, where the middlewares and routes are registered, and more. To register a routefile, follow the pattern established here with exampleRoutes and userRoutes. If you want to add any middlewares to your app, do that here.

The app directory contains models and route files. Models are simply Mongoose models. To create your own, follow the patterns established in app/models/example.js. Route files are somewhat similar to controllers in Rails, but they cover more functionality, including serialization and deciding which HTTP verbs to accept and what to do with them.

The config directory holds just db.js, which is where you specify the name and URL of your database.

The lib directory is for code that will be used in other places in the application. The token authentication code is stored in lib/auth.js. The other files in lib deal with error handling. custom_errors.js is where all the different custom classes of errors are created. If you need some other kind of error message, you can add it here. There are also some functions defined here that are used elsewhere to check for errors. lib/error_handler.js is a function that will be used in all your .catches. It catches errors, and sets the response status code based on what type of error got thrown.

You probably will only need to interact with files in app/models, app/routes, and server.js. You'll need to edit db/config.js just once, to change the name of your app.

API
Use this as the basis for your own API documentation. Add a new third-level heading for your custom entities, and follow the pattern provided for the built-in user authentication documentation.

Scripts are included in curl-scripts to test built-in actions. Feel free to use Postman for testing, using the curl scripts listed below and in the folder for setting up headers and request bodies. Add your own scripts to test your custom API.

Authentication
Verb	URI Pattern	Controller#Action
POST	/sign-up	users#signup
POST	/sign-in	users#signin
PATCH	/change-password/	users#changepw
DELETE	/sign-out/	users#signout
POST /sign-up
Request:

curl --include --request POST http://localhost:8000/sign-up \
  --header "Content-Type: application/json" \
  --data '{
    "credentials": {
      "email": "an@example.email",
      "password": "an example password",
      "password_confirmation": "an example password"
    }
  }'
curl-scripts/sign-up.sh
Response:

HTTP/1.1 201 Created
Content-Type: application/json; charset=utf-8

{
  "user": {
    "id": 1,
    "email": "an@example.email"
  }
}
POST /sign-in
Request:

curl --include --request POST http://localhost:8000/sign-in \
  --header "Content-Type: application/json" \
  --data '{
    "credentials": {
      "email": "an@example.email",
      "password": "an example password"
    }
  }'
curl-scripts/sign-in.sh
Response:

HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

{
  "user": {
    "id": 1,
    "email": "an@example.email",
    "token": "33ad6372f795694b333ec5f329ebeaaa"
  }
}
PATCH /change-password/
Request:

curl --include --request PATCH http://localhost:8000/change-password/ \
  --header "Authorization: Bearer $TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
    "passwords": {
      "old": "an example password",
      "new": "super sekrit"
    }
  }'
TOKEN=33ad6372f795694b333ec5f329ebeaaa curl-scripts/change-password.sh
Response:

HTTP/1.1 204 No Content
DELETE /sign-out/
Request:

curl --include --request DELETE http://localhost:8000/sign-out/ \
  --header "Authorization: Bearer $TOKEN"
TOKEN=33ad6372f795694b333ec5f329ebeaaa curl-scripts/sign-out.sh
Response:

HTTP/1.1 204 No Content
