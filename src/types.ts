export type Author={
    id:number
    firstName:string
    lastName:string
    age: number
    image:string
}

export type Quote = {
    id: number;
    quote: string;
    authorId: number
    author: Author
  };