import React, { useEffect, useReducer, useRef, useState } from "react";
import styles from "./style.less";
import { useSize, useReactive } from "ahooks";

const baseHeight = 340;
const reducer = (state, action) => {
  const { payload, type } = action;
  // console.log(state);
  switch (type) {
    case "insert":
      const newList = state[payload.index] || [];
      newList.push(payload.value);
      // const newMap = state;
      state[payload.index] = [...newList];
      return { ...state };
    case "insertEmpty":
      // const newList2 = [];
      // const newMap2 = state;
      // state[payload.index] = [];
      return { ...state };
    case "clear":
      return {};
    default:
      throw new Error();
  }
};
const Home = () => {
  // const myMap = useReactive({});
  const [myMap, setMyMap] = useState({});
  const [imgList, setImgList] = useState([]);
  const ref = useRef();
  const size = useSize(ref);
  const [width, setWidth] = useState(0);
  const rowWidth = useRef(0);
  const rowCount = useRef(0);

  useEffect(() => {
    // console.log(size.width);
    let timer = setTimeout(resize, 1);
    return () => {
      clearTimeout(timer);
    };
  }, [width]);
  useEffect(() => {
    const updateWindowDimensions = () => {
      const newWidth = window.innerWidth;
      setWidth(newWidth);
      // console.log("updating height");
    };

    window.addEventListener("resize", updateWindowDimensions);

    return () => window.removeEventListener("resize", updateWindowDimensions);
  }, []);

  useEffect(() => {
    if (JSON.stringify(myMap) === "{}") {
      // console.log("++++");
      imgList.forEach((image) => compare(image));
    }
  }, [myMap]);
  const loadImage = () => {
    for (let i = 1; i < 30; i++) {
      let image = new Image();
      if (i <= 9) {
        i = "0" + i;
      }
      let url = require(`../../assets/images/${i}.webp`);
      image.src = url;
      image.onload = () => {
        const img = {
          url: url,
          metaWidth: image.width,
          metaHeight: image.height,
          width: image.width,
          height: image.height,
        };
        setImgList((imgList) => [...imgList, img]);
        compare(img);
      };
    }
  };
  const compare = (image) => {
    //容器宽度
    let clientWidth = size.width || window.innerWidth - 88 - 17.5;

    // console.log(window.innerWidth);
    //计算每行宽度
    rowWidth.current += image.metaWidth;
    //如果宽度大于容器宽度，去掉多余的宽度，整体进行缩放适应容器让右边对齐
    // console.log(myMap);
    if (rowWidth.current > clientWidth) {
      //减去每个css padding边距
      // console.log(myMap);
      let elementLenth = 0;
      if (myMap[rowCount.current]) {
        elementLenth = myMap[rowCount.current].length;
      }
      clientWidth = clientWidth - elementLenth * 40 - 40;
      //把高度调整为放大后的
      let growRatio = clientWidth / rowWidth.current;
      // console.log(rowCount.current);
      if (myMap[rowCount.current]) {
        myMap[rowCount.current].forEach((item) => {
          item.height = growRatio * item.metaHeight;
          item.width = growRatio * item.metaWidth;
        });
      } else {
        myMap[rowCount.current] = [];
      }
      image.height = growRatio * image.metaHeight;
      image.width = growRatio * image.metaWidth;

      const newList = myMap[rowCount.current];
      newList.push(image);
      const newMap = myMap;
      newMap[rowCount.current] = [...newList];
      setMyMap(() => {
        return { ...newMap };
      });

      // setMyMap({
      //   type: "insert",
      //   payload: { index: rowCount.current, value: image },
      // });

      rowWidth.current = 0;
      rowCount.current++;
      // const newList2 = (myMap[rowCount.current] = []);
      // const newMap2 = myMap;
      // newMap[rowCount.current] = [...newList2];
      // setMyMap(() => {
      //   return { ...newMap2 };
      // });
      // setMyMap({
      //   type: "insertEmpty",
      //   payload: { index: rowCount.current },
      // });
    } else {
      const newList = myMap[rowCount.current] || [];
      image.width = image.metaWidth;
      image.height = image.metaHeight;
      newList.push(image);
      const newMap = myMap;
      newMap[rowCount.current] = [...newList];
      // setMyMap({
      //   type: "insert",
      //   payload: { index: rowCount.current, value: image },
      // });
      setMyMap(() => {
        return { ...newMap };
      });
    }
  };
  const resize = () => {
    if (width) {
      setMyMap({});
      //将已存在的图片数据展开，重新计算
      let newList = [];
      Object.values(myMap).map((v) => {
        {
          v.map((v2) => newList.push(v2));
        }
        return;
      });

      //清空数据
      // setMyMap({});
      rowWidth.current = 0;
      rowCount.current = 0;
      // if (myMap === {}) newList.forEach((image) => compare(image));
    }
  };

  useEffect(() => {
    loadImage();
  }, []);

  return (
    <div className={styles.layout}>
      <div ref={ref}>
        {Object.values(myMap).map((v, i) => (
          <div className={styles.imageBox} key={i}>
            {v.map((v2, i2) => (
              <div style={{ width: v2.width, height: v2.height }} key={i2}>
                <img
                  src={v2.url}

                  // width={v2.width}
                  // height={v2.height}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
