// 環境變數
const { VITE_BACK_STORAGE_TYPE } = import.meta.env

import { backPublicUrl } from './url.mjs'

// 預設大頭貼(後端public)
const defaultSrc = `${backPublicUrl}/uploads/default/avatar.png`

const isLocal = VITE_BACK_STORAGE_TYPE === 'local'

// local || (imgur / cloudinary)
const imageBaseUrl = isLocal ? backPublicUrl : ''

// 保護路徑頭像來源
export const privateAvatarSrc = link => {
  // (https://)可能為來自臉書或Gmail的照片
  const isHttps = /^https:\/\//.test(link)
  const imageSrc = `${isHttps ? '' : imageBaseUrl}${link}`
  return link ? imageSrc : defaultSrc
}

// 公開路徑頭像來源
export const publicAvatarSrc = avatar => avatar || defaultSrc
