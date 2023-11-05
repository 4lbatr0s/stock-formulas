import { useSelector, useDispatch } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';
import { logout } from 'store/reducers/authentication';
import authActions from 'store/actions/authentication/authAction';
const ProtectedRoute = ({ role }) => {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const verifyToken = (token) => {
    try {
      // Verify the access token
      const decoded = JWT.verify(token, process.env.REACT_APP_ACCESS_TOKEN_SECRET_KEY);

      // Check if the token contains the required role
      if (role && decoded.roles && !decoded.roles.includes(role)) {
        return <Navigate to="unauthorized" />;
      }

      return <Outlet />;
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        // Access token is expired, check the refresh token
        if (userInfo && userInfo.tokens && userInfo.tokens.refreshToken) {
          verifyRefreshToken(userInfo.tokens.refreshToken);
        } else {
          // No refresh token, logout the user
          dispatch(logout());
          return <Navigate to="unauthenticated" />;
        }
      } else {
        // Token verification failed, logout the user
        dispatch(logout());
        return <Navigate to="unauthenticated" />;
      }
    }
  };

  const verifyRefreshToken = (refreshToken) => {
    try {
      JWT.verify(refreshToken, process.env.REACT_APP_REFRESH_TOKEN_SECRET_KEY, (error, decoded) => {
        if (error instanceof TokenExpiredError) {
          // Refresh token is also expired, logout the user
          dispatch(logout());
          return <Navigate to="unauthenticated" />;
        } else {
          // Refresh token is valid, dispatch the refresh action
          dispatch(authActions.refreshToken(decoded.refreshToken));
        }
      });
    } catch (error) {
      // Refresh token verification failed, logout the user
      dispatch(logout());
      return <Navigate to="unauthenticated" />;
    }
  };

  if (!userInfo) {
    return <Navigate to="unauthenticated" />;
  }

  return verifyToken(userInfo.tokens.accessToken);
};

export default ProtectedRoute;
