import { Eye, EyeOff, Loader2, Lock, Mail, UserRound } from "lucide-react";
import { useEffect, useState } from "react";

import { useRegister } from "../hooks/useRegister";

function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: "", password: "", fullName: "" });
  const [error, setError] = useState(null);
  const {
    mutate: registerUser,
    isLoading,
    isError,
    reset: resetRegister,
    error: useRegisterError,
  } = useRegister();

  useEffect(() => {
    if (
      form.email.length >= 1 ||
      form.password.length >= 1 ||
      form.fullName.length >= 1
    )
      validateForm();
  }, [form.email, form.fullName, form.password]);

  function validateForm() {
    if (!form.fullName.trim()) {
      return setError("FullName is required");
    } else {
      setError("");
    }
    if (form.fullName.trim().length < 3) {
      return setError("FullName must be at least 3 characters");
    } else {
      setError("");
    }
    if (!form.email.trim()) {
      return setError("Email is required");
    } else {
      setError("");
    }

    if (!/\S+@\S+\.\S+/.test(form.email)) {
      return setError("Email format is invalid");
    } else {
      setError("");
    }
    if (!form.password) {
      return setError("Password is required");
    } else {
      setError("");
    }
    if (form.password.length < 6) {
      return setError("Password must be at least 6 characters");
    } else {
      setError("");
    }

    return true;
  }

  useEffect(() => {
    if (isError) {
      const timer = setTimeout(() => {
        resetRegister();
      }, 2100);
      return () => clearTimeout(timer); // Cleanup on unmount or on next error
    }
  }, [isError, resetRegister]); // Only run when isError changes

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = validateForm();
    if (success === true) {
      registerUser(form);
    }
    if (e.key === "Enter") {
      registerUser(form);
    }
  };

  return (
    <div className="flex items-center justify-center h-[calc(100vh-80px)]">
      <div className="flex justify-center items-center w-[400px] px-4  sm:p-8">
        <div className="w-full max-w-md bg-sky-30 space-y-5">
          {/* Logo */}
          <div className="text-center  mb-8">
            <div className="flex flex-col items-center gap-2 ">
              <div className=" bg-yellow-90 w-full flex items-center justify-center">
                <h1 className="text-5xl py-2 font-extrabold italic">
                  WriteIt.
                </h1>
              </div>
              <p className="text-xs text-[#f5f5f5]  xl:text-sm font-normal w-full mt-2">
                New here? Join us today!
              </p>
            </div>
          </div>
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3 xl:space-y-5">
            <div className="space-y-1 xl:space-y-2 flex flex-col items-center justify-center ">
              <label className="text-[#f4f4f4]  font-medium">Full Name</label>
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <UserRound className="size-5  text-white" />
                </div>
                <input
                  value={form.fullName}
                  spellCheck="false"
                  type="text"
                  className={`outline-none text-white font-normal bg-black border-2 border-white placeholder:text-white p-2 rounded-3xl w-full pl-10`}
                  placeholder="John Doe"
                  onChange={(e) =>
                    setForm({ ...form, fullName: e.target.value })
                  }
                />
              </div>
              <div className=" h-4 w-full text-xs font-medium tracking-wide text-center text-[#1DA1F2]">
                {error?.includes("FullName") && <span>{error}</span>}
              </div>
            </div>
            <div className="space-y-1 xl:space-y-2 flex flex-col items-center justify-center ">
              <label className="text-[#f4f4f4]  font-medium">Email</label>
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="size-5  text-white" />
                </div>
                <input
                  value={form.email}
                  spellCheck="false"
                  type="text"
                  className={`outline-none text-white font-normal bg-black border-2 border-white placeholder:text-white p-2 rounded-3xl w-full pl-10`}
                  placeholder="you@example.com"
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
              <div className=" h-4 w-full text-xs font-medium tracking-wide text-center text-[#1DA1F2]">
                {error?.includes("Email") && <span>{error}</span>}
              </div>
            </div>

            {/* second */}
            <div className="bg-pink-70 space-y-1 xl:space-y-2 flex flex-col items-center justify-center">
              <label className="text-[#f4f4f4] font-medium">Password</label>
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="size-5 text-white" />
                </div>
                <input
                  spellCheck="false"
                  value={form.password}
                  type={showPassword ? "text" : "password"}
                  className={`outline-none text-white font-normal bg-black border-2 border-white placeholder:text-white  p-2 rounded-3xl w-full pl-10`}
                  placeholder="******"
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="size-5 text-white" />
                  ) : (
                    <Eye className="size-5 text-white" />
                  )}
                </button>
              </div>
              <div className=" h-4 w-full text-xs font-medium tracking-wide text-center text-[#1DA1F2]">
                {error?.includes("Password") && <span>{error}</span>}
              </div>
            </div>
            <button
              onClick={handleSubmit}
              className="bg-white text-black font-medium h-11 p-2  flex items-center justify-center rounded-full gap-1 w-full"
              disabled={isLoading}
              type="submit"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin h-[18px] w-[18px]" />
                </>
              ) : isError ? (
                useRegisterError?.response?.data?.error ||
                useRegisterError?.message
              ) : (
                "Register"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default RegisterPage;
