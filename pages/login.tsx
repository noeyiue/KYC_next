import Link from "next/link";
import { BsFillPersonFill } from "react-icons/bs";
import { MdLock } from "react-icons/md";
import img from "../public/signin-image.jpg";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { handleLogin } from "@/components/Login/Login";


export default function Login() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  return (
    <div className="flex h-screen bg-[#f8f8f8]">
      <div className="m-auto bg-white w-3/5 h-3/4 rounded-3xl grid grid-cols-2 grid-rows-1 drop-shadow-lg">
        <div className="left flex justify-evenly ">
          <div className="flex flex-col justify-center items-center ml-12">
            <Image src={img} alt="signup img" className="h-100% pb-10" />
            <Link
              href={"register"}
              className="text-[#222] underline decoration-[#222] "
            >
              Create an account
            </Link>
          </div>
        </div>

        <div className="right flex justify-evenly ">
          <div className="flex flex-col justify-center">
            <form onSubmit={handleSubmit(async (data) => {
                const response = await handleLogin(data)
                if (response.status === 201) {
                  console.log("success")
                  router.push("/");
                }
                else if (response.status === 401) {
                  console.log("Wrong password")
                }
              })}>
              <h2 className="text-[#222] text-4xl font-black mb-10">Sign in</h2>
              <div className="flex mt-8">
                <BsFillPersonFill className="mt-1" />
                <input
                  className="ml-1 pl-0.5 border-0 border-b-[1px] border-[#999] focus:outline-none focus:border-[#222] focus:placeholder-[#222] w-full"
                  type="text"
                  {...register("username", { required: "Required" })}
                  placeholder="Username"
                />
              </div>
              <div className="flex mt-8">
                <MdLock className="mt-1" />
                <input
                  className="ml-1 pl-0.5 border-0 border-b-[1px] border-[#999] focus:outline-none focus:border-[#222] focus:placeholder-[#222] w-full"
                  type="password"
                  {...register("password", { required: "Required" })}
                  placeholder="Password"
                />
              </div>
              <div className="flex mt-8">
                <input type="checkbox" className="m-1.5" />
                <p className="flex-grow">
                  Remember me
                </p>
              </div>
              <button
                type="submit"
                className="my-12 py-3 px-8 rounded-md bg-[#6dabe4] hover:bg-[#4292dc] text-white"
              >
                Log in
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
