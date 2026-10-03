import { useRef, useState } from "react";
import { Eye, EyeOff, User, Lock, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import loginBg from "../assets/loginBackgroundImage.png";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false); // Khung UI checkbox

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
   <div
      className="auth-theme h-screen w-screen overflow-hidden flex flex-col items-center justify-center p-4 sm:p-6 bg-[length:100%_100%] bg-center bg-no-repeat bg-[#FFF7E8] "
      style={{ backgroundImage: `url(${loginBg})` }}
    >
            {/* BRAND LOGO & HEADER */}

      <div className="text-center mb-5">
        <div className="inline-flex items-center justify-center gap-2.5 mb-1">
          <span className="text-4xl select-none">🥭</span>
          <span className="text-3xl font-black title-icon-color tracking-tight ">
            Mango
          </span>
        </div>
        <p className="text-sm text-slate-600 font-medium">
          Gọn gàng công việc, rõ ràng tương lai
        </p>
      </div>

      {/* FORM CARD CONTAINER */}
      <div className="bg-white/95 backdrop-blur-sm p-7 sm:p-9 rounded-3xl shadow-xl shadow-amber-900/5 w-full max-w-[460px] border border-amber-100/80">
        {/* TAB SWITCHER */}
       <div className="flex border-b border-slate-100 mb-6">
          <button
            type="button"
            className="pb-2.5 px-4 text-base font-bold text-orange-600 border-b-2 border-orange-600"
          >
            Đăng nhập
          </button>
          <Link
            to="/register"
            className="pb-2.5 px-4 text-base font-semibold text-slate-400 hover:text-slate-600 transition-colors"
          >
            Đăng ký
          </Link>
        </div>

        {/* TITLE */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold title-icon-color tracking-tight">
            Chào mừng bạn trở lại!
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Đăng nhập để tiếp tục hành trình của mình.
          </p>
        </div>

        {/* SERVER ERROR ALERT */}
        {serverError && (
          <div
            role="alert"
            className="mb-5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-sm px-4 py-3"
          >
            {serverError}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          {/* EMAIL INPUT */}
          <div>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 title-icon-color">
                <User size={20} />
              </span>
              <input
                ref={emailRef}
                id="email"
                type="email"
                placeholder="Email hoặc tên đăng nhập"
                value={email}
                onChange={handleEmailChange}
                className={`w-full bg-white border rounded-xl pl-11 pr-4 py-3 text-sm sm:text-base outline-none transition-all placeholder:text-slate-400 ${
                  errors.email
                    ? "border-rose-500 focus:ring-1 focus:ring-rose-500"
                    : "border-slate-200 focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                }`}
              />
            </div>
            {errors.email && (
              <p className="mt-1.5 text-xs text-rose-600 font-medium pl-1">
                {errors.email}
              </p>
            )}
          </div>

          {/* PASSWORD INPUT */}
          <div>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 title-icon-color">
                <Lock size={20} />
              </span>
              <input
                ref={passwordRef}
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Mật khẩu"
                value={password}
                onChange={handlePasswordChange}
                className={`w-full bg-white border rounded-xl pl-11 pr-11 py-3 text-sm sm:text-base outline-none transition-all placeholder:text-slate-400 ${
                  errors.password
                    ? "border-rose-500 focus:ring-1 focus:ring-rose-500"
                    : "border-slate-200 focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 title-icon-color hover:text-slate-600 p-1"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1.5 text-xs text-rose-600 font-medium pl-1">
                {errors.password}
              </p>
            )}
          </div>

          {/* REMEMBER ME & FORGOT PASSWORD */}
          <div className="flex items-center justify-between text-xs sm:text-sm pt-1 pb-1">
            <label className="flex items-center gap-2 cursor-pointer text-slate-600 font-medium select-none">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded border-orange-300 accent-orange-600 focus:ring-orange-500 w-4 h-4 cursor-pointer"
              />
              Nhớ tôi
            </label>
            <Link
              to="/forgot-password"
              className="text-slate-500 hover:text-orange-600 font-medium transition-colors"
            >
              Quên mật khẩu?
            </Link>
          </div>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-600 hover:bg-orange-700 active:bg-orange-800 text-white font-bold py-3.5 rounded-xl transition-all shadow-md shadow-mango-600/20 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-base cursor-pointer mt-2"
          >
            <span>{loading ? "Đang đăng nhập..." : "Đăng nhập"}</span>
            {!loading && <ArrowRight size={20} />}
          </button>

          {/* REGISTER FOOTER LINK */}
          <p className="pt-2 text-xs sm:text-sm text-center text-slate-500">
            Chưa có tài khoản?{" "}
            <Link
              to="/register"
              className="text-orange-600 font-bold hover:underline"
            >
              Đăng ký ngay
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}