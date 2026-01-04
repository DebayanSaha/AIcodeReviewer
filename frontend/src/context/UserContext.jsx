import { Children, createContext, useContext, useState } from "react";

//This creates a global container. Think of it like a shared notebook: “I will keep user data here.” At the start, it’s empty (null) → user not logged in.
export const UserContext = createContext(null);

//This is supposed to be a wrapper component. Its job: Hold user data , Share it with the whole app Anything wrapped inside this provider can access user data.
export const UserProvider =({children})=>{
    const [user, setUser] = useState(null)

    //This line says: “I am giving user and setUser to every component inside me.” This is how global sharing happens
    return <UserContext.Provider value={{user,setUser}}>
        {children}
    </UserContext.Provider>
}

//This allows any component to read user data.
export const getData = ()=> useContext(UserContext);