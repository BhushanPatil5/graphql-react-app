import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { getAuthorsQuery, addBookMutation, getBooksQuery } from '../queries/queries';

export default function AddBook() {

    const { loading, error, data } = useQuery(getAuthorsQuery);
    const [addBook, { book }] = useMutation(addBookMutation, {
        refetchQueries: [{ query: getBooksQuery }],
        awaitRefetchQueries: true,
    });

    const [bookName, setBookName] = useState('');
    const [genre, setGenre] = useState('');
    const [authorId, setAuthorId] = useState('');

    const displayAuthors = () => {
        if (loading) {
            return (<option disabled>Loading authors</option>);
        } else {
            return data.authors && data.authors.map(author => {
                return (
                    <option key={author.id} value={author.id}>{author.name}</option>
                );
            })
        }
    }

    const onSubmitForm = e => {
        e.preventDefault();
        let name = bookName
        addBook({ variables: { name, genre, authorId } })
        setBookName('');
        setGenre('');
        setAuthorId('');
    };

    return (
        <>
            <form id="add-book" onSubmit={onSubmitForm}>
                <div className="field">
                    <label>Book name:</label>
                    <input type="text" onChange={event => setBookName(event.target.value)} />
                </div>
                <div className="field">
                    <label>Genre:</label>
                    <input type="text" onChange={event => setGenre(event.target.value)} />
                </div>
                <div className="field">
                    <label>Author:</label>
                    <select onChange={event => setAuthorId(event.target.value)}>
                        <option>Select author</option>
                        {displayAuthors()}
                    </select>
                </div>
                <button>+</button>

            </form>
        </>
    )
}