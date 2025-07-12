const apiKey = "966f8d089b2b4232b03bbf661ca16965";
const newsContainer = document.getElementById("news-container");
const loader = document.getElementById("loader");

window.onload = () => {
  fetchTechCrunchNews();
};

function showLoader() {
  loader.style.display = "block";
}
function hideLoader() {
  loader.style.display = "none";
}

function fetchTechCrunchNews() {
  showLoader();
  fetch(`https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=${apiKey}`)
    .then(res => res.json())
    .then(data => {
      displayArticles(data.articles);
      hideLoader();
    })
    .catch(err => {
      console.error(err);
      hideLoader();
    });
}

function searchNews() {
  const query = document.getElementById("search").value;
  if (!query) return;

  showLoader();
  fetch(`https://newsapi.org/v2/everything?q=${query}&apiKey=${apiKey}`)
    .then(res => res.json())
    .then(data => {
      displayArticles(data.articles);
      hideLoader();
    })
    .catch(err => {
      console.error(err);
      hideLoader();
    });
}

function displayArticles(articles) {
  newsContainer.innerHTML = "";
  articles.forEach(article => {
    const card = document.createElement("div");
    card.className = "article";

    const img = document.createElement("img");
    img.src = article.urlToImage || "";
    img.alt = "news";
    img.className = "image-loading";

    // Remove loading animation once image is loaded
    img.onload = () => img.classList.remove("image-loading");

    const text = document.createElement("div");
    text.className = "text";
    text.innerHTML = `
      <h2>${article.title || "No title"}</h2>
      <p>${article.description || "No description available."}</p>
      <a href="${article.url}" target="_blank">Read more</a>
    `;

    card.appendChild(img);
    card.appendChild(text);
    newsContainer.appendChild(card);
  });
}


