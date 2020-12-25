import React, {useEffect, useRef} from 'react';
// import GridLayout from 'react-grid-layout';
import GridLayout, { Responsive, WidthProvider  } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'
import styles from './style.less'
const ResponsiveGridLayout = WidthProvider(Responsive);
import { useSize } from 'ahooks';
import pic1 from '../../assets/images/01.webp'
import pic2 from '../../assets/images/02.webp'
import pic3 from '../../assets/images/03.webp'
import pic4 from '../../assets/images/04.webp'
import pic5 from '../../assets/images/05.webp'
import pic6 from '../../assets/images/06.webp'
import pic7 from '../../assets/images/07.webp'
import pic8 from '../../assets/images/08.webp'
import pic9 from '../../assets/images/09.webp'
import pic10 from '../../assets/images/10.webp'
import pic11 from '../../assets/images/11.webp'
import pic12 from '../../assets/images/12.webp'
import pic13 from '../../assets/images/13.webp'
import pic14 from '../../assets/images/14.webp'
import pic15 from '../../assets/images/15.webp'
import pic16 from '../../assets/images/16.webp'
import pic17 from '../../assets/images/17.webp'
import pic18 from '../../assets/images/18.webp'
import pic19 from '../../assets/images/19.webp'
import pic20 from '../../assets/images/20.webp'
import pic21 from '../../assets/images/21.webp'
import pic22 from '../../assets/images/22.webp'
import pic23 from '../../assets/images/23.webp'
import pic24 from '../../assets/images/24.webp'
import pic25 from '../../assets/images/25.webp'
import pic26 from '../../assets/images/26.webp'
import pic27 from '../../assets/images/27.webp'

const Home = () => {
  const layouts = {
    
  };
  const ref = useRef();
  const size = useSize(ref);
  
  useEffect(() => {
    console.log(size.width)
  },[size])
  const layout = [
    { i: 'a', x: 0, y: 0, w: 2, h: 1, static: true },
    { i: 'b', x: 2, y: 0, w: 2, h: 1, minW: 2, maxW: 4 },
    { i: 'c', x: 4, y: 0, w: 1, h: 1 }
    ]
  ;
    //   <ResponsiveGridLayout className={styles.layout} layout={layouts}  rowHeight={340} width={1200}
    //     breakpoints={{lg: 1200}}
    //     cols={{lg: 12}}>
    //     <div key="a" data-grid={{x:0,y:0,w:10,h:1,static:true}}>a</div>
    //     <div key="b" data-grid={{x:2,y:0,w:2,h:0.5,static:true}}>b</div>
    //     {/* <div key="c">c</div> */}
    // </ResponsiveGridLayout>

  return (
      <div ref={ref}>
        <GridLayout className={styles.layout} layout={layout} rowHeight={340} width={1920} containerPadding={[40,40]}>
          <div key="a"><img src={pic1}></img></div>
          <div key="b">b</div>
          <div key="c">c</div>
        </GridLayout>
      </div>

  )

}

export default Home