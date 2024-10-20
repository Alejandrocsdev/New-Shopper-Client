// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons'
import { faCircleHalfStroke, faEarthAmericas, faEarthAsia } from '@fortawesome/free-solid-svg-icons'

// Icon mapping
const iconMap = { faCircleXmark, faCircleHalfStroke, faEarthAmericas, faEarthAsia }

// 圖示
function Icon({ style, icon }) {
  const selected = iconMap[icon]
  return <FontAwesomeIcon className={style} icon={selected} />
}

export default Icon
