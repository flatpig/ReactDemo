import React, { useEffect, useReducer, useRef, useState } from "react";
import styles from "./style.less";
import ReactDOM from "react-dom";
import CytoscapeComponent from "react-cytoscapejs";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);
const ReactButton = () => {
  return <div className={cx("tooltip")}>我是tooltip</div>;
};

const createContentFromComponent = (component) => {
  const dummyDomEle = document.createElement("div");
  ReactDOM.render(component, dummyDomEle);
  document.body.appendChild(dummyDomEle);
  return dummyDomEle;
};
const SVG = () => {
  const cyRef = useRef(null);
  const cyPopperRef = useRef(null);
  const cy_ref = useRef(null);

  const styleSheet = [
    {
      selector: "node",
      style: {
        width: 50,
        height: 50,
        "background-color": "rgba(102, 102, 102, 1)",
        "border-style": "solid",
        "border-width": "3px",
        "border-color": "#fff",
      },
    },
    {
      selector: ".active",
      style: {
        "background-color": "#049DB2",
      },
    },
    {
      selector: "#a",
      style: {
        width: 80,
        height: 80,
        "background-color": "#F6DF4E",
        "border-color": "#fff",
        "background-fit": "cover",
      },
    },
    {
      selector: "node[label]",
      style: {
        label: "data(label)",
        color: "#fff",
        "text-halign": "center",
        "text-valign": "center",
        "font-size": "12px",
        "text-wrap": "ellipsis",
        "text-max-width": "30px",
      },
    },
    {
      selector: "node[label]#a",
      style: {
        label: "data(label)",
        color: "#111",
        "font-size": "16px",
      },
    },
    {
      selector: "edge",
      style: {
        width: 1,
        "line-color": "rgba(151, 151, 151, 1)",
        "target-arrow-color": "rgba(151, 151, 151, 1)",
        "target-arrow-shape": "triangle",
        "curve-style": "bezier",
      },
    },

    {
      selector: "edge[label]",
      style: {
        label: "data(label)",
        "text-rotation": "autorotate",
        "text-opacity": 0,
        "font-size": "14px",
      },
    },
    {
      selector: "edge.edgeActive",
      style: {
        width: 1,
        "line-color": "#049DB2",
        "target-arrow-color": "#049DB2",
        "text-opacity": 1,
        color: "#049DB2",
      },
    },
  ];
  const elements = [
    {
      data: {
        id: "a",
        label: "a",
        bar: 5,
        baz: 2,
        position: { x: 600, y: 350 },
      },
    },
    { data: { id: "b", label: "bdddddd", bar: 1, baz: 3 } },
    { data: { id: "c", label: "c", bar: 3, baz: 5 } },
    { data: { id: "d", label: "d", bar: 1, baz: 2 } },
    { data: { id: "e", label: "e", bar: 3, baz: 5 } },
    { data: { id: "ab", label: "RF", source: "a", target: "b" } },
    { data: { id: "ac", label: "RF", source: "a", target: "c" } },
    { data: { id: "ad", label: "RF", source: "a", target: "d" } },
    { data: { id: "ae", label: "RF", source: "a", target: "e" } },
    { data: { id: "ae", label: "RF", source: "a", target: "e" } },
  ];

  // const layout = { name: "concentric", fit: false, minNodeSpacing: 100 };
  const layout = {
    name: "cose",
    fit: false,
    animate: false,
    // boundingBox: { x1: 0, y1: 0, w: 1200, y: 700 },
  };
  // useEffect(() => {
  //   if (cy) {
  //     cy.on("mouseover", "node", (event) => {
  //       console.log(event.target.position());
  //       console.log(event.target);
  // let popper = event.target.popper({
  //   content: () => {
  //     // create div container
  //     let tooltip = document.createElement("div");

  //     // adding id for easier JavaScript control
  //     tooltip.id = tooltipId;

  //     // adding class for easier CSS control
  //     tooltip.classList.add("target-popper");

  //     // create actual table
  //     let table = document.createElement("table");

  //     // append table to div container
  //     tooltip.append(table);
  //     let targetData = target.data();

  //     // loop through target data
  //     for (let prop in targetData) {
  //       if (!targetData.hasOwnProperty(prop)) continue;

  //       let targetValue = targetData[prop];
  //       // no recursive or reduce support
  //       if (typeof targetValue === "object") continue;

  //       let tr = table.insertRow();

  //       let tdTitle = tr.insertCell();
  //       let tdValue = tr.insertCell();

  //       tdTitle.innerText = prop;
  //       tdValue.innerText = targetValue;
  //     }

  //     document.body.appendChild(tooltip);

  //     return tooltip;
  //   },
  // });
  // event.target.on("position", () => {
  //   popper.scheduleUpdate();
  // });

  // event.target.cy().on("pan zoom resize", () => {
  //   popper.scheduleUpdate();
  // });
  // event.target.addClass(cx("rightActive"));
  //   cy.collection("edge").removeClass("edgeActive");
  //   event.target.neighborhood("edge").addClass("edgeActive");
  // });
  // cy.on("mouseout ", "#a", (event) => {
  //   console.log("moveOut");
  // });
  // cy.on("click", "#a", (event) => {
  //   // alert(1);
  // });
  // let popperRef1 = cy.nodes()[0].popperRef();

  // [0].popper({
  //   content: () => {
  //     let div = document.createElement("div");

  //     div.innerHTML = "Popper content";

  //     document.body.appendChild(div);

  //     return div;
  //   },
  //   popper: {}, // my popper options here
  // });
  // console.log(popper1);
  // let popper = node.popper({
  //   content: () => {
  //     let div = document.createElement("div");

  //     div.innerHTML = "Sticky Popper content";

  //     document.body.appendChild(div);

  //     return div;
  //   },
  // });

  // let update = () => {
  //   popper.scheduleUpdate();
  // };

  // node.on("position", update);

  // cy.on("pan zoom resize", update);
  // }
  // });
  useEffect(() => {
    const cy = cyRef.current;
    cy.nodes().on("mouseover", (event) => {
      const { target } = event;
      target.addClass("active");
      event.cy.container().style.cursor = "pointer";
      target.neighborhood("edge").addClass("edgeActive");
      cyPopperRef.current = target.popper({
        content: createContentFromComponent(<ReactButton />),
        popper: {
          placement: "right-end",
          removeOnDestroy: true,
        },
      });
    });

    cy.nodes().on("mouseout", (event) => {
      const { target } = event;
      if (cyPopperRef) {
        cyPopperRef.current.destroy();
      }
      event.cy.container().style.cursor = "default";
      target.removeClass("active");
      target.neighborhood("edge").removeClass("edgeActive");
    });
  }, []);
  return (
    <div className={cx("layout")}>
      <CytoscapeComponent
        elements={elements}
        // userPanningEnabled={false} // 用户不能拖动基准位置
        // autolock={true}
        // autoungrabify={true}
        ref={cy_ref}
        cy={(cy) => {
          cyRef.current = cy;
          // setCy(cy);
        }}
        maxZoom={2}
        minZoom={0.5}
        stylesheet={styleSheet}
        // ref={graph}
        pan={{ x: 400, y: 200 }}
        layout={layout}
        style={{
          width: "1200px",
          height: "700px",
          backgroundColor: "#F6F6F6",
          // cursor: "point",
        }}
      />
    </div>
  );
};

export default SVG;
