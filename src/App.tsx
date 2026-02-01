import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import TodoApp from "./pages/TodoApp";
import FormHandling from "./pages/FormHandling";
import ProgressBar from "./pages/ProgressBar";
import CountdownTimer from "./pages/CountdownTimer";
import LiveSearch from "./pages/LiveSearch";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<TodoApp />} />
            <Route path="/form" element={<FormHandling />} />
            <Route path="/progress" element={<ProgressBar />} />
            <Route path="/timer" element={<CountdownTimer />} />
            <Route path="/search" element={<LiveSearch />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
