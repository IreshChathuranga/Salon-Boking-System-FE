import api from "./api"
import imageCompression from "browser-image-compression";


type RegisterDataType = {
        email: String
        password: String
        confirmPassword: String;
}

export const register = async (data: RegisterDataType) => {
    return await api.post("/user/register", data);
};

export const googleRegisterApi = async (code: string) => {
  return await api.post("/user/register/google", { code });
}

export const login = async (email:String , password:String) => {
    const res= await api.post("/user/login",{email,password})
    return res.data
}

export const googleLogin = async (code: string) => {
  return await api.post("/user/login/google", { code });
}

export const refreshTokens = async (refreshToken: string) => {
  const res = await api.post("/user/refreshtoken", { token: refreshToken });
  return res.data; 
};

export const fetchUserProfile = async () => {
    const token = localStorage.getItem("accessToken");
    const res = await api.get("/profile/userdetail", {
      headers: {
      Authorization: `Bearer ${token}`,
    },
    });
    return res.data.profile;
}


export const updateUserProfile = async (data: any, avatarFile?: File | null) => {
  const token = localStorage.getItem("accessToken");

  const formData = new FormData();

  formData.append("name", data.name);
  formData.append("email", data.email);
  formData.append("phone", data.phone);

  if (data.gender) {
    formData.append("gender", data.gender);
  }

  if (avatarFile) {
    const compressedImage = await imageCompression(avatarFile, {
      maxSizeMB: 1,               
      maxWidthOrHeight: 1080,     
      useWebWorker: true,
    });

    formData.append("avatar", compressedImage);
  }

  const res = await api.put("/profile/userdetail", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });

  return res;
};

export const updateCredentials = async (oldPassword: string,newPassword: string,email?: string) => {
  const token = localStorage.getItem("accessToken");

  return await api.put("/user/updatecredentials",{ oldPassword, newPassword, email },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
