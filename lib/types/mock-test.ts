export interface MockTestSchedule {
  id: string;
  title: string;
  description: string | null;
  test_date: string;
  duration_minutes: number;
  is_practice: boolean;
  created_at: string;
  created_by: string;
  updated_at: string;
}

export interface MockTestSection {
  id: string;
  name: string;
  description: string | null;
  duration_minutes: number;
  total_questions: number;
  passing_score: number;
  section_type: 'reading' | 'listening' | 'writing' | 'speaking';
  created_at: string;
  created_by: string;
}

export interface MockTestQuestion {
  id: string;
  section_id: string;
  question_text: string;
  question_type: 'multiple_choice' | 'essay' | 'speaking';
  options: any | null;
  correct_answer: string | null;
  marks: number;
  created_at: string;
  created_by: string;
}

export interface MockTestAttempt {
  id: string;
  user_id: string;
  schedule_id: string;
  start_time: string;
  end_time: string | null;
  status: 'in_progress' | 'completed' | 'abandoned';
  total_score: number | null;
  created_at: string;
}

export interface MockTestResponse {
  id: string;
  attempt_id: string;
  question_id: string;
  user_response: string | null;
  score: number | null;
  feedback: string | null;
  created_at: string;
}

export interface StudyTimeLog {
  id: string;
  user_id: string;
  material_type: string;
  material_id: string | null;
  start_time: string;
  end_time: string | null;
  duration_minutes: number | null;
  created_at: string;
}