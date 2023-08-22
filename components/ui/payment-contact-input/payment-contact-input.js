import React, { useState } from 'react';
import CommonService from '../../../services/commonService';
import KuposInput from '../input/kupos-input';


const initialState = {
    emailError: null,
    confirmEmailError: null,
    mobileError: null,
}

const PaymentContactInput = ({ t, isAdmin, contactDetails, setContactDetails, errors, setErrors }) => {

    const setState = (newState) => {
        setErrors({ ...errors, ...newState })
    }

    const setContactDetailsState = (newState) => {
        setContactDetails({ ...contactDetails, ...newState })
    }

    const onInputChange = (val, type) => {
        try {
            if (type == 'mobile') {
                setState({
                    mobileError: null,
                });
                val = CommonService.phoneNumberFormat(val, 9);
                setContactDetailsState({ mobile: val });
            } else if (type == 'email') {
                setState({
                    emailError: null,
                });
                setContactDetailsState({ email: val.trim().toLowerCase() });
            } else if (type == 'confirmEmail') {
                setState({
                    confirmEmailError: null,
                });
                setContactDetailsState({ confirmEmail: val.trim().toLowerCase() });
            }
        } catch (e) {
            console.log(e);
        }
    }

    const onInputBlurContact = (val, type) => {
        if (type == 'mobile') {
            if (isNaN(val)) {
                setState({
                    mobileError: 'VALIDATIONS.VALID_MOBILE'
                });
            } else if (val.toString().length != 9) {
                setState({
                    mobileError: 'VALIDATIONS.VALID_MOBILE_LENGTH_9'
                });
            }
        } else if (type == 'email') {
            if (!CommonService.isEMailValid(val)) {
                setState({
                    emailError: 'VALIDATIONS.VALID_EMAIL'
                });
            }
        } else if (type == 'confirmEmail') {
            if (contactDetails?.confirmEmail.toLowerCase() != contactDetails?.email.toLowerCase()) {
                setState({
                    confirmEmailError: 'VALIDATIONS.VALID_EMAIL_MATCH'
                });
            }
        }

    }

    return (
        <div>
            <table className="passenger-input-personal-details">
                <tbody>
                    <tr className="passenger-input-heading bold-text font10">
                        <th className="emailinput">{t('PASSENGER_DETAILS.EMAIL_ID')}</th>
                        <th
                            className="email-input"
                            style={{
                                paddingLeft: 0,
                            }}
                        >
                            {t('PASSENGER_DETAILS.EMAIL_CONFIRMATION')}
                        </th>
                        <th className="phone-input">{t('PASSENGER_DETAILS.PHONE_NUMBER')}</th>
                    </tr>
                    <tr className="passenger-input font10">
                        <td
                            className="email-input"
                            style={{
                                paddingRight: '4px',
                            }}
                        >
                            <KuposInput
                                t={t}
                                className="kupos-border"
                                type="email"
                                value={contactDetails?.email}
                                onChange={(text) => onInputChange(text, 'email')}
                                onBlur={(text) => onInputBlurContact(text, 'email')}
                                error={errors?.emailError ? true : false}
                                errorMessage={errors?.emailError}
                            />
                        </td>
                        <td
                            className="email-input"
                            style={{
                                paddingLeft: '4px',
                            }}
                        >
                            <KuposInput
                                t={t}
                                className="kupos-border confirm-email"
                                type="email"
                                value={contactDetails.confirmEmail}
                                onChange={(text) => onInputChange(text, 'confirmEmail')}
                                onBlur={(text) => onInputBlurContact(text, 'confirmEmail')}
                                error={errors?.confirmEmailError ? true : false}
                                errorMessage={
                                    errors?.confirmEmailError
                                }
                            />
                        </td>
                        <td className="phone-input">
                            <KuposInput
                                t={t}
                                placeholder="9XXXXXXXX"
                                className="kupos-border"
                                type="tel"
                                value={contactDetails.mobile}
                                onChange={(text) => onInputChange(text, 'mobile')}
                                onBlur={(text) => onInputBlurContact(text, 'mobile')}
                                error={errors?.mobileError ? true : false}
                                errorMessage={errors?.mobileError}
                            />
                        </td>
                    </tr>
                </tbody>
            </table>

            {isAdmin ? (
                <div className="comments-box-container font10">
                    <th className="emailinput font10 bold-text">{t('HOME.OBSERVATIONS')}</th>
                    <div className="comments-box-agent">
                        <textarea
                            onChange={(e) => setContactDetailsState({ adminComments: e.target.value })}
                            columns={20}
                            rows={6}
                            className="comments-box-agent "
                        ></textarea>
                    </div>
                </div>
            ) : null}
        </div>
    );
};

export default PaymentContactInput;