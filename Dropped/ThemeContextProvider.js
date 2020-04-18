import React, { createContext, useState } from 'react'

export const ThemeContext = createContext()

const ThemeContextProvider = (props) =>{
    const [ isLightTheme, setTheme ] = useState(true)
    const light = {
        syntex : '#555',
        ui : '#ddd',
        bg : '#eee'
    }
    const dark = {
        syntex : '#ddd',
        ui : '#333',
        bg : '#555'
    }

    const chaneTheme = () =>{
        setTheme(!isLightTheme)
    }

    return(
        <ThemeContext.Provider value={{isLightTheme, light, dark, chaneTheme}}>
            {props.children}
        </ThemeContext.Provider>
    )
}

export default ThemeContextProvider