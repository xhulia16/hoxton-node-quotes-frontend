import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type Quote={
  quote: string
  author: string
}

export function Home() {
  const [quotes, setQuotes] = useState<Quote[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/quotes")
      .then((resp) => resp.json())
      .then((quotesFromServer) => setQuotes(quotesFromServer));
  }, []);

  return (
    <>
    <ul>
      {quotes.map((item) => (
        <li>
          <h2>"{item.quote}"</h2>
          <h3>-{item.author}</h3>
        </li>
      ))}
    </ul>
    <Link to={'/random-quote'}>
    <h4>Click for random quote</h4>
    </Link>
    </>
  );
}
