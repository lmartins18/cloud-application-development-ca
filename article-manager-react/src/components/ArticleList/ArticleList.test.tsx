import { screen, render, waitFor } from '@testing-library/react';
import axios from 'axios';
import { ArticleList } from './ArticleList';

jest.mock('axios');

test('renders article list', async () => {
    const articles = [
        { id: 1, title: 'Article 1' },
        { id: 2, title: 'Article 2' },
    ];

    (axios.get as jest.Mock).mockResolvedValue({ data: articles });

    render(<ArticleList />);

    await waitFor(() => {
        expect(screen.getByText('Article 1') && screen.getByText('Article 2')).toBeInTheDocument();
    });
});
