import React, { useState } from "react";

import CommonService from "../../../services/commonService";
import Image from "next/image";
import MyInput from "../my-input";
import classes from "./search-bar.module.less";
import { useRouter } from "next/router";

const SearchBar = (props) => {
  const [focused, setFocused] = useState(false);
  const router = useRouter();
  let savedSearches = [];
  const suggestionItems = [
    "free delivery items",
    "todays special offers",
    "items with cod",
    "samsung m2 pro 64 gb",
    "kitchen accessories",
    "iphone 12 pro max case",
    "coffee maker",
    "bluetooth headphones",
    "whole foods",
    "patio furniture sets",
    "face mask",
    "mini fridge",
    "outdoor furniture",
    "car accessories",
    "led lights for bedroom",
    "sandals for women",
    "mothers day gifts from daughter",
    "maxi dresses for women summer",
  ];
  const filterItem = suggestionItems?.filter((item) =>
    item?.match(props.searchHistory)
  );

  const saveSearchToLocal = (event) => {
    if (typeof window !== "undefined" && event.key === "Enter") {
      let oldSearches = localStorage.getItem("searchedQueries");
      if (oldSearches !== null) {
        oldSearches = JSON.parse(oldSearches);
        savedSearches = CommonService.copyObject(oldSearches);
      }
      savedSearches.push(props.searchHistory);
      localStorage.setItem("searchedQueries", JSON.stringify(savedSearches));
    }
  };
  const removeRecentSearch = (val) => {
    const storage = JSON.parse(window.localStorage.getItem("searchedQueries"));
    let updatedStorage = storage.filter(function (record) {
      return record !== val;
    });
    window.localStorage.setItem(
      "searchedQueries",
      JSON.stringify(updatedStorage)
    );
  };
  let historyValue = "";
  const fillSearchBar = (val) => {
    historyValue = val;
    console.log(historyValue);
  };
  return (
    <div className={classes.search_bar}>
      <MyInput
        leftIcon={"/images/icons/home/search.png"}
        placeholder={props.placeholder}
        value={props.value}
        // value={historyValue}
        onChange={props.onChangeInput}
        // border={props.border}
        onFocus={() => {
          setFocused(true);
          router.push('/search-page')
        }}
        onBlur={() => setFocused(false)}
        onDoubleClick={() => setFocused(false)}
        // onBlur={() => setFocused(false)}
        onKeyDown={saveSearchToLocal}
        style={{ height: 40, borderRadius: 100, width: "200px" }}
        noSpace
      />
      {props.sugesstions && focused ? (
        <div className={classes.suggestions}>
          {JSON.parse(window.localStorage.getItem("searchedQueries"))?.map(
            (search, index) => {
              return (
                <div className={classes.recent_history} key={index}>
                  <div className={classes.top_history}>
                    <Image
                      className={classes.icon}
                      src={"/images/icons/clock.png"}
                      width={14}
                      height={14}
                      alt=""
                    />
                    <div onClick={() => fillSearchBar(search)}>{search}</div>
                  </div>
                  <div
                    onClick={() => removeRecentSearch(search)}
                    className={classes.remove_search}
                  >
                    <Image
                      className={classes.icon}
                      src={"/images/icons/red_remove.png"}
                      width={14}
                      height={14}
                      alt=""
                    />
                  </div>
                </div>
              );
            }
          )}
          {filterItem.splice(0, 5).map((item, index) => {
            return (
              <div
                key={index}
                className={classes.suggestion_item + " font10"}
                onClick={() => fillSearchBar(item)}
              >
                {item}
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
};

export default SearchBar;
