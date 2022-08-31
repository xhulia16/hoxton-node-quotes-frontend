import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

type Quote = {
  id: number;
  quote: string;
  firstName: string;
  lastName: string;
  age: number;
  image: string;
};

export function SingleQuote() {
  const [singleQuote, setSingleQuote] = useState<Quote | null>(null);
  const params = useParams();
  useEffect(() => {
    fetch(`http://localhost:5000/quotes/${params.itemId}`)
      .then((resp) => resp.json())
      .then((quoteFromServer) => setSingleQuote(quoteFromServer));
  }, []);

  if (singleQuote === null) return <h1>Loading...</h1>;
  return (
    <div className="singleQuote">
      <h1>"{singleQuote.quote}"</h1>
      <img src={singleQuote.image}></img>
      <h3>First Name: {singleQuote.firstName}</h3>
      <h3>Last Name: {singleQuote.lastName}</h3>
      <h3>age: {singleQuote.age}</h3>

      <Link to={"/quotes"}>
        <h4>Home</h4>
      </Link>
    </div>
  );
}
