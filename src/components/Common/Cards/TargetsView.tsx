import { RingProgress } from "@ant-design/charts";
import { observer } from "mobx-react-lite";
import numeral from "numeral";

import { useStore } from "../../../hooks/use-store.hooks";

const TargetsView = observer(() => {
  const { targetStore } = useStore();

  return (
    <>
      {targetStore.getAllTargets.length > 0 ? (
        <div className="mt-4 row">
          <h5 className="mdc-top-app-bar__title font-weight-light ml-4 mb-1 p-0">
            Target Saving
          </h5>

          <ul className="collection bd-0  m-0 pl-3">
            {targetStore.getAllTargets.map((t) => (
              <li
                className="d-flex row m-0 mb-4 justify-content-between"
                key={t.id}
              >
                <RingProgress
                  width={50}
                  height={50}
                  percent={t.percentageCompletion}
                  color={t.color}
                />
                <span
                  style={{
                    width: "10px",
                    height: "10px",
                    backgroundColor: t.color,
                  }}
                  className="bg-doughnut1 rounded-20 m-3 mt-4 d-block"
                ></span>
                <span className="p-title mt-3 d-block">{t.item}</span>
                <span className="p-title mt-3 d-block text-right">{`₦${numeral(
                  t.targetAmountInView
                ).format("0,0")}`}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </>
  );
});

export default TargetsView;
