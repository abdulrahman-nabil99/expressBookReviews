import axios from "axios";
let url = "http://localhost:5000/";
const getBooks = async (url) => {
  try {
    const response = await axios.get(url);
    const Books = response.data.books;
    console.log(Books);
  } catch (error) {
    console.error(error.message);
  }
};
// getBooks(url);

url = "http://localhost:5000/isbn";
const getBook = async (isbn) => {
  try {
    const response = await axios.get(`${url}/${isbn}`);
    const book = response.data.book;
    console.log(book);
  } catch (error) {
    console.error(error.message);
  }
};
//getBook(1);

url = "http://localhost:5000/author";
const getBooksByAuthor = async (author) => {
  try {
    const response = await axios.get(`${url}/${author}`);
    const book = response.data.books;
    console.log(book);
  } catch (error) {
    console.error(error.message);
  }
};
//getBooksByAuthor("Chinua Achebe");

url = "http://localhost:5000/title";
const getBooksByTitle = async (title) => {
  try {
    const response = await axios.get(`${url}/${title}`);
    const book = response.data.books;
    console.log(book);
  } catch (error) {
    console.error(error.message);
  }
};
getBooksByTitle("Things Fall Apart");
