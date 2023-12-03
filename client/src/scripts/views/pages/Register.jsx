import Logo from '../../../assets/logo.svg'

const Register = () => {
  return (
    <section className="px-13 container mt-32 w-5/12 rounded-3xl bg-white py-14  ">
      <img src={Logo} alt="Logo" className="w-100 h-10 " />
      <label className="my-5 block text-md font-bold text-primary-950 ">
        Buat Akun Travsy.
      </label>

      <form className="mx-auto ">
        <div className="mb-5">
          <label
            htmlFor="email"
            className="mb-1 block text-base font-medium text-primary-950 "
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            className="focus:ring-blue-500 focus:border-blue block w-full rounded-xl border border-gray-400 bg-white p-3 text-base text-gray-900 shadow-sm"
            placeholder="Emailkamu@gmail.com"
            required
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="nama-pengguna"
            className="mb-1 block text-base font-medium text-primary-950 "
          >
            Nama Pengguna
          </label>
          <input
            type="text"
            id="nama-pengguna"
            className="focus:ring-blue-500 focus:border-blue block w-full rounded-xl border border-gray-400 bg-white p-3 text-base text-gray-900 shadow-sm"
            placeholder="Nama Pengguna"
            required
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="kata-sandi"
            className="mb-1 block text-base font-medium text-primary-950 "
          >
            Kata Sandi
          </label>
          <input
            type="password"
            id="kata-sandi"
            className="focus:ring-blue-500 focus:border-blue block w-full rounded-xl border border-gray-400 bg-white p-3 text-base text-gray-900 shadow-sm"
            placeholder="Kata Sandi"
            required
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="konfirmasi-kata-sandi"
            className="mb-1 block text-base font-medium text-primary-950 "
          >
            Konfirmasi Kata Sandi
          </label>
          <input
            type="password"
            id="konfirmasi-kata-sandi"
            className="focus:ring-blue-500 focus:border-blue block w-full rounded-xl border border-gray-400 bg-white p-3 text-base text-gray-900 shadow-sm"
            placeholder="Konfirmasi Kata Sandi"
            required
          />
        </div>

        <button
          type="submit"
          className="focus:ring-blue-300 container my-4 rounded-3xl bg-primary-500 px-6 py-3
          text-center text-base font-medium text-white hover:bg-primary-600 focus:outline-none focus:ring-4"
        >
          Buat Akun
        </button>

        <label className="mt-3 block text-center text-base text-primary-950 ">
          Daftar jadi Tour Guide{' '}
          <span className="font-semibold  text-primary-700 underline underline-offset-2">
            <a href="#">disini</a>
          </span>{' '}
        </label>
      </form>
    </section>
  )
}

export default Register
