import { screen, render, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import ArticleDetails from './ArticleDetails';

jest.mock('axios');

describe('ArticleDetails', () => {
    const mockedNavigate = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
        jest.spyOn(window, 'alert').mockImplementation(() => { });
        jest.spyOn(require('react-router-dom'), 'useNavigate').mockReturnValue(mockedNavigate);
    });

    it('should render article details correctly', async () => {
        const mockedArticle = {
            id: '1',
            title: 'Test Article',
            body: 'Test body',
            published: true
        };

        (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValueOnce({ data: mockedArticle });

        render(<ArticleDetails />);

        expect(screen.getByText('Loading...')).toBeInTheDocument();


        expect(screen.getByText('Test Article')).toBeInTheDocument();
        expect(screen.getByText('Test body')).toBeInTheDocument();
        expect(screen.getByLabelText('Published')).toBeInTheDocument();

    });

    it('should handle edit click and navigate to edit page', async () => {
        const mockedArticle = {
            id: '1',
            title: 'Test Article',
            body: 'Test body',
            published: true
        };

        (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValueOnce({ data: mockedArticle });

        render(<ArticleDetails />);

        fireEvent.click(screen.getByText('Edit'));
        expect(mockedNavigate).toHaveBeenCalledWith('/articles/edit/1');

    });

    it('should handle delete click and navigate to article list', async () => {
        const mockedArticle = {
            id: '1',
            title: 'Test Article',
            body: 'Test body',
            published: true
        };

        (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValueOnce({ data: mockedArticle });
        (axios.delete as jest.MockedFunction<typeof axios.delete>).mockResolvedValueOnce({});

        render(<ArticleDetails />);

        fireEvent.click(screen.getByText('Delete'));
        expect(axios.delete).toHaveBeenCalledWith('/articles/1');
        expect(mockedNavigate).toHaveBeenCalledWith('/');
    });
});
