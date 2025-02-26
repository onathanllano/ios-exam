import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router";
import { Layout } from "./layout.tsx";
import { Home } from "./pages/home/home.tsx";
import { NewUser } from "./pages/new-user/new-user.tsx";
import { UserProfile } from "./pages/user-profile/user-profile.tsx";


function App() {
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="new-user" element={<NewUser />} />
              <Route path="user/:userId" element={<UserProfile />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </>
  );
}

export default App;
