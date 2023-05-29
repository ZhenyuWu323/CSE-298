import Message from "./Message";
import Alert from "./components/Alert";
import ListGroup from "./components/ListGroup";

function App() {
  let items = ["New York", "San Francisco", "Tokyo", "London", "Paris"];
  return (
    <div>
      <Alert>
        <span>Hello</span>
      </Alert>
      <ListGroup items={items} heading = 'Cities' />
    </div>
  );
}

export default App;
