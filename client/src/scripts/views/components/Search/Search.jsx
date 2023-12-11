import Button from '../Buttons/Button'

const Search = () => {
  return (
    <form className="container flex items-center gap-2">
      <label htmlFor="simple-search" className="sr-only">
        Search
      </label>
      <div className="relative w-full">
        <input
          type="text"
          id="simple-search"
          className="block w-full rounded-xl border border-primary-300 bg-white px-6 py-3 text-gray-900 focus:border-primary-500 focus:outline-none focus:ring-primary-500"
          placeholder="Lagi pingin liburan kemana nih?"
          required
        />
      </div>
      <Button variant="primary" className="rounded-xl">
        Cari
      </Button>
    </form>
  )
}

export default Search
