"use client";

import {useState, useEffect} from "react";

interface ClientOnlyProps{
    children: React.ReactNode
}

// This component is to eliminate the Hydration error
const ClientOnly : React.FC<ClientOnlyProps> = ({children}) => {
    const [hasMounted, setHasMounted] = useState(false)

    useEffect(() => {
        setHasMounted(true);
    },[])
    
    if(!hasMounted){
        return null;
    }

    return ( 
        <>
            {children}
        </>
    );
}
 
export default ClientOnly;