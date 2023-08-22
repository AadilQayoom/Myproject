import React, { useEffect, useState } from 'react';
import CommonService from '../../../services/commonService';
import DateService from '../../../services/dateService';
import SvgHome from '../svg-home/svg-home';

function PaymentRightSideBar({
    t,
    serviceNameOnward,
    serviceNameReturn,
    dateOnward,
    dateReturn,
    sourceOnward,
    sourceReturn,
    destinationOnward,
    destinationReturn,
    boardingStageOnward,
    boardingStageReturn,
    boardingTimeOnward,
    boardingTimeReturn,
    droppingStageOnward,
    droppingStageReturn,
    droppingTimeOnward,
    droppingTimeReturn,
    durationOnward,
    durationReturn,
    selectSeatsOnward,
    selectSeatsReturn,
    discountAmount,
    promoCouponAmount,
    promoCode,
    discountArray,
    walletMoney,
    showUsd,
    netFareInUsd,
    netFare,
    onPromoRemove
}) {
    let countrieCodes = [];

    const [journeyTypeActive, setJourneyTypeActive] = useState(1);

    // COMPONENT DID MOUNT
    useEffect(() => {

    }, []);


    const renderSummaryDetailsCard = ({ serviceName, date, source, dest, boardingStage, boardingTime, droppingStage, droppingTime, duration }) => {
        return (
            <div className="summary-details">
                <div className="op-name light-text font10">
                    {serviceName}
                </div>
                {date ? (
                    <span className="date font10">
                        {DateService.getDayNameFromDate(date) +
                            ', ' +
                            DateService.getDateFromDate(date) +
                            ' ' +
                            DateService.getMonthNameFromDate(date) +
                            ', ' +
                            DateService.getYearFromDate(date)}
                    </span>
                ) : null}
                <div className="location-details">
                    <div className="city-name font11 bold-text">
                        <img
                            className="icon-source"
                            src="/images/icons/home/icon_source.png"
                            alt={t('TRANSLATIONS.ICON_SOURCE')}
                        />
                        <span className="font11">{source}</span>
                    </div>
                    <div className="address light-text font10">
                        {boardingStage}.{' '}
                        {boardingTime ? (
                            <span>{DateService.ampm(boardingTime)}</span>
                        ) : null}
                    </div>
                </div>
                <div className="location-details">
                    <div className="city-name font11 bold-text">
                        <img className="icon-dest" src="/images/icons/home/icon_source2.png" />
                        <span className="font11">{dest}</span>
                    </div>
                    <div className="address light-text font10">
                        {droppingStage}.{' '}
                        {droppingTime ? (
                            <span>{DateService.ampm(droppingTime)}</span>
                        ) : null}
                    </div>
                </div>
                {duration ? (
                    <div className="duration light-text font10">
                        <img className="icon-source" src="/images/icons/icon_duration.svg" />
                        <span>{t('PASSENGER_DETAILS.DURATION')} : </span> &nbsp;
                        <span className="time">
                            {duration}&nbsp;
                            <span className="hours">{t('RESULTS_PAGE.HOURS')}</span>
                        </span>
                    </div>
                ) : null}
            </div>
        );
    };


    const renderDiscount = () => {
        if (discountArray) {
            discountArray.map((discount, i) => {
                return <div className="discount-block fl " key={i}>
                    <div className="discount-row flex-row">
                        <div className="font10">
                            <span >{discount.type}</span>
                            <div>{discount.name}</div>
                        </div>
                        <div
                            className="secondary-text font10 bold-text "
                            tyle={{ minWidth: 80, display: 'flex', justifyContent: 'flex-end' }}
                        >
                            CLP{' '}
                            {CommonService.currency(
                                discount.amount || 0
                            ).split(',')[0]}
                        </div>
                    </div>
                </div>
            })
        } else return null
    }

    return (
        <div className="pb-payment-details-payment-right-side-bar journey-summary-sidebar">
            <div className="kupos-card">
                <div>
                    <div className="summary-title font13">
                        {t('PASSENGER_DETAILS.SUMMARY')}{' '}
                        <span className="bold-text"> {t('PASSENGER_DETAILS.SUMMARY_BOLD')}</span>
                    </div>

                    <div className={'journey-date ' + (!dateReturn ? 'flex-row' : '')}>
                        <div className={'switch-buttons font10 ' + (dateReturn ? 'rt' : '')}>
                            <span
                                className={'switch-item ' + (journeyTypeActive == 1 ? 'active' : '')}
                                onClick={() => setJourneyTypeActive(1)}
                            >
                                {t('RESULTS_PAGE.GOING')}
                            </span>
                            {dateReturn ? (
                                <span
                                    className={'switch-item ' + (journeyTypeActive == 2 ? 'active' : '')}
                                    onClick={() => setJourneyTypeActive(2)}
                                >
                                    {t('RESULTS_PAGE.RETURN')}
                                </span>
                            ) : null}
                        </div>
                    </div>
                    {journeyTypeActive == 1
                        ? renderSummaryDetailsCard({
                            serviceName: serviceNameOnward,
                            date: dateOnward,
                            source: sourceOnward,
                            dest: destinationOnward,
                            boardingStage: boardingStageOnward,
                            boardingTime: boardingTimeOnward,
                            droppingStage: droppingStageOnward,
                            droppingTime: droppingTimeOnward,
                            duration: durationOnward,
                        })
                        : renderSummaryDetailsCard({
                            serviceName: serviceNameReturn,
                            date: dateReturn,
                            source: sourceReturn,
                            dest: destinationReturn,
                            boardingStage: boardingStageReturn,
                            boardingTime: boardingTimeReturn,
                            droppingStage: droppingStageReturn,
                            droppingTime: droppingTimeReturn,
                            duration: durationReturn,
                        })}
                </div>

                <div className="payment-details-sidebar">
                    <div className="payment-seats">
                        {selectSeatsOnward
                            ? selectSeatsOnward.map((val, key) => {
                                return (
                                    <div key={key} className="payment-seat-row flex-row font10 ">
                                        <div>
                                            <span>{val.totalSeats}</span>
                                            {' x '}
                                            {CommonService.capitalize(CommonService.getSeatName(val.type))}:
                                        </div>
                                        <div className="bold-text">
                                            CLP{' '}
                                            {
                                                CommonService.currency((val.amount) * val.totalSeats).split(
                                                    ',',
                                                )[0]
                                            }
                                        </div>
                                    </div>
                                );
                            })
                            : null}
                        {selectSeatsReturn
                            ? selectSeatsReturn.map((val, key) => {
                                return (
                                    <div key={key} className="payment-seat-row flex-row font10 ">
                                        <div>
                                            <span>{val.totalSeats}</span>
                                            {' x '}
                                            {CommonService.capitalize(CommonService.getSeatName(val.type))}:
                                        </div>
                                        <div className="bold-text">
                                            CLP{' '}
                                            {
                                                CommonService.currency((val.amount) * val.totalSeats).split(
                                                    ',',
                                                )[0]
                                            }
                                        </div>
                                    </div>
                                );
                            })
                            : null}
                    </div>

                    {renderDiscount()}


                    <div className="discount-block fl ">
                        {(
                            <div className="discount-row flex-row">
                                <div className="font10">{t('PASSENGER_DETAILS.DISCOUNT')}</div>
                                <div
                                    className="secondary-text font10 bold-text "
                                    tyle={{ minWidth: 80, display: 'flex', justifyContent: 'flex-end' }}
                                >
                                    CLP{' '}
                                    {CommonService.currency(
                                        discountAmount,
                                    ).split(',')[0]
                                    }
                                </div>
                            </div>
                        )}
                        <div className="discount-row flex-row">
                            <div className="font10">{t('PASSENGER_DETAILS.PROMO_CODE')}</div>
                            <div
                                className="secondary-text font10 bold-text "
                                style={{
                                    minWidth: 80,
                                    display: 'flex',
                                    justifyContent: 'flex-end',
                                    alignItems: 'center',
                                }}
                            >
                                CLP{' '}
                                {CommonService.currency(promoCouponAmount ? promoCouponAmount : 0).split(',')[0]}
                            </div>
                        </div>
                        {promoCouponAmount ? (
                            <div className="promocode font10">
                                <div>{promoCode}</div>
                                <span className="promo-remove" onClick={onPromoRemove}>
                                    <SvgHome name="close" />
                                </span>
                            </div>
                        ) : null}
                    </div>

                    {walletMoney ? (
                        <div className="subtotal-row flex-row">
                            <div className="font10">KuposPay</div>
                            <div className="secondary-text font10 bold-text ">
                                CLP {CommonService.currency(walletMoney)}
                            </div>
                        </div>
                    ) : null}

                    <div className="subtotal-block font10">
                        {showUsd ? (
                            <div className="subtotal-row flex-row">
                                <div className="primary-text">{t('PASSENGER_DETAILS.AMOUNT_IN_USD')}</div>
                                <div className="primary-text bold-text ">
                                    USD{CommonService.currency(netFareInUsd).split(',')[0]}
                                </div>
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>
            <div className="total bold">
                <div className="total-row flex-row font13">
                    <div>Total</div>
                    <div>CLP {CommonService.currency(netFare).split(',')[0]}</div>
                </div>
            </div>
        </div>
    );
}


export default PaymentRightSideBar;
