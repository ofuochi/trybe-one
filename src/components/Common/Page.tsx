import React from "react";
import { Line, Pie } from "@ant-design/charts";

const Page: React.FC = () => {
  const data = [
    { year: "1991", value: 3 },
    { year: "1992", value: 4 },
    { year: "1993", value: 3.5 },
    { year: "1994", value: 5 },
    { year: "1995", value: 4.9 },
    { year: "1996", value: 6 },
    { year: "1997", value: 7 },
    { year: "1998", value: 9 },
    { year: "1999", value: 13 },
  ];

  let chart: any;

  // 导出图片
  const downloadImage = () => {
    chart?.downloadImage();
  };

  // 获取图表 base64 数据
  const toDataURL = () => {
    console.log(chart?.toDataURL());
  };

  const pieConfig = {
    data,
    angleField: "value",
    colorField: "year",
  };

  return <Pie {...pieConfig} />;
};
export default Page;
