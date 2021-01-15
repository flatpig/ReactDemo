import React, { useEffect, useReducer, useRef, useState } from "react";
import styles from "./style.less";
import { useSize, useThrottleFn } from "ahooks";
import LazyLoad from "react-lazyload";
import PicList from "./test";
const Home = () => {
  // const myMap = useReactive({});
  const [myMap, setMyMap] = useState(new Map());
  const [imgList, setImgList] = useState(new Map());
  const ref = useRef(null);
  const [width, setWidth] = useState(0);
  const rowWidth = useRef(0);
  const rowCount = useRef(0);
  const rowIndexStart = useRef(0);
  const rowIndexEnd = useRef(0);
  const { run } = useThrottleFn(
    () => {
      resize();
    },
    {
      wait: 1,
    }
  );

  useEffect(() => {
    // console.log(size.width);
    // let timer = setTimeout(resize, 10);
    // return () => {
    //   clearTimeout(timer);
    // };
    run();
  }, [width]);
  useEffect(() => {
    const updateWindowDimensions = () => {
      const newWidth = window.innerWidth;
      setWidth(newWidth);
    };

    window.addEventListener("resize", updateWindowDimensions);

    return () => window.removeEventListener("resize", updateWindowDimensions);
  }, []);

  const loadImage = () => {
    for (let i = 1; i < PicList.length; i++) {
      let image = new Image();
      let url = PicList[i].url;
      image.src = url;
      image.onload = () => {
        const img = {
          index: i,
          metaWidth: image.width,
          metaHeight: image.height,
          width: image.width,
          height: image.height,
        };

        const imgurl = {
          url: url,
        };

        setImgList(new Map(imgList.set(i, img)));
        setMyMap(new Map(myMap.set(i, imgurl)));

        compare(img);
      };
    }
  };
  const compare = (image) => {
    //容器宽度
    let clientWidth = width || window.innerWidth;

    clientWidth -= 108;

    //计算每行宽度
    rowWidth.current = rowWidth.current + image.metaWidth + 40;

    //如果宽度大于容器宽度，去掉多余的宽度，整体进行缩放适应容器让右边对齐
    if (rowWidth.current > clientWidth) {
      //减去每个css padding边距

      clientWidth =
        clientWidth - (rowIndexEnd.current - rowIndexStart.current) * 40 - 40;

      //把高度调整为放大后的
      let growRatio =
        clientWidth / (rowWidth.current - rowCount.current * 40 - 40);

      [...imgList.keys()].forEach((k, i) => {
        if (i >= rowIndexStart.current && i <= rowIndexEnd.current) {
          const item = imgList.get(k);
          item.growRatio = growRatio;
          item.height = growRatio * item.metaHeight;
          item.width = growRatio * item.metaWidth;
          setImgList(new Map(imgList.set(k, item)));
        }
      });

      rowWidth.current = 0;
      rowCount.current = 0;
      rowIndexStart.current = rowIndexEnd.current + 1;
    } else {
      rowCount.current += 1;
      image.height = image.metaHeight;
      image.width = image.metaWidth;
    }
    rowIndexEnd.current += 1;
  };
  const compare2 = () => {
    // let count = 1;
    const elements = ref.current.children;
    let clientWidth = width || window.innerWidth;
    let newEle = [];
    clientWidth -= 108;
    const margin = 40;

    let currentW = 0;
    elements.forEach((k) => {
      newEle.push(k);
      const w = parseFloat(k.dataset.w);

      currentW += w + margin;
      console.log(currentW, clientWidth);
      if (currentW >= clientWidth) {
        const m = newEle.length * margin;
        let ratio = (clientWidth - m) / (currentW - m);
        newEle.forEach((kk) => {
          kk.style.width = Math.ceil(parseFloat(kk.dataset.w) * ratio) + 'px';
          kk.style.height = Math.ceil(parseFloat(kk.dataset.h) * ratio) + "px";
          // kk.setAttribute(
          //   "style",
          //   `width:${Math.ceil(
          //     parseFloat(kk.dataset.w) * ratio
          //   )}px;height:${Math.ceil(
          //     parseFloat(k.dataset.h) * ratio
          //   )}px;display:'block'`
          // );
        });
        (newEle = []), (currentW = 0);
      }
    });
    // ref.current.children.forEach((k, i) => {
    //   if (i >= rowIndexStart.current && i <= rowIndexEnd.current) {
    //     console.log(i);
    //     k.setAttribute(
    //       "style",
    //       `width:${parseFloat(k.dataset.w) * growRatio}px;height:${
    //         parseFloat(k.dataset.h) * growRatio
    //       }px`
    //     );
    //   }
    // });
  };
  const resize = () => {
    rowWidth.current = 0;
    rowCount.current = 0;
    rowIndexStart.current = 0;
    rowIndexEnd.current = 0;
    // console.log("enter resize");
    // imgList.forEach((image) => compare(image));
    compare2();
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
            data-w={imgList.get(k).metaWidth}
            data-h={imgList.get(k).metaHeight}
            style={{
              width: `${imgList.get(k).width}px`,
              height: `${imgList.get(k).height}px`,
            }}
          >
            <a>
              <img src={myMap.get(k).url} />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
