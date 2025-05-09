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

const FeedbackDisplay: React.FC<FeedbackProps> = ({ feedback, topic }) => {
  if (!feedback) return null;

  const { scores, strengths, improvements } = feedback;

  const getLetterGrade = (score: number) => {
    if (score >= 0.9) return 'A';
    if (score >= 0.8) return 'B';
    if (score >= 0.7) return 'C';
    if (score >= 0.6) return 'D';
    return 'F';
  };

  const formatPercent = (score: number) => `${Math.round(score * 100)}%`;

  const overallGrade = getLetterGrade(scores.overall);

  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="bg-primary text-primary-foreground p-4 text-center">
        <p className="text-xl font-bold">
          Overall Grade: {overallGrade} ({formatPercent(scores.overall)})
        </p>
      </div>

      <div className="p-6 bg-card">
        {overallGrade !== 'F' && (
          <>
            {/* Score Breakdown */}
            <div className="mb-6">
              <h4 className="text-lg font-medium mb-3">Score Breakdown</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {scores.clarity && (
                  <ScoreCard label="Clarity" score={scores.clarity} />
                )}
                {scores.accuracy && (
                  <ScoreCard label="Accuracy" score={scores.accuracy} />
                )}
                {scores.comprehensiveness && (
                  <ScoreCard label="Comprehensiveness" score={scores.comprehensiveness} />
                )}
                {scores.empathy && (
                  <ScoreCard label="Empathy" score={scores.empathy} />
                )}
                {scores.technicalAccuracy && (
                  <ScoreCard label="Technical Accuracy" score={scores.technicalAccuracy} />
                )}
              </div>
            </div>

            {/* Strengths & Improvements */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {strengths.length > 0 && (
                <div>
                  <h4 className="text-lg font-medium mb-3">Strengths</h4>
                  <ul className="list-disc pl-5 space-y-2">
                    {strengths.map((strength, index) => (
                      <li key={index}>{strength}</li>
                    ))}
                  </ul>
                </div>
              )}
              {improvements.length > 0 && (
                <div>
                  <h4 className="text-lg font-medium mb-3">Areas for Improvement</h4>
                  <ul className="list-disc pl-5 space-y-2">
                    {improvements.map((improvement, index) => (
                      <li key={index}>{improvement}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </>
        )}

        {overallGrade === 'F' && (
          <div className="text-center">
            <h4 className="text-lg font-medium mb-3">Areas for Improvement</h4>
            <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
              <li>Please submit a viable answer.</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );

  // Small reusable component for score display
  function ScoreCard({ label, score }: { label: string; score: number }) {
    return (
      <div className="border rounded-md p-3">
        <p className="text-sm text-muted-foreground">{label}</p>
        <div className="flex items-end justify-between">
          <p className="text-2xl font-bold">{formatPercent(score)}</p>
          <p className="text-lg">{getLetterGrade(score)}</p>
        </div>
      </div>
    );
  }
};

export default FeedbackDisplay;