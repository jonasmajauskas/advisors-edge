import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl">

        <Link to="/66-prep" className="bg-card border rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer flex flex-col">
          <h3 className="text-xl font-semibold mb-2">Series 66 Prep</h3>
          <p className="text-muted-foreground mb-4 flex-grow">
            Master state securities regulations, investment adviser laws, and ethical business practices to pass the Series 66.
          </p>
          <button className="bg-primary text-primary-foreground py-2 px-4 rounded-md mt-auto">
            Start Assessment
          </button>
        </Link>

        <Link to="/sie-prep" className="bg-card border rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer flex flex-col">
          <h3 className="text-xl font-semibold mb-2">SIE® Prep</h3>
          <p className="text-muted-foreground mb-4 flex-grow">
            Challenge yourself with basic financial topics to ace the Securities Industry Essentials® (SIE®) Exam.
          </p>
          <button className="bg-primary text-primary-foreground py-2 px-4 rounded-md mt-auto">
            Start Assessment
          </button>
        </Link>

        <Link to="/client-simulator" className="bg-card border rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer flex flex-col">
          <h3 className="text-xl font-semibold mb-2">Client Simulator</h3>
          <p className="text-muted-foreground mb-4 flex-grow">
            Practice handling client scenarios and refine your communication strategies to respond confidently and professionally.
          </p>
          <button className="bg-primary text-primary-foreground py-2 px-4 rounded-md mt-auto">
            Run Simulator
          </button>
        </Link>

        <div className="bg-muted border border-border rounded-lg p-6 cursor-not-allowed flex flex-col opacity-60">
          <h3 className="text-xl font-semibold mb-2">Series 7 Prep</h3>
          <p className="text-muted-foreground mb-4 flex-grow">
            Coming soon...
          </p>
          <button className="bg-muted text-muted-foreground py-2 px-4 rounded-md mt-auto cursor-not-allowed" disabled>
            Coming Soon
          </button>
        </div>

        <div className="bg-muted border border-border rounded-lg p-6 cursor-not-allowed flex flex-col opacity-60">
          <h3 className="text-xl font-semibold mb-2">Series 3 Prep</h3>
          <p className="text-muted-foreground mb-4 flex-grow">
            Coming soon...
          </p>
          <button className="bg-muted text-muted-foreground py-2 px-4 rounded-md mt-auto cursor-not-allowed" disabled>
            Coming Soon
          </button>
        </div>

        <Link to="/explanation" className="bg-muted border border-border rounded-lg p-6 cursor-not-allowed flex flex-col opacity-60">
          <h3 className="text-xl font-semibold mb-2">Explanation Grader</h3>
          <p className="text-muted-foreground mb-4 flex-grow">
            Coming soon...
          </p>
          <button className="bg-muted text-muted-foreground py-2 px-4 rounded-md mt-auto cursor-not-allowed" disabled>
            Coming Soon
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;