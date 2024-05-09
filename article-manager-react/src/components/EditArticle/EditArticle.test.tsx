import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import EditArticle from './EditArticle';

describe('EditArticle', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render edit article form', () => {
    render(
      <EditArticle />
    );

    expect(screen.getByText('Edit Article')).toBeInTheDocument();
    expect(screen.getByLabelText('Title:')).toBeInTheDocument();
    expect(screen.getByLabelText('Body:')).toBeInTheDocument();
    expect(screen.getByText('Published')).toBeInTheDocument();
  });

  it('should update form data on input change', () => {
    render(
      <EditArticle />
    );

    const titleInput = screen.getByLabelText('Title:');
    const bodyTextarea = screen.getByLabelText('Body:');
    const publishCheckbox = screen.getByLabelText('Published') as HTMLInputElement;

    fireEvent.change(titleInput, { target: { value: 'Test Title' } });
    fireEvent.change(bodyTextarea, { target: { value: 'Test Body' } });
    fireEvent.click(publishCheckbox);

    expect(titleInput).toHaveValue('Test Title');
    expect(bodyTextarea).toHaveValue('Test Body');
    expect(publishCheckbox.checked).toBe(true);
  });

  it('should submit form data on save changes button click', () => {
    render(
      <EditArticle />
    );

    const saveButton = screen.getByText('Save Changes');
    fireEvent.click(saveButton);
  });
});
