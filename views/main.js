const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
});

let formEl = document.getElementById("form");
const imageUrlEl = document.getElementById("imageUrl");
let descriptionEl = document.getElementById("description");
const postRowEl = document.getElementById("postsRow");
formEl.addEventListener("submit", submitPosts);

async function postComment(e, id, comment, commentsDivEl) {
  try {
    e.preventDefault();
    const newComment = {
      postId: id,
      description: comment,
    };
    const response = await axiosInstance.post("/post-comment", newComment);
    renderEachComment(response.data, commentsDivEl);
  } catch (err) {
    console.error(err);
  }
}

function renderEachComment(each, divEl) {
  let paraEl = document.createElement("p");
  paraEl.textContent = each.description;
  divEl.appendChild(paraEl);
}

async function addComment(id) {
  try {
    let commentsDivEl = document.getElementById(`commentsDiv${id}`);
    commentsDivEl.innerHTML = "";
    const inputEl = document.createElement("input");
    const buttonEl = document.createElement("button");
    inputEl.setAttribute("required", true);
    buttonEl.textContent = "Post";
    buttonEl.type = "submit";

    if (
      commentsDivEl.style.display === "none" ||
      commentsDivEl.style.display === ""
    ) {
      commentsDivEl.style.display = "block";
    } else {
      commentsDivEl.style.display = "none";
    }
    if (commentsDivEl.style.display === "block") {
      commentsDivEl.appendChild(inputEl);
      commentsDivEl.appendChild(buttonEl);
      const commentsList = await axiosInstance.get(`/get-comments/${id}`);
      commentsList.data.map((each) => {
        renderEachComment(each, commentsDivEl);
      });
    }

    commentsDivEl.addEventListener("submit", (e) => {
      postComment(e, id, inputEl.value, commentsDivEl);
    });
  } catch (err) {
    console.error(err);
  }
}

function renderEachPost(each) {
  let eachPost = `
  <div class="image col-11 col-lg-5 col-md-8 mb-3">
  <img src=${each.imageUrl} alt="${each.id}">
  <p>User- ${each.description}</p>
  <button onclick="addComment(${each.id})" class="btn">
  <img alt="comment-icon" class="comment-image" src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjth8Df-b8WSjCOvnaVthZQxn5oEl_RFD04ZJAdBgCjkc_TI13N7OV6UJe059iY8zemQE&usqp=CAU" />
  </button>
  <form id="commentsDiv${each.id}" >
  </form>
</div>  
  `;
  postRowEl.innerHTML += eachPost;
}

async function submitPosts(e) {
  try {
    e.preventDefault();
    let newPost = {
      imageUrl: imageUrlEl.value,
      description: descriptionEl.value,
    };
    let response = await axiosInstance.post(`/add-post`, newPost);
    renderEachPost(response.data);
    imageUrlEl.value = "";
    descriptionEl.value = "";
  } catch (err) {
    console.error(err);
  }
}

async function getPosts() {
  try {
    const response = await axiosInstance.get("/get-all-posts");
    response.data.map((each) => renderEachPost(each));
  } catch (err) {
    console.error(err);
  }
}

window.addEventListener("DOMContentLoaded", getPosts);
