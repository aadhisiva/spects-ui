import { Component } from "react";

export default class ErrorBoundary extends Component {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }
 
  static getDerivedStateFromError(error: any) {
    // Update state so the next render will show the fallback UI.
    console.log("errraddddddd",error)
    return {
      hasError: true,
      error,
    };
  }
 
  componentDidCatch(error: any, errorInfo: any) {
    // You can also log the error to an error reporting service like AppSignal
    // logErrorToMyService(error, errorInfo);
  }
 
  render() {
    const { hasError, error }: any = this.state;
    const { children }: any = this.props;
 
    if (hasError) {
      // You can render any custom fallback UI
      return <ErrorFallback error={error} />;
    }
 
    return children;
  }
}

const ErrorFallback = ({ error }: any) => (
  <div>
    <p>Something went wrong 😭</p>
 
    {error.message && <span>Here's the error: {error.message}</span>}
  </div>
);
 