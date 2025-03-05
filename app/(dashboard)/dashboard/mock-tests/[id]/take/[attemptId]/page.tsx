"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuthStore } from "@/lib/stores/authStore";
import {
	getStudentAttemptById,
	getQuestionsByMockTestId,
    getMockTestById,
	updateStudentResponse,
	completeStudentAttempt,
} from "@/controllers/MockTestController";
import { Question } from "@/lib/types/mock-test";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"; // Changed this import
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { ArrowLeft, ArrowRight } from "lucide-react"; // Add icons
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export default function TakeExamPage(
    props: {
        params: Promise<{ id: string; attemptId: string }>;
    }
) {
    const params = use(props.params);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [questions, setQuestions] = useState<Question[]>([]);
    const [responses, setResponses] = useState<{ [key: string]: string }>({});
    const [timeRemaining, setTimeRemaining] = useState<number>(0);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const { user, checkUser } = useAuthStore();

    useEffect(() => {
      const loadExam = async () => {
        try {
          setLoading(true);
          checkUser();
          const attempt = await getStudentAttemptById(params.attemptId);
          const examQuestions = await getQuestionsByMockTestId(params.id);
          const mockTest = await getMockTestById(params.id); // Fetch mock test

          // Map Documents to Question objects
          const typedQuestions = examQuestions.map((doc) => ({
            id: doc.$id,
            mockTestId: doc.mockTestId,
            questionType: doc.questionType,
            questionText: doc.questionText,
            options: doc.options,
            instructions: doc.instructions,
            questionImage: doc.questionImage,
            marks: doc.marks,
            order: doc.order, // Add the order property
          }));

          // Parse the options for multiple choice questions
          const parsedQuestions = typedQuestions.map((question) => {
            if (
              question.questionType === "multiple_choice" &&
              Array.isArray(question.options)
            ) {
              return {
                ...question,
                options: question.options.map((opt) => {
                  try {
                    return typeof opt === "string" ? JSON.parse(opt) : opt;
                  } catch (e) {
                    console.error("Error parsing option:", opt);
                    return {
                      id: crypto.randomUUID(),
                      text: opt,
                      isCorrect: false,
                    };
                  }
                }),
              };
            }
            return question;
          });

          setQuestions(parsedQuestions);
          setTimeRemaining(mockTest.duration * 60); // Use mock test duration
        } catch (error) {
          console.error("Error loading exam:", error);
          toast.error("Failed to load exam");
        } finally {
          setLoading(false);
        }
      };

      loadExam();
    }, [params.id, params.attemptId]);

    // Timer logic
    useEffect(() => {
		if (timeRemaining <= 0) return;

		const timer = setInterval(() => {
			setTimeRemaining((prev) => {
				if (prev <= 1) {
					clearInterval(timer);
					handleSubmitExam();
					return 0;
				}
				return prev - 1;
			});
		}, 1000);

		return () => clearInterval(timer);
	}, [timeRemaining]);

    const handleAnswer = async (questionId: string, answer: string) => {
		console.log("answer", answer);
		console.log("questionId", questionId);
        console.log("attemptId", params.attemptId);
		setResponses((prev) => ({ ...prev, [questionId]: answer }));

		try {
			await updateStudentResponse(params.attemptId, {
				questionId,
				response: answer,
				attemptId: params.attemptId,
			});
		} catch (error) {
			console.error("Error saving response:", error);
			toast.error("Failed to save answer");
		}
	};

    const handleSubmitExam = async () => {
		try {
			// Calculate score based on responses
			let totalScore = 0;
			let totalPossibleScore = 0;

			questions.forEach((question) => {
				const response = responses[question.id];
				if (question.questionType === "multiple_choice") {
					const correctOption = question.options?.find((opt) => opt.isCorrect);
					if (response === correctOption?.text) {
						totalScore += question.marks;
					}
				}
				totalPossibleScore += question.marks;
			});

			const percentageScore = (totalScore / totalPossibleScore) * 100;

			await completeStudentAttempt(
				params.attemptId,
				totalScore,
				percentageScore,
			);
			router.push(`/mock-tests/${params.id}/results/${params.attemptId}`);
		} catch (error) {
			console.error("Error submitting exam:", error);
			toast.error("Failed to submit exam");
		}
	};

    if (loading) {
		return (
			<div className="flex items-center justify-center min-h-screen">
				<Card className="w-[400px]">
					<CardContent className="p-6">
						<div className="text-center">Loading exam...</div>
					</CardContent>
				</Card>
			</div>
		);
	}

    const currentQuestion = questions[currentQuestionIndex];

    return (
		<div className="container mx-auto py-6 p-10">
			<Card className="mb-4">
				<CardHeader>
					<div className="flex justify-between items-center">
						<div className="space-y-1">
							<CardTitle>
								Question {currentQuestionIndex + 1} of {questions.length}
							</CardTitle>
							<p className="text-sm text-muted-foreground">
								{currentQuestion?.questionType === "multiple_choice"
									? "Select the correct answer"
									: "Enter your answer"}
							</p>
						</div>
						<div className="text-xl font-semibold">
							Time Remaining: {Math.floor(timeRemaining / 60)}:
							{(timeRemaining % 60).toString().padStart(2, "0")}
						</div>
					</div>
				</CardHeader>
				<CardContent className="space-y-6">
					{currentQuestion && (
						<>
							{/* Question Text */}
							<div className="space-y-4">
								<div className="text-lg font-medium">
									{currentQuestion.questionText}
								</div>

								{/* Instructions if any */}
								{currentQuestion.instructions && (
									<div className="text-sm text-muted-foreground">
										{currentQuestion.instructions}
									</div>
								)}

								{/* Question Image if any */}
								{currentQuestion.questionImage && (
									<div className="mt-4">
										<img
											src={currentQuestion.questionImage}
											alt="Question"
											className="max-w-full h-auto rounded-lg"
										/>
									</div>
								)}

								{/* Multiple Choice Options */}
								{currentQuestion.questionType === "multiple_choice" && (
									<RadioGroup
										value={responses[currentQuestion.id] || ""}
										onValueChange={(value) =>
											handleAnswer(currentQuestion.id, value)
										}
										className="space-y-3"
									>
										{currentQuestion.options?.map((option) => (
											<div
												key={option.id}
												className="flex items-center space-x-3 p-3 rounded-lg border"
											>
												<RadioGroupItem value={option.text} id={option.id} />
												<Label
													htmlFor={option.id}
													className="flex-grow cursor-pointer text-base"
												>
													{option.text}
												</Label>
											</div>
										))}
									</RadioGroup>
								)}

								{/* Short Answer Input */}
								{currentQuestion.questionType === "short_answer" && (
									<div className="space-y-2">
										<Label htmlFor="answer">Your Answer</Label>
										<Input
											id="answer"
											value={responses[currentQuestion.id] || ""}
											onChange={(e) =>
												handleAnswer(currentQuestion.id, e.target.value)
											}
											placeholder="Type your answer here"
											className="w-full"
										/>
									</div>
								)}
							</div>
						</>
					)}
				</CardContent>
			</Card>

			{/* Navigation Buttons */}
			<div className="flex justify-between mt-6">
				<Button
					variant="outline"
					onClick={() => setCurrentQuestionIndex((prev) => prev - 1)}
					disabled={currentQuestionIndex === 0}
				>
					<ArrowLeft className="w-4 h-4 mr-2" /> Previous Question
				</Button>

				{currentQuestionIndex === questions.length - 1 ? (
					<Button
						onClick={handleSubmitExam}
						variant="default"
						className="bg-green-600 hover:bg-green-700"
					>
						Submit Exam
					</Button>
				) : (
					<Button
						onClick={() => setCurrentQuestionIndex((prev) => prev + 1)}
						disabled={currentQuestionIndex === questions.length - 1}
					>
						Next Question <ArrowRight className="w-4 h-4 ml-2" />
					</Button>
				)}
			</div>
		</div>
	);
}
