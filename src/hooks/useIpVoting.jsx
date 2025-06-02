
import { useState, useEffect } from 'react';
import { useSupabase } from './useSupabase';

export const useIpVoting = () => {
  const [userIp, setUserIp] = useState(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [voteCount, setVoteCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const { supabase } = useSupabase();

  useEffect(() => {
    const fetchIpAndVoteStatus = async () => {
      try {
        // Get user IP
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        console.log('User IP:', data.ip);
        setUserIp(data.ip);

        if (data.ip && supabase) {
          // Check if user already voted
          const { data: voteData, error } = await supabase
            .from('Votes')
            .select('vote')
            .eq('ip_add', data.ip)
            .single();

          if (error && error.code !== 'PGRST116') {
            console.error('Error fetching vote status:', error);
          } else if (voteData) {
            setHasVoted(true);
            setVoteCount(voteData.vote);
          }
        }
      } catch (err) {
        console.error('Failed to fetch IP or vote status:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchIpAndVoteStatus();
  }, [supabase]);

  const submitVote = async () => {
    if (!userIp || !supabase) return false;

    try {
      // Check existing vote
      const { data: currentData, error: fetchError } = await supabase
        .from('Votes')
        .select('vote')
        .eq('ip_add', userIp)
        .single();

      if (fetchError && fetchError.code !== 'PGRST116') {
        console.error('Error fetching current vote:', fetchError);
        return false;
      }

      if (!currentData) {
        // Insert new vote record
        const { error: insertError } = await supabase
          .from('Votes')
          .insert({
            ip_add: userIp,
            vote: 1,
          });

        if (insertError) {
          console.error('Error inserting new vote:', insertError);
          return false;
        }

        setHasVoted(true);
        setVoteCount(1);
        console.log('Vote submitted successfully for IP:', userIp, 'New count:', 1);
        return true;
      }

      // Update existing vote count
      const newVoteCount = currentData.vote + 1;
      const { error: updateError } = await supabase
        .from('Votes')
        .update({
          vote: newVoteCount,
        })
        .eq('ip_add', userIp);

      if (updateError) {
        console.error('Error updating vote:', updateError);
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
    submitVote,
  };
};
