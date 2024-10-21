// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck, faCircleXmark } from '@fortawesome/free-regular-svg-icons'
import {
  faCircleHalfStroke,
  faEarthAmericas,
  faEarthAsia,
  faEye,
  faEyeSlash,
  faArrowLeftLong,
  faArrowRightLong,
  faCheck
} from '@fortawesome/free-solid-svg-icons'

// Icon mapping
const iconMap = {
  faCircleCheck,
  faCircleXmark,
  faCircleHalfStroke,
  faEarthAmericas,
  faEarthAsia,
  faEye,
  faEyeSlash,
  faArrowLeftLong,
  faArrowRightLong,
  faCheck
}

// 圖示
function Icon({ style, icon }) {
  const selected = iconMap[icon]
  return <FontAwesomeIcon className={style} icon={selected} />
}

export default Icon
