/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ActionShot, Program } from './types';

export const COACH_INFO = {
  fullName: "Madhukar Mishra",
  headline: "HEAD COACH & FOUNDER",
  profileImage: "/images/madhukar-mishra.jpg",
  intro: "Fitness is not a hobby; it is a brutal demand for self-respect. As the founder of The Mad Fitness, my approach is rooted in uncompromising discipline, biomechanical precision, and absolute accountability.",
  description: "With years of specialized experience in hyper-targeted body transformations, I don't sell workouts. I construct resilient bodies and unbreakable mindsets. Whether you are aiming for severe fat reduction or structural hypertrophy, the programming is absolute.",
  badges: [
    { label: "ISSA Certified Trainer", icon: "Check" },
    { label: "Result-Based Coaching", icon: "TrendingUp" },
    { label: "Fat Loss Specialist", icon: "Flame" }
  ]
};

export const SERVICES = [
  {
    id: "s1",
    title: "Strength Training & Muscle Building",
    description: "Hypertrophy-focused programming designed to forge dense, functional muscle mass through progressive overload and precise biomechanics.",
    iconName: "Dumbbell"
  },
  {
    id: "s2",
    title: "Weight Loss & Fat Loss",
    description: "Metabolic conditioning and strategic caloric deficits optimized for sustainable, aggressive subcutaneous fat reduction.",
    iconName: "Flame"
  },
  {
    id: "s3",
    title: "CrossFit & Group Training",
    description: "High-intensity functional movements performed in a hyper-focused, competitive, and community-driven environment.",
    iconName: "Users"
  },
  {
    id: "s4",
    title: "Nutrition Coaching",
    description: "Macro-calculated, response-driven, and highly detailed dietary plans to fuel performance, retention, and rapid body recomposition.",
    iconName: "Apple"
  },
  {
    id: "s5",
    title: "Fitness Assessment",
    description: "Comprehensive medical-grade baseline analyses including body composition, active range of motion, and force production metrics.",
    iconName: "Activity"
  }
];

export const PROGRAMS: Program[] = [
  {
    title: "Group Training",
    tagline: "High-energy sessions emphasizing functional fitness and community accountability.",
    iconName: "Group",
    points: [
      "Daily programmed WODs (Workout of the Day)",
      "Form correction & active movement scaling",
      "General functional nutrition guidelines"
    ],
    actionText: "Inquire"
  },
  {
    title: "Personal Training",
    tagline: "1-on-1 intensive coaching. Precision programming for Fat Loss or Muscle Building.",
    iconName: "Personal",
    isRecommended: true,
    points: [
      "Bespoke clinical-grade training architecture",
      "Custom carbon-matching macronutrient protocols",
      "Weekly diagnostic biometric status updates",
      "Direct 24/7 communications hotline to Head Coach"
    ],
    actionText: "Start Now"
  },
  {
    title: "Nutrition Only",
    tagline: "For those who have the gym discipline but lack dietary direction.",
    iconName: "Nutrition",
    points: [
      "Caloric loading & precise daily macro mapping",
      "Circadian clock meal timing strategies",
      "Targeted optimization & supplementation protocols"
    ],
    actionText: "Inquire"
  }
];

export const ACTION_SHOTS: ActionShot[] = [
  {
    id: "as1",
    title: "Structural Power",
    category: "STRENGTH",
    tag: "STRENGTH",
    imageUrl: "/images/themadfitness-1.png",
    description: "Targeted biomechanics on compound mechanics, emphasizing safety and mechanical tension maximums.",
    metrics: ["Progressive Overload", "95% Intensity Benchmarks", "Compound Lift Specialization"]
  },
  {
    id: "as2",
    title: "Mass Accrual",
    category: "HYPERTROPHY",
    tag: "HYPERTROPHY",
    imageUrl: "/images/themadfitness-2.png",
    description: "Volume-optimized isolated biomechanical stresses designed to produce structural hypertrophy.",
    metrics: ["Time Under Tension optimization", "Eccentric Overload Controls", "Myofibrillar Development"]
  },
  {
    id: "as3",
    title: "Metabolic Conditioning",
    category: "ENDURANCE",
    tag: "ENDURANCE",
    imageUrl: "/images/themadfitness-3.png",
    description: "High-intensity metabolic stress to maximize excess post-exercise oxygen consumption (EPOC).",
    metrics: ["VO2 Max Output", "Sustained Output", "Lactate Threshold"]
  },
  {
    id: "as4",
    title: "Functional Core",
    category: "CORE",
    tag: "STABILITY",
    imageUrl: "/images/themadfitness-4.png",
    description: "Direct tension applied to transverse abdominis and oblique chains for maximum stability.",
    metrics: ["Spinal Stability", "Anti-rotation", "Isometric Holds"]
  },
  {
    id: "as5",
    title: "Kinetic Alignment",
    category: "MOBILITY",
    tag: "RECOVERY",
    imageUrl: "/images/themadfitness-5.png",
    description: "Fascial release and joint lubrication protocols ensuring zero-friction movement patterns.",
    metrics: ["Active Range of Motion", "Fascia Release", "Joint Lubrication"]
  }
];
