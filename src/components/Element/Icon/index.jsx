// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquareFacebook, faInstagram, faLine } from '@fortawesome/free-brands-svg-icons'
import { faCircleCheck, faCircleXmark } from '@fortawesome/free-regular-svg-icons'
import {
  faCircleHalfStroke,
  faEarthAmericas,
  faEarthAsia,
  faEye,
  faEyeSlash,
  faArrowLeftLong,
  faArrowRightLong,
  faCheck,
  faEnvelopeCircleCheck,
  faMagnifyingGlass,
  faCartShopping,
  faCaretRight,
  faCaretLeft,
  faForwardStep,
  faBackwardStep
} from '@fortawesome/free-solid-svg-icons'

// Icon mapping
const iconMap = {
  faSquareFacebook,
  faInstagram,
  faLine,
  faCircleCheck,
  faCircleXmark,
  faCircleHalfStroke,
  faEarthAmericas,
  faEarthAsia,
  faEye,
  faEyeSlash,
  faArrowLeftLong,
  faArrowRightLong,
  faCheck,
  faEnvelopeCircleCheck,
  faMagnifyingGlass,
  faCartShopping,
  faCaretRight,
  faCaretLeft,
  faForwardStep,
  faBackwardStep
}

// 圖示
function Icon({ style, icon }) {
  const selected = iconMap[icon]
  return <FontAwesomeIcon className={style} icon={selected} />
}

export default Icon
