require("dotenv").config();
const sequelize = require("../src/config/database");
const { Author, Book, Category } = require("../src/models");

const authors = [
    { name: 'Robert C. Martin', nationality: 'USA' },
    { name: 'J.R.R. Tolkien', nationality: 'UK' },
    { name: 'Marijn Haverbeke', nationality: 'Netherlands' }
];

const categories = [
    { name: 'Software Engineering' },
    { name: 'Fantasy' },
    { name: 'JavaScript' }
];

const books = [
    {
        title: 'Clean Code',
        publicationYear: 2008,
        authorId: 1,
        Categories: [categories[0]]
    },
    {
        title: 'The Hobbit',
        publicationYear: 1937,
        authorId: 2,
        Categories: [categories[1]]
    },
    {
        title: 'Eloquent JavaScript',
        publicationYear: 2011,
        authorId: 3,
        Categories: [categories[2]]
    }
];

async function seed() {
    try {
        await sequelize.sync({ force: true });
        
        await Author.bulkCreate(authors);
        await Book.bulkCreate(books, {
            include: [Category]
        });
        console.log("Datos insertados correctamente");
    } catch (error) {
        console.error("Error al insertar datos:", error);
    }
}

seed();