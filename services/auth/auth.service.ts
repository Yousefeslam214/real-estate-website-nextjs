import { baseUrl } from "../shared/apiUrl";
import { LoginInput, SignUpInput } from "@/schemas/login.schema";

// /api/auth/login
export const login = async (loginSchema: LoginInput) => {
  const res = await fetch(`${baseUrl}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(loginSchema),
  });
  if (!res.ok) {
    throw new Error("Login failed");
  } else {
    const data = await res.json();
    localStorage.setItem("token", data.data.token);
    return data;
  }
};
export const signUpUser = async (signUpSchema: SignUpInput) => {
  const res = await fetch(`${baseUrl}/auth/signup/user`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(signUpSchema),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Signup failed");
  } else {
    localStorage.setItem("token", data.token);
    return data;
  }
};
