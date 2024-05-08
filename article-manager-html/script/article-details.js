const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

window.onload = fetchArticle;

async function fetchArticle() {
    try {
        const response = await fetch(`http://34.248.117.130:3000/api/v1/articles/${id}`);
        const article = await response.json();

        document.getElementById('article-title').textContent = article.title;
        document.getElementById('article-body').textContent = article.body;
        document.getElementById('published').checked = article.published;
    } catch (error) {
        console.error('Error fetching article:', error);
    }
}

async function handleEditClick() {
    try {
        window.location.href = `/articles/edit.html?id=${id}`;
    } catch (error) {
        console.error('Error redirecting to edit page:', error);
    }
}

async function handleDeleteClick() {
    try {
        await fetch(`http://34.248.117.130:3000/api/v1/articles/${id}`, {
            method: 'DELETE'
        });
        window.location.href = "/";
    } catch (error) {
        console.error('Error deleting article:', error);
    }
}