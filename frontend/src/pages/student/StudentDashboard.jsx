import React from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import {
  Sparkles,
  Mic,
  Award,
  Briefcase,
  TrendingUp,
  Clock,
  ArrowRight,
  CheckCircle2,
  Calendar,
  FileText,
  Target,
  Compass
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

export const StudentDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Mock performance data over recent interview practice sessions
  const performanceData = [
    { session: 'Mock 1 (JS Core)', score: 6.8, date: 'Oct 12' },
    { session: 'Mock 2 (React State)', score: 7.4, date: 'Oct 16' },
    { session: 'Mock 3 (Behavioral)', score: 8.0, date: 'Oct 20' },
    { session: 'Mock 4 (Data Structures)', score: 7.8, date: 'Oct 24' },
    { session: 'Mock 5 (System Design)', score: 8.9, date: 'Oct 29' },
  ];

  const recentInterviews = [
    {
      id: 'int_01',
      title: 'Distributed Systems & Microservices',
      category: 'Technical Interview',
      date: 'Yesterday, 4:30 PM',
      duration: '22 mins',
      score: 8.9,
      difficulty: 'Advanced',
      status: 'Completed',
    },
    {
      id: 'int_02',
      title: 'Leadership & Conflict Resolution',
      category: 'Behavioral Interview',
      date: 'Oct 26, 11:00 AM',
      duration: '18 mins',
      score: 8.2,
      difficulty: 'Intermediate',
      status: 'Completed',
    },
    {
      id: 'int_03',
      title: 'Full Stack React & Node Pipeline',
      category: 'Technical Interview',
      date: 'Oct 22, 6:15 PM',
      duration: '25 mins',
      score: 7.9,
      difficulty: 'Intermediate',
      status: 'Completed',
    },
  ];

  const recommendedJobs = [
    {
      id: 'job_01',
      title: 'Full Stack AI Engineer',
      company: 'TechPulse Cloud Solutions',
      location: 'Bengaluru / Remote',
      salary: '$30,000 – $45,000 / yr',
      skills: ['React.js', 'Node.js', 'Python', 'Docker'],
      matchScore: 92,
      posted: '2d ago',
    },
    {
      id: 'job_02',
      title: 'Software Development Engineer I (Backend)',
      company: 'Nexus Scale Labs',
      location: 'Hyderabad, India',
      salary: '$28,000 – $38,000 / yr',
      skills: ['Go', 'System Design', 'PostgreSQL'],
      matchScore: 86,
      posted: '3d ago',
    },
    {
      id: 'job_03',
      title: 'Frontend Platform Engineer',
      company: 'CloudMatrix Digital',
      location: 'Remote',
      salary: '$32,000 – $48,000 / yr',
      skills: ['React.js', 'TypeScript', 'Tailwind CSS'],
      matchScore: 95,
      posted: '1d ago',
    },
  ];

  return (
    <DashboardLayout
      title={`Welcome back, ${user?.name || 'Candidate'} 👋`}
      subtitle="Track your AI mock preparation, test scores, and active job applications."
    >
      <div className="space-y-8">
        
        {/* Banner Card: Actionable Mock Callout */}
        <div className="rounded-3xl bg-gradient-to-r from-[#6655D9] via-[#5542C6] to-[#4533B2] text-white p-6 sm:p-8 shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 z-10 max-w-xl">
            <Badge variant="accent" size="sm">Recommended Next Step</Badge>
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
              Ready for a System Design or Behavioral Mock?
            </h2>
            <p className="text-xs sm:text-sm text-purple-100 leading-relaxed">
              Based on your recent roadmap, practicing microservices caching will boost your match score for TechPulse Cloud Solutions to 98%.
            </p>
          </div>
          <div className="z-10 shrink-0 w-full md:w-auto">
            <Button
              variant="dark"
              size="lg"
              onClick={() => navigate('/student/mock-interview')}
              leftIcon={<Mic className="w-5 h-5 text-[#A99AF5]" />}
              className="w-full md:w-auto shadow-lg shadow-black/20"
            >
              Start New AI Mock Interview
            </Button>
          </div>
        </div>

        {/* Active Enrolled Track & Revenue Tier */}
        <div className="p-5 rounded-3xl bg-[#161B2E] border border-[#6655D9]/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-lg">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#6655D9]/20 text-[#A99AF5] flex items-center justify-center border border-[#6655D9]/30 text-xl">
              ⚡
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-bold text-white">Full-Stack & Cloud Architecture Track</span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  ● Enrolled & Active ($59/mo)
                </span>
              </div>
              <p className="text-xs text-[#94A3B8] mt-0.5">
                50+ specialized curriculum mocks, system design sandboxes & AI voice modulation suite included.
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/student/pricing')}
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            Course Tracks & Pricing
          </Button>
        </div>

        {/* 4 Metric Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <Card className="p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#737987]">Total Interviews</span>
              <div className="w-9 h-9 rounded-xl bg-[#F4F2FF] text-[#6655D9] flex items-center justify-center">
                <Mic className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl sm:text-3xl font-extrabold text-[#171923] mt-2">12</p>
            <p className="text-[11px] text-emerald-600 font-medium mt-1 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> +3 this week
            </p>
          </Card>

          <Card className="p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#737987]">Avg Rubric Score</span>
              <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                <Award className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl sm:text-3xl font-extrabold text-[#171923] mt-2">8.2<span className="text-xs text-gray-400 font-normal">/10</span></p>
            <p className="text-[11px] text-emerald-600 font-medium mt-1 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> Top 10% percentile
            </p>
          </Card>

          <Card className="p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#737987]">Pending Applications</span>
              <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <Briefcase className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl sm:text-3xl font-extrabold text-[#171923] mt-2">4</p>
            <p className="text-[11px] text-[#737987] font-medium mt-1">2 under recruiter review</p>
          </Card>

          <Card className="p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#737987]">Shortlisted Offers</span>
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl sm:text-3xl font-extrabold text-emerald-600 mt-2">2</p>
            <p className="text-[11px] text-emerald-600 font-semibold mt-1">1 screening invite pending</p>
          </Card>
        </div>

        {/* Chart + Roadmap Progress Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Performance Chart */}
          <Card className="lg:col-span-2 p-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#E8EAED]">
              <div>
                <CardTitle>Interview Score Progression</CardTitle>
                <p className="text-xs text-[#737987] mt-0.5">Average technical & communication rubric over your last 5 sessions</p>
              </div>
              <Badge variant="success" size="sm">+21% Improvement</Badge>
            </div>

            <div className="h-64 mt-4 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={performanceData}>
                  <defs>
                    <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6655D9" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#6655D9" stopOpacity={0.0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E8EAED" />
                  <XAxis dataKey="session" tick={{ fontSize: 11, fill: '#737987' }} axisLine={false} tickLine={false} />
                  <YAxis domain={[0, 10]} tick={{ fontSize: 11, fill: '#737987' }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#171923', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
                    formatter={(val) => [`${val} / 10`, 'Score']}
                  />
                  <Area type="monotone" dataKey="score" stroke="#6655D9" strokeWidth={3} fillOpacity={1} fill="url(#scoreGradient)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Quick AI Learning Roadmap Summary */}
          <Card className="p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-[#E8EAED]">
                <CardTitle className="text-base flex items-center gap-2">
                  <Compass className="w-4 h-4 text-[#6655D9]" /> AI Learning Roadmap
                </CardTitle>
                <Badge variant="primary" size="sm">Week 3 of 4</Badge>
              </div>

              <div className="space-y-3 mt-4">
                <div className="p-3 rounded-xl bg-[#F8F9FC] border border-[#E8EAED]">
                  <div className="flex items-center justify-between text-xs font-bold text-[#171923]">
                    <span>Target Weak Topic</span>
                    <span className="text-rose-600">Priority</span>
                  </div>
                  <p className="text-xs text-[#737987] mt-1">CAP Theorem & Distributed Partition Handling</p>
                </div>

                <div className="p-3 rounded-xl bg-[#F8F9FC] border border-[#E8EAED]">
                  <div className="flex items-center justify-between text-xs font-bold text-[#171923]">
                    <span>Today's Task</span>
                    <span className="text-emerald-600 font-semibold">15 min</span>
                  </div>
                  <p className="text-xs text-[#737987] mt-1">Practice 3 STAR-method behavioral conflict responses</p>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-[#171923]">Overall Roadmap Completion</span>
                    <span className="text-[#6655D9]">72%</span>
                  </div>
                  <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-[#6655D9] h-full rounded-full" style={{ width: '72%' }} />
                  </div>
                </div>
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/student/roadmap')}
              className="w-full mt-4 justify-center"
            >
              Open Full Personalized Roadmap
            </Button>
          </Card>

        </div>

        {/* 2-Column: Recent Mock Sessions & Recommended Jobs */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Recent Mock Interviews */}
          <Card className="p-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#E8EAED]">
              <CardTitle className="text-base">Recent Mock Sessions</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/student/history')}
                className="text-xs font-semibold text-[#6655D9]"
              >
                View All
              </Button>
            </div>

            <div className="divide-y divide-[#E8EAED] mt-2">
              {recentInterviews.map((int) => (
                <div key={int.id} className="py-3.5 flex items-center justify-between gap-4">
                  <div>
                    <h4 className="text-xs font-bold text-[#171923] hover:text-[#6655D9] transition-colors cursor-pointer" onClick={() => navigate('/student/history')}>
                      {int.title}
                    </h4>
                    <div className="flex items-center gap-2 mt-1 text-[11px] text-[#737987]">
                      <span>{int.category}</span>
                      <span>•</span>
                      <span>{int.duration}</span>
                      <span>•</span>
                      <span>{int.date}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <div className="text-right">
                      <span className="text-xs font-extrabold text-[#6655D9]">{int.score}/10</span>
                      <p className="text-[10px] text-[#737987] capitalize">{int.difficulty}</p>
                    </div>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => navigate('/student/history')}
                    >
                      Report
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Recommended Jobs */}
          <Card className="p-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#E8EAED]">
              <CardTitle className="text-base">Recommended Jobs for You</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/student/jobs')}
                className="text-xs font-semibold text-[#6655D9]"
              >
                Browse All Jobs
              </Button>
            </div>

            <div className="divide-y divide-[#E8EAED] mt-2">
              {recommendedJobs.map((job) => (
                <div key={job.id} className="py-3.5 flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs font-bold text-[#171923] truncate">{job.title}</h4>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-50 text-emerald-700 shrink-0">
                        {job.matchScore}% Match
                      </span>
                    </div>
                    <p className="text-[11px] text-[#737987] mt-0.5 truncate">{job.company} • {job.location}</p>
                    <div className="flex flex-wrap gap-1 mt-1.5">
                      {job.skills.map((s) => (
                        <span key={s} className="px-1.5 py-0.2 rounded bg-gray-100 text-[10px] text-gray-700">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => navigate('/student/jobs')}
                    className="shrink-0"
                  >
                    Apply
                  </Button>
                </div>
              ))}
            </div>
          </Card>

        </div>

      </div>
    </DashboardLayout>
  );
};
