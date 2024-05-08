import { screen, render, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import AddArticle from './AddArticle';

jest.mock('axios');

describe('AddArticle', () => {
    const mockedNavigate = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
        jest.spyOn(window, 'alert').mockImplementation(() => { });
        jest.spyOn(require('react-router-dom'), 'useNavigate').mockReturnValue(mockedNavigate);
    });

    it('should render Add Article form', async () => {
        render(<AddArticle />);

        expect(screen.getByText('Add Article')).toBeInTheDocument();
        expect(screen.getByLabelText('Title:')).toBeInTheDocument();
        expect(screen.getByLabelText('Body:')).toBeInTheDocument();
        expect(screen.getByText('Published')).toBeInTheDocument();
        expect(screen.getByDisplayValue('')).toBeInTheDocument();
    });

    it('should submit article form and navigate to article list', async () => {
        render(<AddArticle />);
        const titleInput = screen.getByLabelText('Title:') as HTMLInputElement;
        const bodyTextarea = screen.getByLabelText('Body:') as HTMLTextAreaElement;
        const publishCheckbox = screen.getByLabelText('Published') as HTMLInputElement;

        fireEvent.change(titleInput, { target: { value: 'Test Title' } });
        fireEvent.change(bodyTextarea, { target: { value: 'Test Body' } });
        fireEvent.click(publishCheckbox);

        fireEvent.click(screen.getByText('Add Article'));


        expect(axios.post).toHaveBeenCalledWith('/articles', {
            article: {
                id: -1,
                title: 'Test Title',
                body: 'Test Body',
                published: true
            }
        });
        expect(mockedNavigate).toHaveBeenCalledWith('/');

    });

    it('should handle error when adding article', async () => {
        (axios.post as jest.MockedFunction<typeof axios.post>).mockRejectedValueOnce(new Error('Error adding article'));

        render(<AddArticle />);
        fireEvent.click(screen.getByText('Add Article'));

        await waitFor(() => {
            expect(window.alert).toHaveBeenCalledWith('Error adding article: Error: Error adding article');
        });
    });
});
