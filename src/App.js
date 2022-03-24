import NearContextProvider from "./context/NearContext";
import HomePage from "./pages/HomePage";

export default function App() {
  return (
    <NearContextProvider>
      <HomePage />
    </NearContextProvider>
  );
}
