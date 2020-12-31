import React, { useEffect, useRef, useState } from "react";
import styles from "./style.less";
import { useSize } from "ahooks";

const Home = () => {
  // const [myMap, setMyMap] = useState(new Map());
  const [myMap, setMyMap] = useState([]);
  const ref = useRef();
  const size = useSize(ref);

  useEffect(() => {
    // console.log(size.width)
  }, [size]);

  const loadImage = () => {
    for (let i = 1; i < 28; i++) {
      let image = new Image();
      if (i <= 9) {
        i = "0" + i;
      }
      let url = require(`../../assets/images/${i}.webp`);
      image.src = url;
      image.onload = () => {
        const imgTmp = {
          url: url,
          width: image.width,
          height: image.height,
        };
        // setMyMap(new Map(myMap.set(i,imgTmp)));
        setMyMap((myMap) => [...myMap, imgTmp]);
      };
    }
  };
  useEffect(() => {
    loadImage();
  }, []);

  return (
    <div className={styles.layout}>
      <div ref={ref} className={styles.waterfall}>
        {/* {[...myMap.keys()].map(k => (
          <div className={styles.imageBox}  key={k} >
            <img src={myMap.get(k).url} width={myMap.get(k).width} height={myMap.get(k).height}/> 
            </div>
        ))} */}
        {myMap.map((v, i) => (
          <div className={styles.imageBox} key={i}>
            <img src={v.url} width={v.width} height={v.height} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
