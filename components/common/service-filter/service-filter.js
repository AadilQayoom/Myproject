import React from 'react';
import i18next from 'i18next';
import CommonService from '../../../services/commonService';
import classNames from 'classnames';
import classes from "./service-filter.module.less";

const ServiceFilter = props => {

    const getSeatName = rawSeat => {
        // console.log('Raw seat'.rawSeat);
        switch (rawSeat) {
            case 'SALON CAMA':
                return 'Salón Cama';
                break;
            case 'Salon Cama':
                return 'Salón Cama';
                break;
            case 'CLASICO':
                return 'Clásico';
                break;
            case 'Clasico':
                return 'Clásico';
                break;
            case 'Salon Sin Vent':
                return 'Salón Sin Vent';
                break;
            case 'SALON SIN VENT':
                return 'Salón Sin Vent';
                break;
            case 'Salon Preferente':
                return 'Salón Preferente';
                break;
            case 'SALON PREFERENTE':
                return 'Salón Preferente';
                break;
            case 'SALON':
                return 'Salón ';
                break;
            case 'Salon':
                return 'Salón ';
                break;
            case 'BIO BIO SUPERIOR':
                return 'Bio Bio Superior';
                break;
            default:
                return rawSeat;
                break;
        }
    };

    const renderFilterItem = (option, onClick, key) => {
        return (
            <div key={key} className={classNames({
                [classes.filter_category_box]: true,
                [classes[option.align]]: true
            })} >
                {option.type === 'time' || !CommonService.isTrain() ? (
                    <div className={classNames({
                        [classes.filter_category_title]: true,
                        'bold-text': true
                    })} >
                        {props.t('RESULTS_PAGE.' + option.title)}
                    </div>
                ) : null}
                {option.type == 'time' || !CommonService.isTrain()
                    ? option.options.map((val, key) => {
                        return (
                            <div
                                key={key}
                                className={classNames({
                                    [classes.filter_item]: true,
                                    'pointer': true,
                                    'primary_text bold-text': val.active,
                                    [classes.active]: val.active,
                                    [i18next.language]: true
                                })}
                                onClick={() => onClick(key)}
                            >
                                {val.icon ? (
                                    <img
                                        className="icon-size"
                                        src={`/images/icons/icon-${val.icon + (val.active ? '-orange' : '')}.png`}
                                        alt=""
                                    />
                                ) : null}

                                {/* {console.log('val.trText', val.trText)} */}
                                {val.trText
                                    ? props.t('RESULTS_PAGE.' + val.trText)
                                    : props.t(getSeatName(val.label))}
                            </div>
                        );
                    })
                    : null}
            </div>
        );
    };

    const showClearFilter = () => {
        for (let f of props.filtersArray) {
            for (let o of f.options) {
                if (o.active) {
                    return true;
                }
            }
        }
        return false;
    };

    const clearFilter = () => {
        let filters = CommonService.copyObject(props.filtersArray);
        for (let f of filters) {
            for (let o of f.options) {
                o.active = false;
            }
        }
        props.onFilterClear(filters);
    };

    let { t } = props;
    return (
        <div className={classes.common_service_filter}>
            <div className=" kupos-card">
                <div className={classNames({
                    [classes.filter_main_title]: true,
                    'font13': true
                })} >{t('RESULTS_PAGE.FILTERS')}</div>
                <div className={classNames({
                    [classes.filter_box]: true,
                    'font10': true
                })} >
                    {props.filtersArray.map((val, key) => {
                        return renderFilterItem(val, i => props.onFilterSelected(val, key, i), key);
                    })}
                </div>
            </div>
            {showClearFilter() ? (
                <div className={classNames({
                    [classes.remove_filter_box]: true,
                    'font10': true,
                    'pointer': true
                })} onClick={clearFilter}>
                    <img src="/images/icons/close-window.svg" />
                    {t('RESULTS_PAGE.REMOVE_FILTERS')}
                </div>
            ) : null}
        </div>
    );

}

export default ServiceFilter;