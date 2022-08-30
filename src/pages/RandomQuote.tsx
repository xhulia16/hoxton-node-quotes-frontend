import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export function RandomQuote() {
  const [random, setRandom] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/random")
      .then((resp) => resp.json())
      .then((randomQuote) => setRandom(randomQuote));
  }, []);
  return (
    <div>
      <h2>"{random.quote}"</h2>
      <h3>-{random.author}</h3>

      <Link to={'/home'}>
    <h4>Home</h4>
    </Link>
    </div>
  );
}
