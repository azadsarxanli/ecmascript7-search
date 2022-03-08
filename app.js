const items = document.querySelector(".items");
const searchUser = document.querySelector("#search");
let users = []; //boş bir array yaradırıq scope məsələsinə görə arrayimiz olmalıdır
const loader = document.querySelector(".loader");
document.addEventListener("DOMContentLoaded", fetchData);
//səhifə yüklənən kimi dataları əldə tuturuq.
async function fetchData() {
  const response = await fetch("https://jsonplaceholder.typicode.com/albums");
  if (!response.ok) {
    const message = `Xəta baş verdi! Xəta kodu: ${response.status}`;
    throw new Error(message);
  }
  const products = await response.json();
  users = products;
  setUsers(users);
  items.classList.add("deactive");
  //!itemləri display none edirik
}
fetchData().catch((error) => {
  error.message; // error mesajimiz
});

function setUsers(albums) {
  let output = "";
  if (albums.length > 0) {
    albums.map(
      (album) =>
        (output += `<div class="p-2 hover:bg-white text-gray-700   ">${album.title}</div>`)
    );
    items.innerHTML = output;
  } else {
    output = `<div class="not-found p-2">axtardığınız söz bazamızda yoxdur</div>`;
    items.innerHTML = output;
  }
}

searchUser.addEventListener("input", (e) => {
  async function showFilteredUser() {
    loader.classList.remove("active");
    const element = e.target.value.toLowerCase();
    const filteredUser = users.filter((user) =>
      user.title.toLowerCase().includes(element)
    );

    setUsers(filteredUser);
  }
  const isTyping = searchUser.value.length > 0;
  const searchUserValue = searchUser.value;

  if (isTyping) {
    items.classList.remove("deactive");
    loader.classList.add("active");
    if (searchUserValue.length >= 3) {
      showFilteredUser();
    } else {
      setTimeout(() => {
        showFilteredUser();
      }, 800);
    }
  }
});

document.body.addEventListener(
  "click",
  (e) => {
    if (
      !e.composedPath().includes(searchUser) &&
      !e.composedPath().includes(items)
    ) {
      items.classList.add("deactive");
    }
  },
  true
);
