let formBtn = document.getElementById("form-btn");
let postForm = document.getElementById("post-form");
let newPosts = document.createElement("ul");
newPosts.innerText = "";
document.body.append(newPosts);
postForm.style.display = "none";

formBtn.addEventListener("click", function () {
  if (postForm.style.display === "none") {
    postForm.style.display = "flex";
  } else {
    postForm.style.display = "none";
  }
});

postForm.addEventListener("submit", addPost);

function saveToLocalStorage(title,body,tags,likes){
  let data = localStorage.getItem('newPosts')
  let ownPosts = data ? JSON.parse(data) : [];
  ownPosts.push({
    title,
    body,
    tags,
    likes,
  
  })
  localStorage.setItem('newPosts', JSON.stringify(ownPosts));
  }
  
  
  
  
  
  
  function addPost(e) {
  
    e.preventDefault();
  
    let title = document.getElementById("title").value;
    let body = document.getElementById("post-body").value;
    let tags = document.getElementById("tags").value;
    let likes = 0;
    saveToLocalStorage(title,body,tags, likes)
    
  
    fetch("https://dummyjson.com/posts/add", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        body: body,
        tags: tags,
        userId: 5,
        reactions: likes,
      }),
    })
      .then(function (res) {
        return res.json();
      })
      .then((data) => createPost(data));
  
    
  
    function createPost() {
       
      let data = localStorage.getItem('newPosts')
      let ownPosts = data ? JSON.parse(data) : [];
  
      for(i = 0; i < ownPosts.length; i++){
  
        let postData = ownPosts[i]
      
      let post = document.createElement("ul");
      let postTitle = document.createElement("li");
      let postBody = document.createElement("p");
      let postLikes = document.createElement("span");
      let postTags = document.createElement("span");
      let commentInput = document.createElement("input");
      let commentBtn = document.createElement("button");
      let commentSection = document.createElement("ul");
      let likeBtn = document.createElement("button");
      let likeSection = document.createElement("div");
  
  
      postTitle.innerText = postData.title
      postBody.innerText = postData.body
      postTags.innerText = postData.tags
  
      
  
      
  
      post.append(
        postTitle,
        postBody,
        likeSection,
        postTags,
        commentInput,
        commentBtn,
        commentSection
      );
        
      
  
      newPosts.append(post);
  
      likeSection.append(postLikes, likeBtn);
  
      postLikes.innerText = "Likes: " + postData.likes;
      commentInput.placeholder = "Write comment:";
      commentBtn.innerText = "Post comment";
      commentSection.innerText = "Comments:";
      likeBtn.innerText = "like post";
  
  
      likeSection.classList.add("like-section");
      post.classList.add("post");
      postTitle.classList.add("post-title");
      postBody.classList.add("post-body");
      postTags.classList.add("post-tags");
  
      commentBtn.addEventListener("click", function () {
        let li = document.createElement("li");
        li.append(commentInput.value);
        commentInput.value = "";
        commentSection.append(li);
      });
  
      likeBtn.addEventListener(
        "click",
        () => {
          likes++;
          postLikes.innerText = "Likes: " + likes;
        },
        { once: true }
      );
    }
  } 
  
}



fetch("https://dummyjson.com/posts")
  .then(function (res) {
    console.log(res.status);
    return res.json();
  })
  .then(function (res) {
    renderPosts(res.posts);
  });
let list = document.createElement("ul");
function renderPosts(posts) {
  document.body.append(list);
  list.classList.add("list");

  for (let i = 0; i < posts.length; i++) {
    let post = posts[i];

    let listTitle = document.createElement("li");
    let listBody = document.createElement("li");
    let listTags = document.createElement("li");
    let listReactions = document.createElement("div");
    let likeBtn = document.createElement("button");
    let commentInput = document.createElement("input");
    let commentBtn = document.createElement("button");
    let commentSection = document.createElement("ul");
    let likeSection = document.createElement("div");

    commentBtn.addEventListener("click", function () {
      let li = document.createElement("li");
      li.append(commentInput.value);
      commentInput.value = "";
      commentSection.append(li);
    });

    likeSection.append(listReactions, likeBtn);

    list.append(
      listTitle,
      listBody,
      likeSection,
      listTags,
      commentInput,
      commentBtn,
      commentSection
    );

    listTitle.classList.add("list-title");
    listBody.classList.add("list-body");
    listTags.classList.add("list-tags");
    likeSection.classList.add("like-section");

    likeBtn.innerText = "Like Post";

    listTitle.innerText = post.title + " - ";
    listBody.innerText = post.body;
    listReactions.innerText = "Likes: " + post.reactions;
    listTags.innerText = "Tags: " + post.tags;
    commentInput.placeholder = "Write comment:";
    commentBtn.innerText = "Post comment";
    commentSection.innerText = "Comments:";

    likeBtn.addEventListener(
      "click",
      () => {
        post.reactions++;
        listReactions.innerText = "Likes: " + post.reactions;
      },
      { once: true }
    );
  }
 }

