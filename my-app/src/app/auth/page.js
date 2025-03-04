"use client"; // 如果是 app router 需要这个

// import { useSession, signIn, signOut } from "next-auth/react";

export default function Home() {
  // const { data: session } = useSession();

  return (
    <div className="flex flex-col items-center mt-20">authpage
      {/* {session ? (
        <>
          <p>Welcome, {session.user.name}!</p>
          <img src={session.user.image} alt="User Avatar" className="w-16 h-16 rounded-full mt-2" />
          <button onClick={() => signOut()} className="mt-4 bg-red-500 text-white px-4 py-2 rounded">
            Sign out
          </button>
        </>
      ) : (
        <button onClick={() => signIn("google")} className="bg-blue-500 text-white px-4 py-2 rounded">
          Sign in with Google
        </button>
      )} */}
    </div>
  );
}