import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Quote, Author } from "../types";

export function Home() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [authors, setAuthors] = useState<Author[]>([]);

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
      <form
        onSubmit={(event) => {
          event.preventDefault();

          let firstName = event.target.firstName.value;
          let lastName = event.target.lastName.value;
          let authorOfQuote = authors.find(
            (author) =>
              author.firstName.toLowerCase() === firstName.toLowerCase() &&
              author.lastName.toLowerCase() === lastName.toLowerCase()
          );
          console.log(firstName, lastName, authorOfQuote.id)
          if(authorOfQuote && firstName && lastName){
            fetch("http://localhost:5000/quotes",{
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json"
                      },
                      body: JSON.stringify({
                      quote: event.target.quote.value,
                      authorId: authorOfQuote.id
                      })
                    })
                    .then(resp=>resp.json())
                    .then(data=> setQuotes([...quotes, data]))
          }

                    // event.target.reset();
        }}
      >
        <Link to={"/random-quote"}>
          <h4>Click for random quote</h4>
        </Link>
        <h1>Post a quote here</h1>
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
    </div>
  );
}
