"use client"
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { Router } from 'next/router'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

const LoginPage = () => {
    const router = useRouter()
    const [disable, setDisable] = useState(true)
    const [user, setUser] = useState({
        email: '',
        password: ''
    })

    const submitHandler = async (e) => {
        e.preventDefault()
        console.log(user);
        try {
            const res = await axios.post("/api/users/login", user)
            router.push("/")
            console.log(res);
            toast.success(res.data.message)
        } catch (error) {
            toast.error(error.response.data.message)
            console.log(error);
        }
    }

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0) {
            setDisable(false)
        } else {
            setDisable(true)
        }
    }, [user])


    return (
        <section class="bg-gray-50 dark:bg-gray-900">
            <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                    <img class="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
                    Developer
                </a>
                <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Login to an account
                        </h1>
                        <form onSubmit={submitHandler} class="space-y-4 md:space-y-6">
                            <div>
                                <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                <input value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" />
                            </div>
                            <div>
                                <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                            </div>

                            <button type="submit" class={`${disable ? "bg-[#111827] cursor-not-allowed" : "bg-[#2563EB]"} w-full text-white  hover:bg-primary-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700`}>Login</button>
                            <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                                Dont have an account? <a href="SignUp" class="font-medium text-primary-600 hover:underline dark:text-[#2A77F6]">SignUp</a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default LoginPage