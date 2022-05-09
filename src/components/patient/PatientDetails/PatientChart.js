import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";

const PatientChart = ({ date, xaxisTitle, yaxisTitle }) => {
  const { id, hoursSinceLastMed } = date;

  const [leftChart3D, setLeftChart3D] = useState({
    x: [],
    y: [],
    z: [],
    type: "scatter3d",
    mode: "markers",
    marker: { color: "orange" },
    name: "Lewa ręka",
  });

  const [rightChart3D, setRightChart3D] = useState({
    x: [],
    y: [],
    z: [],
    type: "scatter3d",
    mode: "markers",
    marker: { color: "blue" },
    name: "Prawa ręka",
  });

  const [rightChart2D_X, setRightChart2D_X] = useState({
    x: [],
    y: [],
    type: "scatter",
    mode: "lines",
    marker: { color: "blue" },
    name: "Oś X - Prawa Ręka",
  });

  const [rightChart2D_Y, setRightChart2D_Y] = useState({
    x: [],
    y: [],
    type: "scatter",
    mode: "lines",
    marker: { color: "blue" },
    name: "Oś Y - Prawa Ręka",
  });

  const [rightChart2D_Z, setRightChart2D_Z] = useState({
    x: [],
    y: [],
    type: "scatter",
    mode: "lines",
    marker: { color: "blue" },
    name: "Oś Z - Prawa Ręka",
  });

  const [leftChart2D_X, setLeftChart2D_X] = useState({
    x: [],
    y: [],
    type: "scatter",
    mode: "lines",
    marker: { color: "orange" },
    name: "Oś X - Lewa Ręka",
  });

  const [leftChart2D_Y, setLeftChart2D_Y] = useState({
    x: [],
    y: [],
    type: "scatter",
    mode: "lines",
    marker: { color: "orange" },
    name: "Oś Y - Lewa Ręka",
  });

  const [leftChart2D_Z, setLeftChart2D_Z] = useState({
    x: [],
    y: [],
    type: "scatter",
    mode: "lines",
    marker: { color: "orange" },
    name: "Oś Z - Lewa Ręka",
  });

  useEffect(() => {
    if (date) {
      const timestamp_left = [];
      const x_left = [];
      const y_left = [];
      const z_left = [];

      const timestamp_right = [];
      const x_right = [];
      const y_right = [];
      const z_right = [];

      date.left.forEach((arr) => {
        arr = arr.split(",");
        const timestamp = arr[0];
        const x = arr[1];
        const y = arr[2];
        const z = arr[3];

        timestamp_left.push(timestamp);
        x_left.push(x);
        y_left.push(y);
        z_left.push(z);
      });

      setLeftChart3D({
        ...leftChart3D,
        x: x_left,
        y: y_left,
        z: z_left,
      });

      date.right.forEach((arr) => {
        arr = arr.split(",");
        const timestamp = arr[0];
        const x = arr[1];
        const y = arr[2];
        const z = arr[3];

        timestamp_right.push(timestamp);
        x_right.push(x);
        y_right.push(y);
        z_right.push(z);
      });

      setRightChart3D({
        ...rightChart3D,
        x: x_right,
        y: y_right,
        z: z_right,
      });

      setRightChart2D_X({
        ...rightChart2D_X,
        x: timestamp_right,
        y: x_right,
      });

      setRightChart2D_Y({
        ...rightChart2D_Y,
        x: timestamp_right,
        y: y_right,
      });

      setRightChart2D_Z({
        ...rightChart2D_Z,
        x: timestamp_right,
        y: z_right,
      });

      setLeftChart2D_X({
        ...leftChart2D_X,
        x: timestamp_left,
        y: x_left,
      });

      setLeftChart2D_Y({
        ...leftChart2D_Y,
        x: timestamp_left,
        y: y_left,
      });

      setLeftChart2D_Z({
        ...leftChart2D_Z,
        x: timestamp_left,
        y: z_left,
      });
    }
  }, [date]);

  return (
    <div>
      <h1 className="text-3xl text-center font-semibold text-gray-600 mt-6">
        Pomiar z {id}
      </h1>
      {hoursSinceLastMed === '""' ? (
        <h1 className="text-xl text-gray-600 mt-6 ml-6">
          Czas od ostaniej dawki leku: 0h
        </h1>
      ) : (
        <h1 className="text-xl text-gray-600 mt-6 ml-6">
          Czas od ostaniej dawki leku: {hoursSinceLastMed}h
        </h1>
      )}
      <Plot
        data={[rightChart3D, leftChart3D]}
        layout={{
          width: 900,
          height: 800,
          title: `Wykres 3D`,
        }}
      />
      <Plot
        data={[rightChart2D_X, leftChart2D_X]}
        layout={{
          width: 900,
          height: 800,
          title: `Wykres 2D - oś X`,
          xaxis: {
            title: xaxisTitle,
          },
          yaxis: {
            title: yaxisTitle,
          },
        }}
      />
      <Plot
        data={[rightChart2D_Y, leftChart2D_Y]}
        layout={{
          width: 900,
          height: 800,
          title: `Wykres 2D - oś Y`,
          xaxis: {
            title: xaxisTitle,
          },
          yaxis: {
            title: yaxisTitle,
          },
        }}
      />
      <Plot
        data={[rightChart2D_Z, leftChart2D_Z]}
        layout={{
          width: 900,
          height: 800,
          title: `Wykres 2D - oś Z`,
          xaxis: {
            title: xaxisTitle,
          },
          yaxis: {
            title: yaxisTitle,
          },
        }}
      />
    </div>
  );
};

export default PatientChart;
