import React, { useEffect, useReducer, useRef, useState } from "react";
import styles from "./style.less";
import { useSize, useThrottleFn } from "ahooks";
import PicList from "./test";
const Home = () => {
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
    // console.log(image, clientWidth, rowWidth.current, rowCount.current);
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
          // item.height = growRatio * item.metaHeight;
          // item.width = growRatio * item.metaWidth;
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
  const compare2 = (image) => {
    //容器宽度
    let clientWidth = width || window.innerWidth;

    clientWidth -= 108;

    //计算每行宽度

    rowWidth.current = rowWidth.current + parseFloat(image.dataset.w) + 40;
    //如果宽度大于容器宽度，去掉多余的宽度，整体进行缩放适应容器让右边对齐
    if (rowWidth.current > clientWidth) {
      //减去每个css padding边距
      clientWidth =
        clientWidth - (rowIndexEnd.current - rowIndexStart.current) * 40 - 40;

      //把高度调整为放大后的
      let growRatio =
        clientWidth / (rowWidth.current - rowCount.current * 40 - 40);

      ref.current.children.forEach((k, i) => {
        if (i >= rowIndexStart.current && i <= rowIndexEnd.current) {
          console.log(i);
          k.setAttribute(
            "style",
            `width:${parseFloat(k.dataset.w) * growRatio}px;height:${
              parseFloat(k.dataset.h) * growRatio
            }px`
          );
        }
      });

      rowWidth.current = 0;
      rowCount.current = 0;
      rowIndexStart.current = rowIndexEnd.current + 1;
    } else {
      rowCount.current += 1;
      image.setAttribute(
        "style",
        `width:${parseFloat(image.dataset.w)}px;height:${parseFloat(
          image.dataset.h
        )}px`
      );
      // image.height = image.metaHeight;
      // image.width = image.metaWidth;
    }
    rowIndexEnd.current += 1;
  };

  const compare3 = () => {
    //容器宽度
    let clientWidth = width || window.innerWidth;

    clientWidth -= 108;

    //计算每行宽度
    let rowW = 0;
    let rowIEnd = 0;
    let rowIStart = 0;
    let rowC = 0;
    ref.current.children.forEach((item, index) => {
      const metaW = parseFloat(item.dataset.w);
      const metaH = parseFloat(item.dataset.h);
      console.log(metaW, metaH);
      // if (i >= rowIndexStart.current && i <= rowIndexEnd.current) {
      //   console.log(i);
      //   k.setAttribute(
      //     "style",
      //     `width:${parseFloat(k.dataset.w) * growRatio}px;height:${
      //       parseFloat(k.dataset.h) * growRatio
      //     }px`
      //   );
    });
    // rowWidth.current = rowWidth.current + parseFloat(image.dataset.w) + 40;
    // //如果宽度大于容器宽度，去掉多余的宽度，整体进行缩放适应容器让右边对齐
    // if (rowWidth.current > clientWidth) {
    //   // console.log(rowWidth.current, rowCount.current);
    //   //减去每个css padding边距
    //   clientWidth =
    //     clientWidth - (rowIndexEnd.current - rowIndexStart.current) * 40 - 40;

    //   //把高度调整为放大后的
    //   let growRatio =
    //     clientWidth / (rowWidth.current - rowCount.current * 40 - 40);

    //   // [...imgList.keys()].forEach((k, i) => {
    //   //   if (i >= rowIndexStart.current && i <= rowIndexEnd.current) {
    //   //     // console.log(i, rowIndexStart.current, rowIndexEnd.current);
    //   //     const item = imgList.get(k);
    //   //     item.height = growRatio * item.metaHeight;
    //   //     item.width = growRatio * item.metaWidth;
    //   //     setImgList(new Map(imgList.set(k, item)));
    //   //   }
    //   // });
    //   ref.current.children.forEach((k, i) => {
    //     if (i >= rowIndexStart.current && i <= rowIndexEnd.current) {
    //       console.log(i);
    //       k.setAttribute(
    //         "style",
    //         `width:${parseFloat(k.dataset.w) * growRatio}px;height:${
    //           parseFloat(k.dataset.h) * growRatio
    //         }px`
    //       );
    //     }
    //   });

    //   rowWidth.current = 0;
    //   rowCount.current = 0;
    //   rowIndexStart.current = rowIndexEnd.current + 1;
    // } else {
    //   rowCount.current += 1;
    //   image.setAttribute(
    //     "style",
    //     `width:${parseFloat(image.dataset.w)}px;height:${parseFloat(
    //       image.dataset.h
    //     )}px`
    //   );
    //   // image.height = image.metaHeight;
    //   // image.width = image.metaWidth;
    // }
    // rowIndexEnd.current += 1;
  };
  const resize = () => {
    rowWidth.current = 0;
    rowCount.current = 0;
    rowIndexStart.current = 0;
    rowIndexEnd.current = 0;
    imgList.forEach((image) => compare(image));
    // ref.current.children.forEach((item) => {
    //   compare2(item);
    // });
    // compare3();
  };

  useEffect(() => {
    loadImage();
  }, []);

  //   <div className={styles.layout}>
  //   <div ref={ref} className={styles.waterfall}>
  // {[...myMap.keys()].map((k, i) => (
  //   <div
  //     className={styles.imageBox}
  //     key={k}
  //     data-w={imgList.get(k).metaWidth}
  //     data-h={imgList.get(k).metaHeight}
  //     style={{
  //       width: imgList.get(k).metaWidth * imgList.get(k).growRatio || 1,
  //       height: imgList.get(k).metaHeight * imgList.get(k).growRatio || 1,
  //     }}
  //   >
  //     <a>
  //       <img src={myMap.get(k).url} />
  //     </a>
  //   </div>
  //     ))}
  //   </div>
  // </div>
  return (
    <section>
      {[...myMap.keys()].map((k, i) => (
        <div
          className={styles.imageBox}
          key={k}
          data-w={imgList.get(k).metaWidth}
          data-h={imgList.get(k).metaHeight}
          style={{
            width: `${
              (imgList.get(k).metaWidth * 200) / imgList.get(k).metaHeight
            }px`,
            // maxWidth: `${
            //   (imgList.get(k).metaWidth * 340) / imgList.get(k).metaHeight
            // }px`,
            // maxHeight: "340px",
            // maxWidth: `${
            //   (imgList.get(k).metaWidth * 340) / imgList.get(k).metaHeight
            // }px`,
            flexGrow:
              (imgList.get(k).metaWidth * 200) / imgList.get(k).metaHeight,
          }}
        >
          <i
            style={{
              paddingBottom: `${
                (imgList.get(k).metaHeight / imgList.get(k).metaWidth) * 100
              }%`,
            }}
          ></i>

          <a>
            <img src={myMap.get(k).url} alt="" />
          </a>
        </div>
      ))}
      {/* <div
        ng-repeat="img in imgs"
        style="width:{{img.width*200/img.height}}px;flex-grow:{{img.width*200/img.height}}"
      >
        <i style="padding-bottom:{{img.height/img.width*100}}%"></i>
        <img src="{{img.url}}" alt="" />
      </div> */}
    </section>
  );
};

export default Home;
