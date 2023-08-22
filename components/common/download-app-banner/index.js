import classNames from 'classnames';
import react from 'react'
import classes from './download-app-banner.module.less'

const DownloadAppBanner = ({ t }) => {
    return (

        <div className={classNames({
            'content-container': true,
            [classes.download_our_app_section_container]: true
        })}>
            <div className={classes.download_our_app_section}>
                <img className={classes.banner_back} src="/images/general/download-success-page-banner-2.png" />
                <div className={classes.download_app_overlay_text_items}>
                    <span className={classNames({
                        'bold-text': true,
                        'font24': true,
                        [classes.download_app_overlay_text_heading]: true,
                    })}>
                        {t('HOME.DOWNLOAD_OUR_APP')}
                    </span>

                    <span className={classNames({
                        'font12': true,
                        [classes.download_app_overlay_text_details]: true,
                    })}>
                        {t('HOME.CREATE_TICKET')}
                    </span>
                    <div className={classes.download_app_kupos_pay_image}>
                        <img src="/images/general/kupos_pay_logo.svg" alt="" />
                    </div>
                    <div className={classNames({
                        [classes.download_app_kupos_pay_image]: true,
                        [classes.download_app_kupos_pay_store]: true,
                    })}>
                        <a
                            href="https://play.google.com/store/apps/details?id=com.bitla.mba.pasajebus"
                            target="_blank"
                        >
                            <img
                                src={t('HOME.GOOGLE_PLAY_DARK')}
                                alt={t('TRANSLATIONS.GPLAY')}
                            />
                        </a>
                        <a
                            href="https://itunes.apple.com/us/app/pasaje-bus/id973424151?ls=1&amp;mt=8"
                            target="_blank"
                        >
                            <img
                                src={t('HOME.APP_STORE_DARK')}
                                alt={t('TRANSLATIONS.APPSTORE')}
                            />
                        </a>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default DownloadAppBanner;