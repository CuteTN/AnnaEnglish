import React, { useMemo } from "react";
import { ProgressStep, ProgressSteps } from "react-native-progress-steps";

export default GameProgress = ({ currentStep = 0, maxSteps }) => {
  const tempArray = useMemo(() => {
    return new Array(maxSteps);
  }, [maxSteps]);

  return (
    <ProgressSteps>
      {tempArray.map((t) => (
        <ProgressStep />
      ))}
    </ProgressSteps>
  );
};
