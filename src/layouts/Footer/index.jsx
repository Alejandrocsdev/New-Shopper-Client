// 樣式模組 (css module)
import S from './style.module.css'
// 函式庫 (library)
import { useTranslation } from 'react-i18next'
// 圖檔 (image)
import masterCardPng from '../../assets/img/ecpay/masterCard.png'
import visaPng from '../../assets/img/ecpay/visa.png'
import jcbPng from '../../assets/img/ecpay/jcb.png'
import sevenElevenPng from '../../assets/img/ecpay/sevenEleven.png'
import familyMartPng from '../../assets/img/ecpay/familyMart.png'
import okMartPng from '../../assets/img/ecpay/okMart.png'
// 組件 (component)
import Icon from '../../components/Element/Icon'

// 頁首
function Footer() {
  const { t } = useTranslation()

  return (
    <footer className={S.footer}>
      <div className={S.platformInfo}>
        {/* 付款選項 */}
        <div className={S.category}>
          <div className={S.catName}>{t('footer.paymentOptions')}</div>
          <div className={S.images}>
            <img className={S.image} src={masterCardPng} />
            <img className={S.image} src={visaPng} />
            <img className={S.image} src={jcbPng} />
          </div>
        </div>
        {/* 物流合作 */}
        <div className={S.category}>
          <div className={S.catName}>{t('footer.logistic')}</div>
          <div className={S.images}>
            <img className={S.image} src={sevenElevenPng} />
            <img className={S.image} src={familyMartPng} />
            <img className={S.image} src={okMartPng} />
          </div>
        </div>
        {/* 關注我們 */}
        <div className={S.category}>
          <div className={S.catName}>{t('footer.aboutUs')}</div>
          <div className={S.images}>
            <Icon style={S.socialMedia} icon="faSquareFacebook" />
            <Icon style={S.socialMedia} icon="faInstagram" />
            <Icon style={S.socialMedia} icon="faLine" />
          </div>
        </div>
      </div>
      {/* 公司資訊 */}
      <div className={S.companyInfo}>
        <div>{t('footer.shopperCompany')}</div>
        <div>{t('footer.registerNumber')}&#65306;00000000</div>
        <div>&copy; 2024 Shopper. {t('footer.allRightsReserved')}</div>
      </div>
    </footer>
  )
}

export default Footer
