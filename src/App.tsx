import FileExplorer from "./components/FileExplorer";
import { QueryClient, QueryClientProvider } from "react-query";
const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <FileExplorer />
      </div>
    </QueryClientProvider>
  );
}

export default App;
