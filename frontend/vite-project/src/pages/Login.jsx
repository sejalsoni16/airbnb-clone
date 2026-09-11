function Login() {
  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold text-red-500">
        Login Page
      </h1>

      <input
        className="border p-2 mt-5 block"
        type="email"
        placeholder="Email"
      />

      <input
        className="border p-2 mt-3 block"
        type="password"
        placeholder="Password"
      />

      <button className="bg-red-500 text-white px-4 py-2 mt-3">
        Login
      </button>
    </div>
  );
}

export default Login;