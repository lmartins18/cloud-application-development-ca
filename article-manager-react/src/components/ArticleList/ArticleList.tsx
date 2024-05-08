import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Article } from '../../models';
import uniqid from "uniqid";
import { NavLink } from 'react-router-dom';

export const ArticleList: React.FC = () => {
    const [articles, setArticles] = useState<Article[]>([]);
    const [filterOption, setFilterOption] = useState<'published' | 'notPublished' | 'all'>('all');

    useEffect(() => {
        fetchArticles();
    }, []);

    const fetchArticles = async () => {
        try {
            const response = await axios.get('/api/v1/articles');
            setArticles(response.data);
        } catch (error) {
            console.error('Error fetching articles:', error);
        }
    };

    const handleFilterChange = (option: 'published' | 'notPublished' | 'all') => {
        setFilterOption(option);
    };

    const filteredArticles = filterOption === 'published'
        ? articles.filter(article => article.published)
        : filterOption === 'notPublished'
            ? articles.filter(article => !article.published)
            : articles;

    return (
        <div className="max-w-4xl mx-auto px-4 py-8 h-full flex flex-1 flex-col gap-3">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold">Article List</h1>
            </div>
            <ul className="divide-y divide-gray-200 flex flex-col flex-1 overflow-y-auto">
                {filteredArticles.map((article) => (
                    <li key={uniqid()} className="py-4 transition duration-300 ease-in-out transform hover:translate-x-5 hover:text-blue-600">
                        <a href={`/articles/${article.id}`} className="block">
                            <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
                            <p className="text-gray-600">{article.body}</p>
                        </a>
                    </li>
                ))}
            </ul>
            <div>
                <label className="mr-4">
                    <input
                        type="radio"
                        value="published"
                        checked={filterOption === 'published'}
                        onChange={() => handleFilterChange('published')}
                        className="mr-1"
                    />
                    Show Published
                </label>
                <label className="mr-4">
                    <input
                        type="radio"
                        value="notPublished"
                        checked={filterOption === 'notPublished'}
                        onChange={() => handleFilterChange('notPublished')}
                        className="mr-1"
                    />
                    Show Not Published
                </label>
                <label>
                    <input
                        type="radio"
                        value="all"
                        checked={filterOption === 'all'}
                        onChange={() => handleFilterChange('all')}
                        className="mr-1"
                    />
                    Show All
                </label>
            </div>
            <span className='w-full md:w-fit ml-auto'>
                <button className="w-full flex">
                    <NavLink to="/articles/add" className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">
                        Add Article
                    </NavLink>
                </button>
            </span>
        </div>
    );
};
