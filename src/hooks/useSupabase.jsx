
import { createClient } from '@supabase/supabase-js';
import { useState, useEffect } from 'react';

const supabaseUrl = 'https://supabasekong-fg8gw04sg00cg0g8ocwkok0s.anil.one';
const supabaseKey = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzdXBhYmFzZSIsImlhdCI6MTczMTU2MDk0MCwiZXhwIjo0ODg3MjM0NTQwLCJyb2xlIjoiYW5vbiJ9.ZDadCTZz-iLDV63NJ4ftVfcavwrCYJFs4YSG5NO6eiE';
const supabase = createClient(supabaseUrl, supabaseKey);

export const useSupabase = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchImages = async () => {
    try {
      setLoading(true);
      const { data: Postimages, error } = await supabase
        .from('Postimages')
        .select('image');
      
      if (error) {
        setError(error);
        console.error('Error fetching images:', error);
      } else {
        setImages(Postimages || []);
      }
    } catch (err) {
      setError(err);
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return { images, loading, error, refetch: fetchImages };
};
