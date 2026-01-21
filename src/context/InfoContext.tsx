'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { supabase } from '@/lib/supabaseClient';

type Info = {
  id: string;
  name: string;
  profile_pic_url: string;
  facebook_url: string;
  instagram_url: string;
  linkedin_url: string;
  github_url: string;
  profession: string;
  email: string;
};

interface InfoContextType {
  info: Info | null;
  loading: boolean;
}

const InfoContext = createContext<InfoContextType | undefined>(undefined);

export const InfoProvider = ({ children }: { children: ReactNode }) => {
  const [info, setInfo] = useState<Info | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchInfo = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('info')
      .select('*')
      .single();

    if (error) {
      console.error("Error fetching info:", error);
      setInfo(null);
    } else {
      setInfo(data);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchInfo();
  }, [fetchInfo]);

  return (
    <InfoContext.Provider value={{ info, loading }}>
      {children}
    </InfoContext.Provider>
  );
};

export const useInfo = () => {
  const context = useContext(InfoContext);
  if (context === undefined) {
    throw new Error('useInfo must be used within an InfoProvider');
  }
  return context;
};
