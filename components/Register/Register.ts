import { RegisterFormData } from "../store/register.store";


export default async function handleRegister(form: RegisterFormData) {
  console.log(form)
  const response: Response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/auth/signup`, {
    method: "POST",
    body: JSON.stringify(
      {
        "username" : form.username,
        "password" : form.password,
        "th_firstname" : form.th_firstname,
        "th_lastname" : form.th_lastname,
        "en_firstname" : form.en_firstname,
        "en_lastname" : form.en_lastname,
        "id_num": form.id_num,
        "email" : form.email,
        "phone" : form.phone,
    }
    ),
    headers: {
      "Content-Type": "application/json"
    }
  })
  return response
}