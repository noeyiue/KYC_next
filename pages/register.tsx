import Image from "next/image";
import {
  BsFillKeyFill,
  BsFillPersonFill,
  BsFillPersonVcardFill,
  BsPersonVcard,
  BsTelephoneFill,
} from "react-icons/bs";

import { MdLockOutline, MdLock } from "react-icons/md";
import { HiMail } from "react-icons/hi";
import img from "../public/signup-image.jpg";
import Link from "next/link";
import { useForm } from "react-hook-form";
import handleRegister from "@/components/Register/Register";
import { useRouter } from "next/router";



export default function Register() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      th_firstname: "",
      th_lastname: "",
      en_firstname: "",
      en_lastname: "",
      id_num: "",
      email: "",
      phone: "",
      password: "",
      cpassword: "",
    },
  });

  const password = watch("password");
  watch("cpassword");

  return (
    <div className="flex h-screen bg-[#f8f8f8]">
      <div className="m-auto bg-white w-3/5 h-3/4 rounded-3xl grid grid-cols-2 grid-rows-1 drop-shadow-lg">
        <div className="left flex justify-evenly">
          <div className="flex flex-col justify-center ml-28">
            <form
              onSubmit={handleSubmit(async (data) => {
                const response = await handleRegister(data)
                console.log(response)
                if (response.status === 201) {
                  console.log("success")
                  await router.push("login");
                }
                else if (response.status === 400) {
                  console.log("Username or Email or Phone Taken")
                }
              })}
            >
              <h2 className="text-[#222] text-4xl font-black">Sign up</h2>
              <div className="flex mt-3">
                <BsFillPersonFill className="mt-1" />
                <input
                  className="ml-1 pl-0.5 border-0 border-b-[1px] border-[#999] focus:outline-none focus:border-[#222] focus:placeholder-[#222] w-full"
                  type="text"
                  placeholder="Username"
                  {...register("username", { required: "Required" })}
                />
              </div>
              <div className="flex mt-6">
                <div className="flex items-center">
                  <BsFillPersonVcardFill className="mt-1" />
                  <div className="flex">
                    <input
                      className="ml-1 pr-0.5 border-0 border-b-[1px] border-[#999] focus:outline-none focus:border-[#222] focus:placeholder-[#222] flex-grow"
                      type="text"
                      placeholder="ชื่อ"
                      {...register("th_firstname", { required: "Required" })}
                    />
                    <input
                      className="ml-1 pr-0.5 border-0 border-b-[1px] border-[#999] focus:outline-none focus:border-[#222] focus:placeholder-[#222] flex-grow"
                      type="text"
                      placeholder="นามสกุล"
                      {...register("th_lastname", { required: "Required" })}
                    />
                  </div>
                </div>
              </div>
              <div className="flex mt-6">
                <div className="flex items-center">
                  <BsPersonVcard className="mt-1" />
                  <div className="flex">
                    <input
                      className="ml-1 pr-0.5 border-0 border-b-[1px] border-[#999] focus:outline-none focus:border-[#222] focus:placeholder-[#222] flex-grow"
                      type="text"
                      placeholder="Firstname"
                      {...register("en_firstname", { required: "Required" })}
                    />
                    <input
                      className="ml-1 pr-0.5 border-0 border-b-[1px] border-[#999] focus:outline-none focus:border-[#222] focus:placeholder-[#222] flex-grow"
                      type="text"
                      placeholder="Lastname"
                      {...register("en_lastname", { required: "Required" })}
                    />
                  </div>
                </div>
              </div>
              <div className="flex mt-6">
                <BsFillKeyFill className="mt-1" />
                <input
                  className="ml-1 pl-0.5 border-0 border-b-[1px] border-[#999] focus:outline-none focus:border-[#222] focus:placeholder-[#222] w-full"
                  type="text"
                  placeholder="13 Digit"
                  {...register("id_num", { required: "Required" })}
                />
              </div>
              <div className="flex mt-6">
                <HiMail className="mt-1" />
                <input
                  className="ml-1 pl-0.5 border-0 border-b-[1px] border-[#999] focus:outline-none focus:border-[#222] focus:placeholder-[#222] w-full"
                  type="email"
                  placeholder="Email"
                  {...register("email", { required: "Required" })}
                />
              </div>
              <div className="flex mt-6">
                <BsTelephoneFill className="mt-1" />
                <input
                  className="ml-1 pl-0.5 border-0 border-b-[1px] border-[#999] focus:outline-none focus:border-[#222] focus:placeholder-[#222] w-full"
                  type="phone"
                  placeholder="Phone"
                  {...register("phone", { required: "Required" })}
                />
              </div>
              <div className="flex mt-6">
                <MdLock className="mt-1" />
                <input
                  className="ml-1 pl-0.5 border-0 border-b-[1px] border-[#999] focus:outline-none focus:border-[#222] focus:placeholder-[#222] w-full"
                  type="password"
                  placeholder="Password"
                  {...register("password", { required: "Required" })}
                />
              </div>
              <div className="flex mt-6">
                <MdLockOutline className="mt-1" />
                <input
                  className="ml-1 pl-0.5 border-0 border-b-[1px] border-[#999] focus:outline-none focus:border-[#222] focus:placeholder-[#222] w-full"
                  type="password"
                  placeholder="Repeat your password"
                  {...register("cpassword", {
                    required: "Required",
                    validate: (value) =>
                      value === password || "Passwords do not match",
                  })}
                />
              </div>
              <p>{errors.cpassword?.message}</p>
              <div className="flex mt-6">
                <input type="checkbox" className="m-1.5" />
                <p className="flex-grow">
                  I agree all statements in Terms of service
                </p>
              </div>
              <button
                type="submit"
                className="my-5 py-3 px-6 rounded-md bg-[#6dabe4] hover:bg-[#4292dc] text-white"
              >
                Register
              </button>
            </form>
          </div>
        </div>
        <div className="right flex justify-evenly ">
          <div className="flex flex-col justify-center items-center">
            <Image src={img} alt="signup img" className="h-100% pb-10" />
            <Link
              href={"login"}
              className="text-[#222] underline decoration-[#222] "
            >
              I am already member
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
