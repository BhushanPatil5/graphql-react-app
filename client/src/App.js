import React, { Component } from 'react';

// components
import BookList from './components/BookList';
import AddBook from './components/AddBook';

class App extends Component {
  render() {
    return (
        <div id="main">
          <h1>Ninja's Reading List</h1>
          <BookList />
          <AddBook/>
      </div>
    );
  }
}

export default App;