import CommonService from "../../../services/commonService";
import classes from './footer.module.less'
import { kuposModalErrorSuccessState } from "../../../recoil/atoms/common";
import { useSetRecoilState } from "recoil";
import { useState } from "react";
const initialState = {
  email: null,
  subscribePending: false,
};

const KuposSubscribeNewsLetter = ({ t }) => {
  const [state, setState] = useState(initialState);
  // const subscribeNewsLetter = SubscribeNewsLetter();
  const setKuposModalErrorSuccessState = useSetRecoilState(
    kuposModalErrorSuccessState
  );

  const subscribe = () => {
    if (!state.email) {
      setState({
        ...state,
        emailError: "VALIDATIONS.VALID_EMAIL",
      });
      return;
    } else if (!CommonService.isEMailValid(state.email)) {
      setState({
        ...state,
        emailError: "VALIDATIONS.VALID_EMAIL_VALIDATION",
      });
      return;
    }
    setState({ ...state, subscribePending: true });
    // subscribeNewsLetter({
    //   callback: (res) => {
    //     if (res && res.status == 200) {
    //       setState({ ...state, subscribePending: false });
    //       setKuposModalErrorSuccessState({
    //         showModal: true,
    //         success: true,
    //         modalSubTitle: "HOME.NEWSLETTER_1",
    //         modalBody: "HOME.NEWSLETTER_2",
    //       });
    //     } else {
    //       setKuposModalErrorSuccessState({
    //         showModal: true,
    //         success: false,
    //         modalBody: res.error,
    //       });
    //     }
    //   },
    //   data: { email: state.email },
    // });
  };
  return (
    <div className={classes.subscribe + " subscribe-div"}>
      <span className="bold-footer-item bold-text font14">{"NEWSLETTER"}</span>
      <div className="footer-news-letter-input flex-row font10">
        <input
          className="font10"
          type="email"
          placeholder={"EMAIL ID"}
          // value={state?.email}
          value={'try'}
          onChange={(event) =>
            setState({
              ...state,
              email: event.target.value.trim(),
              emailError: null,
            })
          }
          onBlur={(event) => setState({ ...state, email: event.target.value })}
        />
        <button
          onClick={subscribe}
          className="kupos-button no-decoration"
          disabled={state.subscribePending ? true : false}
        >
          {state.subscribePending ? (
            <div className="loader-cricle"></div>
          ) : (
            <span>{"SEND"}</span>
          )}
        </button>
      </div>
      {state.emailError ? (
        <div style={{ marginTop: -5 }} className="errorMessageInput font8">
          {state.emailError}
        </div>
      ) : null}
    </div>
  );
};

export default KuposSubscribeNewsLetter;
