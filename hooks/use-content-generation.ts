import { useState } from 'react';
import { toast } from 'sonner';
import { GenerationParams } from '@/lib/openai/types';
import { generateContent } from '@/lib/openai/api';
import { GENERATION_ERRORS } from '@/lib/openai/constants';
import { saveContentGeneration } from '@/lib/supabase/content';
import { useSupabase } from '@/lib/supabase/provider';

export function useContentGeneration() {
  const [generatedContent, setGeneratedContent] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);
  const { session } = useSupabase();

  const handleGenerate = async (formData: GenerationParams) => {
    if (isGenerating) return;

    try {
      setIsGenerating(true);
      setGeneratedContent("");
      
      const content = await generateContent(formData);
      setGeneratedContent(content);

      // Save the generation if user is logged in
      if (session?.user) {
        try {
          await saveContentGeneration({
            ...formData,
            user_id: session.user.id,
            generated_content: content
          });
        } catch (error) {
          console.error('Error saving generation:', error);
          // Don't show error to user as it's not critical
        }
      }
    } catch (error) {
      console.error('Error generating content:', error);
      const errorMessage = error instanceof Error 
        ? error.message 
        : GENERATION_ERRORS.UNEXPECTED;
      
      toast.error(errorMessage);
      setGeneratedContent('');
    } finally {
      setIsGenerating(false);
    }
  };

  return {
    generatedContent,
    isGenerating,
    handleGenerate,
  };
}