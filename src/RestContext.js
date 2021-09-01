import React from "react";

const Context = React.createContext();

function Provider({ children, url }) {
  return <Context.Provider value={{ url }}>{children}</Context.Provider>;
}

export const RestContext = { Context, Provider };
