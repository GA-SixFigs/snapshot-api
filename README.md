# “Snap” Shot

### Important Links
-	Front-End-Repo: https://github.com/GA-SixFigs/snapshot-client

-	Deployed API: https://zoomies-snapshot.herokuapp.com

-	Deployed Client: https://ga-sixfigs.github.io/snapshot-client/

### SnapShot
Snapshot is a site where users can upload, share and like images! Users can create a profile and upload photos to share with their friends and family. Unregistered user's will be able to view our gallery of public images and be able to upload their own after signing up.
## Project planning Board
- View the whiteboard: https://miro.com/app/board/o9J_lNhvVF8=/
- View the KanBan board: https://trello.com/b/OkZTeVRV/group-project
### User Stories  
-	As a registered user, I would like to sign in with email and password.
-	As a signed in user, I would like to change password.
-	As a signed in user, I would like to sign out.
-	As a signed in user, I would like to upload an image to AWS.
-	As a signed in user, I would like to update the meta-data of my image on AWS.
-	As a signed in user, I would like to see the name of all images on AWS.
-	As a signed in user, I would like to see the thumbnail of all images on AWS.
-	As a signed in user, I would like to delete the reference of my image from the
database.
-	As a signed in user, I would like to see the following meta-data for any image:
-- date created/uploaded
-- date modified
-- owner (user who uploaded the image)
-- tag


### Technologies Used
-	Express
-	Mongoose
-	MongoDB
-	JavaScript
-	AWS
### Resources
###### Users
| Verb   | URI Pattern  |Body    |Headers  |  Status | Body |
|--------|--------------|------  |-----  |-------------------|------------|
| POST   | `/sign-up`   |credentials | empty | 201, Created| user
| POST   | `/sign-in`   |credentials | empty | 200 Ok | user w/token
| PATCH  | `/change-password/`|password |token| 204 No Content| user w/token
| DELETE | `/sign-out/`       | empty|token |   201 Created | empty

###### Pictures
| Verb   | URI   |Body    |Headers  |  Status | Body |
|--------|--------------|------  |-----  |-------------------|------------|
| POST   | `/pictures`   |{} | token | 201, Created| Picture Obj
| GET   | `/pictures`   |n/a | empty | 200 Ok | Picture Obj
| GET  | `/pictures/:id`|n/a |token| 200 Ok| Picture Obj
| DELETE | `/pictures/:id` |n/a |token | 200 Ok | n/a
| PATCH | `/Pictures/:id` |Picture data | token | 200, Ok | Picture Obj

### Unsolved Problems

#### Wireframe & ERD
https://miro.com/app/board/o9J_lNhvVF8=/
