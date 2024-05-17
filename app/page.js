"use client"
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function Home() {

  const router = useRouter();

  const logoutHandler = async () => {
    try {
      const res = await axios.get("/api/users/logout")
      router.push("/login");
      toast.success(res.data.message)
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-5">
      <h1>Home Page</h1>
      <button onClick={logoutHandler} className="px-3 py-2 font-medium text-white bg-gray-700 rounded-lg">LogOut</button>
    </div>
  );
}
