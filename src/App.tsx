import { BrowserRouter } from "react-router-dom";
import { RootRoutes } from "./routes/routes/RootRoutes";

function App() {
  return (
    <BrowserRouter>
      <RootRoutes />
    </BrowserRouter>
  );
}

export default App;
