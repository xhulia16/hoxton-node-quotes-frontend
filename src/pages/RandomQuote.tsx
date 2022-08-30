import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type Quote = {
  quote: string;
  author: string;
};

export function RandomQuote() {
  const [random, setRandom] = useState<Quote | null>(null);

  useEffect(() => {
    fetch("http://localhost:5000/random")
      .then((resp) => resp.json())
      .then((randomQuote) => setRandom(randomQuote));
  }, []);

  if (random === null) return <h1>loading</h1>;
  return (
    <div>
      <h2>"{random.quote}"</h2>
      <h3>-{random.author}</h3>

      <Link to={"/home"}>
        <h4>Home</h4>
      </Link>
    </div>
  );
}
