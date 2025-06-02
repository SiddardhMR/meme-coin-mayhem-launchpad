
import { useState, useEffect } from 'react';
import { useSupabase } from './useSupabase';

export const useIpVoting = () => {
  const [userIp, setUserIp] = useState(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [loading, setLoading] = useState(true);
  const { supabase } = useSupabase();

  useEffect(() => {
    const fetchIpAndCheckVote = async () => {
      try {
        // Fetch user IP
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        console.log('User IP:', data.ip);
        setUserIp(data.ip);

        // Check if user has voted
        if (data.ip && supabase) {
          const { data: voteData, error } = await supabase
            .from('Postimages')
            .select('vote')
            .eq('ip_address', data.ip)
            .single();

          if (error && error.code !== 'PGRST116') { // PGRST116 = no rows found
            console.error('Error checking vote status:', error);
          } else if (voteData && voteData.vote) {
            setHasVoted(true);
          }
        }
      } catch (err) {
        console.error('Failed to fetch IP or check vote:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchIpAndCheckVote();
  }, [supabase]);

  const submitVote = async () => {
    if (!userIp || !supabase) return false;

    try {
      // Insert or update vote record
      const { error } = await supabase
        .from('Postimages')
        .upsert({
          ip_address: userIp,
          vote: true,
          voted_at: new Date().toISOString()
        }, {
          onConflict: 'ip_address'
        });

      if (error) {
        console.error('Error submitting vote:', error);
        return false;
      }

      setHasVoted(true);
      console.log('Vote submitted successfully for IP:', userIp);
      return true;
    } catch (err) {
      console.error('Failed to submit vote:', err);
      return false;
    }
  };

  return {
    userIp,
    hasVoted,
    loading,
    submitVote
  };
};
