// Import the function to test
const { handleSubmit } = require('./../script/add-article.js');

// Mock the fetch function
global.fetch = jest.fn();

describe('handleSubmit', () => {
    test('it should submit form data and redirect on successful response', async () => {
        // Mock the response for a successful POST request
        fetch.mockResolvedValueOnce({
            status: 201,
            json: () => Promise.resolve({ id: 123 }) // Simulate response data
        });

        // Mock form data
        const event = {
            preventDefault: jest.fn()
        };
        const titleInput = { value: 'Test Title' };
        const bodyInput = { value: 'Test Body' };
        const publishedCheckbox = { checked: true };

        // Call the handleSubmit function
        await handleSubmit(event, titleInput, bodyInput, publishedCheckbox);

        // Check if preventDefault has been called
        expect(event.preventDefault).toHaveBeenCalledTimes(1);

        // Check if fetch has been called with the correct arguments
        expect(fetch).toHaveBeenCalledWith('http://34.248.117.130:3000/api/v1/articles', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: 'Test Title',
                body: 'Test Body',
                published: true
            })
        });

        // Check if window.location.href has been updated
        expect(window.location.href).toBe('/articles?id=123');
    });

    test('it should handle error if response status is not 201', async () => {
        // Mock the response for an error
        fetch.mockResolvedValueOnce({
            status: 500 // Simulate an error status
        });

        // Mock form data
        const event = {
            preventDefault: jest.fn()
        };
        const titleInput = { value: 'Test Title' };
        const bodyInput = { value: 'Test Body' };
        const publishedCheckbox = { checked: true };

        // Call the handleSubmit function
        await handleSubmit(event, titleInput, bodyInput, publishedCheckbox);

        // Check if preventDefault has been called
        expect(event.preventDefault).toHaveBeenCalledTimes(1);

        // Check if fetch has been called with the correct arguments
        expect(fetch).toHaveBeenCalledWith('http://34.248.117.130:3000/api/v1/articles', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: 'Test Title',
                body: 'Test Body',
                published: true
            })
        });

        // Check if console.error has been called with the correct error message
        expect(console.error).toHaveBeenCalledWith('Error adding article:', expect.any(Error));
    });
});
