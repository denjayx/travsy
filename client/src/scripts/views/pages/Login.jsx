import InputPassword from '../components/Input/InputPassword'
import InputEmail from '../components/Input/InputEmail'
{/*
import InputText from '../components/Input/InputText' 
*/}

export default function Login() {
  return (
    <section className="flex flex-col gap-3">
      <h3 className="text-md font-bold text-primary-950">
        Masuk ke akun Travsy Anda.
      </h3>
      <form className="flex flex-col gap-3">
        <InputEmail
          id="email"
          label="email"
          condition="default"
          placeholder="deni@mail.com"
        >
          Email
        </InputEmail>
        <InputPassword
          condition="default"
          label="password"
          id="password"
          placeholder="Masukkan Password"
        >
          Password
        </InputPassword>
        {/* 
        <InputText
          condition="default"
          label="username"
          id="username"
          placeholder="Buat Nama Pengguna"
        >
          Nama Pengguna
        </InputText>
        */}
        <button type="submit" className="bg-primary-600 text-white py-3 px-6 rounded-full">
          Login
        </button>
        <div className="flex justify-center">
          <p className="text-blue-500">
            Belum punya akun? <a href="/register" className="underline">Buat akun</a>
          </p>
        </div>
      </form>
    </section>
  )
}