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
        let listBody = document.createElement("li")
        list.append(listTitle, listBody);

        listTitle.classList.add('list-title');
        listBody.classList.add('list-body');

        listTitle.innerText = post.title + " - " ;
        listBody.innerText = post.body;
    }
    

}