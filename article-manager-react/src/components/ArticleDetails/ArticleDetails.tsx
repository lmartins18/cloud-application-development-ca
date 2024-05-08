import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Article } from '../../models';

const ArticleDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [article, setArticle] = useState<Article | null>(null);

    useEffect(() => {
        fetchArticle();
    }, [id]);

    const fetchArticle = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:3000/api/v1/articles/${id}`);
            setArticle(response.data);
        } catch (error) {
            console.error('Error fetching article:', error);
        }
    };

    const handleEditClick = () => {
        if (article) {
            navigate(`http://127.0.0.1:3000/api/v1/articles/edit/${id}`);
        }
    };

    const handleDeleteClick = async () => {
        try {
            await axios.delete(`http://127.0.0.1:3000/api/v1/articles/${id}`);
            navigate("/");
        } catch (error) {
            console.error('Error deleting article:', error);
        }
    };

    if (!article) {
        return <div>Loading...</div>;
    }

    return (
        <div className="max-w-lg mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
            <p className="text-gray-600">{article.body}</p>
            <div className="mt-4 flex items-center">
                <input
                    type="checkbox"
                    id="published"
                    checked={article.published}
                    className="mr-2"
                    disabled
                />
                <label htmlFor="published" className="text-sm font-semibold text-gray-700">Published</label>
            </div>
            <div className="mt-6 flex flex-col gap-3">
                <span>
                    <button onClick={handleEditClick} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md mr-2">Edit</button>
                    <button onClick={handleDeleteClick} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md">Delete</button>
                </span>
                <NavLink to="/" className="text-blue-500 hover:text-blue-600 ml-4">
                    &larr; Back to Article List
                </NavLink>
            </div>
        </div>
    );
};

export default ArticleDetails;
