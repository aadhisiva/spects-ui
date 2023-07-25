

import { Component } from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";

export default function RequireAuth(WrappedComponent: any) {

    interface IAuthentication {
        authenticated: boolean
    }
    class Authentication extends Component<IAuthentication> {
        render() {
            console.log("this?.props?.authenticated", this?.props)
            if (!this?.props?.authenticated) {
                return <Navigate to="/signin" />
            }

            return <WrappedComponent {...this.props} />
        }
    }
    function mapStateToProps({session} :any) {
        return { authenticated: session?.authenticated}
    }

    return connect(mapStateToProps)(Authentication);
}