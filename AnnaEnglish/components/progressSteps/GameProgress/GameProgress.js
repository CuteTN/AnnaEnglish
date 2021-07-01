import React, { useMemo } from 'react';
import { View } from 'react-native';
import { ProgressStep, ProgressSteps } from 'react-native-progress-steps';

// documentation: https://github.com/colbymillerdev/react-native-progress-steps

const MyProgressStep = ({ currentStep }) => {
  return (
    <ProgressStep
      removeBtnRow={true}
    />
  )
}

export default GameProgress = ({ currentStep = 0, countSteps, ...progressStepsProps }) => {
  const steps = useMemo(() => {
    const result = [];
    for (let i = 0; i < countSteps; i++)
      result.push(<MyProgressStep />);

    return result;
  }, [currentStep, countSteps])

  return (
    <View>
      <ProgressSteps activeStep={Math.min(currentStep, countSteps - 1)}
        {...(progressStepsProps ?? {})}
        style={{ backgroundColor: "white" }}
        progressBarColor="hotpink"
        completedProgressBarColor="hotpink"
        activeStepIconBorderColor="hotpink"
        completedStepIconColor="hotpink"
        topOffset={null} // margin top
        marginBottom={null} // margin bottom
      >
        {steps}
      </ProgressSteps>
    </View>
  )
}