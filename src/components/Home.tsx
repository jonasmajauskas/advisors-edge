import React from 'react';
interface HomeProps {
  onSelectMode: (mode: string) => void;
}
const Home: React.FC<HomeProps> = ({
  onSelectMode
}) => {
  return <div className="flex flex-col items-center justify-center">
    <div className="max-w-2xl text-center mb-12">
      <h2 className="text-3xl font-bold mb-4">Welcome to AdvisorsEdge</h2>
      <p className="mb-6 text-muted-foreground">
        Enhance your ability to explain financial concepts and interact with
        clients. Choose a mode to begin practicing and receive personalized
        feedback.
      </p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl">
      <div onClick={() => onSelectMode('flashcard')} className="bg-card border rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer flex flex-col">
        <h3 className="text-xl font-semibold mb-2">General Assessment</h3>
        <p className="text-muted-foreground mb-4 flex-grow">
          Test your knowledge with topic-specific Q&As. Practice answering financial questions accurately and thoroughly.
        </p>
        <button className="bg-primary text-primary-foreground py-2 px-4 rounded-md mt-auto">
          Start Assessment
        </button>
      </div>

      <div className="bg-muted border border-border rounded-lg p-6 cursor-not-allowed flex flex-col opacity-60">
        <h3 className="text-xl font-semibold mb-2">Explanation Grader</h3>
        <p className="text-muted-foreground mb-4 flex-grow">
          Practice explaining financial concepts and receive feedback on clarity, accuracy, and comprehensiveness.
        </p>
        <button
          className="bg-muted text-muted-foreground py-2 px-4 rounded-md mt-auto cursor-not-allowed"
          disabled
        >
          Coming soon
        </button>
      </div>

      <div className="bg-muted border border-border rounded-lg p-6 cursor-not-allowed flex flex-col opacity-60">
        <h3 className="text-xl font-semibold mb-2">Client Simulator</h3>
        <p className="text-muted-foreground mb-4 flex-grow">
          Interact with simulated clients of varying knowledge levels and get feedback on your communication skills.
        </p>
        <button
          className="bg-muted text-muted-foreground py-2 px-4 rounded-md mt-auto cursor-not-allowed"
          disabled
        >
          Coming soon
        </button>
      </div>


    </div>
  </div>;
};
export default Home;