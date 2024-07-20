import { Router } from "express";
import books from "./booksdb.js";
import { isValid } from "./auth_users.js";
import { users } from "./auth_users.js";
const public_users = Router();

public_users.post("/register", (req, res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;
  if (!username || !password)
    return res
      .status(400)
      .json({ message: "Invalid username and/or password" });
  if (!isValid(username))
    return res.status(400).json({ message: "username is already in use" });
  else {
    users.push({ username, password });
    return res
      .status(300)
      .json({ message: "Registered Successfully, You can login  now" });
  }
});

// Get the book list available in the shop
public_users.get("/", function (req, res) {
  return res.status(200).json({ message: "Success", books });
});

// Get book details based on ISBN
public_users.get("/isbn/:isbn", function (req, res) {
  //Write your code here
  let isbn = req.params.isbn;
  if (!isbn) {
    return res.status(422).json({ message: "Invalid ISBN" });
  } else {
    if (Object.keys(books).includes(isbn)) {
      const book = books[`${isbn}`];
      return res.status(200).json({ message: "Success", book });
    } else return res.status(202).json({ message: "Book Not Found" });
  }
});

// Get book details based on author
public_users.get("/author/:author", function (req, res) {
  //Write your code here
  const author = req.params.author.toLowerCase();
  let autorBooks = [];
  Object.keys(books).forEach((k) => {
    if (books[k].author.toLowerCase() == author)
      autorBooks.push({ ISBN: k, book: books[k] });
  });
  if (autorBooks.length > 0)
    return res.status(200).json({ message: "Success", books: autorBooks });
  else return res.status(202).json({ message: "Book Not Found" });
});

// Get all books based on title
public_users.get("/title/:title", function (req, res) {
  //Write your code here
  const title = req.params.title.toLowerCase();
  let booksWithTitle = [];
  Object.keys(books).forEach((k) => {
    if (books[k].title.toLowerCase() == title)
      booksWithTitle.push({ ISBN: k, book: books[k] });
  });
  if (booksWithTitle.length > 0)
    return res.status(200).json({ message: "Success", books: booksWithTitle });
  else return res.status(202).json({ message: "Book Not Found" });
});

//  Get book review
public_users.get("/review/:isbn", function (req, res) {
  //Write your code here
  let isbn = req.params.isbn;
  let reviews;
  if (Object.keys(books).includes(isbn)) {
    reviews = books[`${isbn}`].reviews;
    return res.status(300).json({
      message: "Success",
      Title: books[isbn].title,
      Author: books[isbn].author,
      "Number Of Reviews": Object.keys(reviews).length,
      reviews,
    });
  } else return res.status(202).json({ message: "Book Not Found" });
});

export default public_users;
