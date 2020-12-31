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
  const [myMap, setMyMap] = useState(new Map());
  const [imgList, setImgList] = useState(new Map());
  const ref = useRef();
  const size = useSize(ref);
  const [width, setWidth] = useState(0);
  const rowWidth = useRef(0);
  const rowIndexStart = useRef(0);
  const rowIndexEnd = useRef(0);
  useEffect(() => {
    // console.log(size.width);
    let timer = setTimeout(resize, 10);
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

  // useEffect(() => {
  //   if (JSON.stringify(myMap) === "{}") {
  //     // console.log("++++");
  //     imgList.forEach((image) => compare(image));
  //   }
  // }, [myMap]);
  const loadImage = () => {
    for (let i = 1; i < 30; i++) {
      let image = new Image();
      let key = i;
      if (key <= 9) {
        key = "0" + i;
      }
      let url = require(`../../assets/images/${key}.webp`);
      image.src = url;
      image.onload = () => {
        const img = {
          // url: url,
          metaWidth: image.width,
          metaHeight: image.height,
          width: image.width,
          height: image.height,
        };

        const imgurl = {
          url: url,
        };
        // setMyMap((myMap) => [...myMap, img]);
        setImgList(new Map(imgList.set(i, img)));
        setMyMap(new Map(myMap.set(i, imgurl)));

        // setImgList((imgList) => [...imgList, imgurl]);
        compare(img);
      };
    }
  };
  const compare = (image) => {
    //容器宽度
    let clientWidth = width || window.innerWidth;

    clientWidth -= 108;
    //计算每行宽度
    rowWidth.current += image.metaWidth;
    //如果宽度大于容器宽度，去掉多余的宽度，整体进行缩放适应容器让右边对齐
    if (rowWidth.current > clientWidth) {
      //减去每个css padding边距
      // console.log(rowWidth.current);
      clientWidth =
        clientWidth - (rowIndexEnd.current - rowIndexStart.current) * 40 - 40;
      // console.log(clientWidth);
      //把高度调整为放大后的
      let growRatio = clientWidth / rowWidth.current;
      // console.log(growRatio);
      // console.log(rowCount.current);
      // if (myMap[rowCount.current]) {

      [...imgList.keys()].forEach((k, i) => {
        if (i >= rowIndexStart.current && i <= rowIndexEnd.current) {
          // console.log(i, rowIndexStart.current, rowIndexEnd.current);
          const item = imgList.get(k);
          item.height = growRatio * item.metaHeight;
          item.width = growRatio * item.metaWidth;
          // console.log(item);
          setImgList(new Map(imgList.set(k, item)));
        }
      });
      // console.log(imgList);
      // } else {
      //   myMap[rowCount.current] = [];
      // }
      // image.height = growRatio * image.metaHeight;
      // image.width = growRatio * image.metaWidth;

      // const newList = myMap[rowCount.current];
      // newList.push(image);
      // const newMap = myMap;
      // newMap[rowCount.current] = [...newList];
      // setMyMap(() => {
      //   return { ...newMap };
      // });

      // setMyMap({
      //   type: "insert",
      //   payload: { index: rowCount.current, value: image },
      // });

      rowWidth.current = 0;
      rowIndexStart.current = rowIndexEnd.current + 1;
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
      // myMap.forEach((item) => {
      //   if (item.key === image.key) {
      //     item.height = item.metaHeight;
      //     item.width = item.metaWidth;
      //   }
      // });
      image.height = image.metaHeight;
      image.width = image.metaWidth;

      // myMap.push(item);
      // const newMap = myMap;
      // newMap[rowCount.current] = [...newList];
      // setMyMap({
      //   type: "insert",
      //   payload: { index: rowCount.current, value: image },
      // });
      // setMyMap(() => {
      //   return { ...newMap };
      // });
    }
    rowIndexEnd.current += 1;
  };
  const resize = () => {
    // if (width) {
    // setMyMap({});
    //将已存在的图片数据展开，重新计算
    // let newList = [];
    // Object.values(myMap).map((v) => {
    //   {
    //     v.map((v2) => newList.push(v2));
    //   }
    //   return;
    // });

    //清空数据
    // setMyMap({});
    rowWidth.current = 0;
    rowIndexStart.current = 0;
    rowIndexEnd.current = 0;
    // console.log(myMap);
    imgList.forEach((image) => compare(image));
    // }
  };

  useEffect(() => {
    loadImage();
  }, []);

  return (
    <div className={styles.layout}>
      <div ref={ref} className={styles.waterfall}>
        {[...myMap.keys()].map((k, i) => (
          <div
            className={styles.imageBox}
            key={k}
            style={{
              width: imgList.get(k).width,
              height: imgList.get(k).height,
            }}
          >
            <img
              src={myMap.get(k).url}
              // width={imgList.get(k).width}
              // height={imgList.get(k).height}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
