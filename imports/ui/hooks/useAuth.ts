import { useTracker } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";
import { useNavigate } from "react-router-dom";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  profile: {
    firstName: string;
    lastName: string;
  };
}

export const useAuth = () => {
  const user = useTracker(() => Meteor.user(), []);
  const isLoading = useTracker(() => Meteor.loggingIn(), []);
  const navigate = useNavigate();

  const login = async (credentials: LoginCredentials): Promise<void> => {
    return new Promise((resolve, reject) => {
      Meteor.loginWithPassword(
        credentials.email,
        credentials.password,
        (error) => {
          if (error) {
            reject(error);
          } else {
            resolve();
          }
        }
      );
    });
  };

  const register = async (data: RegisterData): Promise<void> => {
    await Accounts.createUserAsync({
      email: data.email,
      password: data.password,
      profile: {
        firstName: data.profile.firstName,
        lastName: data.profile.lastName,
      },
    });
  };

  const logout = (): void => {
    Meteor.logout((err) => {
      if (!err) {
        console.log("User logged out successfully");
        // Redirect
        navigate("/login");
      }
    });
  };

  return {
    user,
    isLoading,
    isLoggedIn: !!user,
    login,
    register,
    logout,
  };
};
