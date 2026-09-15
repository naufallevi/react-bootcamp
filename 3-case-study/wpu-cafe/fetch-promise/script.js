let allMenu = [];

fetch("https://wpu-cafe.vercel.app/api/menu?pageSize=20")
  .then((response) => response.json())
  .then((data) => {
    allMenu = data.data;
    // console.log(allMenu);
    displayMenu(allMenu);
  })
  .catch((error) => console.error("Error fetching menu:", error));

function displayMenu(menu) {
  const menuList = document.querySelector("#menu-list");
  menuList.innerHTML = "";

  menu.forEach((item) => {
    const card = document.createElement("div");
    card.classList.add("menu-card");

    const image = document.createElement("img");
    image.src = item.image_url;
    image.alt = item.name;
    card.appendChild(image);

    const title = document.createElement("h2");
    title.textContent = item.name;
    card.appendChild(title);

    menuList.appendChild(card);
  });
}

const searchForm = document.querySelector("#search-form");
const searchinput = document.querySelector("#search-input");

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const searchTerm = searchinput.value.toLowerCase();

  fetch("https://wpu-cafe.vercel.app/api/menu?search=" + searchTerm)
    .then((response) => response.json())
    .then((data) => {
      const filteredMenu = data.data;

      const filterData = filteredMenu.filter((item) => item.name.toLowerCase().includes(searchTerm));
      console.info(filterData);

      displayMenu(filteredMenu);
    })
    .catch((error) => console.error("Error fetching menu:", error));
});
