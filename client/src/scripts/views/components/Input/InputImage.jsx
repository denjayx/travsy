import { useRef } from 'react'

const InputImage = ({
  label,
  placeholderImage,
  placeholderWords,
  name,
  onChange,
}) => {
  const selectedImage = useRef()
  const inputImage = useRef()

  const displayImage = () => {
    if (inputImage.current.files && inputImage.current.files[0]) {
      const reader = new FileReader()

      reader.onload = (e) => {
        selectedImage.current.src = e.target.result
      }

      reader.readAsDataURL(inputImage.current.files[0])
    }
  }

  return (
    <div className="mb-4">
      <label>{label}</label>
      <div className="flex items-start justify-start">
        <label
          className="hover:bg-blue flex w-64 cursor-pointer flex-col items-center rounded-lg border px-4 py-6 tracking-wide shadow-lg"
          htmlFor={name}
        >
          <img
            ref={selectedImage}
            src={placeholderImage}
            alt="selectedImage"
            className="w-48"
          />
          {placeholderWords}
        </label>
        <input
          ref={inputImage}
          onChange={(e) => {
            displayImage()
            onChange(e)
          }}
          name={name}
          type="file"
          className="hidden"
          id={name}
        />
      </div>
    </div>
  )
}

export default InputImage
