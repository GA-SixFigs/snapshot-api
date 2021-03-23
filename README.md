# “Snap” Shot

### Important Links
-	Front-End-Repo: https://github.com/GA-SixFigs/snapshot-client

-	Deployed API:

-	Deployed Client:

### SnapShot
	Snapshot is a site where users can upload, share and like images! Users can create a profile and upload photos to share with their friends and family. Unregistered user's will be able to view our gallery of public images and be able to upload their own after signing up.
## Project planning Board
View the whiteboard: Whiteboard
View the KanBan board: Board
### User Stories  
•	As a registered user, I would like to sign in with email and password.
•	As a signed in user, I would like to change password.
•	As a signed in user, I would like to sign out.
•	As a signed in user, I would like to upload an image to AWS.
•	As a signed in user, I would like to update the meta-data of my image on AWS.
•	As a signed in user, I would like to see the name of all images on AWS.
•	As a signed in user, I would like to see the thumbnail of all images on AWS.
•	As a signed in user, I would like to delete the reference of my image from the
database.
•	As a signed in user, I would like to see the following meta-data for any image:
o	date created/uploaded
o	date modified
o	owner (user who uploaded the image)
o	tag


### Technologies Used
-	Express
-	Mongoose
-	MongoDB
-	JavaScript
-	AWS
### Resources
Users
Request	Response
Verb	URI	body	Headers	Status	body
POST	/sign-up	credentials	empty	201, Created	user
POST	/sign-in	credentials	empty	200 OK	user w/token
DELETE	/sign-out	empty	token	201 Created	empty
PATCH	/change-password	passwords	token	204 No Content	user w/token
Response Errors
Description	Status	Body
Invalid incoming request data	400 Bad Request	Error object
Missing or invalid Authorization token	401 Unauthorized	Unauthorized message
Pictures
Request	Response
Verb	URI	body	Headers	Status	body
POST	/pictures	{}	token	201, Created	Picture Obj
GET	/pictures	n/a	token	200, OK	pictures Obj
GET	/pictures/:id	n/a	token	200, OK	Picture Obj
DELETE	/pictures/:id	n/a	token	200, Ok	n/a
PATCH	/pictures/:id	Picture data	token	200, Ok	Picture Obj
Response Errors
Description	Status	Body
Invalid incoming request data	400 Bad Request	Error object
Missing or invalid Authorization token	401 Unauthorized	Unauthorized message

### Unsolved Problems

#### Wireframe & ERD
ERD and Wireframes
