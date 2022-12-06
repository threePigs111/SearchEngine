import { createHashRouter } from "react-router-dom";
import App from "../pages/App";
import SearchResult from "../pages/SearchResult";

/**
 * Hash 路由
 * 
 * App 为**搜索首页**, SearchResult 为**搜索结果页**
 */
export const router = createHashRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "search",
    element: <SearchResult />
  } 
]);