import { useState } from 'react';
import { FeedbackOptions } from './FeedbackOptions/FeedbackOptions';
import { Notification } from './Notification/Notification';
import { Section } from './Section/Section';
import { Statistics } from './Statistics/Statistics';

export function App() {
  const [total, setTotal] = useState(0);
  const [good, setGoog] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const countPositiveFeedbackPercentage = (good, total) => {
    if (total === 0) {
      return 0;
    }
    return (good / (total / 100)).toFixed(0);
  };

  const countTotalFeedback = key => {
    const calc = prevState => prevState + 1;

    setTotal(calc);
    switch (key) {
      case 'good':
        setGoog(calc);
        break;
      case 'neutral':
        setNeutral(calc);
        break;
      case 'bad':
        setBad(calc);
        break;

      default:
        return;
    }
  };

  const positivePercentage = countPositiveFeedbackPercentage(good, total);
  return (
    <Section>
      <FeedbackOptions
        onLeaveFeedback={countTotalFeedback}
      />
      <h2>Statistics</h2>
      {total < 1 ? (
        <Notification message="There is no feedback" />
      ) : (
        <Statistics
          good={good}
          neutral={neutral}
          bad={bad}
          total={total}
          positivePercentage={positivePercentage}
        />
      )}
    </Section>
  );
}
