"use client";

import { ContentGeneratorForm } from "@/components/content-generator/form";
import { ContentOutput } from "@/components/content-generator/output";
import { ContentHistory } from "@/components/content-generator/content-history";
import { ContentHeader } from "@/components/content-generator/content-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2 } from "lucide-react";
import { useContentGeneration } from "@/hooks/use-content-generation";

export default function GeneratorPage() {
  const { generatedContent, isGenerating, handleGenerate } = useContentGeneration();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <ContentHeader />

        <Tabs defaultValue="generator" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 max-w-[400px]">
            <TabsTrigger value="generator">Generator</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          <TabsContent value="generator" className="space-y-6">
            <Card className="border-none shadow-lg">
              <CardHeader>
                <CardTitle>Content Settings</CardTitle>
                <CardDescription>
                  Configure your content parameters to generate tailored messaging.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ContentGeneratorForm onGenerate={handleGenerate} isGenerating={isGenerating} />
              </CardContent>
            </Card>

            {isGenerating && (
              <div className="flex items-center justify-center p-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            )}

            {generatedContent && !isGenerating && (
              <ContentOutput content={generatedContent} />
            )}
          </TabsContent>

          <TabsContent value="history">
            <ContentHistory />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}