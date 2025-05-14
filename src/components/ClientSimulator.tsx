import React, { useState } from 'react';
import FeedbackDisplay from './FeedbackDisplay';
import SpeechInput from './SpeechInput';
import { clientProfiles } from '../utils/topics';
import { Link, useNavigate } from 'react-router-dom';

const ClientSimulator: React.FC = () => {
  const [selectedProfile, setSelectedProfile] = useState('retiree');
  const [difficulty, setDifficulty] = useState('novice');
  const [customConcerns, setCustomConcerns] = useState<string[]>([]);
  const [newConcern, setNewConcern] = useState('');

  const navigate = useNavigate();

  const currentProfile = clientProfiles.find(profile => profile.id === selectedProfile);

  const startSimulation = () => {
    const concernsToPass = selectedProfile === 'custom'
      ? customConcerns
      : currentProfile?.concerns || [];
  
    navigate('/client-simulator-chat', {
      state: {
        clientProfileId: selectedProfile,
        difficulty,
        concerns: concernsToPass,
      },
    });
  };
  
  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <Link to="/home" className="text-muted-foreground hover:text-foreground">← Home</Link>
        <h2 className="text-2xl font-bold">Client Simulator</h2>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-medium">Select Difficulty</h3>
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          className="w-full border rounded-md p-2 text-sm mt-2"
        >
          <option value="novice">Novice</option>
          <option value="moderate">Moderate</option>
          <option value="advanced">Advanced</option>
        </select>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2">Select Client Profile</h3>
        <div className="overflow-x-auto sm:overflow-x-visible">
          <div className="flex gap-4 snap-x snap-mandatory px-2 sm:grid sm:grid-cols-3 sm:gap-4">
            {Array.from({ length: Math.ceil(clientProfiles.length / 2) }).map((_, colIndex) => (
              <div
                key={colIndex}
                className="flex flex-col gap-4 min-w-[250px] snap-start sm:min-w-0 sm:contents"
              >
                {clientProfiles
                  .slice(colIndex * 2, colIndex * 2 + 2)
                  .map(profile => (
                    <div
                      key={profile.id}
                      className={`border rounded-md p-4 cursor-pointer ${
                        selectedProfile === profile.id
                          ? 'border-primary bg-accent'
                          : 'hover:bg-accent/50'
                      }`}
                      onClick={() => setSelectedProfile(profile.id)}
                    >
                      <h4 className="font-medium">{profile.name}</h4>
                      <p className="text-sm text-muted-foreground">{profile.description}</p>
                    </div>
                  ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {selectedProfile === 'custom' && (
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-2">Add Custom Concerns</h3>
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={newConcern}
              onChange={(e) => setNewConcern(e.target.value)}
              placeholder="Enter a concern..."
              className="flex-1 border rounded-md p-2 text-sm"
            />
            <button
              onClick={() => {
                if (newConcern.trim() !== '') {
                  setCustomConcerns([...customConcerns, newConcern.trim()]);
                  setNewConcern('');
                }
              }}
              className="bg-primary text-primary-foreground py-2 px-4 rounded-md"
            >
              Add
            </button>
          </div>
          {customConcerns.length > 0 && (
            <ul className="list-disc pl-5 text-sm text-muted-foreground">
              {customConcerns.map((concern, idx) => (
                <li key={idx}>{concern}</li>
              ))}
            </ul>
          )}
        </div>
      )}

      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2">Client Profile</h3>
        <div className="bg-card border rounded-lg p-4">
          <p className="font-medium">{currentProfile?.name}</p>
          <p className="text-muted-foreground">{currentProfile?.description}</p>
          <p className="text-sm">
            <span className="font-medium">Key concerns:</span>{' '}
            {selectedProfile === 'custom'
              ? customConcerns.length > 0
                ? customConcerns.join(', ')
                : 'No concerns added yet.'
              : currentProfile?.concerns.join(', ')}
          </p>
        </div>
      </div>

      <div className="flex justify-end">
        <button onClick={startSimulation} className="bg-primary text-primary-foreground py-2 px-6 rounded-md">
          Start Client Simulation
        </button>
      </div>
    </div>
  );
};

export default ClientSimulator;
