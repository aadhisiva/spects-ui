import { Card } from "antd";
import { Component } from "react";

export default class ErrorBoundary extends Component {
  constructor(props: any) {
    super(props);
    this.state = {
      hasError: false,
      errorInfo: '',
      error: ''
    };
  }

  static getDerivedStateFromError(error: any) {
    // Update state so the next render will show the fallback UI.
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: any, errorInfo: any) {
    // You can also log the error to an error reporting service like AppSignal
    this.setState({ errorInfo, error })
  }

  render() {
    const { hasError, errorInfo, error }: any = this.state;
    const { children }: any = this.props;

    if (hasError || error) {
      return (
        <div>
          <Card title="Errors">
            <div className="card-header">
              <p>
                There was an error in loading this page.{' '}
                <span
                  style={{ cursor: 'pointer', color: '#0077FF' }}
                  onClick={() => {
                    window.location.reload();
                  }}
                >
                  Reload this page
                </span>{' '}
              </p>
            </div>
            <div className="card-body">
              <details className="error-details">
                <summary>Click for error details</summary>
                {errorInfo && errorInfo?.componentStack.toString()}
              </details>
            </div>
          </Card>
        </div>
      );
    }

    return children;
  }
};
