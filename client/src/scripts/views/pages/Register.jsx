import InputPassword from '../components/Input/InputPassword'
import InputEmail from '../components/Input/InputEmail'
{/*
import InputText from '../components/Input/InputText' 
*/}

export default function Register() {
  return  (
    <section className="flex flex-col gap-3">
      <h3 className="text-md font-bold text-primary-950">
        Buat akun Travsy.
      </h3>
      <form className="flex flex-col gap-3">
        <InputEmail
          id="email"
          label="email"
          condition="default"
          placeholder="masukan email @gmail.com"
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
        <InputPassword
          condition="default"
          label="password"
          id="password"
          placeholder="Masukkan Password"
        >
          konfirmasi Password
        </InputPassword>
       {/* <InputText
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
            Daftar jadi Tour Guide <a href="/register" className="underline">disini</a>
          </p>
        </div>
      </form>
    </section>
  )
}







  