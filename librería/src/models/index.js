const { Author } = require("./author.model");
const { Book } = require("./book.model");
const { Category } = require("./category.model");

Book.belongsTo(Author, { foreignKey: "authorId" });
Author.hasMany(Book, { foreignKey: "authorId" });

Book.belongsToMany(Category, { through: "Book_Category", foreignKey: "bookId" });
Category.belongsToMany(Book, { through: "Book_Category", foreignKey: "categoryId" });

module.exports = {
    Author,
    Book,
    Category
};