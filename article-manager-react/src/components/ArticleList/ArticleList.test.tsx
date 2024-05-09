import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { ArticleList } from './ArticleList';

describe('ArticleList', () => {
    it('should render article list', () => {
        render(
            <ArticleList />
        );

        expect(screen.getByText('Article List')).toBeInTheDocument();
        expect(screen.getByText('Test Title 1')).toBeInTheDocument();
        expect(screen.getByText('Test Title 2')).toBeInTheDocument();
    });

    it('should filter articles by published status', () => {
        render(

            <ArticleList />

        );

        expect(screen.getByText('Test Title 1')).toBeInTheDocument();
        expect(screen.getByText('Test Title 2')).toBeInTheDocument();

        const showPublishedButton = screen.getByText('Show Published');
        const showNotPublishedButton = screen.getByText('Show Not Published');

        showPublishedButton.click();
        expect(screen.getByText('Test Title 1')).toBeInTheDocument();
        expect(screen.queryByText('Test Title 2')).toBeNull();

        showNotPublishedButton.click();
        expect(screen.queryByText('Test Title 1')).toBeNull();
        expect(screen.getByText('Test Title 2')).toBeInTheDocument();
    });

    it('should render "Add Article" button', () => {
        render(

            <ArticleList />

        );

        expect(screen.getByText('Add Article')).toBeInTheDocument();
    });
});
