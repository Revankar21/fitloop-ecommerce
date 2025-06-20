import Head from "next/head";
import React, { useContext, useEffect, useState } from "react";
import { AiFillLock } from "react-icons/ai";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import userContext from "../../context/user/userContext";

const AdminLogin = () => {
  const router = useRouter();

  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const UserContext = useContext(userContext);
  const { setUser, user } = UserContext;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const loginData = {
        email: formValues.email,
        password: formValues.password,
        isAdmin: true
      };
      const { data } = await axios.post('/api/admin/login', loginData);

      if (data.error === false) {
        setFormValues({
          email: "",
          password: "",
        });

        localStorage.setItem("fitloop-admin-token", JSON.stringify(data.token));
        setUser(data.token);

        toast.success("Admin Login Successful!", {
          position: "top-left",
        });

        router.push("/admin/dashboard");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.msg || "Admin login failed", {
        position: "top-left",
      });
    }
  };

  useEffect(() => {
    if (user) {
      router.push("/admin/dashboard");
      return;
    }
  }, [user]);

  return (
    <div>
      <Head>
        <title>Admin Login</title>
        <meta
          name="description"
          content="Fitloop Admin Panel"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-100">
        <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-lg shadow-lg">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="/logo.png"
              alt="Fitloop Admin"
            />
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Admin Login
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Access the admin dashboard
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formValues.email}
                  onChange={(e) =>
                    setFormValues({
                      ...formValues,
                      [e.target.name]: e.target.value,
                    })
                  }
                  className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-pink-500 focus:outline-none focus:ring-pink-500 sm:text-sm"
                  placeholder="Admin Email"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formValues.password}
                  onChange={(e) =>
                    setFormValues({
                      ...formValues,
                      [e.target.name]: e.target.value,
                    })
                  }
                  autoComplete="current-password"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-pink-500 focus:outline-none focus:ring-pink-500 sm:text-sm"
                  placeholder="Admin Password"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-pink-600 py-2 px-4 text-sm font-medium text-white hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <AiFillLock
                    className="h-5 w-5 text-pink-500 group-hover:text-pink-400"
                    aria-hidden="true"
                  />
                </span>
                Admin Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin; 