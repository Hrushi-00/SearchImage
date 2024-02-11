const accessKey = "mc0mO1PXBNmVtUTnttXyxiPzAzV25Mj0rM2wnxpUSXg";
const formEl = document.querySelector("form");
const inputEl = document.getElementById("search-input");
const searchResult = document.querySelector(".search-results");
const showMore = document.getElementById("show-more");

let page = 1;

// Retrieve the last search input value from local storage
const lastSearchInput = localStorage.getItem("searchInput");
if (lastSearchInput) {
    inputEl.value = lastSearchInput;
}

async function searchImages() {
    const inputData = inputEl.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

    const response = await fetch(url);
    const data = await response.json();

    const results = data.results;

    if (page === 1) {
        searchResult.innerHTML = "";
    }

    results.forEach((result) => {
        const imageWrapper = document.createElement("div");
        imageWrapper.classList.add("search-result");
        const image = document.createElement("img");
        image.src = result.urls.small;
        image.alt = result.alt_description;
        const imageLink = document.createElement('a');
        imageLink.href = result.links.html;
        imageLink.target = "_blank";
        imageLink.textContent = result.alt_description;

        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink);
        searchResult.appendChild(imageWrapper);
    });

    page++;

    if (page > 1) {
        showMore.style.display = "block";
    }

    // Store the search input value in local storage
    localStorage.setItem("searchInput", inputData);
}

formEl.addEventListener("submit", (event) => {
    event.preventDefault();
    page = 1;
    searchImages();
});

showMore.addEventListener("click", () => {
    searchImages();
});
