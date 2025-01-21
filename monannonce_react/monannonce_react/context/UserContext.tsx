import { Redirect, router } from 'expo-router';
import React, {createContext, useEffect, useState, useContext, ReactNode} from 'react'

export const UserContext = createContext({});

const UserProvider = ({children}: { children?: any }): any => {
  const [user, setUser] = useState({})

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export const useCurrentUser = () => useContext(UserContext)

export default UserProvider;