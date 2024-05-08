// Import the functions to test
const { fetchArticles, displayArticles, filterArticles, handleFilterChange } = require('./your-file.js');

// Mock fetch function
global.fetch = jest.fn();

describe('fetchArticles', () => {
    test('it should fetch articles successfully', async () => {
        // Mock articles data
        const articles = [
            { id: 1, title: 'Article 1', body: 'Body 1', published: true },
            { id: 2, title: 'Article 2', body: 'Body 2', published: false },
            { id: 3, title: 'Article 3', body: 'Body 3', published: true }
        ];
        fetch.mockResolvedValueOnce({
            ok: true,
            json: () => Promise.resolve(articles)
        });

        // Call fetchArticles
        await fetchArticles();

        // Check if articles are stored correctly
        expect(articles).toEqual(articles);
    });

    test('it should handle error when fetching articles', async () => {
        // Mock error response
        fetch.mockRejectedValueOnce(new Error('Failed to fetch'));

        // Call fetchArticles
        await fetchArticles();

        // Check if error is logged
        expect(console.error).toHaveBeenCalledWith('Error fetching articles:', expect.any(Error));
    });
});

describe('filterArticles', () => {
    test('it should filter articles based on published status', () => {
        // Mock articles data
        const articles = [
            { id: 1, title: 'Article 1', body: 'Body 1', published: true },
            { id: 2, title: 'Article 2', body: 'Body 2', published: false },
            { id: 3, title: 'Article 3', body: 'Body 3', published: true }
        ];
        // Set the initial articles
        global.articles = articles;

        // Call filterArticles with different filter options
        filterArticles('published');
        expect(filteredArticles).toEqual([
            { id: 1, title: 'Article 1', body: 'Body 1', published: true },
            { id: 3, title: 'Article 3', body: 'Body 3', published: true }
        ]);

        filterArticles('notPublished');
        expect(filteredArticles).toEqual([
            { id: 2, title: 'Article 2', body: 'Body 2', published: false }
        ]);

        filterArticles('all');
        expect(filteredArticles).toEqual(articles);
    });
});

describe('handleFilterChange', () => {
    test('it should call filterArticles with correct filter option', () => {
        // Mock filterArticles function
        global.filterArticles = jest.fn();

        // Call handleFilterChange with different filter options
        handleFilterChange('published');
        expect(filterArticles).toHaveBeenCalledWith('published');

        handleFilterChange('notPublished');
        expect(filterArticles).toHaveBeenCalledWith('notPublished');

        handleFilterChange('all');
        expect(filterArticles).toHaveBeenCalledWith('all');
    });
});

// You can also write tests for displayArticles function, but it mainly involves DOM manipulation which is harder to test with Jest.
