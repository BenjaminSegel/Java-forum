
let formBtn = document.getElementById('form-btn');
let postForm = document.getElementById('post-form');

formBtn.addEventListener('click', function(){

  if(postForm.style.display === 'none'){
    postForm.style.display = 'flex'
  }else{
    postForm.style.display = 'none'
    
  }

});




postForm.addEventListener('submit', addPost)

function addPost(e){
  e.preventDefault();


  let title = document.getElementById('title').value;
  let body = document.getElementById('post').value;
  let tags = document.getElementById('tags').value;

  fetch("https://dummyjson.com/posts/add", {
    method: 'POST',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-type' : 'application/json'
    },
    body: JSON.stringify({title:title, body:body, tags:tags ,userId:5 })
  })
  .then(function (res) {
   
    return res.json();
  }).then((data) => createPost(data))


function createPost(){

    let post = document.createElement('ul');
    let postTitle = document.createElement('li');
    let postBody = document.createElement('p')
    let postTags = document.createElement('span')
    document.body.append(post)

    post.append(postTitle, postBody, postTags);

    postTitle.append(title);
    postBody.append(body);
    postTags.append(tags);


    
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


function renderPosts(posts) {
    

    let list = document.createElement("ul");
    document.body.append(list);
    list.classList.add('list');
           


    for (let i = 0; i < posts.length; i++) {
        let post = posts[i];

        let listTitle = document.createElement("li");
        let listBody = document.createElement("li");
        let listTags = document.createElement("li");
        let listReactions = document.createElement("div")

        let commentInput = document.createElement('input');
        let commentBtn = document.createElement('button');
        let commentSection = document.createElement('ul');
        
        commentBtn.addEventListener('click' ,function (){
          let li = document.createElement('li')
          li.append(commentInput.value)
          commentInput.value = ''
          commentSection.append(li);
        });

     
       
        list.append(listTitle, listBody, listReactions, listTags,commentInput, commentBtn, commentSection);

        listTitle.classList.add('list-title');
        listBody.classList.add('list-body');
        listTags.classList.add('list-tags');

      
       listReactions.innerText = 'Likes: ' +  post.reactions;
        listTitle.innerText = post.title + " - " ;
        listBody.innerText = post.body;
        listTags.innerText= 'Tags: ' + post.tags 
        commentInput.placeholder = 'Write comment:'; 
        commentBtn.innerText = 'Post comment'
        commentSection.innerText = 'Comments:'

  
    };
    
};





