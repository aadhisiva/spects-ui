import React from 'react';
import ErrorPage from './ErrorPage';

const withErrorHandling = (WrappedComponent: any) => {
  class WithErrorHandling extends React.Component {
    state = {
      hasError: false,
      errorInfo: '',
      error: ''
    };

    static getDerivedStateFromError(error: any) {
      return { hasError: true };
    }

    componentDidCatch(error: any, errorInfo: any) {
      // You can also log the error to a logging service here
      console.error('Error occurred:', error, errorInfo);
      this.setState({errorInfo, error})
    }

    render() {
        const { errorInfo, error, hasError } = this.state;
      if (hasError || error) {
        return <ErrorPage errorInfo={errorInfo} />;
      }

      return <WrappedComponent {...this.props} />;
    }
  }

  return WithErrorHandling;
};

export default withErrorHandling;