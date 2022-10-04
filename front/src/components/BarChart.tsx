import React, { useState } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
import { faker } from "@faker-js/faker";
import json from "../test_data/new_trash_count.json";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
interface TrashCount {
  [key: string]: {
    담배꽁초: number;
    "일반+담배꽁초": number;
    일반쓰레기: number;
    재활용쓰레기: number;
    항아리형: number;
  };
}
interface Data {
  labels: string[];
  datasets: [
    {
      label: string;
      data: number[];
      backgroundColor: string;
    },
    {
      label: string;
      data: number[];
      backgroundColor: string;
    },
    {
      label: string;
      data: number[];
      backgroundColor: string;
    },
    {
      label: string;
      data: number[];
      backgroundColor: string;
    },
  ];
}

export default function BarChart() {
  const [trash, setTrash] = useState<TrashCount>(json);
  console.log(trash);
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Chart.js Bar Chart",
      },
    },
  };
  const labels = Object.keys(trash);
  console.log(labels);
  const data: Data = {
    labels,
    datasets: [
      {
        label: "일반쓰레기",
        data: labels.map(i => trash[i].일반쓰레기),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "재활용",
        data: labels.map(i => trash[i].재활용쓰레기),
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      {
        label: "담배꽁초",
        data: labels.map(i => trash[i].담배꽁초),
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      {
        label: "항아리형",
        data: labels.map(i => trash[i].항아리형),
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };
  return <Bar options={options} data={data} />;
}
