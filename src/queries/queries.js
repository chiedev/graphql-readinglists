import { gql } from 'apollo-boost';

const getAuthorsQuery = gql`
    {
        authors {
            name
            _id
        }
    }
`;

const getBooksQuery = gql`
    {
        books {
            name
            _id
        }
    }
`;

const addBookMutation = gql`
    mutation AddBook($name: String!, $genre: String!, $authorId: ID!){
        addBook(name: $name, genre: $genre, authorId: $authorId){
            name
            _id
        }
    }
`;

const getBookQuery = gql`
    query GetBook($id: ID){
        book(_id: $id) {
            _id
            name
            genre
            author {
                _id
                name
                age
                books {
                    name
                    _id
                }
            }
        }
    }
`;

export { getAuthorsQuery, getBooksQuery, addBookMutation, getBookQuery };
