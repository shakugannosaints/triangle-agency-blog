import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Router as WouterRouter, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import ArticlesPage from "./pages/ArticlesPage";
import ArticlePage from "./pages/ArticlePage";
import CategoriesPage from "./pages/CategoriesPage";
import CategoryPage from "./pages/CategoryPage";
import TagsPage from "./pages/TagsPage";
import TagPage from "./pages/TagPage";


function getRouterBase() {
  // wouter expects base without trailing slash.
  return import.meta.env.BASE_URL.replace(/\/$/, "");
}

function Routes() {
  return (
    <WouterRouter base={getRouterBase()}>
      <Switch>
        <Route path={"/"} component={Home} />
        <Route path={"/articles"} component={ArticlesPage} />
        <Route path={"/article/:slug"} component={ArticlePage} />
        <Route path={"/categories"} component={CategoriesPage} />
        <Route path={"/category/:category"} component={CategoryPage} />
        <Route path={"/tags"} component={TagsPage} />
        <Route path={"/tag/:tag"} component={TagPage} />
        <Route path={"/404"} component={NotFound} />
        {/* Final fallback route */}
        <Route component={NotFound} />
      </Switch>
    </WouterRouter>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          <Routes />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
