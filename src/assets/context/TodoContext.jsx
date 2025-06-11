import { createContext, useState } from "react";

const TodoContext = createContext()
export default TodoContext;

export const TodoContextProvider = ({children}) => {
    
    const [tasks, setTasks] = useState([]);

    return (
        <TodoContext.Provider value={{ tasks, setTasks }}>
            {children}
        </TodoContext.Provider>
    )
}