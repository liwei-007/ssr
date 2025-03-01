import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import store from "../store/index";
import { Toaster } from "@/components/ui/sonner";
import "../styles/globals.css";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
      <Toaster />
    </Provider>
  );
};

export default MyApp;
