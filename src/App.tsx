import FileExplorer from "./components/FileExplorer";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <FileExplorer />
      </div>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
