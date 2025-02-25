"use client"
import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { BookOpen, Headphones, Pen, Mic } from "lucide-react";
import ReadingTest from '@/components/main/mock-tests/ReadingTest';
import ListeningTest from '@/components/main/mock-tests/ListeningTest';
import WritingTest from '@/components/main/mock-tests/WritingTest';
import SpeakingTest from '@/components/main/mock-tests/SpeakingTest';

const MockTests = () => {
  const [isPracticeMode, setIsPracticeMode] = useState(true);

  const toggleMode = () => setIsPracticeMode(!isPracticeMode);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Mock Tests</h1>
        <Button 
          variant={isPracticeMode ? "outline" : "default"}
          onClick={toggleMode}
          className="min-w-[120px]"
        >
          {isPracticeMode ? "Practice Mode" : "Exam Mode"}
        </Button>
      </div>

      <Tabs defaultValue="reading" className="w-full">
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="reading" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Reading
          </TabsTrigger>
          <TabsTrigger value="listening" className="flex items-center gap-2">
            <Headphones className="h-4 w-4" />
            Listening
          </TabsTrigger>
          <TabsTrigger value="writing" className="flex items-center gap-2">
            <Pen className="h-4 w-4" />
            Writing
          </TabsTrigger>
          <TabsTrigger value="speaking" className="flex items-center gap-2">
            <Mic className="h-4 w-4" />
            Speaking
          </TabsTrigger>
        </TabsList>

        <TabsContent value="reading">
          <ReadingTest isPracticeMode={isPracticeMode} />
        </TabsContent>
        <TabsContent value="listening">
          <ListeningTest isPracticeMode={isPracticeMode} />
        </TabsContent>
        <TabsContent value="writing">
          <WritingTest isPracticeMode={isPracticeMode} />
        </TabsContent>
        <TabsContent value="speaking">
          <SpeakingTest isPracticeMode={isPracticeMode} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MockTests;
