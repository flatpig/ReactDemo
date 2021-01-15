import React, { useState, useRef, useEffect } from "react";
// import the core library.
import ReactEchartsCore from "echarts-for-react/lib/core";
import styles from "./style.less";
// then import echarts modules those you have used manually.
import echarts from "echarts/lib/echarts";
// import "echarts/lib/chart/bar";

import "echarts/lib/chart/graph";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/legend";
import "echarts/lib/component/title";

// The usage of ReactEchartsCore are same with above.
const TestEcharts = () => {
  // const getOption = () => {
  //   return option2;
  // };
  const echart1 = useRef();
  const [ready, setReady] = useState(false);
  const getOption = () => ({
    title: { text: "" },
    tooltip: {
      formatter: function (x) {
        return x.data.des;
      },
    },
    series: [
      {
        type: "graph",
        // 图的布局：可选： none circular(环形布局) force（力引导布局）
        layout: "circular",
        // 关系图节点标记的大小
        symbolSize: 60,
        // 是否开启鼠标缩放和平移漫游
        roam: true,
        // 是否在鼠标移到节点上的时候突出显示节点以及节点的边和邻接节点。
        // focusNodeAdjacency: true,
        // legendHoverLink: true,
        // 边两端的标记类型
        edgeSymbol: ["", "arrow"],
        // 边两端的标记大小
        edgeSymbolSize: [4, 7],
        // 力引导布局相关的配置项
        // force: {
        //   // 节点之间的斥力因子，值越大，斥力越大。通俗来说，值越大，两个节点之间的距离越大，即关系边的长度越长
        //   repulsion: 1000,
        //   // 边的两个节点之间的距离，以下设置：值最大的边长度会趋向于10，值最小的边长度会趋向于50
        //   // edgeLength: [10, 50]
        // },
        // 节点是否可拖拽
        draggable: false,
        animation: false,
        // 节点样式
        itemStyle: {
          normal: {
            color: "#666666",
            borderColor: "#fff",
            borderWidth: 2,
            // textStyle: {
            //   color: "red",
            // },
            // shadowBlur: 10,
          },
          emphasis: {
            color: "#049DB2",
            // shadowColor: "rgba(0, 0, 0, 0.8)",
          },
        },
        // 关系边的公用线条样式
        lineStyle: {
          normal: {
            textStyle: {
              fontSize: 14,
            },
            width: 1,
            color: "#979797",
          },
        },
        // 边的标签样式
        edgeLabel: {
          normal: {
            show: false,
            formatter: function (x) {
              return x.data.name;
            },
          },
        },
        // 节点标签的样式
        label: {
          width: 10,
          normal: {
            show: true,
            formatter: function (params) {
              // 超出省略
              params = params.name.toString();
              var maxlength = 4;
              if (params.length > maxlength) {
                return params.substring(0, maxlength - 1) + "...";
              } else {
                return params;
              }
            },

            textStyle: {},
          },
        },
        data: [
          {
            name: "a",
            des: "a",
            symbolSize: 80,
            itemStyle: {
              normal: {
                color: "#F6DF4E",
              },
            },
          },
          {
            name: "b",
            des: "b",
          },
          {
            name: "c",
            des: "c",
            symbolSize: 80,
          },
          {
            name: "我是一个小可爱",
            des: "d",
          },
          {
            name: "e",
            des: "e",
          },
        ],
        links: [
          {
            source: "a",
            target: "b",
            name: "RF",
            lineStyle: {
              color: "#979797",
            },
            label: {
              show: false,
              color: "#049DB2",
            },
          },
          {
            source: "a",
            target: "c",
            name: "RF",
            lineStyle: {
              color: "#979797",
            },
            label: {
              show: false,
              color: "#049DB2",
            },
          },
          {
            source: "a",
            target: "我是一个小可爱",
            name: "RF",
            lineStyle: {
              color: "#979797",
            },
            label: {
              show: false,
              color: "#049DB2",
            },
          },
          {
            source: "a",
            target: "e",
            name: "RF",
            lineStyle: {
              color: "#979797",
            },
            label: {
              show: false,
              color: "#049DB2",
            },
            // symbolSize: "1",
          },
          {
            source: "欧阳菁",
            target: "刘新建",
            name: "举报",
            lineStyle: {
              normal: {
                type: "dotted",
                color: "#000",
              },
            },
          },
          {
            source: "刘新建",
            target: "赵瑞龙",
            name: "举报",
            lineStyle: {
              normal: {
                type: "dotted",
                color: "#000",
              },
            },
          },
        ],
      },
    ],
  });
  const onChartClick = (e) => {
    console.log("click,", e);
  };
  const onChartHover = (e) => {
    console.log("hover,", e);
    console.log();
  };

  const onChartLegendselectchanged = (e) => {
    console.log("legend,", e);
  };
  const EventsDict = {
    // click: onChartClick,
    // mouseover: onChartHover,
    // legendselectchanged: onChartLegendselectchanged,
  };

  const onChartReady = (e) => {
    setReady(true);
  };
  useEffect(() => {
    if (ready) {
      const instance = echart1.current.getEchartsInstance();
      instance.on("mouseover", { dataType: "node" }, (e) => {
        const option = instance.getOption();
        option.series[0].links.map((item) => {
          if (item.source === e.data.name || item.target === e.data.name) {
            console.log(item);
            item.lineStyle.color = "#049DB2";
            item.label.show = true;
          }
          return item;
        });
        instance.setOption(option);
      });
      instance.on("mouseout", { dataType: "node" }, (e) => {
        const option = instance.getOption();
        option.series[0].links.map((item) => {
          if (item.source === e.data.name || item.target === e.data.name) {
            item.lineStyle.color = "#979797";
            item.label.show = false;
          }
          return item;
        });
        instance.setOption(option);
      });
      return;
    }
  }, [ready]);
  return (
    <div className={styles.bg}>
      <ReactEchartsCore
        echarts={echarts}
        ref={echart1}
        option={getOption()}
        notMerge={true}
        lazyUpdate={true}
        theme={"theme_name"}
        onChartReady={onChartReady}
        onEvents={EventsDict}
        // opts={}
      />
    </div>
  );
};

export default TestEcharts;
