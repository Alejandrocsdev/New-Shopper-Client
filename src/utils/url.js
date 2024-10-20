// 環境變數
const {
  VITE_NODE_ENV,
  VITE_BACK_DEV_BASE_URL,
  VITE_BACK_PROD_BASE_URL,
  VITE_FRONT_DEV_BASE_URL,
  VITE_FRONT_PROD_BASE_URL
} = import.meta.env

const isProduction = VITE_NODE_ENV === 'production'

export const backUrl = isProduction ? VITE_BACK_PROD_BASE_URL : VITE_BACK_DEV_BASE_URL
export const frontUrl = isProduction ? VITE_FRONT_PROD_BASE_URL : VITE_FRONT_DEV_BASE_URL
