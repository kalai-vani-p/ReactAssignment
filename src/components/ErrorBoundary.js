import React from "react";
import { logger } from "../utils/logger";
class ErrorBoundary extends React.Component{
    constructor(props){
        super(props);
        this.state = { hasError : false};
    }
    // Updates state when a child component throws an error
    static getDerivedStateFromError = () => ({ hasError: true });
    // Logs error details for debugging purposes
    componentDidCatch = (e, info) => logger.error("Error caught:", e, info);
    render(){
        return this.state.hasError ? <h4>Something went wrong</h4> : this.props.children;
    }
}

export default ErrorBoundary;