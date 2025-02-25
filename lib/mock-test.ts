import { supabase } from '@/lib/supabase/client';
import type { 
  MockTestSchedule, 
  MockTestSection,
  MockTestQuestion,
  MockTestAttempt,
  MockTestResponse,
  StudyTimeLog
} from './types/mock-test';

export async function getUpcomingTests() {
  const { data, error } = await supabase
    .from('mock_test_schedules')
    .select('*')
    .gt('test_date', new Date().toISOString())
    .order('test_date', { ascending: true });

  if (error) throw error;
  return data as MockTestSchedule[];
}

export async function getUserTestAttempts(userId: string) {
  const { data, error } = await supabase
    .from('mock_test_attempts')
    .select(`
      *,
      mock_test_schedules (
        title,
        test_date,
        duration_minutes
      )
    `)
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function startTestAttempt(scheduleId: string, userId: string) {
  const { data, error } = await supabase
    .from('mock_test_attempts')
    .insert({
      schedule_id: scheduleId,
      user_id: userId,
      status: 'in_progress'
    })
    .select()
    .single();

  if (error) throw error;
  return data as MockTestAttempt;
}

export async function submitTestResponse(
  attemptId: string,
  questionId: string,
  response: string
) {
  const { data, error } = await supabase
    .from('mock_test_responses')
    .insert({
      attempt_id: attemptId,
      question_id: questionId,
      user_response: response
    })
    .select()
    .single();

  if (error) throw error;
  return data as MockTestResponse;
}

export async function completeTestAttempt(
  attemptId: string,
  totalScore: number
) {
  const { data, error } = await supabase
    .from('mock_test_attempts')
    .update({
      status: 'completed',
      end_time: new Date().toISOString(),
      total_score: totalScore
    })
    .eq('id', attemptId)
    .select()
    .single();

  if (error) throw error;
  return data as MockTestAttempt;
}

export async function logStudyTime(
  userId: string,
  materialType: string,
  materialId: string | null = null,
  durationMinutes: number
) {
  const { data, error } = await supabase
    .from('study_time_logs')
    .insert({
      user_id: userId,
      material_type: materialType,
      material_id: materialId,
      start_time: new Date(Date.now() - durationMinutes * 60000).toISOString(),
      end_time: new Date().toISOString(),
      duration_minutes: durationMinutes
    })
    .select()
    .single();

  if (error) throw error;
  return data as StudyTimeLog;
}

export async function getStudyTimeStats(userId: string, days: number = 7) {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  const { data, error } = await supabase
    .from('study_time_logs')
    .select('*')
    .eq('user_id', userId)
    .gte('created_at', startDate.toISOString())
    .order('created_at', { ascending: true });

  if (error) throw error;
  return data as StudyTimeLog[];
}

export async function getTestPerformance(userId: string) {
  const { data, error } = await supabase
    .from('mock_test_attempts')
    .select(`
      *,
      mock_test_schedules (
        title,
        test_date
      ),
      mock_test_responses (
        score,
        question_id,
        mock_test_questions (
          section_id,
          mock_test_sections (
            section_type
          )
        )
      )
    `)
    .eq('user_id', userId)
    .eq('status', 'completed')
    .order('created_at', { ascending: true });

  if (error) throw error;
  return data;
}