import { Pie } from "@ant-design/charts";
import { observer } from "mobx-react-lite";
import numeral from "numeral";

import { useStore } from "../../hooks/use-store.hooks";

const Donut = observer(() => {
  const { targetStore } = useStore();

  const pieConfig = {
    data: targetStore.getAllTargets.map((t) => ({
      targetAmountInView: t.targetAmountInView,
      item: t.item,
    })),
    innerRadius: 0.64,
    radius: 1,
    interactions: [{ type: "element-selected" }, { type: "element-active" }],
    appendPadding: 10,
    statistic: {
      content: {
        formatter: (_data1: any, data2: any) => {
          const d = data2.map(
            ({ targetAmountInView }: API.GetTargetSavingsResponseDto) =>
              targetAmountInView
          );
          const sum =
            d.length > 0
              ? d.reduce((prev: number, next: number) => prev + next)
              : 0;

          return `₦${numeral(sum).format("0,0")}`;
        },
      },
      title: {
        formatter: () => "Total",
      },
    },
    angleField: "targetAmountInView",
    colorField: "item",
    color: targetStore.getAllTargets.map((target) => target.color),
  };
  return (
    <>
      {targetStore.getAllTargets.length > 0 ? (
        <>
          <div className="col-lg-6">
            <div className="d-flex row m-0 justify-content-between pie-size">
              <Pie {...pieConfig} />
            </div>
          </div>
        </>
      ) : null}
    </>
  );
});

export default Donut;
