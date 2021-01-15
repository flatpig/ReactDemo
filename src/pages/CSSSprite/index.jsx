import React from "react";
import { Pagination } from "antd";
import styles from "./index.less";

const CSSSprite = () => {
  const itemRender = (current, type, originalElement) => {
    // if (type === "page") {
    //   return null;
    // }
    if (type === "prev") {
      return <div style={{ display: "none" }}></div>;
    }
    if (type === "next") {
      return <a style={{ float: "right" }}>下一页</a>;
    }
    return originalElement;
  };
  return (
    <>
      <div className={styles.main}>
        <Pagination
          defaultCurrent={1}
          total={1000}
          // simple
          itemRender={itemRender}
          showSizeChanger={false}
          // showQuickJumper
          // showTotal={(total) => `Total ${total} items`}
        />
      </div>
    </>
  );
};

export default CSSSprite;
