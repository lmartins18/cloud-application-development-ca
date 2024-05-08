import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Article } from '../../models';
import { useNavigate } from 'react-router-dom';

const EditArticle: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [article, setArticle] = useState<Article | null>(null);
    const [formData, setFormData] = useState<{ title: string; body: string; published: boolean }>({
        title: '',
        body: '',
        published: false
    });

    useEffect(() => {
        fetchArticle();
    }, [id]);

    const fetchArticle = async () => {
        try {
            const response = await axios.get(`/articles/${id}`);
            setArticle(response.data);
            setFormData({
                title: response.data.title,
                body: response.data.body,
                published: response.data.published
            });
        } catch (error) {
            console.error('Error fetching article:', error);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        if (type === 'checkbox') {
            setFormData({ ...formData, [name]: (e.target as HTMLInputElement).checked });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.patch(`/articles/${id}`, formData);
            navigate(`/articles/${id}`);
        } catch (error) {
            console.error('Error editing article:', error);
        }
    };

    const handleCancel = () => {
        navigate(`/articles/${id}`);
    };

    if (!article) {
        return <div>Loading...</div>;
    }

    return (
        <div className="max-w-lg mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Edit Article</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-sm font-semibold mb-2">Title:</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-semibold mb-2">Body:</label>
                    <textarea
                        name="body"
                        value={formData.body}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-md h-32 focus:outline-none focus:border-blue-500"
                        required
                    />
                </div>
                <div className="mb-4">
                    <input
                        type="checkbox"
                        name="published"
                        checked={formData.published}
                        onChange={handleInputChange}
                        className="mr-2"
                    />
                    <label className="text-sm font-semibold text-gray-700">Published</label>
                </div>
                <div className="flex justify-between">
                    <button type="button" onClick={handleCancel} className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md">Cancel</button>
                    <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">Save Changes</button>
                </div>
            </form>
        </div>
    );
};

export default EditArticle;