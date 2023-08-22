import React, { useEffect, useState } from "react";

import Image from "next/image";
import KuposModal from "../kupos-modal/kupos-modal";
import MyButton from "../my-button";
import MyInput from "../my-input";
import SelectDropdown from "../select-dropdown/select-dropdown";
import classes from "./quick-launch.module.less";
import { productListState } from "../../../recoil/atoms/home";
import { useRecoilValue } from "recoil";
import { useRouter } from "next/router";

const QuickLaunch = () => {
  const router = useRouter();
  const products = useRecoilValue(productListState);
  const [quickOrderModal, setQuickOrderModal] = useState(false);
  const [liveChatModal, setLiveChatModal] = useState(false);
  const [options, setOptions] = useState([]);
  const [message, setMessage] = useState("");
  const [msg, setMsg] = useState(["i need products related to diodes"]);
  const [selectedItemState, setSelectedItemState] = useState({
    item: null,
    qty: 0,
  });

  useEffect(() => {
    let localItems = [];
    products?.length &&
      products.map((val) => {
        localItems.push({ label: val.name, value: val.id });
      });

    setOptions(localItems);
  }, [products]);
  const pathRoute = (item) => {
    if (item.id === 3) {
      setQuickOrderModal(true);
    } else if (item.id === 4) {
      setLiveChatModal(!liveChatModal);
    } else {
      router.push(item.link);
    }
  };
  const data = [
    {
      id: 0,
      title: "Order History",
      image: "order-history.png",
      link: "/order-history",
    },
    {
      id: 1,
      title: "My Favourites",
      image: "favorite.png",
      link: "/wish-list",
    },
    {
      id: 2,
      title: "Track Your Order",
      image: "tracking.png",
      link: "/track-order",
    },
    { id: 3, title: "Quick Order", image: "give.png", link: "/quick-order" },
    {
      id: 4,
      title: "Live Chat",
      image: "communication.png",
      link: "/live-chat",
    },
  ];

  const sendRequest = () => {
    setQuickOrderModal(false);
  };
  const sendMessage = () => {
    setMsg(msg.push(message));
    console.log(msg);
  };
  return (
    <>
      <div className={classes.quick_launch}>
        {data.map((item, index) => {
          return (
            <div
              className={classes.icon_container}
              key={index}
              onClick={() => pathRoute(item)}
            >
              <Image
                src={`/images/icons/ecommerce/${item.image}`}
                width={60}
                height={60}
                alt=""
                className={classes.icon}
              />
              <span>{item.title}</span>
            </div>
          );
        })}
      </div>

      <KuposModal
        ariaLabel="modal"
        size={"xl"}
        onHide={() => setQuickOrderModal(false)}
        showModal={quickOrderModal}
      >
        <div className={classes.address_form}>
          <div className={classes.title + " font12 text-center bold-text"}>
            Place Quick Order
          </div>
          <SelectDropdown
            options={options}
            selectedOption={selectedItemState.item}
            onChange={(val) =>
              setSelectedItemState({ ...selectedItemState, item: val.id })
            }
            onBlur={() => {}}
            placeholder={"Search products here"}
            //   error={kuposGoServiceTypeError ? true : false}
            //   errorMessage={t(kuposGoServiceTypeError)}
            height={40}
            hideArrow={true}
            style={{width:'300px'}}
          />
          <MyInput
            border={true}
            label="Quantity"
            onChange={(val) =>
              setSelectedItemState({
                ...selectedItemState,
                qty: val.target.value,
              })
            }
            value={selectedItemState.qty}
            type="text"
          />
          <MyButton
            label="Submit"
            onClick={() => sendRequest(false)}
            style={{
              borderRadius: "8px",
              marginTop: "30px",
            }}
          />
        </div>
      </KuposModal>

      {/* <KuposModal
        ariaLabel="live-chat-modal"
        size={"xl"}
        onHide={() => setLiveChatModal(false)}
        showModal={liveChatModal}
      >
        <div className={classes.chat_box_wraper}>
          <div className={classes.title + " font12 text-center bold-text"}>
            Live Chat
          </div>
          <div className={classes.chat_box}>tanveer</div>
          <MyInput
            border={true}
            // label="Quantity"
            onChange={(val) => setMessage(val.target.value)}
            value={message}
            placeholder="Type your message..."
            type="text"
          />
          <MyButton
            label="Submit"
            onClick={() => setLiveChatModal(false)}
            style={{
              borderRadius: "8px",
              marginTop: "30px",
            }}
          />
          
          </div>
      </KuposModal> */}
      {liveChatModal ? (
        <div className={classes.chat_box}>
          <div className={classes.message_box}>
            <span className="font10 bold"> Live Chat 24x7</span>
            <div className={classes.msg_box_inner + " font12"}>
              <span className="bold font8">Hi, how may i help you?</span>
              {msg.length > 0
                ? msg?.map((mess, index) => {
                    return (
                      <div key={index} className={classes.msg + " font10"}>
                        {mess}
                      </div>
                    );
                  })
                : ""}
            </div>
          </div>
          <div className={classes.message_inputs}>
            <MyInput
              border={false}
              // label="Quantity"
              onChange={(val) => setMessage(val.target.value)}
              value={message}
              placeholder="Type your message..."
              type="text"
              wrapperStyle={{
                height: "30px",
                marginTop: "30px",
                width: "160px",
                background: "none",
              }}
            />
            <MyButton
              label="Send"
              onClick={sendMessage}
              style={{
                marginTop: "30px",
                width: "80px",
                height: "30px",
              }}
            />
          </div>
        </div>
      ) : null}
    </>
  );
};

export default QuickLaunch;
