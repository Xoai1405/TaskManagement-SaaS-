import { useRef, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const MOCK_PASS = 123456;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const { login } = useAuth();
  const navigate = useNavigate();
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (errors.email) {
      setErrors((prev) => ({ ...prev, email: "" }));
    }
    if (serverError) {
      setServerError("");
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);

    if (errors.password) {
      setErrors((prev) => ({ ...prev, password: "" }));
    }
    if (serverError) {
      setServerError("");
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    ("w-full bg-state-400 text-white font-bold py-2 rounded-lg");
    const newErrors = {};

    if (email.trim() === "") {
      newErrors.email = "Vui lòng nhập email";
    } else if (!email.includes("@")) {
      newErrors.email = "Email không hợp lệ";
    }

    if (password === "") {
      newErrors.password = "Vui lòng nhập mật khẩu";
    }

    setErrors(newErrors);

    if (newErrors.email) {
      emailRef.current.focus();

      return;
    }

    if (newErrors.password) {
      passwordRef.current.focus();
      return;
    }

    setServerError("");
    setLoading(true);
    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      setServerError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFF7E8]">
      <form
        onSubmit={handleSubmit}
        noValidate
        className="bg-white p-8 rounded-2xl shadow w-full max-w-sm"
      >
        <h1 className="text-2xl font-bold mb-6">Đăng nhập</h1>

        {serverError && (
          <div
            role="alert"
            className="mb-4 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3"
          >
            {serverError}
          </div>
        )}
        <div className="mb-4">
          <label htmlFor="email" className="block mb-1">
            Email
          </label>
          <input
            ref={emailRef}
            id="email"
            type="email"
            placeholder="ban@example.com"
            value={email}
            onChange={handleEmailChange}
            className={`w-full border rounded-lg px-3 py-2 ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
          )}
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block mb-1">
            Mật khẩu
          </label>

          <div className="relative">
            <input
              ref={passwordRef}
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Nhập mật khẩu"
              value={password}
              onChange={handlePasswordChange}
              className={`w-full border rounded-lg px-3 py-2 ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {errors.password && (
            <p className="mt-1 text-sm text-red-600">{errors.password}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-orange-600 text-white font-bold py-2 rounded-lg disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? "Đang đăng nhập..." : "Đăng nhập"}
        </button>
        <p className="mt-4 text-sm text-center text-gray-600">
          Chưa có tài khoản?{" "}
          <Link
            to="/register"
            className="text-orange-600 font-bold hover:underline"
          >
            Đăng ký
          </Link>
        </p>
      </form>
    </div>
  );
}
