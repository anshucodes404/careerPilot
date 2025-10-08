import { createContext, useContext } from "react";

const urlContext = createContext();

export const UrlProvider = urlContext.Provider;

export const useUrl = () => {
    return useContext(urlContext);
};

export default urlContext;