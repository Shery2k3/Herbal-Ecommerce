import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "./Components/Cart/CartContext.jsx";
import { AppProvider } from "./Components/CartState/useCartState.jsx";
import { AreaProvider } from "./Pages/Cart/components/localarea.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import { ConfigProvider } from "antd";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AppProvider>
        <CartProvider>
          <AreaProvider>
            <ConfigProvider
              theme={{
                components: {
                  Tabs: {
                    itemColor: "#fff",
                    itemHoverColor: "#073805ff",
                    itemActiveColor: "#fff",
                    itemSelectedColor: "#10430e",
                    inkBarColor: "#10430e",
                    titleFontSize: 16,
                  },
                  Form: {
                    labelColor: "#000000ff",
                  },
                },
                token: {
                  colorPrimary: "#29A125",
                  lineWidth: 0,
                  lineWidthFocus: 10,
                },
              }}
            >
              <App />
            </ConfigProvider>
          </AreaProvider>
        </CartProvider>
      </AppProvider>
    </BrowserRouter>
  </QueryClientProvider>
);
