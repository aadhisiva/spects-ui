

import { Component } from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";

export default function RequireAuth(WrappedComponent: any) {

    interface IAuthentication {
        auth: boolean
    }
    class Authentication extends Component<IAuthentication> {
        render() {
            const { user }: any = this.props.auth;
            if (!user.sucess) {
                return <Navigate to="/signin" />
            };

            return <WrappedComponent {...this.props} />
        };
    };

    function mapStateToProps({ auth }: any) {
        return { auth: auth }
    }

    return connect(mapStateToProps)(Authentication);
}