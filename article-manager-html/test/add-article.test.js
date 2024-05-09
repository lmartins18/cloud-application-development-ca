const { handleSubmit } = require('../script/add-article');

describe('handleSubmit', () => {
    test('it submits the form data and redirects on successful response', async () => {
        // Mock the fetch function
        global.fetch = jest.fn(() => Promise.resolve({
            status: 201,
            json: () => Promise.resolve({ id: 123 }) // Simulate response data
        }));

        // Mock form data
        const formData = {
            title: 'Test Title',
            body: 'Test Body',
            published: true
        };

        // Mock form event
        const mockEvent = {
            preventDefault: jest.fn()
        };

        // Call the handleSubmit function
        await handleSubmit(mockEvent, formData);

        // Check if fetch function was called with the correct arguments
        expect(fetch).toHaveBeenCalledWith('http://34.248.117.130:3000/api/v1/articles', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        // Check if window.location.href was updated with the correct URL
        expect(window.location.href).toBe('/articles?id=123');
    });

    test('it handles errors gracefully', async () => {
        // Mock the fetch function to simulate an error response
        global.fetch = jest.fn(() => Promise.reject(new Error('Network error')));

        // Mock form data
        const formData = {
            title: 'Test Title',
            body: 'Test Body',
            published: true
        };

        // Mock form event
        const mockEvent = {
            preventDefault: jest.fn()
        };

        // Call the handleSubmit function
        await handleSubmit(mockEvent, formData);

        // Check if the error is logged
        expect(console.error).toHaveBeenCalledWith('Error adding article:', expect.any(Error));
    });
});
