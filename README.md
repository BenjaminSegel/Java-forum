# Java-forum

skiss programmering commit förtydling:
lade till viss styling för en fake navbar samt lade till posts från "https://dummyjson.com/docs/posts"
lade till viss styling på "posts"

note: Det här är endast något som gjorts för att pröva mig fram, projektet kommer med störst sannolikhet se mycket annorlunda ut senare i projektet.

'Comment-section + publish own post start' commit clarification:
1. added the feature to add comment under each post, next step will be to save comment 
2. I can now add a post by fetching the add post API, next step will be to design the posts and save them. 
3. I will also need to fetch the comments-API and add them under posts.  


'Add and save posts + save likes' commit clraification:

1. Posts added to the page will now be on top of the posts fetched from the API, and have the same design. 
2. Posts are saved to the page in local storage, however; they are only showing up when I add a new post, something that hopefully will be fixed in the next commit.
3. You can now like each post (one time), likes on your own posts are saved 
4. After the next commit, following thing will hopefully have been implemented:

* all fetched posts will now be in local storage
* your own posts will show up as soon as the site is loaded
* feature to remove own posts from local storage 

ps. the feature to save comments and to ad API comments to posts is no longer prioritized, if added it will be further 
along the project.
