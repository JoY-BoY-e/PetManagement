import React,{ createContext,useState,useEffect} from 'react';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
export const AuthContext = createContext(
    {
        user: null,
        setUser: (user) => {}
    }
);

export const Authentication = ({children}) => {
  
    const [authToken, setAuthToken] = useState(()=>{
        const cookieUser = Cookies.get('authToken');
       // console.log(JSON.parse(cookieUser));
        return cookieUser ? cookieUser : null;
    });
    const [user,setUser] = useState(authToken);

    useEffect(() => {
        if (authToken) {
            setUser(jwtDecode(authToken));
        }
    }, [authToken]);
    //token expire then logout
    useEffect(() => {
        const interval = setInterval(() => {
            if (user && user.exp * 1000 < new Date().getTime()) {
                logOut();
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [user]);

    const login = (token) => {
        Cookies.set('authToken', JSON.stringify(token));
        console.log(jwtDecode(token));
        setAuthToken(token);
        setUser(jwtDecode(token));
    };

    const logOut = () => {
       // console.log('logout');
        Cookies.remove('authToken');
        setAuthToken(null);
        setUser(null);
    };
    // Your code here
    const value = [{user,authToken,login,logOut}];
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
