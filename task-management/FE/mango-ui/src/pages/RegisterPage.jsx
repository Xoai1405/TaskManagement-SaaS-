import { Eye, EyeOff } from "lucide-react";
import { useRef, useState } from "react";

import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
export default function RegisterPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);
  // const [UiError,SetUiError] = useState({});

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
    //  if(UiError.fullName) SetUiError((prev)=>({...prev,fullName:""}));
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

  // const handleEmailOnClick=()=> {
  //     const temp = {};
  //     if(fullName==="") temp.fullName="Họ tên không được để trống"
  //     SetUiError(temp);
  //     setErrors(temp);
  // }
  // const handlePasswordOnClick = ()=>{
  //     const temp = {};
  //     if(fullName==="") temp.fullName="Họ tên không được để trống"
  //     if(email==="") temp.email="Email không được để trống"
  //     SetUiError(temp);
  //     setErrors(temp);
  // }
  // const handleRepeatPasswordOnClick = ()=>{
  //     const temp = {};
  //     if(fullName==="") temp.fullName="Họ tên không được để trống"
  //     if(email==="") temp.email="Email không được để trống"
  //     if(password==="") temp.password="Mật khẩu không được để trống"
  //     SetUiError(temp);
  //     setErrors(temp);
  // }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newError = {};
    if (fullName === "") {
      newError.fullName = "Vui lòng nhập họ tên";
    }

    if (email === "") {
      newError.email = "Vui lòng nhập email";
    } else if (!email.includes("@")) newError.email = "Email không hợp lệ!";
    if (password === "") {
      newError.password = "Vui lòng nhập mật khẩu";
    } else if (password.length < 6)
      newError.password = "Mật khẩu tối thiểu phải chứa 6 kí tự";

    if (repeatPassword === "") {
      newError.repeatPassword = "Vui lòng nhập lại mật khẩu";
    } else if (repeatPassword !== password)
      newError.repeatPassword = "Mật khẩu không trùng khớp";

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
      await register(email, fullName, password);
  navigate("/login");
    } catch (err) {
      setServerError(err.message);
      emailRef.current.focus();
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFF7E8]">
      <form
        noValidate
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow w-full max-w-sm"
      >
        <h1 className="text-2xl font-bold mb-6">Đăng kí</h1>

        {serverError && (
          <div
            role="alert"
            className="mb-4 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3"
          >
            {serverError}
          </div>
        )}

        <div className="mb-4">
          <label htmlFor="fullName" className="block mb-1">
            Họ tên{" "}
            {/*  {UiError.fullName && <span className="text-red-500">*</span>} */}
          </label>
          <input
            ref={fullNameRef}
            value={fullName}
            onChange={handleFullnameChange}
            id="fullName"
            type="text"
            placeholder="Nguyễn Văn A"
            className={`w-full border rounded-lg px-3 py-2 ${
              errors.fullName ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.fullName && (
            <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block mb-1">
            Email{" "}
            {/*  {UiError.email && <span className="text-red-500">*</span>} */}
          </label>
          <input
            // onClick={handleEmailOnClick}
            ref={emailRef}
            value={email}
            onChange={handleEmailChange}
            id="email"
            type="email"
            placeholder="ban@example.com"
            className={`w-full border rounded-lg px-3 py-2 ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block mb-1">
            Mật khẩu{" "}
            {/*  {UiError.password&& <span className="text-red-500">*</span>} */}
          </label>
          <div className="relative">
            <input
              //   onClick={handlePasswordOnClick}
              ref={passwordRef}
              value={password}
              onChange={handlePasswordChange}
              id="password"
              type={showPassword[0] ? "text" : "password"}
              placeholder="Nhập mật khẩu"
              className={`w-full border rounded-lg px-3 py-2 ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
            />
            <button
              type="button"
              onClick={() =>
                setShowPassword([!showPassword[0], showPassword[1]])
              }
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showPassword[0] ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {errors.password && (
            <p className="mt-1 text-sm text-red-600">{errors.password}</p>
          )}
        </div>

        <div className="mb-6">
          <label htmlFor="repeatPassword" className="block mb-1">
            Nhập lại mật khẩu
          </label>

          <div className="relative">
            <input
              //   onClick={handleRepeatPasswordOnClick}
              ref={repeatPasswordRef}
              value={repeatPassword}
              onChange={handleRepeatPasswordChange}
              id="repeatPassword"
              type={showPassword[1] ? "text" : "password"}
              placeholder="Nhập lại mật khẩu"
              className={`w-full border rounded-lg px-3 py-2 ${
                errors.repeatPassword ? "border-red-500" : "border-gray-300"
              }`}
            />
            <button
              type="button"
              onClick={() =>
                setShowPassword([showPassword[0], !showPassword[1]])
              }
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showPassword[1] ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {errors.repeatPassword && (
            <p className="mt-1 text-sm text-red-600">{errors.repeatPassword}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-orange-600 text-white font-bold py-2 rounded-lg disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? "Đang đăng kí..." : "Đăng kí"}
        </button>

        <p className="mt-4 text-sm text-center text-gray-600">
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
  );
}
