const items = document.querySelector(".items");
const searchUser = document.querySelector("#search");
let users = [];
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
}
fetchData().catch((error) => {
  error.message; // error mesajimiz
});

function setUsers(albums) {
  let output = "";
  console.log(albums.length);
  if (albums.length > 0) {
    albums.map((album) => (output += `<div>${album.title}</div>`));
    items.innerHTML = output;
  } else {
    output = `<div class="not-found">axtardığınız söz bazamızda yoxdur</div>`;
    items.innerHTML = output;
  }
}

searchUser.addEventListener("input", (e) => {
  const isTyping = searchUser.value.length > 0;
  if (isTyping) {
    items.classList.remove("deactive");
    loader.classList.add("active");
    setTimeout(() => {
      loader.classList.remove("active");
      const element = e.target.value.toLowerCase();

      const filteredUser = users.filter((user) =>
        user.title.toLowerCase().includes(element)
      );

      setUsers(filteredUser);
    }, 800);
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
