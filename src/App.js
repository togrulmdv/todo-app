import { QueryClient, QueryClientProvider } from "react-query";
import "./App.css";
import Authors from "./ApiComponents/Authors/Authors";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Authors />
    </QueryClientProvider>
  );
}

export default App;
