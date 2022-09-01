import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Quote, Author } from "../types";

export function Home() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [authors, setAuthors] = useState<Author[]>([]);

let navigate=useNavigate()

  useEffect(() => {
    fetch("http://localhost:5000/quotes")
      .then((resp) => resp.json())
      .then((quotesFromServer) => setQuotes(quotesFromServer));
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/authors")
      .then((resp) => resp.json())
      .then((authorsFromServer) => setAuthors(authorsFromServer));
  }, []);

  return (
    <div className="home">
      <div className="quotes">
        <ul className="quotes-list">
          {quotes.map((item) => (
            <li>
              <Link to={`/quotes/${item.id}`}>
                <h2>"{item.quote}"</h2>
                <span>-{item.author.firstName}</span>
                <span> {item.author.lastName}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <form className="quote-form"
          onSubmit={(event) => {
            event.preventDefault();

            let authorFirstName = event.target.firstName.value;
            let authorLastName = event.target.lastName.value;
            let authorOfQuote = authors.find(
              (author) =>
                author.firstName.toLowerCase() ===
                  authorFirstName.toLowerCase() &&
                author.lastName.toLowerCase() === authorLastName.toLowerCase()
            );
            console.log(authorFirstName, authorLastName, authorOfQuote.id);
            if (authorOfQuote && authorFirstName && authorLastName) {
              fetch("http://localhost:5000/quotes", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  quote: event.target.quote.value,
                  authorId: authorOfQuote.id,
                }),
              })
              .then((resp) => resp.json())
              .then(data=>navigate(`/quotes/${data.id}`))
            }
          }}
        >
          <Link to={"/random-quote"}>
            <h4>Click for random quote</h4>
          </Link>

          <h1>Add a quote here</h1>
          <input name="quote" placeholder="insert quote here..."></input>
          <input
            name="firstName"
            placeholder="insert first name of author..."
          ></input>
          <input
            name="lastName"
            placeholder="insert last name of author..."
          ></input>
          <button> Submit</button>
        </form>
        <h1>Add an author</h1>
        <form className="author-form"
          onSubmit={(event) => {
            event.preventDefault();

            fetch("http://localhost:5000/authors", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                firstName: event.target.firstName.value,
                lastName: event.target.lastName.value,
                age: Number(event.target.age.value),
                image: event.target.image.value,
              }),
            })
            .then((resp) => resp.json())
          }}
        >
          <input name="firstName" placeholder="name of author"></input>
          <input name="lastName" placeholder="Last name of author"></input>
          <input name="age" placeholder="age of author"></input>
          <input name="image" placeholder="image of author"></input>
          <button>Submit</button>
        </form>
      </div>
    </div>
  );
}
