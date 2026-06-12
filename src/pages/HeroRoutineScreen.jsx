import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';

export default function HeroRoutineScreen() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('schedule');
  const [showContent, setShowContent] = useState(false);

  const celebrityName = localStorage.getItem('celebrityName') || 'Your Hero';
  const selectedCelebrity = localStorage.getItem('selectedCelebrity') || 'kohli';

  // All athlete data
  const athleteData = {
    ronaldo: {
      name: 'Cristiano Ronaldo',
      subtitle: 'CR7 Performance Routine',
      emoji: '⚽',
      color: '#16A34A',
      strength: 'Speed & Stamina',
      schedule: [
        { time: '05:45', activity: 'Wake', desc: 'Hydration (water + electrolytes), Light stretching', icon: '🌅' },
        { time: '06:15', activity: 'Mobility Activation', desc: 'Foam rolling, Hip/ankle mobility, Core activation', icon: '🧘', duration: '30 min' },
        { time: '07:00', activity: 'Breakfast', desc: 'Egg whites, Wholegrain toast, Fruit, Green tea', icon: '🍳' },
        { time: '08:00', activity: 'Strength Training', desc: 'Squats, lunges, Plyometrics, Resistance training', icon: '💪', duration: '75 min' },
        { time: '09:30', activity: 'Recovery', desc: 'Ice bath / cryotherapy, Compression boots', icon: '❄️' },
        { time: '10:30', activity: 'Snack', desc: 'Greek yogurt, Nuts', icon: '🥜' },
        { time: '12:30', activity: 'Lunch', desc: 'Grilled fish/chicken, Quinoa/brown rice, Vegetables', icon: '🍲' },
        { time: '14:00', activity: 'Nap', desc: 'Power nap for recovery', icon: '😴', duration: '45 min' },
        { time: '15:00', activity: 'Light Conditioning', desc: 'Swimming / cycling, Balance drills', icon: '🏊', duration: '45 min' },
        { time: '16:30', activity: 'Protein Snack', desc: 'Protein shake + banana', icon: '🍌' },
        { time: '18:30', activity: 'Dinner', desc: 'Chicken breast, Sweet potato, Salad', icon: '🍛' },
        { time: '20:00', activity: 'Stretching', desc: 'Full body stretch routine', icon: '🧘', duration: '20 min' },
        { time: '22:00', activity: 'Sleep', desc: '7-8 hours of quality sleep', icon: '🌙' },
      ],
      tips: [
        { title: 'Sprint Training', desc: '6 × 40m sprint, Rest 60 sec - Builds fast-twitch fibers', icon: '🏃' },
        { title: 'HIIT Cardio', desc: '30 sec sprint, 90 sec walk × 8 rounds', icon: '⚡' },
        { title: 'Plyometrics', desc: 'Box jumps, Skipping, Jump squats - Makes muscles explosive', icon: '📦' },
        { title: 'Core Training', desc: 'Plank, Leg raises, Russian twists - Daily 10 min', icon: '🎯' },
      ],
      diet: ['Egg whites', 'Chicken breast', 'Fish', 'Greek yogurt', 'Quinoa', 'Sweet potato', 'Green vegetables', 'Nuts', 'Fruits'],
    },
    messi: {
      name: 'Lionel Messi',
      subtitle: 'The Magician\'s Routine',
      emoji: '🐐',
      color: '#3B82F6',
      strength: 'Sharp Mind & Agility',
      schedule: [
        { time: '07:00', activity: 'Wake', desc: 'Start the day calm and focused', icon: '🌅' },
        { time: '07:30', activity: 'Breakfast', desc: 'Oats, Yogurt, Fruit', icon: '🍳' },
        { time: '08:30', activity: 'Mobility & Stability', desc: 'Ankle/knee strengthening, Balance drills', icon: '🧘', duration: '40 min' },
        { time: '09:30', activity: 'Strength Training', desc: 'Bodyweight, Core, Light weights', icon: '💪', duration: '60 min' },
        { time: '11:00', activity: 'Recovery', desc: 'Massage, Stretching', icon: '💆' },
        { time: '12:30', activity: 'Lunch', desc: 'Fish/chicken, Rice, Olive oil salad', icon: '🍲' },
        { time: '14:00', activity: 'Nap', desc: 'Mental recovery', icon: '😴', duration: '30 min' },
        { time: '15:00', activity: 'Speed & Agility', desc: 'Ladder drills, Short sprints', icon: '⚡', duration: '45 min' },
        { time: '16:30', activity: 'Snack', desc: 'Fruit + protein', icon: '🍎' },
        { time: '19:00', activity: 'Dinner', desc: 'Chicken + vegetables', icon: '🍛' },
        { time: '22:30', activity: 'Sleep', desc: '7-8 hours of quality sleep', icon: '🌙' },
      ],
      tips: [
        { title: 'Daily Meditation', desc: '10-15 min - Reduces cortisol, improves focus', icon: '🧘' },
        { title: 'Decision Training', desc: 'Chess, Strategy games, Puzzles - Improves brain speed', icon: '♟️' },
        { title: 'Visualization', desc: '5 min/day before sleep - Brain trains itself', icon: '🎯' },
        { title: 'Digital Control', desc: 'Limit reels, shorts, scrolling - Protects focus', icon: '📵' },
      ],
      diet: ['Oats', 'Fish', 'Chicken', 'Rice', 'Olive oil', 'Fresh fruits', 'Vegetables', 'Yogurt'],
    },
    dhoni: {
      name: 'MS Dhoni',
      subtitle: 'Captain Cool Routine',
      emoji: '🏏',
      color: '#1E40AF',
      strength: 'Sharp Mind & Leadership',
      schedule: [
        { time: '06:30', activity: 'Wake', desc: 'Start the day focused', icon: '🌅' },
        { time: '07:00', activity: 'Breakfast', desc: 'Eggs / poha, Fruit, Milk', icon: '🍳' },
        { time: '08:00', activity: 'Conditioning', desc: 'Jogging, Agility drills, Balance work', icon: '🏃', duration: '60 min' },
        { time: '09:30', activity: 'Strength Training', desc: 'Core, Back, Shoulders', icon: '💪' },
        { time: '11:00', activity: 'Recovery', desc: 'Stretching, Massage', icon: '💆' },
        { time: '13:00', activity: 'Lunch', desc: 'Chicken/mutton curry, Rice/roti, Salad', icon: '🍲' },
        { time: '14:30', activity: 'Rest', desc: 'Mental recovery and relaxation', icon: '😴', duration: '45 min' },
        { time: '16:00', activity: 'Functional Training', desc: 'Medicine ball, Grip training', icon: '🏋️' },
        { time: '17:30', activity: 'Snack', desc: 'Nuts + fruit', icon: '🥜' },
        { time: '19:30', activity: 'Dinner', desc: 'Light chicken dish, Vegetables', icon: '🍛' },
        { time: '22:30', activity: 'Sleep', desc: '7-8 hours of quality sleep', icon: '🌙' },
      ],
      tips: [
        { title: 'Emotional Control', desc: 'Don\'t panic - brain stays logical under pressure', icon: '🧠' },
        { title: 'Pattern Recognition', desc: 'Read situations like chess - anticipate moves', icon: '♟️' },
        { title: 'Low Cortisol', desc: 'Manage stress for better decisions', icon: '😌' },
        { title: 'High Focus Span', desc: 'Concentrate for hours without distraction', icon: '🎯' },
      ],
      diet: ['Eggs', 'Chicken', 'Mutton', 'Rice', 'Roti', 'Milk', 'Fruits', 'Nuts', 'Vegetables'],
    },
    kohli: {
      name: 'Virat Kohli',
      subtitle: 'King Kohli Routine',
      emoji: '💪',
      color: '#DC2626',
      strength: 'Speed & Stamina',
      schedule: [
        { time: '06:00', activity: 'Wake', desc: 'Early start for maximum productivity', icon: '🌅' },
        { time: '06:15', activity: 'Hydration + Mobility', desc: 'Water and light stretching', icon: '💧' },
        { time: '06:45', activity: 'Breakfast', desc: 'Smoothie, Oats, Seeds', icon: '🍳' },
        { time: '07:45', activity: 'HIIT + Cardio', desc: 'Interval runs, Sprint drills', icon: '🏃', duration: '60 min' },
        { time: '09:30', activity: 'Strength Training', desc: 'Deadlifts, Pull-ups, Core', icon: '💪' },
        { time: '11:00', activity: 'Recovery', desc: 'Ice bath, Stretching', icon: '❄️' },
        { time: '13:00', activity: 'Lunch', desc: 'Grilled chicken, Brown rice, Greens', icon: '🍲' },
        { time: '14:30', activity: 'Nap', desc: 'Recovery sleep', icon: '😴', duration: '40 min' },
        { time: '16:00', activity: 'Flexibility & Yoga', desc: 'Deep stretching and balance', icon: '🧘' },
        { time: '18:00', activity: 'Protein Snack', desc: 'Post-workout nutrition', icon: '🥤' },
        { time: '20:00', activity: 'Dinner', desc: 'Fish/chicken, Vegetables', icon: '🍛' },
        { time: '22:30', activity: 'Sleep', desc: '7-8 hours of quality sleep', icon: '🌙' },
      ],
      tips: [
        { title: 'HIIT Cardio', desc: '30 sec sprint, 90 sec walk × 8 rounds - Improves oxygen system', icon: '⚡' },
        { title: 'Sprint Training', desc: '6 × 40m sprint - Builds explosive power', icon: '🏃' },
        { title: 'Never Miss Training', desc: 'Discipline is everything - train even when you don\'t feel like it', icon: '💪' },
        { title: 'Clean Diet', desc: 'No junk, no alcohol - fuel your body right', icon: '🥗' },
      ],
      diet: ['Smoothies', 'Oats', 'Grilled chicken', 'Fish', 'Brown rice', 'Green vegetables', 'Seeds', 'Protein shakes'],
    },
    rohit: {
      name: 'Rohit Sharma',
      subtitle: 'Hitman Routine',
      emoji: '🎯',
      color: '#0891B2',
      strength: 'Lean Muscle & Balance',
      schedule: [
        { time: '07:00', activity: 'Wake', desc: 'Start the day relaxed', icon: '🌅' },
        { time: '07:15', activity: 'Breakfast', desc: 'Smoothie, Oats, Banana', icon: '🍳' },
        { time: '08:30', activity: 'Cardio', desc: 'Cycling, Jogging', icon: '🚴', duration: '45 min' },
        { time: '09:30', activity: 'Gym Training', desc: 'Chest, Back, Core', icon: '💪' },
        { time: '11:00', activity: 'Recovery', desc: 'Massage, Stretching', icon: '💆' },
        { time: '13:00', activity: 'Lunch', desc: 'Chicken/fish, Rice, Salad', icon: '🍲' },
        { time: '15:00', activity: 'Rest', desc: 'Mental and physical recovery', icon: '😴', duration: '30-40 min' },
        { time: '16:30', activity: 'Agility Training', desc: 'Quick footwork and reactions', icon: '⚡' },
        { time: '18:00', activity: 'Snack', desc: 'Fruit + nuts', icon: '🍎' },
        { time: '20:00', activity: 'Dinner', desc: 'Lean protein + vegetables', icon: '🍛' },
        { time: '22:30', activity: 'Sleep', desc: '7-8 hours of quality sleep', icon: '🌙' },
      ],
      tips: [
        { title: 'Compound Lifts', desc: 'Push-ups, Squats, Pull-ups, Lunges - Build functional strength', icon: '🏋️' },
        { title: 'Protein Intake', desc: '1.6g-2g per kg bodyweight - Essential for muscle', icon: '🥩' },
        { title: 'Clean Eating', desc: 'Avoid chips, cold drinks, fried food - Eat for growth', icon: '🥗' },
        { title: 'Quality Sleep', desc: 'Growth hormone releases during sleep - 7-8 hours minimum', icon: '😴' },
      ],
      diet: ['Smoothies', 'Oats', 'Chicken', 'Fish', 'Rice', 'Eggs', 'Paneer', 'Fruits', 'Nuts'],
    },
    neymar: {
      name: 'Neymar Jr',
      subtitle: 'Skill Master Routine',
      emoji: '🌟',
      color: '#8B5CF6',
      strength: 'Flexibility & Skills',
      schedule: [
        { time: '06:30', activity: 'Wake', desc: 'Start fresh', icon: '🌅' },
        { time: '07:00', activity: 'Breakfast', desc: 'Eggs, Fruit, Juice', icon: '🍳' },
        { time: '08:00', activity: 'Mobility & Warm-up', desc: 'Full body preparation', icon: '🧘' },
        { time: '09:00', activity: 'Strength Training', desc: 'Legs, Core, Balance', icon: '💪' },
        { time: '10:30', activity: 'Recovery', desc: 'Physiotherapy, Massage', icon: '💆' },
        { time: '12:30', activity: 'Lunch', desc: 'Rice + beans, Chicken/fish', icon: '🍲' },
        { time: '14:00', activity: 'Rest', desc: 'Recovery time', icon: '😴', duration: '40 min' },
        { time: '15:30', activity: 'Speed & Coordination', desc: 'Quick feet and reactions', icon: '⚡' },
        { time: '17:00', activity: 'Protein Snack', desc: 'Post-training nutrition', icon: '🥤' },
        { time: '19:30', activity: 'Dinner', desc: 'Pasta/chicken, Vegetables', icon: '🍛' },
        { time: '22:30', activity: 'Sleep', desc: '7-9 hours of quality sleep', icon: '🌙' },
      ],
      tips: [
        { title: 'Flexibility Work', desc: 'Daily stretching prevents injury and improves agility', icon: '🧘' },
        { title: 'Ball Skills', desc: 'Practice dribbling and close control daily', icon: '⚽' },
        { title: 'Core Stability', desc: 'Strong core = better balance and power', icon: '🎯' },
        { title: 'Recovery First', desc: 'Physiotherapy and massage are essential', icon: '💆' },
      ],
      diet: ['Eggs', 'Rice', 'Beans', 'Chicken', 'Fish', 'Pasta', 'Fresh fruits', 'Vegetables', 'Natural juices'],
    },
    srk: {
      name: 'Shah Rukh Khan',
      subtitle: 'King Khan Transformation',
      emoji: '👑',
      color: '#F59E0B',
      strength: 'Discipline & Transformation',
      schedule: [
        { time: '06:00', activity: 'Wake', desc: 'Early start for productivity', icon: '🌅' },
        { time: '06:30', activity: 'Cardio', desc: 'Running or cycling', icon: '🏃', duration: '45 min' },
        { time: '07:30', activity: 'Breakfast', desc: 'Eggs, Toast, Fresh juice', icon: '🍳' },
        { time: '09:00', activity: 'Gym Training', desc: 'Full body workout', icon: '💪', duration: '90 min' },
        { time: '11:00', activity: 'Recovery', desc: 'Stretching and rest', icon: '💆' },
        { time: '12:30', activity: 'Lunch', desc: 'Grilled protein, Salad', icon: '🍲' },
        { time: '14:00', activity: 'Work/Meetings', desc: 'Professional commitments', icon: '💼' },
        { time: '17:00', activity: 'Snack', desc: 'Healthy snack', icon: '🥜' },
        { time: '19:00', activity: 'Evening Workout', desc: 'Light training or yoga', icon: '🧘' },
        { time: '20:30', activity: 'Dinner', desc: 'Light, protein-rich meal', icon: '🍛' },
        { time: '23:00', activity: 'Sleep', desc: '6-7 hours of sleep', icon: '🌙' },
      ],
      tips: [
        { title: 'Consistency', desc: 'Train even on busy days - no excuses', icon: '💪' },
        { title: 'Transformation Mindset', desc: 'Age is just a number - keep pushing', icon: '🔥' },
        { title: 'Work-Life Balance', desc: 'Balance work with fitness priorities', icon: '⚖️' },
        { title: 'Personal Trainer', desc: 'Work with experts for best results', icon: '👨‍🏫' },
      ],
      diet: ['Eggs', 'Grilled chicken', 'Fish', 'Salads', 'Fresh juices', 'Nuts', 'Limited carbs'],
    },
    salman: {
      name: 'Salman Khan',
      subtitle: 'Bhai Workout',
      emoji: '💪',
      color: '#EF4444',
      strength: 'Muscle Building',
      schedule: [
        { time: '07:00', activity: 'Wake', desc: 'Start the day strong', icon: '🌅' },
        { time: '07:30', activity: 'Morning Cycling', desc: 'Cardio to start the day', icon: '🚴', duration: '30 min' },
        { time: '08:00', activity: 'Breakfast', desc: 'High protein breakfast', icon: '🍳' },
        { time: '09:00', activity: 'Heavy Lifting', desc: 'Chest, Shoulders, Arms', icon: '🏋️', duration: '90 min' },
        { time: '11:00', activity: 'Swimming', desc: 'Recovery and cardio', icon: '🏊' },
        { time: '12:30', activity: 'Lunch', desc: 'High protein meal', icon: '🍲' },
        { time: '14:00', activity: 'Rest', desc: 'Muscle recovery', icon: '😴' },
        { time: '16:00', activity: 'Evening Gym', desc: 'Back, Legs, Core', icon: '💪', duration: '60 min' },
        { time: '18:00', activity: 'Snack', desc: 'Protein shake', icon: '🥤' },
        { time: '20:00', activity: 'Dinner', desc: 'Protein with vegetables', icon: '🍛' },
        { time: '23:00', activity: 'Sleep', desc: '7 hours of sleep', icon: '🌙' },
      ],
      tips: [
        { title: 'Heavy Compound Lifts', desc: 'Bench press, Squats, Deadlifts - Build mass', icon: '🏋️' },
        { title: 'High Protein', desc: 'Chicken, Fish, Eggs - Essential for muscle', icon: '🥩' },
        { title: 'Cycling', desc: 'Regular cycling for cardio without losing muscle', icon: '🚴' },
        { title: 'Consistency', desc: 'Train for decades - build a legacy physique', icon: '💪' },
      ],
      diet: ['Eggs', 'Chicken', 'Fish', 'Protein shakes', 'Rice', 'Vegetables', 'Almonds'],
    },
    akshay: {
      name: 'Akshay Kumar',
      subtitle: 'Khiladi Routine',
      emoji: '🥋',
      color: '#F97316',
      strength: 'Martial Arts & Discipline',
      schedule: [
        { time: '04:30', activity: 'Wake', desc: 'Extremely early start', icon: '🌅' },
        { time: '05:00', activity: 'Martial Arts', desc: 'Kickboxing, Taekwondo training', icon: '🥋', duration: '60 min' },
        { time: '06:00', activity: 'Swimming', desc: 'Full body workout', icon: '🏊' },
        { time: '07:00', activity: 'Breakfast', desc: 'Protein-rich meal', icon: '🍳' },
        { time: '08:00', activity: 'Work/Shooting', desc: 'Professional commitments', icon: '🎬' },
        { time: '12:00', activity: 'Lunch', desc: 'Simple, healthy meal', icon: '🍲' },
        { time: '17:00', activity: 'Light Workout', desc: 'Stretching or yoga', icon: '🧘' },
        { time: '18:30', activity: 'Dinner', desc: 'Dinner before sunset', icon: '🍛' },
        { time: '19:30', activity: 'Family Time', desc: 'No work after dinner', icon: '👨‍👩‍👧' },
        { time: '21:00', activity: 'Sleep', desc: 'Early to bed, 7+ hours', icon: '🌙' },
      ],
      tips: [
        { title: 'Early Rising', desc: 'Wake at 4:30 AM - maximum productivity', icon: '⏰' },
        { title: 'Martial Arts', desc: 'Regular practice builds discipline and fitness', icon: '🥋' },
        { title: 'No Late Dinners', desc: 'Eat before sunset - better digestion', icon: '🌅' },
        { title: 'Work-Life Balance', desc: 'No work after 7 PM - family first', icon: '👨‍👩‍👧' },
      ],
      diet: ['Simple home food', 'Proteins', 'Vegetables', 'No alcohol', 'No smoking', 'Limited sugar'],
    },
  };

  const athlete = athleteData[selectedCelebrity] || athleteData.kohli;

  useEffect(() => {
    setTimeout(() => setShowContent(true), 100);
  }, []);

  const handleContinue = () => {
    navigate('/meal-freq');
  };

  const tabs = [
    { id: 'schedule', label: 'Daily Schedule', icon: '📅' },
    { id: 'tips', label: 'Training Tips', icon: '💡' },
    { id: 'diet', label: 'Diet Plan', icon: '🥗' },
  ];

  return (
    <Layout
      title={athlete.name}
      subtitle={athlete.subtitle}
      showBack
      onBack={() => navigate('/category')}
    >
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        {/* Hero Header */}
        <div style={{
          background: `linear-gradient(135deg, ${athlete.color}15 0%, ${athlete.color}25 100%)`,
          borderRadius: 24,
          padding: '32px',
          marginBottom: 28,
          textAlign: 'center',
          opacity: showContent ? 1 : 0,
          transform: showContent ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.5s ease',
        }}>
          <div style={{
            width: 100,
            height: 100,
            background: `linear-gradient(135deg, ${athlete.color}30 0%, ${athlete.color}50 100%)`,
            borderRadius: 28,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 56,
            margin: '0 auto 20px',
            boxShadow: `0 12px 40px ${athlete.color}30`,
          }}>
            {athlete.emoji}
          </div>
          <h2 style={{ fontSize: 28, fontWeight: 800, color: '#111', marginBottom: 8 }}>
            {athlete.name}
          </h2>
          <p style={{ fontSize: 15, color: '#666', marginBottom: 16 }}>{athlete.subtitle}</p>
          <div style={{
            display: 'inline-block',
            background: athlete.color,
            color: '#FFF',
            padding: '10px 24px',
            borderRadius: 12,
            fontSize: 14,
            fontWeight: 700,
          }}>
            🎯 Focus: {athlete.strength}
          </div>
        </div>

        {/* Tabs */}
        <div style={{
          display: 'flex',
          gap: 10,
          marginBottom: 24,
          background: '#F3F4F6',
          borderRadius: 14,
          padding: 6,
        }}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                flex: 1,
                background: activeTab === tab.id ? '#FFFFFF' : 'transparent',
                border: 'none',
                borderRadius: 10,
                padding: '14px 20px',
                fontSize: 14,
                fontWeight: 600,
                color: activeTab === tab.id ? athlete.color : '#666',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: activeTab === tab.id ? '0 2px 8px rgba(0,0,0,0.08)' : 'none',
              }}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div style={{
          background: '#FFFFFF',
          borderRadius: 20,
          padding: '28px',
          marginBottom: 28,
          boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
        }}>
          {/* Schedule Tab */}
          {activeTab === 'schedule' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {athlete.schedule.map((item, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 16,
                    padding: '16px',
                    background: '#FAFAFA',
                    borderRadius: 14,
                    borderLeft: `4px solid ${athlete.color}`,
                    opacity: showContent ? 1 : 0,
                    transform: showContent ? 'translateX(0)' : 'translateX(-10px)',
                    transition: 'all 0.4s ease',
                    transitionDelay: `${i * 0.03}s`,
                  }}
                >
                  <div style={{
                    width: 48,
                    height: 48,
                    background: `${athlete.color}15`,
                    borderRadius: 12,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 22,
                    flexShrink: 0,
                  }}>
                    {item.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                      <span style={{ fontSize: 14, fontWeight: 700, color: athlete.color }}>{item.time}</span>
                      <span style={{ fontSize: 16, fontWeight: 700, color: '#111' }}>{item.activity}</span>
                      {item.duration && (
                        <span style={{
                          fontSize: 11,
                          background: `${athlete.color}15`,
                          color: athlete.color,
                          padding: '3px 8px',
                          borderRadius: 6,
                          fontWeight: 600,
                        }}>
                          {item.duration}
                        </span>
                      )}
                    </div>
                    <p style={{ fontSize: 13, color: '#666' }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Tips Tab */}
          {activeTab === 'tips' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
              {athlete.tips.map((tip, i) => (
                <div
                  key={i}
                  style={{
                    padding: '24px',
                    background: `${athlete.color}08`,
                    borderRadius: 16,
                    border: `1px solid ${athlete.color}20`,
                    opacity: showContent ? 1 : 0,
                    transform: showContent ? 'scale(1)' : 'scale(0.95)',
                    transition: 'all 0.4s ease',
                    transitionDelay: `${i * 0.1}s`,
                  }}
                >
                  <div style={{
                    width: 50,
                    height: 50,
                    background: `${athlete.color}20`,
                    borderRadius: 14,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 26,
                    marginBottom: 14,
                  }}>
                    {tip.icon}
                  </div>
                  <h4 style={{ fontSize: 16, fontWeight: 700, color: '#111', marginBottom: 8 }}>{tip.title}</h4>
                  <p style={{ fontSize: 13, color: '#666', lineHeight: 1.5 }}>{tip.desc}</p>
                </div>
              ))}
            </div>
          )}

          {/* Diet Tab */}
          {activeTab === 'diet' && (
            <div>
              <p style={{ fontSize: 15, color: '#666', marginBottom: 20, lineHeight: 1.6 }}>
                🍽️ <strong>{athlete.name}'s</strong> diet focuses on clean eating, high protein, and proper nutrition timing.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                {athlete.diet.map((food, i) => (
                  <span
                    key={i}
                    style={{
                      padding: '12px 20px',
                      background: `${athlete.color}12`,
                      color: athlete.color,
                      borderRadius: 12,
                      fontSize: 14,
                      fontWeight: 600,
                      border: `1px solid ${athlete.color}25`,
                      opacity: showContent ? 1 : 0,
                      transform: showContent ? 'scale(1)' : 'scale(0.9)',
                      transition: 'all 0.3s ease',
                      transitionDelay: `${i * 0.05}s`,
                    }}
                  >
                    ✓ {food}
                  </span>
                ))}
              </div>

              {/* Common Pattern */}
              <div style={{
                marginTop: 28,
                padding: '20px',
                background: '#FEF3C7',
                borderRadius: 14,
                border: '1px solid #FCD34D',
              }}>
                <h4 style={{ fontSize: 15, fontWeight: 700, color: '#92400E', marginBottom: 12 }}>
                  ✅ Common Pattern (All Elite Athletes)
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
                  {[
                    { label: 'Sleep', value: '7-9 hrs + naps' },
                    { label: 'Meals', value: '5-6 per day' },
                    { label: 'Protein', value: 'Chicken, fish, eggs' },
                    { label: 'Training', value: '2 sessions/day' },
                    { label: 'Hydration', value: '3-5 liters/day' },
                    { label: 'Recovery', value: 'Ice, massage, stretch' },
                  ].map((item, i) => (
                    <div key={i} style={{ textAlign: 'center' }}>
                      <p style={{ fontSize: 12, color: '#92400E', fontWeight: 600 }}>{item.label}</p>
                      <p style={{ fontSize: 11, color: '#B45309' }}>{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Continue Button */}
        <button
          onClick={handleContinue}
          style={{
            width: '100%',
            background: `linear-gradient(135deg, ${athlete.color} 0%, ${athlete.color}dd 100%)`,
            border: 'none',
            borderRadius: 16,
            padding: '22px',
            fontSize: 18,
            fontWeight: 700,
            color: '#FFFFFF',
            cursor: 'pointer',
            boxShadow: `0 12px 45px ${athlete.color}40`,
            transition: 'all 0.3s ease',
          }}
        >
          🔥 Start {athlete.name} Challenge →
        </button>
      </div>
    </Layout>
  );
}
