

import { Component } from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";

export default function requireAuth(WrappedComponent: any) {

    interface IAuthentication {
        authenticated: boolean,
    }
    class Authentication extends Component<IAuthentication> {
        render() {

            if (!this.props?.authenticated) {
                return <Navigate to="/signin" />
            }

            return <WrappedComponent {...this.props} />
        }
    }
    function mapStateToProps({session} :any) {
        console.log("##auth: ", session);
        return { authenticated: session?.authenticated }
    }

    return connect(mapStateToProps)(Authentication);
}