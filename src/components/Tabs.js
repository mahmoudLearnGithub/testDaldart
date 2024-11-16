import React, { useState } from "react";
import PostList from "./PostList";

const Tabs = () => {
  const [activeTab, setActiveTab] = useState("new");

  const handleTabClick = (tab) => {
    setActiveTab(tab); // Set the active tab to the selected tab
  };

  return (
    <div className="tabs-container">
      <div
        className={"header"}
        style={{ display: "flex", justifyContent: "space-around", gap: "20px" }}
      >
        {["hot", "new", "rising"].map((tab) => (
          <button
            key={tab}
            onClick={() => handleTabClick(tab)}
            style={{
              padding: "10px 35px 22px 35px",
              borderBottom: activeTab === tab ? "2px solid #6200ea" : "none",
              cursor: "pointer",
              background: "none",
              fontSize: "1.32rem",
              border: "none",
              //styleName: Regular S;
              fontFamily: "Lato",
              fontSize: "14px",
              fontWeight: "400",
              lineHeight: "20px",
              letterSpacing: "0.30000001192092896px",
              textalign: "center",
              textUnderlinePosition: "fromFont",
              textDecorationSkipInk: "none",
              color: activeTab === tab ? "#000" : "#00000099",
              fontWeight: activeTab === tab ? "bold" : "normal",
            }}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>
      {/* Pass activeTab to PostList */}
      <PostList key={activeTab} activeTab={activeTab} />
    </div>
  );
};

export default Tabs;
