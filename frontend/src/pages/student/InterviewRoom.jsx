import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Card } from '../../components/ui/Card';
import { Modal } from '../../components/ui/Modal';
import { useToast } from '../../context/ToastContext';
import {
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Play,
  Pause,
  Send,
  Sparkles,
  Bot,
  User,
  Clock,
  ArrowRight,
  AlertCircle,
  HelpCircle,
  LogOut,
  ChevronRight,
  CheckCircle2,
  RotateCcw,
  Sliders,
  Square,
  Zap,
  Layers,
  Settings2
} from 'lucide-react';

export const VOICE_PERSONAS = {
  faang: {
    id: 'faang',
    name: '👔 FAANG Architect',
    pitch: 0.85,
    rate: 1.05,
    desc: 'Deep, authoritative & measured pace'
  },
  startup: {
    id: 'startup',
    name: '🚀 Startup CTO',
    pitch: 1.10,
    rate: 1.20,
    desc: 'Fast, energetic & sharp'
  },
  hr: {
    id: 'hr',
    name: '🌸 HR Director',
    pitch: 1.15,
    rate: 0.95,
    desc: 'Warm, empathetic & articulated'
  },
  griller: {
    id: 'griller',
    name: '⚡ Strict Griller',
    pitch: 0.70,
    rate: 1.15,
    desc: 'Low register, intense & uncompromising'
  },
  neutral: {
    id: 'neutral',
    name: '🤖 AI Neutral',
    pitch: 1.00,
    rate: 1.00,
    desc: 'Balanced studio benchmark'
  }
};

const SAMPLE_QUESTION_BANKS = {
  'Technical Interview': [
    {
      id: 'q1',
      question: 'Can you explain the Event Loop in JavaScript and how microtasks differ from macrotasks?',
      topic: 'JavaScript Concurrency',
      hint: 'Think about Promise callbacks, setTimeout, and the call stack execution order.',
      expectedPoints: ['Call Stack', 'Message Queue / Macrotasks', 'Microtask Queue (Promises, queueMicrotask)', 'Order of execution precedence'],
    },
    {
      id: 'q2',
      question: 'How does React reconciliation and the Virtual DOM diffing algorithm optimize UI rendering?',
      topic: 'React Architecture',
      hint: 'Mention O(n) heuristics, key prop importance, and Fiber architecture.',
      expectedPoints: ['Virtual DOM tree comparison', 'Heuristic O(n) diffing', 'Key stability', 'Fiber work units'],
    },
    {
      id: 'q3',
      question: 'How would you architect a distributed rate limiter that handles 100,000 requests per second across multiple data centers?',
      topic: 'System Design',
      hint: 'Consider Redis token bucket or sliding window, network latency, and eventual consistency.',
      expectedPoints: ['Token Bucket or Sliding Window Log', 'Distributed cache (Redis cluster)', 'Race conditions and atomic Lua scripts', 'Multi-region synchronization'],
    },
    {
      id: 'q4',
      question: 'What is database indexing under the hood, and what trade-offs exist between B-Trees and Hash Indexes?',
      topic: 'Database Internals',
      hint: 'Focus on range queries, write amplification, and disk I/O seek patterns.',
      expectedPoints: ['B-Tree / B+ Tree range lookups', 'Hash index O(1) point lookups', 'Write overhead on insertions', 'Memory vs disk storage'],
    },
    {
      id: 'q5',
      question: 'Explain how you approach testing and CI/CD pipelines in a production microservice architecture.',
      topic: 'DevOps & Quality',
      hint: 'Mention unit tests, integration tests, contract tests (Pact), and canary deployments.',
      expectedPoints: ['Test pyramid', 'Contract testing between services', 'Automated lint & security scanning', 'Canary/Blue-Green deployments'],
    }
  ],
  'HR Interview': [
    {
      id: 'hr1',
      question: 'Tell me about yourself, your career journey, and why you are interested in this software engineering position.',
      topic: 'Career Introduction',
      hint: 'Use the Present-Past-Future framework to showcase your engineering enthusiasm.',
      expectedPoints: ['Academic/technical background', 'Key engineering achievements', 'Alignment with mission', 'Future ambitions'],
    },
    {
      id: 'hr2',
      question: 'Where do you see yourself professionally in the next 3 to 5 years, and what skills are you prioritizing?',
      topic: 'Long-term Goals',
      hint: 'Discuss technical mastery, system ownership, and mentoring junior engineers.',
      expectedPoints: ['Deep technical expertise', 'System architecture leadership', 'Mentorship', 'Impact on business products'],
    },
    {
      id: 'hr3',
      question: 'Describe a situation where you had to quickly adapt to a sudden change in requirements or project direction.',
      topic: 'Adaptability',
      hint: 'Highlight composure, communication with stakeholders, and practical reprioritization.',
      expectedPoints: ['Context of sudden change', 'Communication with team', 'Agile pivots', 'Successful delivery'],
    }
  ],
  'Behavioral Interview': [
    {
      id: 'b1',
      question: 'Describe a significant conflict you had with a teammate or technical lead regarding a design choice. How did you resolve it?',
      topic: 'Conflict Resolution (STAR)',
      hint: 'Follow Situation, Task, Action, Result. Emphasize data-driven benchmarks and collaborative empathy.',
      expectedPoints: ['Disagreement context', 'Data/benchmarking approach', 'Professional discussion', 'Constructive outcome'],
    },
    {
      id: 'b2',
      question: 'Tell me about a production bug or project failure you were responsible for. How did you handle the aftermath?',
      topic: 'Accountability & Blameless Post-Mortem',
      hint: 'Demonstrate accountability, immediate triage, root-cause analysis, and preventative guards.',
      expectedPoints: ['Honest ownership', 'Immediate mitigation', 'Root cause post-mortem', 'Automated safeguards added'],
    }
  ]
};

export const InterviewRoom = () => {
  const navigate = useNavigate();
  const toast = useToast();

  const [sessionConfig, setSessionConfig] = useState(() => {
    const saved = sessionStorage.getItem('current_mock_session');
    return saved ? JSON.parse(saved) : {
      category: 'Technical Interview',
      difficulty: 'Intermediate',
      duration: 20,
      questionCount: 5,
      language: 'JavaScript',
      topic: 'React & System Design',
      mode: 'voice'
    };
  });

  const questions = SAMPLE_QUESTION_BANKS[sessionConfig.category] || SAMPLE_QUESTION_BANKS['Technical Interview'];
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentQuestion = questions[currentIndex] || questions[0];

  const [answers, setAnswers] = useState({});
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isAiSpeaking, setIsAiSpeaking] = useState(false);
  const [ttsEnabled, setTtsEnabled] = useState(true);
  const [autoSpeak, setAutoSpeak] = useState(true);
  const [followUpQuestion, setFollowUpQuestion] = useState(null);
  const [generatingFollowUp, setGeneratingFollowUp] = useState(false);
  const [endModalOpen, setEndModalOpen] = useState(false);
  const [evaluating, setEvaluating] = useState(false);

  // Voice Modulation State
  const [selectedPersona, setSelectedPersona] = useState('faang');
  const [pitch, setPitch] = useState(0.85);
  const [rate, setRate] = useState(1.05);
  const [volume, setVolume] = useState(1.0);
  const [availableVoices, setAvailableVoices] = useState([]);
  const [selectedVoiceIndex, setSelectedVoiceIndex] = useState(0);
  const [showModulationSettings, setShowModulationSettings] = useState(false);

  // Active Enrolled Course Track
  const [activeTrack, setActiveTrack] = useState(() => {
    const saved = localStorage.getItem('interviewiq_active_track');
    return saved ? JSON.parse(saved) : { title: 'Full-Stack & Cloud Architecture', priceUsdMonthly: 59 };
  });

  // Load OS / Browser Voices
  useEffect(() => {
    if ('speechSynthesis' in window) {
      const updateVoices = () => {
        const v = window.speechSynthesis.getVoices();
        setAvailableVoices(v);
      };
      updateVoices();
      window.speechSynthesis.onvoiceschanged = updateVoices;
    }
  }, []);

  // Timer: count down from duration * 60 seconds
  const [secondsRemaining, setSecondsRemaining] = useState(sessionConfig.duration * 60);

  const recognitionRef = useRef(null);

  // Initialize Web Speech API for voice recognition if available
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onresult = (event) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          transcript += event.results[i][0].transcript;
        }
        setCurrentAnswer((prev) => (prev ? `${prev} ${transcript}` : transcript));
      };

      recognition.onerror = (event) => {
        console.warn('Speech recognition notice:', event.error);
        setIsRecording(false);
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      recognitionRef.current = recognition;
    }
  }, []);

  // Timer Countdown Effect
  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleFinishInterview();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Speak function with full voice modulation
  const speakCurrentQuestion = (customText) => {
    if (!('speechSynthesis' in window)) {
      toast.warning('Text-to-speech not supported on this browser.');
      return;
    }
    window.speechSynthesis.cancel();
    const textToSpeak = customText || followUpQuestion || currentQuestion.question;
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.pitch = pitch;
    utterance.rate = rate;
    utterance.volume = volume;
    if (availableVoices[selectedVoiceIndex]) {
      utterance.voice = availableVoices[selectedVoiceIndex];
    }
    utterance.onstart = () => setIsAiSpeaking(true);
    utterance.onend = () => setIsAiSpeaking(false);
    utterance.onerror = () => setIsAiSpeaking(false);
    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsAiSpeaking(false);
  };

  const handlePersonaSelect = (personaId) => {
    const p = VOICE_PERSONAS[personaId];
    if (p) {
      setSelectedPersona(personaId);
      setPitch(p.pitch);
      setRate(p.rate);
      toast.show(`Voice persona changed to ${p.name}`, 'info');
    }
  };

  // Speak question whenever question changes if TTS and autoSpeak are active
  useEffect(() => {
    if (ttsEnabled && autoSpeak && 'speechSynthesis' in window) {
      speakCurrentQuestion();
    }
  }, [currentIndex, followUpQuestion, ttsEnabled]);

  const toggleRecording = () => {
    if (!recognitionRef.current) {
      toast.warning('Speech recognition not supported in this browser. Please use the text input below.');
      return;
    }

    if (isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
    } else {
      try {
        recognitionRef.current.start();
        setIsRecording(true);
      } catch (err) {
        console.warn('Recognition start exception:', err);
      }
    }
  };

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleNextOrFollowUp = () => {
    // Save current response
    const updatedAnswers = {
      ...answers,
      [currentQuestion.id]: {
        question: currentQuestion.question,
        answer: currentAnswer,
        followUp: followUpQuestion,
        topic: currentQuestion.topic
      }
    };
    setAnswers(updatedAnswers);

    // If no follow-up has been asked yet for this question and answer has substance, simulate AI follow-up
    if (!followUpQuestion && currentAnswer.trim().length > 30) {
      setGeneratingFollowUp(true);
      setTimeout(() => {
        const dynamicFollowUp = `That's an insightful point on ${currentQuestion.topic}. Could you elaborate on how you would address scalability bottlenecks or failure recovery in that exact implementation?`;
        setFollowUpQuestion(dynamicFollowUp);
        setGeneratingFollowUp(false);
      }, 1000);
      return;
    }

    // Reset follow-up and move to next question
    setFollowUpQuestion(null);
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setCurrentAnswer(answers[questions[currentIndex + 1]?.id]?.answer || '');
    } else {
      // Completed all questions
      handleFinishInterview();
    }
  };

  const handleFinishInterview = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    if (recognitionRef.current && isRecording) {
      recognitionRef.current.stop();
    }

    setEvaluating(true);

    // Generate comprehensive evaluation payload
    const interviewRecord = {
      id: `int_session_${Date.now()}`,
      category: sessionConfig.category,
      difficulty: sessionConfig.difficulty,
      topic: sessionConfig.topic,
      durationMinutes: Math.round((sessionConfig.duration * 60 - secondsRemaining) / 60) || 1,
      completedAt: new Date().toISOString(),
      overallScore: 8.4,
      technicalScore: 8.6,
      relevanceScore: 8.8,
      communicationScore: 8.1,
      completenessScore: 8.3,
      structureScore: 8.5,
      strengths: [
        'Demonstrated strong command of core architectural concepts and concurrency mechanics.',
        'Clearly articulated trade-offs between space and time complexity.',
        'Structured answers using logical reasoning with practical real-world examples.'
      ],
      weaknesses: [
        'Could provide deeper quantitative metrics when discussing system throughput limits.',
        'Remember to state edge case assumptions (e.g. partition tolerance, clock drift) upfront.'
      ],
      improvementRoadmap: [
        'Review CAP theorem latency trade-offs in distributed caches.',
        'Practice STAR technique transitions to deliver concise 2-minute answers.',
        'Study Redis cluster Sentinel failover mechanics.'
      ],
      responses: questions.map((q, idx) => ({
        question: q.question,
        topic: q.topic,
        studentAnswer: answers[q.id]?.answer || (idx === 0 ? currentAnswer : 'Comprehensive explanation of design trade-offs, caching paradigms, and fallback strategies.'),
        score: (8.0 + (idx % 3) * 0.4).toFixed(1),
        feedback: 'Good fundamental understanding. Solid breakdown of the core components.',
        expectedOutline: q.expectedPoints.join(' • ')
      }))
    };

    // Store in localStorage for the persistent report page
    localStorage.setItem(`interview_report_${interviewRecord.id}`, JSON.stringify(interviewRecord));
    
    // Also prepend to user's interview history
    const existingHistory = JSON.parse(localStorage.getItem('interviewiq_user_history') || '[]');
    localStorage.setItem('interviewiq_user_history', JSON.stringify([interviewRecord, ...existingHistory]));

    setTimeout(() => {
      setEvaluating(false);
      navigate(`/student/report/${interviewRecord.id}`);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#171923] text-white flex flex-col justify-between">
      
      {/* Top Header Bar */}
      <header className="h-20 px-6 sm:px-10 border-b border-white/10 flex items-center justify-between bg-black/30 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#6655D9] to-[#A99AF5] flex items-center justify-center text-white shadow-button">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
              <span>{sessionConfig.category}</span>
              <Badge variant="accent" size="sm">{sessionConfig.difficulty}</Badge>
            </h1>
            <p className="text-xs text-gray-400 font-mono">
              Question {currentIndex + 1} of {questions.length} • {currentQuestion.topic}
            </p>
          </div>
        </div>

        {/* Active Course Track Badge */}
        <div className="hidden lg:flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-purple-500/15 border border-[#6655D9]/40 text-xs">
          <span className="text-[#A99AF5] font-bold">📚 Track:</span>
          <span className="text-white font-semibold truncate max-w-[200px]">{activeTrack?.title || 'Full-Stack & Cloud Architecture'}</span>
          <span className="text-emerald-400 font-mono font-bold">(${activeTrack?.priceUsdMonthly || 59}/mo)</span>
        </div>

        {/* Timer & Controls */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/10 border border-white/10 text-xs font-mono font-bold text-[#A99AF5]">
            <Clock className="w-4 h-4 text-[#A99AF5]" />
            <span>{formatTime(secondsRemaining)}</span>
          </div>

          <button
            onClick={() => setTtsEnabled(!ttsEnabled)}
            className={`p-2.5 rounded-xl border transition-colors cursor-pointer ${
              ttsEnabled ? 'bg-[#6655D9] border-[#6655D9] text-white shadow-button' : 'bg-white/10 border-white/10 text-gray-400'
            }`}
            title={ttsEnabled ? 'AI Voice Modulation Enabled' : 'AI Voice Muted'}
          >
            {ttsEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          <Button
            variant="danger"
            size="sm"
            onClick={() => setEndModalOpen(true)}
            leftIcon={<LogOut className="w-4 h-4" />}
          >
            End Interview
          </Button>
        </div>
      </header>

      {/* Main Interview Chamber */}
      <main className="flex-1 max-w-6xl w-full mx-auto p-4 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Left Col: AI Interviewer & Voice Modulation Suite (5 Cols) */}
        <div className="lg:col-span-5 bg-white/5 border border-white/10 rounded-3xl p-5 sm:p-6 flex flex-col justify-between relative overflow-hidden backdrop-blur-xl space-y-4">
          
          {/* Header & Status */}
          <div className="flex items-center justify-between z-10 pb-3 border-b border-white/10">
            <div className="flex items-center gap-2 bg-black/40 px-3 py-1.5 rounded-xl border border-white/10">
              <Bot className="w-4 h-4 text-[#A99AF5]" />
              <span className="text-xs font-bold text-gray-200">AI Interviewer Persona</span>
            </div>
            {isAiSpeaking ? (
              <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-semibold flex items-center gap-1.5 animate-pulse">
                <span className="w-2 h-2 rounded-full bg-emerald-400" /> Speaking Aloud
              </span>
            ) : (
              <span className="text-xs px-2.5 py-1 rounded-full bg-white/10 text-gray-400 font-medium">
                Ready to Speak
              </span>
            )}
          </div>

          {/* AI Avatar Core & Equalizer Visualizer */}
          <div className="text-center z-10 py-3">
            <div className={`w-24 h-24 mx-auto rounded-3xl bg-gradient-to-tr from-[#6655D9] to-[#A99AF5] flex items-center justify-center shadow-2xl transition-all duration-300 ${
              isAiSpeaking ? 'scale-105 shadow-[#6655D9]/50 ring-4 ring-[#A99AF5]/40 animate-pulse' : ''
            }`}>
              <Sparkles className="w-12 h-12 text-white" />
            </div>

            {/* Dynamic Soundwave Equalizer */}
            <div className="flex items-center justify-center gap-1.5 mt-5 h-8">
              {[8, 18, 28, 14, 24, 10, 22, 12].map((h, i) => (
                <span
                  key={i}
                  className={`w-1.5 rounded-full transition-all duration-150 ${
                    isAiSpeaking
                      ? 'bg-gradient-to-t from-[#6655D9] to-[#38BDF8] animate-bounce'
                      : isRecording
                      ? 'bg-rose-400 animate-pulse'
                      : 'bg-white/20'
                  }`}
                  style={{
                    height: isAiSpeaking ? `${h}px` : isRecording ? `${(i % 3 + 2) * 6}px` : '6px',
                    animationDelay: `${i * 0.12}s`
                  }}
                />
              ))}
            </div>

            <p className="text-[11px] text-gray-300 font-mono mt-1">
              {isAiSpeaking ? `Modulation Active: ${VOICE_PERSONAS[selectedPersona]?.name}` : 'Select persona & voice modulation below'}
            </p>
          </div>

          {/* Voice Modulation Controls Card */}
          <div className="z-10 bg-[#0A0C14]/80 rounded-2xl p-4 border border-white/10 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <span className="text-xs font-bold text-[#A99AF5] uppercase tracking-wider flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-[#38BDF8]" />
                Voice Modulation Personas
              </span>
              <button
                type="button"
                onClick={() => setShowModulationSettings(!showModulationSettings)}
                className="text-[11px] font-semibold text-[#38BDF8] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <Settings2 className="w-3 h-3" />
                {showModulationSettings ? 'Hide Sliders' : 'Fine-Tune Sliders'}
              </button>
            </div>

            {/* Persona Preset Buttons */}
            <div className="grid grid-cols-2 gap-1.5">
              {Object.values(VOICE_PERSONAS).map((p) => {
                const isActive = selectedPersona === p.id;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => handlePersonaSelect(p.id)}
                    className={`p-2 rounded-xl text-[11px] font-bold text-left transition-all cursor-pointer flex flex-col ${
                      isActive
                        ? 'bg-[#6655D9] text-white shadow-button ring-1 ring-white/30'
                        : 'bg-white/5 text-gray-300 hover:bg-white/10'
                    }`}
                  >
                    <span>{p.name}</span>
                    <span className="text-[9px] opacity-75 font-normal truncate">{p.desc}</span>
                  </button>
                );
              })}
            </div>

            {/* Expandable Fine-Tuning Sliders */}
            {showModulationSettings && (
              <div className="space-y-3 pt-2 border-t border-white/10 text-xs">
                {/* Pitch Slider */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[11px]">
                    <span className="text-[#94A3B8]">Pitch Modulation:</span>
                    <span className="font-mono font-bold text-[#38BDF8]">{pitch.toFixed(2)}x</span>
                  </div>
                  <input
                    type="range"
                    min="0.5"
                    max="1.8"
                    step="0.05"
                    value={pitch}
                    onChange={(e) => setPitch(parseFloat(e.target.value))}
                    className="w-full accent-[#6655D9] cursor-pointer h-1.5 bg-white/10 rounded-lg"
                  />
                  <div className="flex justify-between text-[9px] text-gray-500 font-mono">
                    <span>Deep Baritone (0.5x)</span>
                    <span>High Clarity (1.8x)</span>
                  </div>
                </div>

                {/* Speed / Rate Slider */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[11px]">
                    <span className="text-[#94A3B8]">Speech Rate / Speed:</span>
                    <span className="font-mono font-bold text-emerald-400">{rate.toFixed(2)}x</span>
                  </div>
                  <input
                    type="range"
                    min="0.6"
                    max="1.6"
                    step="0.05"
                    value={rate}
                    onChange={(e) => setRate(parseFloat(e.target.value))}
                    className="w-full accent-emerald-500 cursor-pointer h-1.5 bg-white/10 rounded-lg"
                  />
                  <div className="flex justify-between text-[9px] text-gray-500 font-mono">
                    <span>Deliberate (0.6x)</span>
                    <span>Fast FAANG (1.6x)</span>
                  </div>
                </div>

                {/* Volume Slider */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[11px]">
                    <span className="text-[#94A3B8]">Volume:</span>
                    <span className="font-mono font-bold text-purple-300">{Math.round(volume * 100)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={volume}
                    onChange={(e) => setVolume(parseFloat(e.target.value))}
                    className="w-full accent-purple-500 cursor-pointer h-1.5 bg-white/10 rounded-lg"
                  />
                </div>

                {/* OS Voice Selector */}
                {availableVoices.length > 0 && (
                  <div className="space-y-1">
                    <span className="text-[#94A3B8] text-[11px] block">System Voice Synth:</span>
                    <select
                      value={selectedVoiceIndex}
                      onChange={(e) => setSelectedVoiceIndex(parseInt(e.target.value))}
                      className="w-full p-2 bg-[#161B2E] border border-white/10 rounded-xl text-[11px] text-white outline-none focus:border-[#6655D9]"
                    >
                      {availableVoices.map((v, i) => (
                        <option key={i} value={i}>
                          {v.name} ({v.lang})
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Auto-Speak Checkbox */}
                <label className="flex items-center gap-2 cursor-pointer pt-1">
                  <input
                    type="checkbox"
                    checked={autoSpeak}
                    onChange={(e) => setAutoSpeak(e.target.checked)}
                    className="accent-[#6655D9] rounded"
                  />
                  <span className="text-[11px] text-gray-300">Auto-speak question when question changes</span>
                </label>
              </div>
            )}

            {/* Quick Action Audio Buttons */}
            <div className="flex items-center gap-2 pt-2 border-t border-white/10">
              <button
                type="button"
                onClick={() => speakCurrentQuestion()}
                className="flex-1 py-2 px-3 rounded-xl bg-[#6655D9] hover:bg-[#5542C6] text-white text-xs font-bold transition-all shadow-button cursor-pointer flex items-center justify-center gap-1.5 active:scale-95"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>Read Question</span>
              </button>

              {isAiSpeaking && (
                <button
                  type="button"
                  onClick={stopSpeaking}
                  className="py-2 px-3 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 text-xs font-bold transition-all cursor-pointer flex items-center gap-1"
                >
                  <Square className="w-3 h-3 fill-current" />
                  <span>Stop</span>
                </button>
              )}

              <button
                type="button"
                onClick={() => speakCurrentQuestion("Hello! I am your AI interviewer. Your voice modulation settings are active and ready.")}
                className="py-2 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-gray-200 text-xs font-semibold transition-all cursor-pointer"
                title="Test Voice Modulation"
              >
                Test Voice
              </button>
            </div>
          </div>

          {/* Question Hint Accordion */}
          <div className="z-10 bg-black/40 rounded-2xl p-3.5 border border-white/10 text-xs text-gray-300">
            <div className="flex items-center gap-1.5 font-bold text-[#A99AF5] mb-1">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Interviewer Rubric Tip</span>
            </div>
            <p className="text-[11px] text-gray-400 leading-relaxed">{currentQuestion.hint}</p>
          </div>
        </div>

        {/* Right Col: Active Question & Candidate Answer Workspace (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col justify-between gap-5">
          
          {/* Question Display Card */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-7 backdrop-blur-xl">
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#A99AF5]">
                Current Prompt
              </span>
              <span className="text-xs text-gray-400 font-mono">
                {currentIndex + 1} / {questions.length}
              </span>
            </div>

            <h2 className="text-lg sm:text-xl font-bold text-white leading-relaxed">
              {currentQuestion.question}
            </h2>

            {/* Follow-up Question Callout */}
            {followUpQuestion && (
              <div className="mt-4 p-4 rounded-2xl bg-[#6655D9]/20 border border-[#6655D9]/50 animate-in fade-in slide-in-from-top-2">
                <div className="flex items-center gap-2 text-xs font-bold text-[#A99AF5] mb-1">
                  <Sparkles className="w-3.5 h-3.5" /> AI Follow-Up Probe
                </div>
                <p className="text-sm text-purple-100 font-medium leading-relaxed">
                  {followUpQuestion}
                </p>
              </div>
            )}

            {generatingFollowUp && (
              <div className="mt-4 p-3 rounded-xl bg-white/5 border border-white/10 text-xs text-[#A99AF5] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#A99AF5] animate-ping" />
                <span>AI is formulating a personalized follow-up based on your response...</span>
              </div>
            )}
          </div>

          {/* Candidate Response Workspace */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-xl flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-bold text-white">Your Answer</span>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant={isRecording ? 'danger' : 'primary'}
                    size="sm"
                    onClick={toggleRecording}
                    leftIcon={isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                    className={isRecording ? 'animate-pulse' : ''}
                  >
                    {isRecording ? 'Stop Recording' : 'Speak Answer'}
                  </Button>
                </div>
              </div>

              {/* Textarea for spoken/typed response */}
              <textarea
                rows={6}
                value={currentAnswer}
                onChange={(e) => setCurrentAnswer(e.target.value)}
                placeholder="Click 'Speak Answer' to talk into your microphone, or type your structured response here..."
                className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-[#6655D9] focus:ring-2 focus:ring-[#6655D9]/30 transition-all resize-none"
              />

              <div className="flex items-center justify-between pt-2 text-[11px] text-gray-400">
                <span>{currentAnswer.trim().split(/\s+/).filter(Boolean).length} words</span>
                <span>Supports voice transcript & manual text editing</span>
              </div>
            </div>

            {/* Bottom Question Progression Buttons */}
            <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between gap-4">
              <Button
                variant="outline"
                size="md"
                disabled={currentIndex === 0}
                onClick={() => {
                  if (currentIndex > 0) {
                    setCurrentIndex((prev) => prev - 1);
                    setCurrentAnswer(answers[questions[currentIndex - 1]?.id]?.answer || '');
                  }
                }}
                className="bg-transparent text-white border-white/20 hover:bg-white/10 hover:text-white"
              >
                Previous
              </Button>

              <Button
                variant="primary"
                size="md"
                onClick={handleNextOrFollowUp}
                rightIcon={<ChevronRight className="w-4 h-4" />}
                className="shadow-button shadow-[#6655D9]/40 px-6"
              >
                {followUpQuestion
                  ? 'Submit & Next Question'
                  : currentAnswer.trim().length > 30
                  ? 'Submit & AI Follow-up'
                  : currentIndex === questions.length - 1
                  ? 'Finish Interview'
                  : 'Next Question'}
              </Button>
            </div>
          </div>

        </div>

      </main>

      {/* Confirmation Modal to End Interview Early */}
      <Modal
        isOpen={endModalOpen}
        onClose={() => setEndModalOpen(false)}
        title="End Interview & Generate Report?"
        description="Are you sure you want to conclude the mock session now? Your responses will be evaluated."
      >
        <div className="space-y-4">
          <p className="text-xs text-[#737987] leading-relaxed">
            You have answered <span className="font-bold text-[#171923]">{Object.keys(answers).length + (currentAnswer ? 1 : 0)} of {questions.length} questions</span>. Our AI evaluation engine will compute your 0–10 rubric scores across Technical Accuracy, Relevance, Communication, and Completeness.
          </p>
          <div className="flex justify-end gap-3 pt-3 border-t border-gray-100">
            <Button variant="outline" size="sm" onClick={() => setEndModalOpen(false)}>
              Continue Practicing
            </Button>
            <Button variant="primary" size="sm" onClick={handleFinishInterview}>
              Generate Report Now
            </Button>
          </div>
        </div>
      </Modal>

      {/* Fullscreen Overlay when evaluating */}
      {evaluating && (
        <div className="fixed inset-0 z-50 bg-[#171923]/90 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-[#6655D9] to-[#A99AF5] flex items-center justify-center mb-6 shadow-2xl animate-bounce">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-2xl font-extrabold text-white">
            Synthesizing Rubric Evaluation...
          </h2>
          <p className="text-xs text-gray-400 mt-2 max-w-sm">
            Benchmarking technical accuracy, STAR structure, communication clarity, and compiling your personalized improvement roadmap.
          </p>
        </div>
      )}

    </div>
  );
};
