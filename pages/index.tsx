import Main from "@/components/Layout/Main";
import { getProfile, handleLogout } from "@/components/Login/Login";
import { useSessionStore } from "@/components/store/login.store";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const session = useSessionStore((state) => state.session);

  useEffect(() => {
    async function checkProfile() {
      const response = await getProfile();
      if (!response.ok) {
        router.push("/login");
      }
    }
    checkProfile();
  }, []);

  return (
    <div className="min-h-screen bg-[#f8f8f8]">
      <Head>
        <title>Home</title>
      </Head>
      {session && (
        <div className="w-full flex flex-col items-center justify-center">
          <h1 className="mt-8 mb-5 text-3xl font-bold">Authorization</h1>

          <Main />
          <div className="absolute bottom-5 right-5">
            <button
              className="underline underline-offset-2 text-[#6dabe4] hover:text-[#4292dc]"
              onClick={() => {
                handleLogout();
                router.push("/login");
              }}
            >
              Log out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
