import { LoginFormData, useSessionStore } from "../store/login.store";

export async function handleLogin(form: LoginFormData) {
  console.log(form);
  const response: Response = await fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/auth/signin`,
    {
      method: "POST",
      body: JSON.stringify({
        username: form.username,
        password: form.password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (response.ok) {
    const data = await response.json();
    const accessToken = data.access_token;
    localStorage.setItem("token", data.access_token);
    console.log(accessToken);
  } else {
    console.log("Registration failed");
  }
  return response;
}

export async function getProfile() {

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/profile`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    }
  );
  console.log(response);
  if (response.ok) {
    useSessionStore.getState().setSession(true);
  } else {
    useSessionStore.getState().setSession(false);
  }
  return response;
}

export async function handleLogout() {
  localStorage.removeItem("token");
}
