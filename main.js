let formBtn = document.getElementById("form-btn");
let postForm = document.getElementById("post-form");
let newPosts = document.createElement("ul");
let disliked = false; 
let liked = false; 
let hasLiked = false;
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

function addPost(e) {
  e.preventDefault();

  let title = document.getElementById("title").value;
  let body = document.getElementById("post-body").value;
  let tags = document.getElementById("tags").value;
  let reactions = 0;
  saveToLocalStorage(title, body, tags, reactions,);
  location.reload();

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
      reactions: reactions,
    }),
  })
    .then(function (res) {
      return res.json();
    })
    .then((title, body, tags, likes) => {});
  function saveToLocalStorage(title, body, tags, reactions) {
    let data = localStorage.getItem("posts");
    let ownPosts = data ? JSON.parse(data) : [];
    ownPosts.unshift({
      title,
      body,
      tags,
      reactions,
    });

    localStorage.setItem("posts", JSON.stringify(ownPosts));

  }
};

function saveApi(savedPosts) {

  localStorage.setItem("posts", JSON.stringify(savedPosts));
};

console.log(localStorage);
let list = document.createElement("ul");

let apiData = localStorage.getItem("posts");
let apiPosts = apiData ? JSON.parse(apiData) : [];
if (apiData === null) {
  fetch("https://dummyjson.com/posts")
    .then(function (res) {
      console.log(res.status);
      return res.json();
    })
    .then(function (res) {
      renderPosts(res.posts);
      saveApi(res.posts);
    });
} else {
  renderPosts(apiPosts);
  console.log(apiPosts);
}
function renderPosts(posts) {
  document.body.append(list);
  list.classList.add("list");
  console.log(list);
  for (let i = 0; i < posts.length; i++) {
    let post = posts[i];
    let listTitle = document.createElement("li");
    let listBody = document.createElement("li");
    let listTags = document.createElement("li");
    let listReactions = document.createElement("div");
    let likeBtn = document.createElement("button");
    likeBtn.id = 'likeBtn';
    let dlikeBtn = document.createElement("button");
    dlikeBtn.id = 'dlikeBtn'
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

    likeSection.append(listReactions, likeBtn, dlikeBtn);

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
    likeSection.classList.add("like-section");

    likeBtn.innerText = "Like Post";
    dlikeBtn.innerText = "Dislike Post";
 
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
     
        if(liked){
          post.reactions --;
          liked = false;
          likeBtn.style.backgroundColor = 'gainsboro';
        }
        else if(disliked){
          post.reactions += 2;
          hasLiked = true;
          disliked = false;
          dlikeBtn.style.backgroundColor = 'gainsboro';
          likeBtn.style.backgroundColor = 'lightblue';
        }
        else if(hasLiked) {
          post.reactions --;
          hasLiked = false;
          likeBtn.style.backgroundColor = 'gainsboro';
        }
        else {
          post.reactions ++;
          liked = true;
          likeBtn.style.backgroundColor = 'lightblue';
        }

        listReactions.innerText = "Likes: " + post.reactions;
        saveApi(posts);
      
      } 
    );
    dlikeBtn.addEventListener(
      "click",
      () => {
        if(disliked){
          post.reactions ++;
          disliked = false;
          dlikeBtn.style.backgroundColor = 'gainsboro';
        }else if(hasLiked || liked){
          post.reactions -= 2;
          disliked = true;
          liked = false;
          hasLiked = false;
          likeBtn.style.backgroundColor = 'gainsboro';
          dlikeBtn.style.backgroundColor = 'red';
        }
        else{
          post.reactions--;
          disliked = true;
          likeBtn.style.backgroundColor = 'gainsboro';
          dlikeBtn.style.backgroundColor = 'red';
        }
        listReactions.innerText = "Likes: " + post.reactions;
        saveApi(posts);
      }
    );
  }
}
