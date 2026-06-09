/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Inquiry {
  id: string;
  name: string;
  phone: string;
  goal: string;
  message: string;
  timestamp: string;
}

export interface AssessmentInputs {
  gender: 'male' | 'female';
  weightKg: number;
  heightCm: number;
  age: number;
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'extremely';
  goal: 'fat-loss' | 'muscle-building' | 'strength' | 'general';
}

export interface AssessmentOutput {
  bmi: number;
  bmiCategory: string;
  bmr: number;
  tdee: number;
  dailyCalories: number;
  proteinG: number;
  carbsG: number;
  fatsG: number;
  workoutSuggestion: string;
}

export interface Program {
  title: string;
  tagline: string;
  iconName: 'Group' | 'Personal' | 'Nutrition';
  isRecommended?: boolean;
  points: string[];
  actionText: string;
}

export interface ActionShot {
  id: string;
  title: string;
  category: 'STRENGTH' | 'HYPERTROPHY' | 'ATHLETICISM' | 'ENDURANCE' | 'CORE' | 'MOBILITY';
  tag: string;
  imageUrl: string;
  description: string;
  metrics: string[];
}
