import { ComponentType } from "react";
import { Redirect, Route, RouteComponentProps, RouteProps } from "react-router-dom";
import { useAppSelector } from "../app/store/configureStore";

interface IProps extends RouteProps {
    component: ComponentType<RouteComponentProps<any>> | ComponentType<any>
}


const PrivateRoute = (props: IProps) => {
    const { component: Component, ...rest } = props;
    const { user } = useAppSelector(state => state.account);
    
    return (
        <Route
        {...rest}
        render={props =>
            user ? (
            <Component {...props} />
            ) : (
            <Redirect
                to={{
                pathname: "/login",
                state: { from: props.location }
                }}
            />
            )
        }
        />
    );
}
export default PrivateRoute;