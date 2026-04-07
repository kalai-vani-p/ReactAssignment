import React from "react";
import { logger } from "../utils/logger";
import ErrorDisplay from "../components/ErrorDisplay";
/**
 * Error Boundary component to catch runtime errors in child components
 * @component
 * @extends React.Component
 * @param {Object} props
 * @param {React.ReactNode} props.children - Child components to be wrapped
 */
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
        return this.state.hasError 
        ? <ErrorDisplay message="Something went wrong" /> 
        : this.props.children;
    }
}

export default ErrorBoundary;