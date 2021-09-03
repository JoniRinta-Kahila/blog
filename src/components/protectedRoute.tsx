import React from "react";
import { Route } from "react-router-dom";

interface ProtectedRouteProps{};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({...rest}) => {

    const loggedIn = true;

    return loggedIn ? <Route {...rest} /> : <h1>Login</h1> //<ManagementLogin/>
}

export default ProtectedRoute;