import React, { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { cityDestinationState, cityOriginState, dateOnwardState, dateReturnState, pbPassengerDetailsOnwardState, pbPassengerDetailsReturnState, selectedSeatOnwardState, selectedSeatReturnState, serviceOnwardState, serviceReturnState } from "../../../recoil/atoms/pasajebus";
import { paymentErrorState, promoCodeCheckedState, promoCodeState } from "../../../recoil/atoms/payment";
import KuposCheckbox from "../checkbox/kupos-checkbox";
import KuposInput from "../input/kupos-input";


const PromoCodeBlock = ({ t, basicFare }) => {
    const cityOrigin = useRecoilValue(cityOriginState)
    const cityDestination = useRecoilValue(cityDestinationState)
    const dateOnward = useRecoilValue(dateOnwardState)
    const dateReturn = useRecoilValue(dateReturnState)

    const serviceOnward = useRecoilValue(serviceOnwardState)
    const serviceReturn = useRecoilValue(serviceReturnState)
    const selectedSeatOnward = useRecoilValue(selectedSeatOnwardState)
    const selectedSeatReturn = useRecoilValue(selectedSeatReturnState)
    const passengerDetailsOnward = useRecoilValue(pbPassengerDetailsOnwardState)
    const passengerDetailsReturn = useRecoilValue(pbPassengerDetailsReturnState)

    const [promoCodeChecked, setPromoCodeChecked] = useRecoilState(promoCodeCheckedState)
    const [promoCode, setPromoCode] = useRecoilState(promoCodeState)
    const [paymentError, setPaymentError] = useState(paymentErrorState)

    const [applyPromoCodePending, setApplyPromoCodePending] = useState(false)

    const applyPromoCode = () => {
        // setPaymentError({ ...paymentError, promoCodeError: t('PASSENGER_DETAILS.PROMO_CODE_INVALID') })


        try {
            // console.log(this.state);
            if (!this.state.promoCode) {
                setPaymentError({ ...paymentError, promoCodeError: t('VALIDATIONS.VALID_PROMOTION') })
                return;
            }
            let onwardSeatDetails = [];
            for (let s of passengerDetailsOnward) {
                onwardSeatDetails.push({
                    id_type: s.idCardType.value,
                    id_value: s.idCardNumber,
                    seat_fare: s.fare,
                    seat_no: s.floorNo + '_' + s.seatNumber, //floor number and seat number
                });
            }
            let returnSeatDetails = [];
            for (let s of passengerDetailsReturn) {
                returnSeatDetails.push({
                    id_type: s.idCardType.value,
                    id_value: s.idCardNumber,
                    seat_fare: s.fare,
                    seat_no: s.floorNo + '_' + s.seatNumber,
                });
            }
            let data = {
                promo_code: promoCode?.promoCode,
                amount: basicFare,
                travel_date: dateOnward,
                origin_id: cityOrigin.value,
                destination_id: cityDestination.value,
                travel_id: serviceOnward?.route?.travel_id,
                is_mobile_app: 'true',
                extra_data_hash: {
                    res_id: serviceOnward?.route?.id,
                    return_res_id: dateReturn
                        ? serviceReturn?.route?.id
                        : null,
                    dep_time: serviceOnward?.route?.dep_time,
                    return_dep_time: dateReturn
                        ? serviceReturn?.route?.dep_time
                        : '',
                    res_travel_id: serviceOnward?.route?.travel_id,
                    r_res_travel_id: dateReturn
                        ? serviceReturn?.route?.travel_id
                        : '',
                    res_total_fare: selectedSeatOnward?.netBookingAmount,
                    r_res_total_fare: selectedSeatReturn?.netBookingAmount,
                },
                onward_seats_info: onwardSeatDetails,
                return_seats_info: returnSeatDetails,
            };

            setApplyPromoCodePending(true)
            this.props.actions.applyPromoCode({ data: data }).then((res) => {
                onPromoApply(res);
            });
        } catch (e) {
            console.log(e);
        }
        // this.props.applyPromoCode({callback:(result) => this.onPromoApply(result),data:data})
    }

    const onPromoApply = (result) => {
        setApplyPromoCodePending(false)
        if (result) {
            if (result.status == 200) {
                setPromoCode({
                    promoCodeApplied: true,
                    promoCouponAmount: result.discount_amount,
                    promoType: result.type,
                    discountText: result.discount_text,
                    showSuccessModel: true,
                    successModelSuccess: true,
                    successModelText: t('PASSENGER_DETAILS.PROMO_CODE_SUCCESS'),
                });
                setPaymentError({ ...paymentError, promoCodeError: '' })
            } else {
                setPaymentError({ ...paymentError, promoCodeError: result.message })
            }
        }
    };

    const onPromoCodeChange = (text) => {
        setPromoCode({ ...promoCode, promoCode: text, });
    }

    const onPromoCheckboxChange = () => {
        setPromoCode({
            promoCode: '',
            promoCouponAmount: null,
            promoType: null,
            promoCodeApplied: false,
            discountText: null,
        })
        setPromoCodeChecked(!promoCodeChecked)
        setPaymentError({ ...paymentError, promoCodeError: '' })
    };

    const promoCodeBlur = (text) => {
        if (!text) {
            setPaymentError({ ...paymentError, promoCodeError: t('VALIDATIONS.VALID_PROMOTION') })
        }
    }

    return (
        <div className="payment-block-promo flex-row font11">
            <KuposCheckbox
                label={t('PASSENGER_DETAILS.PROMO_CODE')}
                onChange={onPromoCheckboxChange}
                checked={promoCodeChecked}
            />
            {promoCodeChecked ? (
                <div className="promocode-box flex-row">
                    <KuposInput
                        className="kupos-border"
                        type="text"
                        placeholder={t('PASSENGER_DETAILS.INSERT_PROMO')}
                        value={promoCode?.promoCode}
                        onChange={onPromoCodeChange}
                        onBlur={promoCodeBlur}
                        error={paymentError.promoCodeError ? true : false}
                        errorMessage={paymentError.promoCodeError}
                        t={t}
                    />
                    <button
                        className="kupos-button font12"
                        disabled={applyPromoCodePending ? true : false}
                        onClick={applyPromoCode}
                    >
                        {applyPromoCodePending ? (
                            <div className="loader-cricle"></div>
                        ) : (
                            <span>{t('PASSENGER_DETAILS.APPLY')}</span>
                        )}
                    </button>
                </div>
            ) : null}
        </div>
    )
}

export default PromoCodeBlock;