import { Router } from "express";
import jwt from "jsonwebtoken";
import books from "./booksdb.js";
const regd_users = Router();

let users = [];

const isValid = (username) => {
  //write code to check is the username is valid
  const usersWithUsername = [];
  users.forEach((user) => {
    if (user.username == username) usersWithUsername.push(user);
  });
  return usersWithUsername.length <= 0;
};

const authenticatedUser = (username, password) => {
  //returns boolean
  //write code to check if username and password match the one we have in records.
  // Filter the users array for any user with the same username and password
  let validusers = users.filter((user) => {
    return user.username === username && user.password === password;
  });
  // Return true if any valid user is found, otherwise false
  return validusers.length > 0;
};

//only registered users can login
regd_users.post("/login", (req, res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;
  if (!username || !password) {
    return res.status(404).json({ message: "Error logging in" });
  }
  if (authenticatedUser(username, password)) {
    // Generate JWT access token
    let accessToken = jwt.sign(
      {
        data: username,
      },
      "access",
      { expiresIn: 60 * 60 }
    );
    // Store access token and username in session
    req.session.authorization = {
      accessToken,
      username,
    };
    return res.status(200).send("User successfully logged in");
  } else {
    return res
      .status(208)
      .json({ message: "Invalid Login. Check username and password" });
  }
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  const user = req.user;
  const isbn = req.params.isbn;
  books[isbn].reviews[`${user.data}`] = req.body.review;
  return res.status(300).json({ message: "Review Added/Updated Successfully" });
});

// Delete a book review
regd_users.delete("/auth/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  const username = req.user.data;
  if (books[isbn].reviews[`${username}`]) {
    delete books[isbn].reviews[`${username}`];
    return res.status(410).json({ message: "Review Deleted Successfully" });
  } else
    return res.status(404).json({ message: "You have no Review on this book" });
});

export const authenticated = regd_users;
const _isValid = isValid;
export { _isValid as isValid };
const _users = users;
export { _users as users };
