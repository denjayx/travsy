/* eslint-disable react/prop-types */
import { TbCameraFilled } from 'react-icons/tb'
import { useRef } from 'react'

const InputImage = ({
  label,
  placeholderImage,
  placeholderWords,
  name,
  onChange,
  wrapperClassName,
  isDisabled,
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
    <div className={`mb-4 flex w-fit flex-col gap-2 ${wrapperClassName}`}>
      <label className="">{label}</label>
      <div className="flex w-full items-end justify-start">
        <label htmlFor={name} className="relative">
          <div className="h-32 w-32 overflow-hidden rounded-xl border border-dashed border-gray-300">
            <img
              ref={selectedImage}
              src={placeholderImage}
              alt="selectedImage"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute bottom-0 right-0 rounded-br-lg rounded-tl-xl bg-primary-600 p-2">
            <TbCameraFilled size={24} className="text-white" />
          </div>
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
          disabled={isDisabled}
        />
      </div>
      <span className="ps-2 text-xs">{placeholderWords}</span>
    </div>
  )
}

export default InputImage
