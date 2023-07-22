import { Card } from 'antd';
import React from 'react';

const ErrorPage = (errorInfo: any) => {
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
};

export default ErrorPage;