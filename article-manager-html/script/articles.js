let articles = [];
let filteredArticles = [];

window.onload = async (event) => {
    await fetchArticles().then(() => {
        // Initially display all articles
        filterArticles('all');
        displayArticles(filteredArticles)
    });
}

// Functions
async function fetchArticles() {
    try {
        const response = await fetch('http://34.248.117.130:3000/api/v1/articles');
        articles = await response.json();
    } catch (error) {
        console.error('Error fetching articles:', error);
    }
}

function displayArticles(articlesToDisplay) {
    const articleListDiv = document.getElementById('article-list');
    // Clear any existing articles
    articleListDiv.innerHTML = '';

    articlesToDisplay.forEach(article => {
        const articleLi = document.createElement('li');
        articleLi.classList = 'py-4 transition duration-300 ease-in-out transform hover:translate-x-5 hover:text-blue-600';

        const articleLink = document.createElement('a');
        articleLink.setAttribute('href', `/articles?id=${article.id}`);

        const titleHeading = document.createElement('h2');
        titleHeading.classList = "text-xl font-semibold mb-2";
        titleHeading.textContent = article.title;

        const bodyParagraph = document.createElement('p');
        bodyParagraph.classList = "text-gray-600";
        bodyParagraph.textContent = article.body;

        articleLink.appendChild(titleHeading);
        articleLink.appendChild(bodyParagraph);
        articleLi.appendChild(articleLink);
        articleListDiv.appendChild(articleLi);
    });
}

function filterArticles(filterOption) {
    if (filterOption === 'published') {
        filteredArticles = articles.filter(article => article.published);
    } else if (filterOption === 'notPublished') {
        filteredArticles = articles.filter(article => !article.published);
    } else {
        filteredArticles = articles;
    }

    displayArticles(filteredArticles);
};

function handleFilterChange(filterOption) {
    filterArticles(filterOption);
};

export { fetchArticles, displayArticles, filterArticles, handleFilterChange }