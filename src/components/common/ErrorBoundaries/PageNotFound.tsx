import React from 'react';
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router';

export const PageNotFound: React.FC = () => {
    const navigate = useNavigate();
    return (
    <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
            <Button onClick={() => navigate('/dashboard')}  type="primary">
                Back Home
            </Button>
        }
    />
);
}
