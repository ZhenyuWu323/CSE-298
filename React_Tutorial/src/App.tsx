

import ListGroup from "./components/ListGroup";
import GameGrid from "./components/GameGrid";


function App() {
  let items = ["New York", "San Francisco", "Tokyo", "London", "Paris"];
  return (
    <div>
      <ListGroup items={items} heading = 'Cities' />
      <GameGrid/>
    </div>
  );
}

export default App;
