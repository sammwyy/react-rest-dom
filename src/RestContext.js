import React from "react";

const Context = React.createContext();

function Provider({ children, url, auth }) {
  return <Context.Provider value={{ url, auth }}>{children}</Context.Provider>;
}

export const RestContext = { Context, Provider };
