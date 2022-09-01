import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";

import { Quote} from "../types";

export function SingleQuote() {
  const [singleQuote, setSingleQuote] = useState<Quote | null>(null);
  const params = useParams();
  const navigate=useNavigate()
  useEffect(() => {
    fetch(`http://localhost:5000/quotes/${params.itemId}`)
      .then((resp) => resp.json())
      .then((quoteFromServer) => setSingleQuote(quoteFromServer));
  }, []);

  if (singleQuote === null) return <h1>Loading...</h1>;
  return (
    <div>
    <div className="singleQuote">
      <h1>"{singleQuote.quote}"</h1>
      <img src={singleQuote.author.image}></img>
      <h3>First Name: {singleQuote.author.firstName}</h3>
      <h3>Last Name: {singleQuote.author.lastName}</h3>
      <h3>age: {singleQuote.author.age}</h3>
      <button onClick={()=>{
        fetch(`http://localhost:5000/quotes/${params.itemId}`,{
            method: "DELETE"
        })
        .then(resp=>resp.json())
        .then(data=> navigate("/quotes"))
      }}>Delete quote</button>

      <Link to={"/quotes"}>
        <h4>Home</h4>
      </Link>
    </div>
    {/* <div className="update-form">
    <form
        onSubmit={(event) => {
          event.preventDefault();

          fetch(`http://localhost:5000/quotes/${params.itemId}`,{
            method: "PATCH", 
            headers: {
              "Content-Type": "application/json"
            }, 
            body: JSON.stringify({
            quote: event.target.quote.value,
            firstName: event.target.firstName.value,
            lastName: event.target.lastName.value,
            age: Number(event.target.age.value),
            image: event.target.image.value,
            })
          })
          .then(resp=>resp.json())
          .then(data=> setSingleQuote(data))

          event.target.reset();
        }}
      >
        <input name="quote" placeholder="edit quote here..."></input>
        <input name="firstName" placeholder="edit first name..."></input>
        <input name="lastName" placeholder="edit last name..."></input>
        <input name="age" placeholder="edit age..."></input>
        <input name="image" placeholder="edit image address..."></input>
        <button> Submit</button>
      </form>
    </div> */}
    </div>
  );
}
