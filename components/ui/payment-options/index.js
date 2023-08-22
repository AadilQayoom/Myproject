import React, { useEffect, useState } from 'react';
import OnclickCards from './one-click-cards';
import { useRecoilState, useRecoilValue } from 'recoil';
import { isLoggedInState, loginDataState, metaDataState, myCardsState } from '../../../recoil/atoms/common';
import { corporateDiscountState, instantDiscountState, oneclickCardCheckedState, oneclickSelectedCardState, oneClickTypeCheckedState, payBookingLoadingState, paymentErrorState, promoCodeCheckedState, promoCodeState, selectedPaymentGatewayState, virtualCheckedState, walletCheckedState } from '../../../recoil/atoms/payment';
import CommonService from '../../../services/commonService';
import PromoCodeBlock from './promocode-block';
import KuposRadio from '../kupos-radio';
import KuposCheckbox from '../checkbox/kupos-checkbox';
import TermsAndConditions from '../terms-and-conditions/terms-and-conditions';

import SvgHome from '../svg-home/svg-home';
import KuposModal from '../kupos-modal/kupos-modal';
import classNames from 'classnames';

const PaymentOptions = ({
    onPay,
    t,
    basicFare,
    totalAmount,
    showPromocode,
    showKuposPay,
    showPaypal,
    showBancoEstado,
    showBancoEstadoNew,
    isOneClickEnabled,
    isAdmin,
}) => {
    const metaData = useRecoilValue(metaDataState);
    const [paymentError, setPaymentError] = useState(paymentErrorState)
    const payBookingLoading = useRecoilValue(payBookingLoadingState)
    const [oneClickTypeChecked, setOneClickTypeChecked] = useRecoilState(oneClickTypeCheckedState)
    const [cardChecked, setcardChecked] = useRecoilState(oneclickCardCheckedState)
    const [selectedCard, setSelectedCard] = useRecoilState(oneclickSelectedCardState)
    const [walletChecked, setWalletChecked] = useRecoilState(walletCheckedState)
    const [virtualChecked, setVirtualChecked] = useRecoilState(virtualCheckedState)
    const [selectedPaymentGateway, setSelectedPaymentGateway] = useRecoilState(selectedPaymentGatewayState)

    const isLoggedIn = useRecoilValue(isLoggedInState)
    const loginData = useRecoilValue(loginDataState)
    const myCards = useRecoilValue(myCardsState)
    const corporateDiscount = useRecoilValue(corporateDiscountState)
    const instantDiscount = useRecoilValue(instantDiscountState)

    const [showTNCModel, setShowTNCModel] = useState(false)
    const [paymentGatewayList, setPaymentGatewayList] = useState([])
    const [walletMoney, setWalletMoney] = useState(loginData?.balances?.clp?.money)
    const [virtualMoney, setVirtualMoney] = useState(loginData?.balances?.clp?.credit)
    const [tncChecked, setTncChecked] = useState(false)



    useEffect(() => {
        setWalletMoney(loginData?.balances?.clp?.money)
        setVirtualMoney(loginData?.balances?.clp?.credit)
    }, [loginData])

    const tncChanged = () => {
        setPaymentError({ ...paymentError, tncError: false })
        setTncChecked(!tncChecked);
    };

    useEffect(() => {
        setPaymentGatewayList(CommonService.copyObject(metaData?.payment_gate_way_list_dweb))
    }, [metaData])

    const onPayClick = () => {
        // console.log('testing props in onPay----', this.props);
        if (
            !selectedPaymentGateway &&
            !oneClickTypeChecked &&
            !walletChecked &&
            !virtualChecked &&
            !isAdmin
        ) {
            setPaymentError({ ...paymentError, paymentError: true })
            return;
        } else {
            // console.log('Selected Props else', selectedPaymentGateway);
            setPaymentError({ ...paymentError, paymentError: false })
        }

        if (!tncChecked) {
            setPaymentError({ ...paymentError, tncError: false })
            return;
        } else {
            setPaymentError({ ...paymentError, tncError: false })
        }

        if (
            !selectedPaymentGateway &&
            walletChecked &&
            totalAmount > 0
            // Number(walletMoney) < totalAmount
        ) {

            setPaymentError({ ...paymentError, walletMoneyError: true })
            return;
        }

        if (
            !selectedPaymentGateway &&
            virtualChecked &&
            virtualMoney < totalAmount
        ) {
            setPaymentError({ ...paymentError, virtualMoneyError: true })
            console.log('Log place 4');
            return;
        }

        if (
            !selectedPaymentGateway &&
            walletChecked &&
            virtualChecked &&
            walletMoney + virtualMoney < totalAmount
        ) {
            setPaymentError({ ...paymentError, walletMoneyError: true })
            console.log('Log place 5');
            return;
        }

        // debugger;

        onPay();
    };


    const onPaymentSelect = (paymentItem) => {
        setSelectedPaymentGateway(selectedPaymentGateway === +paymentItem.code ? null : paymentItem.code)
        setcardChecked(false)
        setSelectedCard(null);
    };

    const changeCardSelection = (val, key) => {
        // console.log('KP value', val, key);
        setSelectedCard(val);
        setSelectedPaymentGateway(selectedPaymentGateway === 34 ? null : 34)

        setPaymentError({ ...paymentError, amountError: false, paymentError: false })
        setcardChecked(!cardChecked)
        if (key === 0) {
            setOneClickTypeChecked(oneClickTypeChecked == 1 ? null : 1)
        } else {
            setOneClickTypeChecked(oneClickTypeChecked == 2 ? null : 2)
        }
    };


    const ErrorBlock = ({ error }) => {
        return (
            <div className={classNames({
                "tnc-error": true,
                "font10": true,
                "secondary-text": true,
                "center-text": true,
            })} >
                {error}
            </div>
        )
    }


    return (
        <div className={"common-payment-options"}>
            <div className={classNames({
                "kupos-card": true,
                "payment-block": true
            })}>
                {/* {!isAdmin ? ( */}
                <div className={classNames({
                    "font13": true,
                    "payment-block-heading": true
                })} >
                    <div>
                        {t('PASSENGER_DETAILS.PAYMENT_OPTIONS.NORMAL')}
                        <span className="bold">{t('PASSENGER_DETAILS.PAYMENT_OPTIONS.BOLD')}</span>
                    </div>
                </div>
                {/* ) : null} */}

                {!isAdmin ? (
                    showPromocode &&
                        !corporateDiscount &&
                        !instantDiscount ? (
                        <PromoCodeBlock t={t} basicFare={basicFare} />
                    ) : null
                ) : null}

                {!isAdmin ? (
                    <div className={classNames({
                        "flex-row": true,
                        "payment-methods": true
                    })} >

                        {paymentGatewayList &&
                            paymentGatewayList
                                .filter(gateway => {
                                    if (
                                        !myCards &&
                                        isLoggedIn &&
                                        isOneClickEnabled
                                    ) {
                                        return (
                                            gateway.label
                                                .toLowerCase()
                                                .split(' ')
                                                .join('-') != 'web-pay-plus'
                                        );
                                    } else if (
                                        myCards &&
                                        myCards.length == 1 &&
                                        isLoggedIn &&
                                        isOneClickEnabled
                                    ) {
                                        return (
                                            gateway.label
                                                .toLowerCase()
                                                .split(' ')
                                                .join('-') != 'web-pay-plus'
                                        );
                                    } else if (
                                        myCards &&
                                        myCards.length == 2 &&
                                        isLoggedIn &&
                                        isOneClickEnabled
                                    ) {
                                        return (
                                            gateway.label
                                                .toLowerCase()
                                                .split(' ')
                                                .join('-') != 'one-click'
                                        );
                                    } else {
                                        return gateway;
                                    }
                                })
                                .map((item, key) =>
                                    item.status === 0 &&
                                        ((showPaypal &&
                                            item.label
                                                .toLowerCase()
                                                .split(' ')
                                                .join('-') === 'paypal') ||
                                            item.label
                                                .toLowerCase()
                                                .split(' ')
                                                .join('-') === 'web-pay-plus' ||
                                            // (showKuposPay &&
                                            (isOneClickEnabled &&
                                                item.label
                                                    .toLowerCase()
                                                    .split(' ')
                                                    .join('-') === 'one-click' &&
                                                isLoggedIn) ||
                                            (showBancoEstado &&
                                                item.label
                                                    .toLowerCase()
                                                    .split(' ')
                                                    .join('-') === 'banco-estado') ||
                                            (showBancoEstadoNew &&
                                                item.label
                                                    .toLowerCase()
                                                    .split(' ')
                                                    .join('-') === 'banco-estado-new')) ? (
                                        <div
                                            className={"webpay-payment-method"}
                                            key={key}
                                            onClick={() => {
                                                setPaymentError({ ...paymentError, paymentError: false, tncError: false, walletMoneyError: false, virtualMoneyError: false });
                                                setcardChecked(false);
                                                setOneClickTypeChecked(null)
                                                onPaymentSelect(item);
                                            }}
                                        >
                                            <KuposRadio
                                                // onChange={() => onPaymentSelect(item)}
                                                checked={item.code == selectedPaymentGateway && !cardChecked}
                                            />

                                            <div className={"payment-checkbox"} ></div>
                                            {item.label
                                                .toLowerCase()
                                                .split(' ')
                                                .join('-') == 'web-pay-plus' ? (
                                                <img src="/images/general/webpay_logo_new.svg" alt="" />
                                            ) : // <img src="/images/general/webpay_logo.png" alt="" />
                                                null}
                                            {item.label
                                                .toLowerCase()
                                                .split(' ')
                                                .join('-') == 'paypal' ? (
                                                <img src={'/images/general/paypal_logo.png'} alt="" />
                                            ) : null}
                                            {item.label
                                                .toLowerCase()
                                                .split(' ')
                                                .join('-') == 'banco-estado' ? (
                                                <img
                                                    // style={{width:"25vw"}}
                                                    src={'/images/general/banco-estado.png'}
                                                    alt=""
                                                />
                                            ) : null}
                                            {item.label
                                                .toLowerCase()
                                                .split(' ')
                                                .join('-') == 'banco-estado-new' ? (
                                                <img
                                                    // style={{width:"25vw"}}
                                                    src={'/images/general/banco-estado-new.png'}
                                                    alt=""
                                                />
                                            ) : null}
                                            {item.label
                                                .toLowerCase()
                                                .split(' ')
                                                .join('-') != 'paypal' &&
                                                item.label
                                                    .toLowerCase()
                                                    .split(' ')
                                                    .join('-') != 'web-pay-plus' &&
                                                item.label
                                                    .toLowerCase()
                                                    .split(' ')
                                                    .join('-') != 'banco-estado' &&
                                                item.label
                                                    .toLowerCase()
                                                    .split(' ')
                                                    .join('-') != 'banco-estado-new' ? (
                                                <img
                                                    src={
                                                        isOneClickEnabled &&
                                                            (!myCards || myCards.length == 1)
                                                            ? '/images/general/webpay_logo_new.svg'
                                                            : '/images/general/one-click.png'
                                                    }
                                                    // src={'/images/one-click.png'}
                                                    alt=""
                                                />
                                            ) : null}
                                        </div>
                                    ) : null,
                                )}

                        {isLoggedIn && showKuposPay ? (
                            <div className={classNames({
                                "kupos-payment-moneys": true,
                                "kupos-pay-method": true
                            })} >
                                <div
                                    className={classNames({
                                        "kupos-payment-method": true,
                                        "kupos-pay": true,
                                        "bold-text": true,
                                        "font10": true,
                                    })}
                                    onClick={() => {
                                        setPaymentError({ ...paymentError, paymentError: false, tncError: false });
                                        setWalletChecked(!walletChecked);
                                    }}
                                    style={{ marginTop: 10 }}
                                >
                                    <div className={classNames({
                                        "kupos-pay-check": true,
                                        "flex-row": true,
                                    })}  >
                                        <KuposRadio disabled={true} checked={walletChecked} />{' '}
                                        <img
                                            src="/images/general/kupos_pay_logo.png"
                                            alt=""
                                        />{' '}
                                    </div>
                                    <span className={"kupos-amount"}>
                                        {' '}
                                        {isLoggedIn
                                            ? CommonService.currency(walletMoney).split(',')[0]
                                            : 'CLP $0'}
                                    </span>
                                </div>
                            </div>
                        ) : null}

                        {isLoggedIn && showKuposPay ? (
                            <div className={classNames({
                                "kupos-payment-moneys": true,
                                "kupos-pay-method": true
                            })} >
                                <div className={classNames({
                                    "kupos-credit": true,
                                    "bold-text": true,
                                    "font10": true,
                                })} style={{ marginTop: 10 }}>
                                    <KuposCheckbox
                                        checked={virtualChecked}
                                        onChange={() => {
                                            setPaymentError({ ...paymentError, paymentError: false, tncError: false });
                                            setVirtualChecked(!virtualChecked);
                                        }}
                                        label={'KuposCréditos'}
                                        labelStyle={{ fontSize: 12 }}
                                        labelBold={true}
                                    />
                                    <span className={"kupos-amount"}>
                                        {' '}
                                        {isLoggedIn
                                            ? CommonService.currency(virtualMoney).split(',')[0]
                                            : 'CLP $0'}
                                    </span>
                                </div>
                            </div>
                        ) : null}

                        {myCards && isOneClickEnabled
                            ? myCards.map((val, key) => <OnclickCards key={key} type={key} card={val} cardChecked={cardChecked} changeCardSelection={changeCardSelection} cardTypes={metaData?.card-type} />)
                            : null}
                    </div>
                ) : (
                    <div
                        className={classNames({
                            "flex-row": true,
                            "payment-methods": true
                        })}>
                        {isLoggedIn && showKuposPay ? (
                            <div className={classNames({
                                "kupos-payment-moneys": true,
                                "kupos-pay-method": true
                            })}>
                                <div
                                    className={classNames({
                                        "kupos-payment-method": true,
                                        "kupos-pay": true,
                                        "bold-text": true,
                                        "font10": true,
                                    })}
                                    style={{ marginTop: 10 }}
                                >
                                    <div className={classNames({
                                        "flex-row": true,
                                        "kupos-pay-check": true
                                    })} >
                                        <KuposRadio disabled={true} checked={true} />{' '}
                                        <img
                                            src="/images/general/kupos_pay_logo.png"
                                            alt=""
                                        />
                                    </div>
                                    <span className={"kupos-amount"}>
                                        {isLoggedIn
                                            ? CommonService.currency(walletMoney).split(',')[0]
                                            : 'CLP $0'}
                                    </span>
                                </div>
                            </div>
                        ) : null}
                    </div>
                )}

                <div className={classNames({
                    "accept-tnc": true,
                    "font10": true,
                })}>
                    <KuposCheckbox checked={tncChecked} onChange={tncChanged} />
                    <div>
                        <a onClick={() => setShowTNCModel(true)}>
                            {t('PASSENGER_DETAILS.I_ACCEPT_TNC_COVID_PART1')}
                        </a>
                    </div>
                </div>

                {paymentError?.tncError ? (
                    <ErrorBlock error={t('PASSENGER_DETAILS.PLEASE_ACCEPT_TNC')} />
                ) : null}

                {paymentError?.sharedServiceError ? (
                    <ErrorBlock error={t('PASSENGER_DETAILS.SELECT_PICKUP_TIME')} />
                ) : null}
                {paymentError?.paymentError ? (
                    <ErrorBlock error={t('PASSENGER_DETAILS.PLEASE_SELECT_PAYMENT')} />
                ) : null}

                {paymentError?.walletMoneyError || paymentError?.virtualMoneyError ? (
                    <ErrorBlock error={t('PASSENGER_DETAILS.INSUFFICIENT_BALANCE')} />
                ) : null}


                <div className="pay-now-section font13">
                    <button
                        onClick={onPayClick}
                        className="pay-now-button kupos-button"
                        disabled={payBookingLoading ? true : false}
                    >
                        {payBookingLoading ? (
                            <div className="loader-cricle"></div>
                        ) : (
                            <span>{t('PASSENGER_DETAILS.PAY')}</span>
                        )}
                    </button>
                </div>
            </div>

            <KuposModal
                ariaLabel="tnc-pnr-modal-outer"
                size={'xl'}
                onHide={() => setShowTNCModel(false)}
                showModal={showTNCModel}
            >
                <div className="tnc-pnr-modal">
                    <TermsAndConditions />
                    <div
                        className="close-button pointer"
                        onClick={() => setShowTNCModel(false)}
                    >
                        <SvgHome name="close" />
                    </div>
                </div>
            </KuposModal>
        </div>
    );
}

export default PaymentOptions;