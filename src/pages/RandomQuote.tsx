import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Quote} from "../types";

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
      <span>-{random.author.firstName}</span>
      <span> {random.author.lastName}</span>

      <Link to={"/quotes"}>
        <h4>Home</h4>
      </Link>
    </div>
  );
}
