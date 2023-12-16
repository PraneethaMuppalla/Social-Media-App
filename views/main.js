const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
});

let formEl = document.getElementById("form");
const imageUrlEl = document.getElementById("imageUrl");
let descriptionEl = document.getElementById("description");
const postRowEl = document.getElementById("postsRow");
formEl.addEventListener("submit", submitPosts);

async function postComment(e, id, comment, commentsDivEl, inputEl) {
  try {
    e.preventDefault();
    const newComment = {
      postId: id,
      description: comment,
    };
    const response = await axiosInstance.post("/post-comment", newComment);
    inputEl.value = "";
    renderEachComment(response.data, commentsDivEl);
  } catch (err) {
    console.error(err);
  }
}

function renderEachComment(each, divEl) {
  let nameEl = document.createElement("h6");
  nameEl.textContent = "Anonymous user";
  nameEl.className = "m-1 p-0 fst-italic text-warning";
  let paraEl = document.createElement("p");
  paraEl.textContent = each.description;
  paraEl.className = "text-center p-0 m-1";
  divEl.appendChild(nameEl);
  divEl.appendChild(paraEl);
}

async function addComment(id) {
  try {
    let commentsDivEl = document.getElementById(`commentsDiv${id}`);
    commentsDivEl.innerHTML = "";
    const inputEl = document.createElement("input");
    const buttonEl = document.createElement("button");
    inputEl.setAttribute("required", true);
    inputEl.classList.add("input");
    buttonEl.textContent = "Post";
    buttonEl.classList.add("btn");
    buttonEl.classList.add("btn-info");
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
      postComment(e, id, inputEl.value, commentsDivEl, inputEl);
    });
  } catch (err) {
    console.error(err);
  }
}

function renderEachPost(each) {
  let eachPost = `
  <div class="p-3 image-container m-1 d-flex flex-column align-items-center justify-content-center rounded  mr-3 ">
  <img class="image" src=${each.imageUrl} alt="${each.id}">
  <h6 class=" text-center mt-2 span-element ">User- ${each.description}</h6>
  <button onclick="addComment(${each.id})" class="button ">
  <img alt="comment-icon" class="comment-image" src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjth8Df-b8WSjCOvnaVthZQxn5oEl_RFD04ZJAdBgCjkc_TI13N7OV6UJe059iY8zemQE&usqp=CAU" />
  <span  >Comments</span>
  </button>

  <form id="commentsDiv${each.id}" class="mt-3">
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
