import React, { useState } from 'react';
import KuposRadio from '../kupos-radio';


const OnclickCards = ({card, type, changeCardSelection, cardChecked, oneClickTypeChecked, cardTypes}) => {
    // console.log('Value received in render card', val);

    return (
        <div
            key={type}
            onClick={changeCardSelection}
        >
            <div className="card-item" key={type}>
                <div className="txn-item">
                    <div className="card-image-container">
                        {type == 0 ? (
                            <KuposRadio
                                disabled={true}
                                checked={oneClickTypeChecked == 1 && cardChecked}
                            />
                        ) : (
                            <KuposRadio
                                disabled={true}
                                checked={oneClickTypeChecked == 2 && cardChecked}
                            />
                        )}
                        <img
                            width={42}
                            style={{ width: 42 }}
                            src={
                                cardTypes && cardTypes[card[2]] == 'americanexpress'
                                    ? '/images/cards/americanexpress.png'
                                    : cardTypes[card[2]] == 'diners'
                                        ? '/images/cards/diners.png'
                                        : cardTypes[card[2]] == 'magna'
                                            ? '/images/cards/magna.png'
                                            : cardTypes[card[2]] == 'mastercard'
                                                ? '/images/cards/mastercard.png'
                                                : cardTypes[card[2]] == 'redcompra'
                                                    ? '/images/cards/redcompra.png'
                                                    : '/images/cards/visa.png'
                            }
                            alt=""
                        />
                    </div>
                    <div>
                        <span>
                            {card[0].replace(/X/gi, '*').substring(8, 12) + ' ' + card[0].substring(12, 16)}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OnclickCards;