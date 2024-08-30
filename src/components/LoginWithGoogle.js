import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { apiService2 } from "../app/apiService";
import { toast } from "react-toastify";
import { GOOGLE_CLIENT_ID } from "../app/config";

const LoginWithGoogle = ({ onSuccess, onError }) => {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <GoogleLogin
        onSuccess={async (credentialResponse) => {
          const token = credentialResponse.credential;

          try {
            const response = await apiService2.post("/oauth", {
              token,
            });

            if (response && response.email) {
              const { email, picture, name } = response;
              try {
                await onSuccess({ email, name, picture });
              } catch (error) {
                toast.error("Login Error");
                onError();
              }
            } else {
              toast.error("Login Error");
              onError();
            }
          } catch (error) {
            console.log("Error during Google Login:", error);
            toast.error("Login Error");
            onError();
          }
        }}
        onError={() => {
          console.log("Login Failed");
        }}
        width="300"
        logo_alignment="center"
        theme="outlined"
      />
    </GoogleOAuthProvider>
  );
};

export default LoginWithGoogle;
