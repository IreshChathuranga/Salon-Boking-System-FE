import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchUserProfile } from "../../services/auth";
import { setProfile, logout } from "../features/user-slice";

export const useFetchProfile = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
    dispatch(logout()); 
    return;
  }

    const loadProfile = async () => {
      try {
        const profile = await fetchUserProfile();
        dispatch(setProfile(profile));
      } catch (err) {
        console.error("Failed to fetch profile:", err);
        dispatch(logout());
      }
    };

    loadProfile();
  }, [dispatch]);
};
