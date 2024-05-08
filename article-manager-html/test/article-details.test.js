// Import the functions to test
const { fetchArticle, handleEditClick, handleDeleteClick } = require('./../script/article-details');

// Mock fetch function
global.fetch = jest.fn();

describe('fetchArticle', () => {
    test('it should fetch and display article details', async () => {
        // Mock article data
        const article = {
            id: 123,
            title: 'Test Title',
            body: 'Test Body',
            published: true
        };
        fetch.mockResolvedValueOnce({
            ok: true,
            json: () => Promise.resolve(article)
        });

        // Mock DOM elements
        document.body.innerHTML = `
            <div id="article-title"></div>
            <div id="article-body"></div>
            <input id="published" type="checkbox" />
        `;

        // Call fetchArticle
        await fetchArticle();

        // Check if article details are displayed correctly
        expect(document.getElementById('article-title').textContent).toBe(article.title);
        expect(document.getElementById('article-body').textContent).toBe(article.body);
        expect(document.getElementById('published').checked).toBe(article.published);
    });

    test('it should handle error when fetching article', async () => {
        // Mock error response
        fetch.mockRejectedValueOnce(new Error('Failed to fetch'));

        // Call fetchArticle
        await fetchArticle();

        // Check if error is logged
        expect(console.error).toHaveBeenCalledWith('Error fetching article:', expect.any(Error));
    });
});

describe('handleEditClick', () => {
    test('it should redirect to edit page', async () => {
        const id = 123;
        window.location.href = '';

        // Call handleEditClick
        await handleEditClick(id);

        // Check if window.location.href is updated
        expect(window.location.href).toBe(`/articles/edit.html?id=${id}`);
    });

    test('it should handle error when redirecting to edit page', async () => {
        const id = 123;
        window.location.href = '';

        // Mock error
        window.location.href = jest.fn(() => { throw new Error('Failed to redirect'); });

        // Call handleEditClick
        await handleEditClick(id);

        // Check if error is logged
        expect(console.error).toHaveBeenCalledWith('Error redirecting to edit page:', expect.any(Error));
    });
});

describe('handleDeleteClick', () => {
    test('it should delete article and redirect to home page', async () => {
        const id = 123;

        // Mock successful delete response
        fetch.mockResolvedValueOnce({
            ok: true
        });

        // Call handleDeleteClick
        await handleDeleteClick(id);

        // Check if fetch is called with correct arguments
        expect(fetch).toHaveBeenCalledWith(`http://127.0.0.1:3000/api/v1/articles/${id}`, {
            method: 'DELETE'
        });

        // Check if window.location.href is updated
        expect(window.location.href).toBe('/');
    });

    test('it should handle error when deleting article', async () => {
        const id = 123;

        // Mock error response
        fetch.mockRejectedValueOnce(new Error('Failed to delete'));

        // Call handleDeleteClick
        await handleDeleteClick(id);

        // Check if error is logged
        expect(console.error).toHaveBeenCalledWith('Error deleting article:', expect.any(Error));
    });
});
