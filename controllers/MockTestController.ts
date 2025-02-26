"use server";

import { ID } from "@/lib/appwrite/config";
import { createAdminClient, createSessionClient } from "@/lib/server/appwrite";
import { 
  MockTest, 
  Question, 
  StudentAttempt, 
  StudentResponse 
} from "@/lib/types/mock-test";

// Create a new mock test
export async function createMockTest(mockTest: Omit<MockTest, "id" | "createdAt" | "updatedAt">) {
  try {
    const { databases } = await createAdminClient();
    
    const newMockTest = await databases.createDocument(
      process.env.NEXT_PUBLIC_DATABASEID || "",
      "mock_tests", // Collection ID for mock tests
      ID.unique(),
      {
        ...mockTest,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
    );
    
    return newMockTest;
  } catch (error) {
    console.error("Error creating mock test:", error);
    throw error;
  }
}

// Update an existing mock test
export async function updateMockTest(id: string, mockTest: Partial<MockTest>) {
  try {
    const { databases } = await createAdminClient();
    
    const updatedMockTest = await databases.updateDocument(
      process.env.NEXT_PUBLIC_DATABASEID || "",
      "mock_tests",
      id,
      {
        ...mockTest,
        updatedAt: new Date().toISOString(),
      }
    );
    
    return updatedMockTest;
  } catch (error) {
    console.error("Error updating mock test:", error);
    throw error;
  }
}

// Delete a mock test
export async function deleteMockTest(id: string) {
  try {
    const { databases } = await createAdminClient();
    
    await databases.deleteDocument(
      process.env.NEXT_PUBLIC_DATABASEID || "",
      "mock_tests",
      id
    );
    
    return { success: true };
  } catch (error) {
    console.error("Error deleting mock test:", error);
    throw error;
  }
}

// Get all mock tests
export async function getAllMockTests() {
  try {
    const { databases } = await createAdminClient();
    
    const mockTests = await databases.listDocuments(
      process.env.NEXT_PUBLIC_DATABASEID || "",
      "mock_tests"
    );
    
    return mockTests.documents;
  } catch (error) {
    console.error("Error getting all mock tests:", error);
    throw error;
  }
}

// Get a single mock test by ID
export async function getMockTestById(id: string) {
  try {
    const { databases } = await createAdminClient();
    
    const mockTest = await databases.getDocument(
      process.env.NEXT_PUBLIC_DATABASEID || "",
      "mock_tests",
      id
    );
    
    return mockTest;
  } catch (error) {
    console.error("Error getting mock test by ID:", error);
    throw error;
  }
}

// Get mock tests by category
export async function getMockTestsByCategory(category: string) {
  try {
    const { databases } = await createAdminClient();
    
    const mockTests = await databases.listDocuments(
      process.env.NEXT_PUBLIC_DATABASEID || "",
      "mock_tests",
      [
        `equal("category", "${category}")`
      ]
    );
    
    return mockTests.documents;
  } catch (error) {
    console.error("Error getting mock tests by category:", error);
    throw error;
  }
}

// Get active mock tests
export async function getActiveMockTests() {
  try {
    const { databases } = await createAdminClient();
    
    const mockTests = await databases.listDocuments(
      process.env.NEXT_PUBLIC_DATABASEID || "",
      "mock_tests",
      [
        `equal("isActive", true)`
      ]
    );
    
    return mockTests.documents;
  } catch (error) {
    console.error("Error getting active mock tests:", error);
    throw error;
  }
}

// Get upcoming mock tests
export async function getUpcomingMockTests() {
  try {
    const { databases } = await createAdminClient();
    const now = new Date().toISOString();
    
    const mockTests = await databases.listDocuments(
      process.env.NEXT_PUBLIC_DATABASEID || "",
      "mock_tests",
      [
        `greater("scheduledDate", "${now}")`,
        `equal("isActive", true)`
      ]
    );
    
    return mockTests.documents;
  } catch (error) {
    console.error("Error getting upcoming mock tests:", error);
    throw error;
  }
}

// Create a new question for a mock test
export async function createQuestion(question: Omit<Question, "id">) {
  try {
    const { databases } = await createAdminClient();
    
    const newQuestion = await databases.createDocument(
      process.env.NEXT_PUBLIC_DATABASEID || "",
      "questions",
      ID.unique(),
      question
    );
    
    return newQuestion;
  } catch (error) {
    console.error("Error creating question:", error);
    throw error;
  }
}

// Update an existing question
export async function updateQuestion(id: string, question: Partial<Question>) {
  try {
    const { databases } = await createAdminClient();
    
    const updatedQuestion = await databases.updateDocument(
      process.env.NEXT_PUBLIC_DATABASEID || "",
      "questions",
      id,
      question
    );
    
    return updatedQuestion;
  } catch (error) {
    console.error("Error updating question:", error);
    throw error;
  }
}

// Delete a question
export async function deleteQuestion(id: string) {
  try {
    const { databases } = await createAdminClient();
    
    await databases.deleteDocument(
      process.env.NEXT_PUBLIC_DATABASEID || "",
      "questions",
      id
    );
    
    return { success: true };
  } catch (error) {
    console.error("Error deleting question:", error);
    throw error;
  }
}

// Get all questions for a mock test
export async function getQuestionsByMockTestId(mockTestId: string) {
  try {
    const { databases } = await createAdminClient();
    
    const questions = await databases.listDocuments(
      process.env.NEXT_PUBLIC_DATABASEID || "",
      "questions",
      [
        `equal("mockTestId", "${mockTestId}")`
      ]
    );
    
    return questions.documents;
  } catch (error) {
    console.error("Error getting questions by mock test ID:", error);
    throw error;
  }
}

// Create a new student attempt
export async function createStudentAttempt(attempt: Omit<StudentAttempt, "id" | "startedAt" | "status">) {
  try {
    const { databases } = await createAdminClient();
    
    const newAttempt = await databases.createDocument(
      process.env.NEXT_PUBLIC_DATABASEID || "",
      "student_attempts",
      ID.unique(),
      {
        ...attempt,
        startedAt: new Date().toISOString(),
        status: "in_progress"
      }
    );
    
    return newAttempt;
  } catch (error) {
    console.error("Error creating student attempt:", error);
    throw error;
  }
}

// Update a student attempt
export async function updateStudentAttempt(id: string, attempt: Partial<StudentAttempt>) {
  try {
    const { databases } = await createAdminClient();
    
    const updatedAttempt = await databases.updateDocument(
      process.env.NEXT_PUBLIC_DATABASEID || "",
      "student_attempts",
      id,
      attempt
    );
    
    return updatedAttempt;
  } catch (error) {
    console.error("Error updating student attempt:", error);
    throw error;
  }
}

// Complete a student attempt
export async function completeStudentAttempt(id: string, totalScore: number, percentageScore: number) {
  try {
    const { databases } = await createAdminClient();
    
    const completedAttempt = await databases.updateDocument(
      process.env.NEXT_PUBLIC_DATABASEID || "",
      "student_attempts",
      id,
      {
        completedAt: new Date().toISOString(),
        status: "completed",
        totalScore,
        percentageScore
      }
    );
    
    return completedAttempt;
  } catch (error) {
    console.error("Error completing student attempt:", error);
    throw error;
  }
}

// Get student attempts by user ID
export async function getStudentAttemptsByUserId(userId: string) {
  try {
    const { databases } = await createAdminClient();
    
    const attempts = await databases.listDocuments(
      process.env.NEXT_PUBLIC_DATABASEID || "",
      "student_attempts",
      [
        `equal("userId", "${userId}")`
      ]
    );
    
    return attempts.documents;
  } catch (error) {
    console.error("Error getting student attempts by user ID:", error);
    throw error;
  }
}

// Get student attempt by ID
export async function getStudentAttemptById(id: string) {
  try {
    const { databases } = await createAdminClient();
    
    const attempt = await databases.getDocument(
      process.env.NEXT_PUBLIC_DATABASEID || "",
      "student_attempts",
      id
    );
    
    return attempt;
  } catch (error) {
    console.error("Error getting student attempt by ID:", error);
    throw error;
  }
}

// Create a student response
export async function createStudentResponse(response: Omit<StudentResponse, "id">) {
  try {
    const { databases } = await createAdminClient();
    
    const newResponse = await databases.createDocument(
      process.env.NEXT_PUBLIC_DATABASEID || "",
      "student_responses",
      ID.unique(),
      response
    );
    
    return newResponse;
  } catch (error) {
    console.error("Error creating student response:", error);
    throw error;
  }
}

// Update a student response
export async function updateStudentResponse(id: string, response: Partial<StudentResponse>) {
  try {
    const { databases } = await createAdminClient();
    
    const updatedResponse = await databases.updateDocument(
      process.env.NEXT_PUBLIC_DATABASEID || "",
      "student_responses",
      id,
      response
    );
    
    return updatedResponse;
  } catch (error) {
    console.error("Error updating student response:", error);
    throw error;
  }
}

// Get student responses by attempt ID
export async function getStudentResponsesByAttemptId(attemptId: string) {
  try {
    const { databases } = await createAdminClient();
    
    const responses = await databases.listDocuments(
      process.env.NEXT_PUBLIC_DATABASEID || "",
      "student_responses",
      [
        `equal("attemptId", "${attemptId}")`
      ]
    );
    
    return responses.documents;
  } catch (error) {
    console.error("Error getting student responses by attempt ID:", error);
    throw error;
  }
}

// Grade a student response (for manual grading by moderators)
export async function gradeStudentResponse(id: string, score: number, feedback: string) {
  try {
    const { databases } = await createAdminClient();
    
    const gradedResponse = await databases.updateDocument(
      process.env.NEXT_PUBLIC_DATABASEID || "",
      "student_responses",
      id,
      {
        score,
        feedback,
        gradedAt: new Date().toISOString(),
        gradedBy: "manual" // Indicates manual grading
      }
    );
    
    return gradedResponse;
  } catch (error) {
    console.error("Error grading student response:", error);
    throw error;
  }
}

// Create a notification for a user
export async function createNotification(userId: string, mockTestId: string, message: string, type: string) {
  try {
    const { databases } = await createAdminClient();
    
    const newNotification = await databases.createDocument(
      process.env.NEXT_PUBLIC_DATABASEID || "",
      "notifications",
      ID.unique(),
      {
        userId,
        mockTestId,
        message,
        type,
        createdAt: new Date().toISOString(),
        read: false
      }
    );
    
    return newNotification;
  } catch (error) {
    console.error("Error creating notification:", error);
    throw error;
  }
}

// Get unread notifications for a user
export async function getUnreadNotificationsByUserId(userId: string) {
  try {
    const { databases } = await createAdminClient();
    
    const notifications = await databases.listDocuments(
      process.env.NEXT_PUBLIC_DATABASEID || "",
      "notifications",
      [
        `equal("userId", "${userId}")`,
        `equal("read", false)`
      ]
    );
    
    return notifications.documents;
  } catch (error) {
    console.error("Error getting unread notifications by user ID:", error);
    throw error;
  }
}

// Mark a notification as read
export async function markNotificationAsRead(id: string) {
  try {
    const { databases } = await createAdminClient();
    
    const updatedNotification = await databases.updateDocument(
      process.env.NEXT_PUBLIC_DATABASEID || "",
      "notifications",
      id,
      {
        read: true
      }
    );
    
    return updatedNotification;
  } catch (error) {
    console.error("Error marking notification as read:", error);
    throw error;
  }
}
