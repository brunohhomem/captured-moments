import { useState } from "react"
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa"

interface PasswordInputProps {
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder: string
}

export const PasswordInput = ({ value, onChange, placeholder }: PasswordInputProps) => {
  const [isShowPassword, setIsShowPassword] = useState(false)

  const toggleShowPassword = () => {
    setIsShowPassword(!isShowPassword)
  }

  return (
    <div className="flex items-center bg-violet-600/5 rounded mb-3">
      <input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        type={isShowPassword ? "text" : "password"}
        className="w-full text-sm bg-transparent py-3 mr-4 px-5 rounded outline-none"
      />

      {isShowPassword ?
        <FaRegEye
          size={22}
          className="text-primary cursor-pointer mr-2"
          onClick={() => toggleShowPassword()}

        /> : <FaRegEyeSlash
          size={22}
          className="text-primary cursor-pointer mr-2"
          onClick={() => toggleShowPassword()}

        />}
    </div>
  )
}