import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";

type Quote = {
  id: number;
  quote: string;
  firstName: string;
  lastName: string;
  age: number;
  image: string;
};

export function Home() {
  const [quotes, setQuotes] = useState<Quote[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/quotes")
      .then((resp) => resp.json())
      .then((quotesFromServer) => setQuotes(quotesFromServer));
  }, []);

  return (
    <div className="home">
      <div className="quotes">
        <ul className="quotes-list">
          {quotes.map((item) => (
            <li>
              <Link to={`/quotes/${item.id}`}>
                <h2>"{item.quote}"</h2>
                <span>-{item.firstName}</span>
                <span> {item.lastName}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <form
        onSubmit={(event) => {
          event.preventDefault();

          fetch("http://localhost:5000/quotes",{
            method: "POST", 
            headers: {
              "Content-Type": "application/json"
            }, 
            body: JSON.stringify({
            id: quotes[quotes.length - 1].id + 1,
            quote: event.target.quote.value,
            firstName: event.target.firstName.value,
            lastName: event.target.lastName.value,
            age: Number(event.target.age.value),
            image: event.target.image.value,
            })
          })
          .then(resp=>resp.json())
          .then(data=> setQuotes([...quotes, data]))

          event.target.reset();
        }}
      >
        <Link to={"/random-quote"}>
          <h4>Click for random quote</h4>
        </Link>
        <h1>Post a quote here</h1>
        <input name="quote" placeholder="insert quote here..."></input>
        <input name="firstName" placeholder="insert first name..."></input>
        <input name="lastName" placeholder="insert last name..."></input>
        <input name="age" placeholder="insert age..."></input>
        <input name="image" placeholder="insert image address..."></input>
        <button> Submit</button>
      </form>
    </div>
  );
}
