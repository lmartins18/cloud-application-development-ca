import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ArticleDetails from './ArticleDetails';

describe('ArticleDetails', () => {
    it('should render loading message when article is null', () => {
        render(
            <ArticleDetails />,
        );

        expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    it('should render article details when loaded', () => {

        render(
            <ArticleDetails />,
        );

        fireEvent.load(window, {});

        expect(screen.getByText('Test Title')).toBeInTheDocument();
        expect(screen.getByText('Test Body')).toBeInTheDocument();
        expect(screen.getByText('Published')).toBeInTheDocument();
    });

    it('should navigate to edit page on edit button click', () => {
        render(
            <ArticleDetails />,
        );

        fireEvent.load(window, {});
        fireEvent.click(screen.getByText('Edit'));

        expect(window.location.href).toContain('/articles/edit/1');
    });

    it('should delete article and navigate to home page on delete button click', () => {
        render(
            <ArticleDetails />,
        );

        fireEvent.load(window, {});
        fireEvent.click(screen.getByText('Delete'));

        expect(window.location.href).toContain('/');
    });
});
