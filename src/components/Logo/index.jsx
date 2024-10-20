// 工具 (utils)
import { frontUrl } from '../../utils/url'
// 自訂函式 (custom function)
import { useTheme } from '../../context/ThemeContext'
// 組件 (component)
import Anchor from '../Anchor'

// Logo
function Logo({ style, isBanner, shape, text, unlink, contrast }) {
  const { isDark } = useTheme()

  let color
  
  if (contrast) {
    color = isDark ? 'light' : 'dark'
  } else {
    color = isDark ? 'dark' : 'light'
  }

  const src = (color) => {
    if (isBanner) {
      return `${frontUrl}/img/logo/banner-${color}.png`
    } else {
      return `${frontUrl}/img/logo/${shape}-${text ? 'text-' : ''}${color}.png`
    }
  }

  return (
    <>
      {unlink 
      ? <div className={style}><img src={src(color)} /></div>
      : <Anchor style={style} int="/"><img src={src(color)} /></Anchor>}
    </>
  )
}

export default Logo
