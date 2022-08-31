import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


type Quote = {
  id: number
  quote: string
  firstName: string
  lastName: string
  age: number
  image: string
  };

export function Home() {
  const [quotes, setQuotes] = useState<Quote[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/quotes")
      .then((resp) => resp.json())
      .then((quotesFromServer) => setQuotes(quotesFromServer));
  }, []);

  return (
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
    <Link to={'/random-quote'}>
    <h4>Click for random quote</h4>
    </Link>
    </div>
  );
}
