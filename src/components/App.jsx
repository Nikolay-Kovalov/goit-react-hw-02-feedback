import { Component } from "react";
import { Statistics } from "./Statistics/Statistics";
import { FeedbackOptions } from "./FeedbackOptions/FeedbackOptions";
import { Section } from "./Section/Section";
import { Notification } from "./Notification/Notification";
import { Layout } from "./Layout";

export class App extends Component  {

  state = {
  good: 0,
  neutral: 0,
  bad: 0
  }

  addFeedback = feedback => {
    this.setState(prevState => ({ [feedback]: prevState[feedback] + 1 }));
  };
  
  countTotalFeedback = () => {
   return this.state.good + this.state.neutral + this.state.bad 
  };

  countPositiveFeedbackPercentage = () => {
    return Math.round((this.state.good / this.countTotalFeedback()) * 100) || 0
  };
 
  render() {
    return (
      <Layout>
        <Section
          title="Please leave feedback"/>
        <FeedbackOptions
          options={Object.keys(this.state)}
          onLeaveFeedback={this.addFeedback}
          
          />
      <Section/>
        <Section title="Statistics" />
        {(this.state.good > 0 || this.state.neutral > 0 || this.state.bad) ? <div> 
          <Statistics
          good={this.state.good}
          neutral={this.state.neutral}
          bad={this.state.bad}
          total={this.countTotalFeedback()}
          positivePercentage={this.countPositiveFeedbackPercentage()}
        />
        <Section /></div> : <Notification message="There is no feedback"/> }
      
      </Layout>
  )
}
};
