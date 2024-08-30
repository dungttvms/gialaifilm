import { createContext, useReducer, useEffect } from "react";
import { apiService2 } from "../app/apiService";
import { toast } from "react-toastify";
import { isValidToken } from "../utils/jwt";

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
};

const INITIALIZE = "AUTH.INITIALIZE";
const LOGIN_GOOGLE_SUCCESS = "AUTH.LOGIN_GOOGLE_SUCCESS";

const ADD_FAVORITE_MOVIE_SUCCESS = "AUTH.ADD_FAVORITE_MOVIE_SUCCESS";
const REMOVE_MOVIE_FROM_FAVORITE_LIST_SUCCESS =
  "AUTH.REMOVE_MOVIE_FROM_FAVORITE_LIST_SUCCESS";
const LOGOUT = "AUTH.LOGOUT";

const reducer = (state, action) => {
  switch (action.type) {
    case INITIALIZE:
      const { isAuthenticated, user } = action.payload;
      return {
        ...state,
        isInitialized: true,
        isAuthenticated,
        user,
      };
    case LOGIN_GOOGLE_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
      };

    case ADD_FAVORITE_MOVIE_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
      };
    case REMOVE_MOVIE_FROM_FAVORITE_LIST_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
      };
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    default:
      return state;
  }
};

const AuthContext = createContext({ ...initialState });

const setSession = (accessToken) => {
  if (accessToken) {
    window.localStorage.setItem("accessToken", accessToken);
    apiService2.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  } else {
    window.localStorage.removeItem("accessToken");
    delete apiService2.defaults.headers.common.Authorization;
  }
};

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const initialize = async () => {
      try {
        const accessToken = window.localStorage.getItem("accessToken");

        if (accessToken && isValidToken(accessToken)) {
          setSession(accessToken);
          const response = await apiService2.get("/users/me/phimgialai");
          const user = response.data;
          dispatch({
            type: INITIALIZE,
            payload: {
              isAuthenticated: true,
              user,
              accessToken,
            },
          });
        } else {
          setSession(null);
          dispatch({
            type: INITIALIZE,
            payload: {
              isAuthenticated: false,
              user: null,
            },
          });
        }
      } catch (error) {
        setSession(null);
        dispatch({
          type: INITIALIZE,
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    };
    initialize();
  }, []);

  const loginWithGoogle = async ({ email, name, picture }, callback) => {
    try {
      const response = await apiService2.post("/oauth/loginGooglePhimGiaLai", {
        email,
        name,
        picture,
      });

      if (response.data) {
        console.log("Login Response Data successful");
      } else {
        console.warn("No data in response");
      }

      const { user, accessToken } = response.data || {};

      if (user && accessToken) {
        setSession(accessToken);
        dispatch({
          type: LOGIN_GOOGLE_SUCCESS,
          payload: { user, accessToken },
        });
        toast.success("Login success");
        callback();
      } else {
        throw new Error("Missing user or accessToken in response");
      }
    } catch (error) {
      console.error("Error in login With Google:", error);
      toast.error("Login failed");
    }
  };

  const addMovieToFavoriteList = async (
    { movieId, singleMovieData },
    callback = () => {}
  ) => {
    try {
      const response = await apiService2.post(
        `/users/me/phimgialai/${movieId}`,
        singleMovieData
      );

      const user = response.data;
      dispatch({
        type: ADD_FAVORITE_MOVIE_SUCCESS,
        payload: { user },
      });

      toast.success("Add to your favorite list success");
      callback();
    } catch (error) {
      console.error(error);
    }
  };

  const removeMovieFromFavoriteList = async ({ movieId }, callback) => {
    try {
      const response = await apiService2.delete(
        `/users/me/phimgialai/${movieId}`
      );
      const user = response.data;
      dispatch({
        type: REMOVE_MOVIE_FROM_FAVORITE_LIST_SUCCESS,
        payload: { user },
      });
      toast.success("Remove to your favorite list success");
      callback();
    } catch (error) {
      console.error(error);
    }
  };

  const logout = (callback) => {
    setSession(null);
    dispatch({ type: LOGOUT });
    toast.success("Logout success");
    callback();
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        loginWithGoogle,

        addMovieToFavoriteList,
        removeMovieFromFavoriteList,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
