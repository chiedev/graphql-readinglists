const graphql = require('graphql');
const Book = require('../models/book');
const Author = require('../models/author');
const _ = require('lodash');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
} = graphql;

// dummy data
/** let books = [
    { name: 'Name of the Wind', genre: 'Fantasy', _id: '1', authorId: '1'},
    { name: 'The Final Empire', genre: 'Fantasy', _id: '2', authorId: '2'},
    { name: 'The Long Earth', genre: 'Sci-Fi', _id: '3', authorId: '3'},
    { name: 'The Hero of Ages', genre: 'Fantasy', _id: '4', authorId: '2'},
    { name: 'The Colour of Magic', genre: 'Fantasy', _id: '5', authorId: '3'},
    { name: 'The Light Fantastic', genre: 'Fantasy', _id: '6', authorId: '3'}
];

let authors = [
    { name: 'Patrick Rothfuss', age: 44, _id: '1'},
    { name: 'Brandon Sanderson', age: 42, _id: '2'},
    { name: 'Terry Pratchet', age: 66, _id: '3'}
]; **/

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: ( ) => ({
        _id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve(parent, args){
                return Author.findById(parent.authorId);
                // return _.find(authors, { id: parent.authorId });
            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: ( ) => ({
        _id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args){
                return Book.find({ authorId: parent.id });
                // return _.filter(books, { authorId: parent.id });
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: { _id: { type: GraphQLID } },
            resolve(parent, args){
                return Book.findById(args.id);
                // return _.find(books, {id: args.id});
            }
        },
        author: {
            type: AuthorType,
            args: { _id: { type: GraphQLID } },
            resolve(parent, args){
                return Author.findById(args.id);
                // return _.find(authors, {id: args.id});
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args){
                return Book.find({});
                // return books;
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args){
                return Author.find({});
                // return authors;
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addAuthor: {
            type: AuthorType,
            args: {
                name: { type: GraphQLString },
                age: { type: GraphQLInt }
            },
            resolve(parent, args){
                let author = new Author({
                    name: args.name,
                    age: args.age
                });
                return author.save();
            }
        },
        addBook: {
            type: BookType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                genre: { type: new GraphQLNonNull(GraphQLString) },
                author_Id: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(parent, args){
                let book = new Book({
                    name: args.name,
                    genre: args.genre,
                    authorId: args.author_Id
                });
                return book.save();
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});
