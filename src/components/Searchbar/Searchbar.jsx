import React, { useState } from 'react';

export const Searchbar = ({ onSubmit }) => {
    const [query, setQuery] = useState('');

    const handleChange = e => setQuery(e.target.value);

    const handleSubmit = e => {
        e.preventDefault();
        if (!query.trim()) return;
        onSubmit(query.trim());
        setQuery('');
    };

    return (
        <header className="searchbar">
            <form className="form" onSubmit={handleSubmit}>
                <button type="submit" className="button">
                    Search
                </button>
                <input
                    className="input"
                    type="text"
                    value={query}
                    onChange={handleChange}
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                />
            </form>
        </header>
    );
};
