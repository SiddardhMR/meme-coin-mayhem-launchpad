
import { useState, useEffect } from 'react';
import { useSupabase } from './useSupabase';

export const useIpVoting = () => {
  const [userIp, setUserIp] = useState(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [voteCount, setVoteCount] = useState(0);
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

        // Check if user has voted and get current vote count
        if (data.ip && supabase) {
          const { data: voteData, error } = await supabase
            .from('Postimages')
            .select('vote')
            .eq('ip-add', data.ip)
            .single();

          if (error && error.code !== 'PGRST116') { // PGRST116 = no rows found
            console.error('Error checking vote status:', error);
          } else if (voteData && voteData.vote > 0) {
            setHasVoted(true);
            setVoteCount(voteData.vote);
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
      // Get current vote count for this IP
      const { data: currentData, error: fetchError } = await supabase
        .from('Postimages')
        .select('vote')
        .eq('ip-add', userIp)
        .single();

      let newVoteCount = 1;
      if (currentData && currentData.vote) {
        newVoteCount = currentData.vote + 1;
      }

      // Insert or update vote record with incremented count
      const { error } = await supabase
        .from('Postimages')
        .upsert({
          'ip-add': userIp,
          vote: newVoteCount
        }, {
          onConflict: 'ip-add'
        });

      if (error) {
        console.error('Error submitting vote:', error);
        return false;
      }

      setHasVoted(true);
      setVoteCount(newVoteCount);
      console.log('Vote submitted successfully for IP:', userIp, 'New count:', newVoteCount);
      return true;
    } catch (err) {
      console.error('Failed to submit vote:', err);
      return false;
    }
  };

  return {
    userIp,
    hasVoted,
    voteCount,
    loading,
    submitVote
  };
};
