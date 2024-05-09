import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import AddArticle from './AddArticle';

jest.mock('axios');

describe('AddArticle', () => {
    it('should render Add Article form', () => {
        render(<AddArticle />);

        expect(screen.getByText('Add Article')).toBeInTheDocument();
        expect(screen.getByLabelText('Title:')).toBeInTheDocument();
        expect(screen.getByLabelText('Body:')).toBeInTheDocument();
        expect(screen.getByText('Published')).toBeInTheDocument();
        expect(screen.getByText('Add Article')).toBeInTheDocument();
    });

    it('should update article state when inputs change', () => {
        render(<AddArticle />);
        const titleInput = screen.getByLabelText('Title:');
        const bodyTextarea = screen.getByLabelText('Body:');
        const publishCheckbox = screen.getByLabelText('Published');

        fireEvent.change(titleInput, { target: { value: 'Test Title' } });
        fireEvent.change(bodyTextarea, { target: { value: 'Test Body' } });
        fireEvent.click(publishCheckbox);

        expect(titleInput).toHaveValue('Test Title');
        expect(bodyTextarea).toHaveValue('Test Body');
        expect(publishCheckbox).toBeChecked();
    });
});
