// import React from 'react';
// import { financialTopics, clientProfiles } from '../utils/topics';
// interface TopicSelectorProps {
//   mode: 'explanation' | 'client';
//   selectedTopic: string;
//   setSelectedTopic: (topic: string) => void;
// }
// const TopicSelector: React.FC<TopicSelectorProps> = ({
//   mode,
//   selectedTopic,
//   setSelectedTopic
// }) => {
//   const topics = mode === 'explanation' ? financialTopics : clientProfiles;
//   return <div className="mb-6">
//       <h3 className="text-lg font-medium mb-2">
//         {mode === 'explanation' ? 'Select Topic' : 'Select Client Profile'}
//       </h3>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
//         {topics.map(topic => <div key={topic.id} className={`border rounded-md p-4 cursor-pointer ${selectedTopic === topic.id ? 'border-primary bg-accent' : 'hover:bg-accent/50'}`} onClick={() => setSelectedTopic(topic.id)}>
//             <h4 className="font-medium">{topic.title || topic.name}</h4>
//             <p className="text-sm text-muted-foreground">{topic.description}</p>
//           </div>)}
//       </div>
//     </div>;
// };
// export default TopicSelector;