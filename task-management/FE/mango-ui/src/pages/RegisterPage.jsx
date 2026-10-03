import { useRef, useState } from "react";
import { Eye, EyeOff, User, Lock, ArrowRight, Mail } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import loginBg from "../assets/loginBackgroundImage.png";

export default function RegisterPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  const fullNameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const repeatPasswordRef = useRef(null);
  const [showPassword, setShowPassword] = useState([false, false]);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleFullnameChange = (e) => {
    setFullName(e.target.value);
    if (errors.fullName) {
      setErrors((prev) => ({ ...prev, fullName: "" }));
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (errors.email) {
      setErrors((prev) => ({ ...prev, email: "" }));
    }
    if (serverError) setServerError("");
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (errors.password) {
      setErrors((prev) => ({ ...prev, password: "" }));
    }
  };

  const handleRepeatPasswordChange = (e) => {
    setRepeatPassword(e.target.value);
    if (errors.repeatPassword) {
      setErrors((prev) => ({ ...prev, repeatPassword: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newError = {};
    if (fullName === "") {
      newError.fullName = "Vui lòng nhập họ tên";
    }

    if (email === "") {
      newError.email = "Vui lòng nhập email";
    } else if (!email.includes("@")) {
      newError.email = "Email không hợp lệ!";
    }

    if (password === "") {
      newError.password = "Vui lòng nhập mật khẩu";
    } else if (password.length < 6) {
      newError.password = "Mật khẩu tối thiểu phải chứa 6 kí tự";
    }

    if (repeatPassword === "") {
      newError.repeatPassword = "Vui lòng nhập lại mật khẩu";
    } else if (repeatPassword !== password) {
      newError.repeatPassword = "Mật khẩu không trùng khớp";
    }

    setErrors(newError);

    if (newError.fullName) {
      fullNameRef.current.focus();
      return;
    } else if (newError.email) {
      emailRef.current.focus();
      return;
    } else if (newError.password) {
      passwordRef.current.focus();
      return;
    } else if (newError.repeatPassword) {
      repeatPasswordRef.current.focus();
      return;
    }

    setLoading(true);
    setServerError("");
    try {
      await register(fullName, email, password);
      navigate("/login");
    } catch (err) {
      setServerError(err.message);
      emailRef.current.focus();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="auth-theme h-screen w-screen overflow-hidden flex flex-col items-center justify-center p-4 sm:p-6 bg-[length:100%_100%] bg-center bg-no-repeat bg-[#FFF7E8]"
      style={{ backgroundImage: `url(${loginBg})` }}
    >
      <div className="text-center mb-5">
        <div className="inline-flex items-center justify-center gap-2.5 mb-1">
          <span className="text-4xl select-none">🥭</span>
          <span className="text-3xl font-black text-slate-900 tracking-tight title-icon-color">
            Mango
          </span>
        </div>
        <p className="text-sm font-medium text-slate-600">
          Gọn gàng công việc, rõ ràng tương lai
        </p>
      </div>

      <div className="bg-white/95 backdrop-blur-sm p-7 sm:p-9 rounded-3xl shadow-xl shadow-amber-900/5 w-full max-w-[460px] border border-amber-100/80">
        <div className="flex border-b border-slate-100 mb-6">
          <Link
            to="/login"
            className="pb-2.5 px-4 text-base font-semibold text-slate-400 hover:text-slate-600 transition-colors"
          >
            Đăng nhập
          </Link>
          <button
            type="button"
            className="pb-2.5 px-4 text-base font-bold text-orange-600 border-b-2 border-orange-600"
          >
            Đăng ký
          </button>
        </div>

        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight title-icon-color">
            Tạo tài khoản mới
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Bắt đầu quản lý công việc cùng Mango ngay hôm nay.
          </p>
        </div>

        {serverError && (
          <div
            role="alert"
            className="mb-5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-sm px-4 py-3"
          >
            {serverError}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          <div>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 title-icon-color">
                <User size={20} />
              </span>
              <input
                ref={fullNameRef}
                id="fullName"
                type="text"
                placeholder="Họ và tên"
                value={fullName}
                onChange={handleFullnameChange}
                className={`w-full bg-white border rounded-xl pl-11 pr-4 py-3 text-sm sm:text-base outline-none transition-all placeholder:text-slate-400 ${
                  errors.fullName
                    ? "border-rose-500 focus:ring-1 focus:ring-rose-500"
                    : "border-slate-200 focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                }`}
              />
            </div>
            {errors.fullName && (
              <p className="mt-1.5 text-xs text-rose-600 font-medium pl-1">
                {errors.fullName}
              </p>
            )}
          </div>

          <div>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 title-icon-color">
                <Mail size={20} />
              </span>
              <input
                ref={emailRef}
                id="email"
                type="email"
                placeholder="Địa chỉ Email"
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

          <div>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 title-icon-color">
                <Lock size={20} />
              </span>
              <input
                ref={passwordRef}
                id="password"
                type={showPassword[0] ? "text" : "password"}
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
                onClick={() =>
                  setShowPassword([!showPassword[0], showPassword[1]])
                }
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 title-icon-color"
              >
                {showPassword[0] ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1.5 text-xs text-rose-600 font-medium pl-1">
                {errors.password}
              </p>
            )}
          </div>

          <div>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 title-icon-color">
                <Lock size={20} />
              </span>
              <input
                ref={repeatPasswordRef}
                id="repeatPassword"
                type={showPassword[1] ? "text" : "password"}
                placeholder="Nhập lại mật khẩu"
                value={repeatPassword}
                onChange={handleRepeatPasswordChange}
                className={`w-full bg-white border rounded-xl pl-11 pr-11 py-3 text-sm sm:text-base outline-none transition-all placeholder:text-slate-400 ${
                  errors.repeatPassword
                    ? "border-rose-500 focus:ring-1 focus:ring-rose-500"
                    : "border-slate-200 focus:border-oragne-500 focus:ring-1 focus:ring-orange-500"
                }`}
              />
              <button
                type="button"
                onClick={() =>
                  setShowPassword([showPassword[0], !showPassword[1]])
                }
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 title-icon-color"
              >
                {showPassword[1] ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.repeatPassword && (
              <p className="mt-1.5 text-xs text-rose-600 font-medium pl-1">
                {errors.repeatPassword}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-600 hover:bg-orange-700 active:bg-orange-800 text-white font-bold py-3.5 rounded-xl transition-all shadow-md shadow-mango-600/20 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-base cursor-pointer mt-2"
          >
            <span>{loading ? "Đang đăng ký..." : "Đăng ký"}</span>
            {!loading && <ArrowRight size={20} />}
          </button>

          <p className="pt-2 text-xs sm:text-sm text-center text-slate-500">
            Đã có tài khoản?{" "}
            <Link
              to="/login"
              className="text-orange-600 font-bold hover:underline"
            >
              Đăng nhập
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}