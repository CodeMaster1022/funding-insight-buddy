import React, { createContext, useState, useContext, ReactNode } from 'react';

export interface Team {
  id: string;
  name: string;
}

interface TeamContextType {
  selectedTeam: Team | null;
  setSelectedTeam: (team: Team) => void;
  teams: Team[];
}

const TeamContext = createContext<TeamContextType | undefined>(undefined);

export const TeamProvider = ({ children }: { children: ReactNode }) => {
  const initialTeams: Team[] = [
    { id: '1', name: 'Team Alpha' },
    { id: '2', name: 'Team Beta' },
    { id: '3', name: 'Team Gamma' },
  ];

  const [selectedTeam, setSelectedTeam] = useState<Team | null>(initialTeams[0]);
  const [teams] = useState<Team[]>(initialTeams);

  return (
    <TeamContext.Provider value={{ selectedTeam, setSelectedTeam, teams }}>
      {children}
    </TeamContext.Provider>
  );
};

export const useTeam = () => {
  const context = useContext(TeamContext);
  if (context === undefined) {
    throw new Error('useTeam must be used within a TeamProvider');
  }
  return context;
}; 