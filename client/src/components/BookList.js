import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { getBooksQuery } from '../queries/queries';

// Components
import BookDetails from './BookDetails';

export default function BookList(props) {

    const { loading, error, data } = useQuery(getBooksQuery);
    const [selected, setSelected] = useState(null);

    const displayBooks = () => {
        if (loading) {
            return (<div>Loading books...</div>);
        } else {
            return data.books && data.books.map(book => {
                return (
                    <li key={book.id} onClick={() => setSelected(book.id)} >{book.name}</li>
                );
            })
        }
    }

    return (
        <div>
            <ul id="book-list">
                {displayBooks()}
            </ul>
            <BookDetails bookId={selected} />
        </div>
    )
}