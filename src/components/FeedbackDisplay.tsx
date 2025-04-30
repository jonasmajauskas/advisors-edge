import React from 'react';
interface FeedbackProps {
  feedback: {
    scores: {
      accuracy?: number;
      clarity: number;
      comprehensiveness?: number;
      empathy?: number;
      technicalAccuracy?: number;
      overall: number;
    };
    strengths: string[];
    improvements: string[];
  } | null;
  topic: string;
}
const FeedbackDisplay: React.FC<FeedbackProps> = ({
  feedback,
  topic
}) => {
  if (!feedback) return null;
  const {
    scores,
    strengths,
    improvements
  } = feedback;
  // Convert score to letter grade
  const getLetterGrade = (score: number) => {
    if (score >= 0.9) return 'A';
    if (score >= 0.8) return 'B';
    if (score >= 0.7) return 'C';
    if (score >= 0.6) return 'D';
    return 'F';
  };
  // Format percentage
  const formatPercent = (score: number) => {
    return `${Math.round(score * 100)}%`;
  };
  return <div className="border rounded-lg overflow-hidden">
      <div className="bg-primary text-primary-foreground p-4">
        <h3 className="text-xl font-bold">Your Feedback: {topic}</h3>
        <p className="text-primary-foreground/80">
          Overall Grade: {getLetterGrade(scores.overall)} (
          {formatPercent(scores.overall)})
        </p>
      </div>
      <div className="p-6 bg-card">
        <div className="mb-6">
          <h4 className="text-lg font-medium mb-3">Score Breakdown</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {scores.clarity && <div className="border rounded-md p-3">
                <p className="text-sm text-muted-foreground">Clarity</p>
                <div className="flex items-end justify-between">
                  <p className="text-2xl font-bold">
                    {formatPercent(scores.clarity)}
                  </p>
                  <p className="text-lg">{getLetterGrade(scores.clarity)}</p>
                </div>
              </div>}
            {scores.accuracy && <div className="border rounded-md p-3">
                <p className="text-sm text-muted-foreground">Accuracy</p>
                <div className="flex items-end justify-between">
                  <p className="text-2xl font-bold">
                    {formatPercent(scores.accuracy)}
                  </p>
                  <p className="text-lg">{getLetterGrade(scores.accuracy)}</p>
                </div>
              </div>}
            {scores.comprehensiveness && <div className="border rounded-md p-3">
                <p className="text-sm text-muted-foreground">
                  Comprehensiveness
                </p>
                <div className="flex items-end justify-between">
                  <p className="text-2xl font-bold">
                    {formatPercent(scores.comprehensiveness)}
                  </p>
                  <p className="text-lg">
                    {getLetterGrade(scores.comprehensiveness)}
                  </p>
                </div>
              </div>}
            {scores.empathy && <div className="border rounded-md p-3">
                <p className="text-sm text-muted-foreground">Empathy</p>
                <div className="flex items-end justify-between">
                  <p className="text-2xl font-bold">
                    {formatPercent(scores.empathy)}
                  </p>
                  <p className="text-lg">{getLetterGrade(scores.empathy)}</p>
                </div>
              </div>}
            {scores.technicalAccuracy && <div className="border rounded-md p-3">
                <p className="text-sm text-muted-foreground">
                  Technical Accuracy
                </p>
                <div className="flex items-end justify-between">
                  <p className="text-2xl font-bold">
                    {formatPercent(scores.technicalAccuracy)}
                  </p>
                  <p className="text-lg">
                    {getLetterGrade(scores.technicalAccuracy)}
                  </p>
                </div>
              </div>}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-lg font-medium mb-3">Strengths</h4>
            <ul className="list-disc pl-5 space-y-2">
              {strengths.map((strength, index) => <li key={index}>{strength}</li>)}
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-medium mb-3">Areas for Improvement</h4>
            <ul className="list-disc pl-5 space-y-2">
              {improvements.map((improvement, index) => <li key={index}>{improvement}</li>)}
            </ul>
          </div>
        </div>
      </div>
    </div>;
};
export default FeedbackDisplay;