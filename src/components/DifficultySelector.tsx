import React from 'react';
interface DifficultySelectorProps {
  difficulty: string;
  setDifficulty: (difficulty: string) => void;
}
const DifficultySelector: React.FC<DifficultySelectorProps> = ({
  difficulty,
  setDifficulty
}) => {
  return <div className="mb-6">
      <h3 className="text-lg font-medium mb-2">Difficulty Level</h3>
      <div className="flex space-x-4">
        {['beginner', 'medium', 'advanced', 'expert'].map(level => <button key={level} className={`px-4 py-2 rounded-md ${difficulty === level ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'}`} onClick={() => setDifficulty(level)}>
            {level.charAt(0).toUpperCase() + level.slice(1)}
          </button>)}
      </div>
    </div>;
};
export default DifficultySelector;