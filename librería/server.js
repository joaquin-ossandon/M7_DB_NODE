const express = require('express');
const server = express();
const { Author, Book, Category } = require('./src/models');

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.get('/', async (req, res) => {
  const authors = await Author.findAll({
    include: {
      model: Book,
      attributes: ['title'],
      include: {
        model: Category,
        attributes: ['name'],
        through: { attributes: [] },
      }
    }
  });

  res.json(authors);
});

module.exports = server