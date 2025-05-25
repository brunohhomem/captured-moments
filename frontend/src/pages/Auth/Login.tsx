import { useState } from "react"

export const Login = () => {
  const [password, setPassword] = useState<string>("")

  return (
    <main className="h-screen bg-violet-50 overflow-hidden relative">
      <aside className="login-ui-box -right-10 -top-40" />
      <aside className="login-ui-box bg-violet-200 -bottom-40 right-1/2" />

      <div className="container h-screen flex items-center justify-center px-20 mx-auto absolute">
        <section className="w-2/4 h-[90vh] flex items-start flex-col justify-end bg-[url('/images/praia.png')] bg-center rounded-lg p-10">
          <h4 className="text-5xl text-white font-semibold leading-[58px]">Register your <br /> Moments</h4>
          <p className="text-[15px] text-white leading-6 pr-7 mt-4">Capture your travel adventures and cherished moments in your own personal journal</p>
        </section>
        <section className="w-2/4 h-[75vh] bg-white rounded-r-lg relative p-16 shadow-lg shadow-violet-200/20">
          <form>
            <h4 className="text-2xl font-semibold mb-7">Login</h4>
            <input type="text" placeholder="email@email.com" className="input-box" />
            <input type="password" placeholder="*********" className="input-box" />
            <button className="btn-primary" type="submit">Login</button>
            <p className="text-xs text-slate-500 text-center my-4">OR</p>
            <button className="btn-primary btn-light" type="submit">Create Account</button>
          </form>
        </section>
      </div>
    </main>
  )
}