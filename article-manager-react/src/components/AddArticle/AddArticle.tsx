import React, { useState } from 'react';
import axios from 'axios';
import { Article } from '../../models';
import { NavLink, useNavigate } from 'react-router-dom';

const AddArticle: React.FC = () => {
    const [article, setArticle] = useState<Article>({ id: -1, body: "", title: "", published: true });
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://34.248.117.130:3000/api/v1/articles', {
                article
            });
            if (response.status === 201) {
                navigate("/articles/" + response.data);
            }
        } catch (error) {
            console.error('Error adding article:', error);
        }
    };

    return (
        <div className="max-w-md mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Add Article</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-sm font-semibold mb-2">Title:</label>
                    <input
                        type="text"
                        value={article.title}
                        onChange={(e) => setArticle({ ...article, title: e.target.value })}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-semibold mb-2">Body:</label>
                    <textarea
                        value={article.body}
                        onChange={(e) => setArticle({ ...article, body: e.target.value })}
                        className="w-full p-2 border border-gray-300 rounded-md h-32 focus:outline-none focus:border-blue-500"
                        required
                    />
                </div>
                <div className="mb-4">
                    <input
                        type="checkbox"
                        checked={article.published}
                        onChange={(e) => setArticle({ ...article, published: e.target.checked })}
                        className="mr-2"
                    />
                    <label className="text-sm font-semibold text-gray-700">Published</label>
                </div>
                <span className='flex justify-between'>
                    <NavLink to="/" className="text-blue-500 hover:text-blue-600">
                        &larr; Back to Article List
                    </NavLink>
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Add Article</button>
                </span>
            </form>
        </div>
    );
};

export default AddArticle;
