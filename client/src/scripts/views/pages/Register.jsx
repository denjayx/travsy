import InputEmail from '../components/Input/InputEmail'
import InputPassword from '../components/Input/InputPassword'
import InputText from '../components/Input/InputText'

const Register = () => {
  return (
    <section className="flex flex-col gap-3 ">
      <h3 className="text-md font-bold text-primary-950">
       Buat akun Travsy Anda.
      </h3>
      <form className="flex flex-col gap-3">
        <InputEmail
          id="email"
          label="email"
          condition="default"
          placeholder="emailkamu@mail.com"
        >
          Email
        </InputEmail>
        <InputText
          condition="default"
          label="username"
          id="username"
          placeholder="Buat Nama Pengguna"
        >
          Nama Pengguna
        </InputText>
        <InputPassword
          condition="default"
          label="password"
          id="password"
          placeholder="Masukkan Kata Sandi"
        >
          Kata Sandi
        </InputPassword>
        <InputPassword
          condition="default"
          label="confirm-password"
          id="confirm-password"
          placeholder="Konfirmasi Kata Sandi"
        >
          Konfirmasi Kata Sandi
        </InputPassword>

        <button
          type="submit"
          className="focus:ring-blue-300 container my-4 rounded-3xl bg-primary-500 px-6 py-3
          text-center text-base font-medium text-white hover:bg-primary-600 focus:outline-none focus:ring-4"
        >
          Buat Akun
        </button>

        <label className="mt-3 block text-center text-base text-primary-950 ">
          Daftar jadi Tour Guide {' '}
          <span className="font-semibold  text-primary-700 underline underline-offset-2">
            <a href="#">disini</a>
          </span>
        </label>
      </form>
    </section>
  )
}

export default Register
