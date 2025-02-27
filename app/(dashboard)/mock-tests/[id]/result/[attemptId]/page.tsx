"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getStudentAttemptById } from "@/controllers/MockTestController";
import { StudentAttempt, Question } from "@/lib/types/mock-test";
import { ArrowLeft, CheckCircle, XCircle } from "lucide-react";
import { toast } from "sonner";

export default function ResultPage({
  params,
}: {
  params: { id: string; attemptId: string };
}) {
  const [attempt, setAttempt] = useState<StudentAttempt | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const loadResult = async () => {
      try {
        setLoading(true);
        const attemptData = await getStudentAttemptById(params.attemptId);
        setAttempt(attemptData);
      } catch (error) {
        console.error("Error loading result:", error);
        toast.error("Failed to load result");
      } finally {
        setLoading(false);
      }
    };

    loadResult();
  }, [params.attemptId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="w-[400px]">
          <CardContent className="p-6">
            <div className="text-center">Loading result...</div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Helper function to determine grade and color
  const getGradeInfo = (score: number) => {
    if (score >= 90) return { grade: "A", color: "text-green-500" };
    if (score >= 80) return { grade: "B", color: "text-blue-500" };
    if (score >= 70) return { grade: "C", color: "text-yellow-500" };
    if (score >= 60) return { grade: "D", color: "text-orange-500" };
    return { grade: "F", color: "text-red-500" };
  };

  const gradeInfo = getGradeInfo(attempt?.percentageScore || 0);

  return (
    <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <div className="mb-6">
        <Button variant="ghost" onClick={() => router.push("/mock-tests")}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Tests
        </Button>
      </div>

      <div className="grid gap-6">
        {/* Score Overview Card */}
        <Card>
          <CardHeader>
            <CardTitle>Exam Result</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Total Score</p>
                <h3 className="text-2xl font-bold">
                  {attempt?.totalScore}/{attempt?.totalPossibleScore}
                </h3>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Percentage</p>
                <h3 className="text-2xl font-bold">
                  {attempt?.percentageScore.toFixed(2)}%
                </h3>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Grade</p>
                <h3 className={`text-2xl font-bold ${gradeInfo.color}`}>
                  {gradeInfo.grade}
                </h3>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Time Taken</p>
                <h3 className="text-2xl font-bold">
                  {Math.floor(attempt?.timeTaken / 60)}m {attempt?.timeTaken % 60}s
                </h3>
              </div>
            </div>

            <div className="mt-6">
              <p className="text-sm text-muted-foreground mb-2">Progress</p>
              <Progress value={attempt?.percentageScore || 0} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Question Review */}
        <Card>
          <CardHeader>
            <CardTitle>Question Review</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Question</TableHead>
                  <TableHead>Your Answer</TableHead>
                  <TableHead>Correct Answer</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Marks</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {attempt?.responses.map((response, index) => (
                  <TableRow key={response.questionId}>
                    <TableCell className="font-medium">
                      Question {index + 1}
                    </TableCell>
                    <TableCell>{response.response}</TableCell>
                    <TableCell>{response.correctAnswer}</TableCell>
                    <TableCell>
                      {response.isCorrect ? (
                        <Badge className="bg-green-500">
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Correct
                        </Badge>
                      ) : (
                        <Badge variant="destructive">
                          <XCircle className="w-4 h-4 mr-1" />
                          Incorrect
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      {response.score}/{response.maxScore}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4">
          <Button variant="outline" onClick={() => router.push("/mock-tests")}>
            Back to Tests
          </Button>
          <Button onClick={() => window.print()}>Download Result</Button>
        </div>
      </div>
    </div>
  );
}