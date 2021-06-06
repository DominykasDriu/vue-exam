<template>
  <div>
    <router-view />
  </div>
</template>

<style lang="scss"></style>

// CREATE BLOG WEBSITE // Website should have these pages: // REGISTER USER PAGE
- page where user has to register // USER LOGIN PAGE - page where user logs in
and gets secret key (for further operations) // ALL BLOG POSTS PAGE - page where
all blog posts are visible (could be main page - index page) // SINGLE POST PAGE
- page which opens when single post is selected // PARTICULAR USER POSTS PAGE -
page which opens when you choose to see particular user posts // PAGE FOR POST
EDITING - page which opens when i click edit button on post i own (could only be
seen if im logged in) // PAGE FOR CREATING NEW POSTS - page where user (who has
secret key) can create new post and upload it // Website should have these
validations: // when registering new user inputs should be validated in
front-end (try sending random stuff to test api) // when logging in there should
also be validations depending on errors received from back-end // when creating
new post // when updating post // website should have these additional
functions: // some kind of modal pops up and asks for confirmation when user
tries to delete own post // modal pops up and asks for confirmation when user
edits existing post // there should be possibility to filter posts by date //
index page should look like - https://coney.qodeinteractive.com/pinterest-home/
// semantic tags should be used in html // code shoulde be pushed to github //
API DOCUMENTATION // GET - REQUESTS // get all posts //
http://167.99.138.67:1111/getallposts // get particular user posts //
http://167.99.138.67:1111/getuserposts/:name // put user name instead of ":name"
// get particular post // http://167.99.138.67:1111/getsinglepost/:name/:id' //
put user name instead of ":name" and post id instead of ":id" // POST - REQUESTS
// create new user // http://167.99.138.67:1111/createaccount // send JSON
object with these keys: // name, passwordOne, passwordTwo // login to get your
secret key // http://167.99.138.67:1111/login // send JSON object with these
keys: // name, password // create new post (have to have secret key) //
http://167.99.138.67:1111/createpost // send object JSON object with these keys:
// secretKey, title, image, description // update existing post (have to have
secret key) // http://167.99.138.67:1111/updatepost // send JSON object with
these keys: // secretKey, title, image, description, id (id stands for post id)
// delete existing post (have to have secret key) //
http://167.99.138.67:1111/deletepost // send JSON object with these keys: //
secretKey, id (id stands for post id)
