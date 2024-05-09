const { window } = new JSDOM();
global.window = window;


global.window.location = {
    search: '',
    href: '',
};


const { fetchArticle, handleEditClick, handleDeleteClick } = require('./../script/article-details');

describe('fetchArticle', () => {
    test('should fetch article data', async () => {
        // Mock fetch function
        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve({ title: 'Test Title', body: 'Test Body', published: true }),
            })
        );

        // Mock document.getElementById
        document.getElementById = jest.fn(() => ({
            textContent: '',
            checked: false,
        }));

        // Mock URLSearchParams
        global.URLSearchParams = jest.fn(() => ({
            get: jest.fn(() => '1'),
        }));

        await fetchArticle();

        expect(fetch).toHaveBeenCalledWith('http://34.248.117.130:3000/api/v1/articles/1');
        expect(document.getElementById).toHaveBeenCalledWith('article-title');
        expect(document.getElementById).toHaveBeenCalledWith('article-body');
        expect(document.getElementById).toHaveBeenCalledWith('published');
    });
});

