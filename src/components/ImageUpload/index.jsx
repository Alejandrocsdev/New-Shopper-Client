// 模組樣式 (module css)
import S from './style.module.css'
// 函式庫 (library)
import { useForm } from 'react-hook-form'
// 組件 (component)
import Loading from '../Laoding'

// 錨點
function ImageUpload({ text, style, onSubmit }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm()

  return (
    <form className={style} onSubmit={handleSubmit(onSubmit)}>
      <input type="file" style={{ display: 'none' }} {...register('image')} />
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? <Loading /> : text}
      </button>
    </form>
  )
}

export default ImageUpload
