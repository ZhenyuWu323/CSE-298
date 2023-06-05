import { Dispatch, useState } from "react";

interface ListGroupProps {
  items: string[];
  heading: string;
}
function ListGroup(Props: ListGroupProps) {
  const [ind, setInd] = useState(-1);

  const message = Props.items.length === 0 && <p>No Item</p>;
  const handleClick = (
    item: string,
    index: number,
    setInd: Dispatch<React.SetStateAction<number>>
  ) => {
    console.log(item);
    setInd(index);
  };

  return (
    <>
      <h1>{Props.heading}</h1>
      {message}
      <ul className="list-group">
        {Props.items.map((item, index) => (
          <li
            className={
              ind === index ? "list-group-item active" : "list-group-item"
            }
            key={item}
            onClick={() => handleClick(item, index, setInd)}
          >
            {item}
          </li>
        ))}
      </ul>
    </>
  );
}

export default ListGroup;
