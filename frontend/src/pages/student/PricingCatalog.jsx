import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Card } from '../../components/ui/Card';
import { Modal } from '../../components/ui/Modal';
import { useToast } from '../../context/ToastContext';
import {
  Check,
  Sparkles,
  Zap,
  Shield,
  CreditCard,
  Tag,
  ArrowRight,
  Download,
  CheckCircle2,
  Sliders,
  Volume2,
  Award,
  Clock,
  Layers,
  Flame
} from 'lucide-react';

export const COURSE_TRACKS = [
  {
    id: 'campus',
    title: 'Campus Placement & Core DSA',
    badge: 'Starter Tier',
    badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    subtitle: 'For University Students & Fresh Graduates',
    description: 'Master core algorithmic problem solving, data structures, DBMS, OOP fundamentals, and campus behavioral interviews.',
    priceUsdMonthly: 29,
    priceUsdAnnual: 249,
    priceInrMonthly: 1999,
    priceInrAnnual: 16999,
    savingsAnnual: '28% Savings',
    features: [
      '25+ Algorithmic & Core CS Mock Sessions',
      'Non-repeating Data Structures & System basics',
      'Real-time STAR Behavioral Grills',
      'Dual Voice Modulation (HR & Tech Personas)',
      'Campus Resume & ATS Keyword Benchmark',
      'Verifiable Certificate of Readiness'
    ],
    recommended: false,
    icon: '🎓'
  },
  {
    id: 'fullstack',
    title: 'Full-Stack & Cloud Architecture',
    badge: 'Most Popular 🔥',
    badgeColor: 'bg-[#6655D9]/20 text-[#A99AF5] border-[#6655D9]/40',
    subtitle: 'For Modern Web & Cloud Engineers (1-4 yrs)',
    description: 'Designed for engineers targeting mid-level full-stack roles: React, Node.js, Microservices, System Design, and CI/CD pipelines.',
    priceUsdMonthly: 59,
    priceUsdAnnual: 499,
    priceInrMonthly: 3999,
    priceInrAnnual: 34999,
    savingsAnnual: '30% Savings',
    features: [
      '50+ Full-Stack, React, Node.js & Microservice Mocks',
      'System Design Interactive Architecture Sandboxes',
      'Full Voice Modulation Suite (Pitch, Speed, 5 Personas)',
      'Automated Rubric Scoring with Code Quality Inspection',
      'Equalizer Audio Visualizer & Real-time Feedback',
      'Priority Fast-Track to TechPulse & Partner ATS'
    ],
    recommended: true,
    icon: '⚡'
  },
  {
    id: 'senior-faang',
    title: 'Senior FAANG & Distributed Systems Elite',
    badge: 'Best Value ⚡',
    badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
    subtitle: 'For L5/L6 Staff Engineers & Big Tech Aspirants',
    description: 'High-concurrency distributed systems, Raft consensus, Kafka pipelines, Hard LeetCode patterns, and Amazon Leadership Principles.',
    priceUsdMonthly: 99,
    priceUsdAnnual: 849,
    priceInrMonthly: 6999,
    priceInrAnnual: 59999,
    savingsAnnual: '29% Savings',
    features: [
      '100+ High-Throughput & Distributed Systems Mocks',
      'Strict FAANG Griller & Principal Architect Personas',
      'Amazon 16 Leadership Principles & Bar Raiser Drills',
      'In-depth Trade-off, Latency Profiling & CAP Rubrics',
      'Full Voice Modulation Fine-Tuning + Equalizer',
      '1-on-1 Async Review by Ex-FAANG Staff Engineers'
    ],
    recommended: false,
    icon: '💎'
  },
  {
    id: 'ai-ml',
    title: 'Applied AI, LLMs & ML Systems',
    badge: 'Specialized Tier',
    badgeColor: 'bg-cyan-500/20 text-[#38BDF8] border-cyan-500/40',
    subtitle: 'For Generative AI & ML Platform Engineers',
    description: 'Prepare for high-demand AI roles: RAG pipelines, Vector DB indexing, LLM fine-tuning, Agent orchestration, and Model serving.',
    priceUsdMonthly: 129,
    priceUsdAnnual: 1099,
    priceInrMonthly: 8999,
    priceInrAnnual: 74999,
    savingsAnnual: '29% Savings',
    features: [
      '40+ RAG Architecture & Vector DB Interview Scenarios',
      'AI Agent Orchestration & Tool-Calling Chambers',
      'Latency, Token Economics & GPU Optimization Rubrics',
      'Synthetic Neural AI Interviewer Voice Modulation',
      'Production ML Pipeline Case Study Frameworks',
      'Verified AI Systems Architecture Credential'
    ],
    recommended: false,
    icon: '🤖'
  },
  {
    id: 'tech-lead',
    title: 'Engineering Management & Tech Lead',
    badge: 'Executive Tier',
    badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    subtitle: 'For Team Leads, EMs & Engineering Directors',
    description: 'Master senior management rounds: Cross-functional leadership, incident post-mortems, team scaling, tech debt prioritization, and OKRs.',
    priceUsdMonthly: 149,
    priceUsdAnnual: 1299,
    priceInrMonthly: 9999,
    priceInrAnnual: 89999,
    savingsAnnual: '28% Savings',
    features: [
      '35+ Executive 360°, Conflict Resolution & Hiring Mocks',
      'Cross-Functional Stakeholder Communication Drills',
      'Incident Post-Mortem & Blameless Culture Rubrics',
      'Executive HR Director & Founder Voice Modulation',
      'Strategic Tech Debt & Roadmap Trade-Off Scenarios',
      'Direct Recruiter Screening Network Access'
    ],
    recommended: false,
    icon: '👑'
  }
];

export const PricingCatalog = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  const [currency, setCurrency] = useState('USD'); // 'USD' | 'INR'
  const [billingCycle, setBillingCycle] = useState('monthly'); // 'monthly' | 'annual'
  const [activeTrack, setActiveTrack] = useState(() => {
    const saved = localStorage.getItem('interviewiq_active_track');
    return saved ? JSON.parse(saved) : COURSE_TRACKS[1]; // Default to Full-Stack
  });

  // Checkout Modal State
  const [selectedTrackForCheckout, setSelectedTrackForCheckout] = useState(null);
  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponAppliedMessage, setCouponAppliedMessage] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [completedInvoice, setCompletedInvoice] = useState(null);

  const getPrice = (track) => {
    if (currency === 'USD') {
      return billingCycle === 'monthly' ? track.priceUsdMonthly : track.priceUsdAnnual;
    } else {
      return billingCycle === 'monthly' ? track.priceInrMonthly : track.priceInrAnnual;
    }
  };

  const getPriceSymbol = () => (currency === 'USD' ? '$' : '₹');

  const handleOpenCheckout = (track) => {
    setSelectedTrackForCheckout(track);
    setCouponCode('');
    setDiscountPercent(0);
    setCouponAppliedMessage('');
    setCompletedInvoice(null);
  };

  const handleApplyCoupon = () => {
    const code = couponCode.trim().toUpperCase();
    if (code === 'IQ20') {
      setDiscountPercent(20);
      setCouponAppliedMessage('🎉 20% Discount Applied (Code: IQ20)');
      toast.show('Coupon IQ20 applied! You saved 20%.', 'success');
    } else if (code === 'FAANG50') {
      setDiscountPercent(50);
      setCouponAppliedMessage('🚀 50% Elite Launch Discount Applied (Code: FAANG50)');
      toast.show('Mega Coupon FAANG50 applied! You saved 50%.', 'success');
    } else {
      setDiscountPercent(0);
      setCouponAppliedMessage('❌ Invalid coupon code. Try IQ20 or FAANG50.');
      toast.show('Invalid promo code. Please use IQ20 or FAANG50.', 'warning');
    }
  };

  const calculateFinalTotal = () => {
    if (!selectedTrackForCheckout) return { base: 0, discount: 0, tax: 0, total: 0 };
    const base = getPrice(selectedTrackForCheckout);
    const discount = Math.round((base * discountPercent) / 100);
    const afterDiscount = base - discount;
    const tax = Math.round(afterDiscount * 0.18); // 18% standard GST/Service tax
    const total = afterDiscount + tax;
    return { base, discount, tax, total };
  };

  const handleConfirmEnrollment = () => {
    if (!selectedTrackForCheckout) return;
    setIsProcessingPayment(true);

    setTimeout(() => {
      const calculation = calculateFinalTotal();
      const invoice = {
        invoiceNumber: `INV-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
        candidateName: user?.name || 'Aarav Sharma',
        candidateEmail: user?.email || 'student@interviewiq.com',
        courseTitle: selectedTrackForCheckout.title,
        trackId: selectedTrackForCheckout.id,
        billingCycle,
        currency,
        currencySymbol: getPriceSymbol(),
        basePrice: calculation.base,
        discount: calculation.discount,
        tax: calculation.tax,
        totalPaid: calculation.total,
        paymentMethod: paymentMethod === 'card' ? 'Visa / Mastercard ending in 4242' : paymentMethod === 'upi' ? 'UPI Instant Pay' : 'Digital Demo Wallet',
        status: 'PAID (Verified)'
      };

      // Save to state and localStorage
      setActiveTrack(selectedTrackForCheckout);
      localStorage.setItem('interviewiq_active_track', JSON.stringify(selectedTrackForCheckout));
      localStorage.setItem('interviewiq_latest_invoice', JSON.stringify(invoice));

      // Update user in localStorage
      const stored = localStorage.getItem('interviewiq_demo_user');
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          parsed.enrolledTrack = selectedTrackForCheckout.title;
          parsed.trackId = selectedTrackForCheckout.id;
          localStorage.setItem('interviewiq_demo_user', JSON.stringify(parsed));
        } catch (e) {
          console.warn(e);
        }
      }

      setIsProcessingPayment(false);
      setCompletedInvoice(invoice);
      toast.show(`Successfully enrolled in ${selectedTrackForCheckout.title}!`, 'success');
    }, 1200);
  };

  return (
    <DashboardLayout
      title="Career Tracks & Revenue Pricing"
      subtitle="Select your specialized interview curriculum path with calibrated questions, voice modulation, and FAANG rubric benchmarks."
    >
      <div className="space-y-8 max-w-7xl mx-auto">

        {/* Active Enrolled Track Status Banner */}
        <div className="rounded-3xl bg-gradient-to-r from-[#1E1B4B] via-[#161B2E] to-[#0A0C14] border border-[#6655D9]/40 p-6 sm:p-8 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                Active Track Enrolled
              </span>
              <span className="text-xs text-[#94A3B8]">Renews Automatically</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              {activeTrack.title}
            </h2>
            <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
              Your mock chamber is currently tuned for <strong className="text-white">{activeTrack.title}</strong> with AI voice modulation presets and specialized technical rubrics.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <Button
              variant="primary"
              size="md"
              onClick={() => navigate('/student/mock-interview')}
              leftIcon={<Zap className="w-4 h-4" />}
            >
              Launch Chamber ({activeTrack.title.split(' ')[0]})
            </Button>
          </div>
        </div>

        {/* Currency & Billing Toggle Bar */}
        <div className="glass-card rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Currency Switcher */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider">Currency:</span>
            <div className="flex items-center p-1 rounded-xl bg-[#0A0C14] border border-white/10">
              <button
                type="button"
                onClick={() => setCurrency('USD')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  currency === 'USD'
                    ? 'bg-[#6655D9] text-white shadow-button'
                    : 'text-[#94A3B8] hover:text-white'
                }`}
              >
                USD ($)
              </button>
              <button
                type="button"
                onClick={() => setCurrency('INR')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  currency === 'INR'
                    ? 'bg-[#6655D9] text-white shadow-button'
                    : 'text-[#94A3B8] hover:text-white'
                }`}
              >
                INR (₹)
              </button>
            </div>
          </div>

          {/* Billing Cycle Switcher */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider">Billing Interval:</span>
            <div className="flex items-center p-1 rounded-xl bg-[#0A0C14] border border-white/10">
              <button
                type="button"
                onClick={() => setBillingCycle('monthly')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  billingCycle === 'monthly'
                    ? 'bg-[#6655D9] text-white shadow-button'
                    : 'text-[#94A3B8] hover:text-white'
                }`}
              >
                Monthly
              </button>
              <button
                type="button"
                onClick={() => setBillingCycle('annual')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  billingCycle === 'annual'
                    ? 'bg-[#6655D9] text-white shadow-button'
                    : 'text-[#94A3B8] hover:text-white'
                }`}
              >
                <span>Annual</span>
                <span className="px-1.5 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-400 font-extrabold">Save ~30%</span>
              </button>
            </div>
          </div>
        </div>

        {/* 5 Course Track Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {COURSE_TRACKS.map((track) => {
            const isCurrentActive = activeTrack.id === track.id;
            const price = getPrice(track);
            const symbol = getPriceSymbol();

            return (
              <div
                key={track.id}
                className={`relative rounded-3xl p-6 flex flex-col justify-between transition-all duration-300 ${
                  track.recommended
                    ? 'bg-gradient-to-b from-[#1C173B] to-[#121424] border-2 border-[#6655D9] shadow-2xl shadow-[#6655D9]/20'
                    : 'glass-card border border-white/10 hover:border-white/20'
                }`}
              >
                {/* Header & Badges */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">{track.icon}</span>
                    <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold border ${track.badgeColor}`}>
                      {track.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-black text-white leading-tight">
                      {track.title}
                    </h3>
                    <p className="text-xs text-[#94A3B8] mt-1">
                      {track.subtitle}
                    </p>
                  </div>

                  {/* Revenue Price Display */}
                  <div className="py-3 border-y border-white/10">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-black text-white">
                        {symbol}{price.toLocaleString()}
                      </span>
                      <span className="text-xs text-[#94A3B8] font-semibold">
                        / {billingCycle === 'monthly' ? 'month' : 'year'}
                      </span>
                    </div>
                    {billingCycle === 'annual' && (
                      <p className="text-[11px] text-emerald-400 font-semibold mt-1">
                        Billed annually ({track.savingsAnnual})
                      </p>
                    )}
                  </div>

                  <p className="text-xs text-gray-300 leading-relaxed">
                    {track.description}
                  </p>

                  {/* Feature Checklist */}
                  <div className="space-y-2 pt-2">
                    <span className="text-[11px] font-bold text-[#A99AF5] uppercase tracking-wider block">
                      Curriculum & Chamber Features:
                    </span>
                    <ul className="space-y-2 text-xs text-gray-300">
                      {track.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Bottom Action Button */}
                <div className="pt-6 mt-6 border-t border-white/10">
                  {isCurrentActive ? (
                    <button
                      type="button"
                      disabled
                      className="w-full py-3 px-4 rounded-xl text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 cursor-default flex items-center justify-center gap-2"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Currently Active Track</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleOpenCheckout(track)}
                      className={`w-full py-3 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 shadow-button active:scale-95 ${
                        track.recommended
                          ? 'bg-[#6655D9] hover:bg-[#5542C6] text-white'
                          : 'bg-white/10 hover:bg-white/20 text-white border border-white/15'
                      }`}
                    >
                      <span>Enroll in Track</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Feature Comparison Matrix / Assurance */}
        <div className="glass-card rounded-3xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#6655D9]/20 text-[#A99AF5] flex items-center justify-center border border-[#6655D9]/30">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-base font-bold text-white">InterviewIQ Career Guarantee & Revenue Protection</h4>
              <p className="text-xs text-[#94A3B8]">All tracks include a 7-day no-questions-asked satisfaction policy and verifiable certificate.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-xs text-gray-300">
            <div className="p-4 rounded-2xl bg-[#0A0C14] border border-white/5 space-y-1">
              <span className="font-bold text-white block">🎙️ AI Voice Modulation Included</span>
              <p className="text-[#94A3B8]">Practice with 5 distinct interviewer personas with customized pitch, rate, and speech synthesis.</p>
            </div>
            <div className="p-4 rounded-2xl bg-[#0A0C14] border border-white/5 space-y-1">
              <span className="font-bold text-white block">🔄 Non-Repeating Question Engine</span>
              <p className="text-[#94A3B8]">Questions are dynamically drawn without repetition, ensuring comprehensive interview readiness.</p>
            </div>
            <div className="p-4 rounded-2xl bg-[#0A0C14] border border-white/5 space-y-1">
              <span className="font-bold text-white block">📈 Verified Rubric Benchmarks</span>
              <p className="text-[#94A3B8]">Receive instant score breakdowns for technical precision, communication, and business relevance.</p>
            </div>
          </div>
        </div>

      </div>

      {/* ============================================================== */}
      {/* CHECKOUT & MOCK INVOICE MODAL */}
      {/* ============================================================== */}
      <Modal
        isOpen={Boolean(selectedTrackForCheckout)}
        onClose={() => setSelectedTrackForCheckout(null)}
        title={completedInvoice ? "Official Payment Receipt & Invoice" : "Course Track Checkout"}
        size="lg"
      >
        {selectedTrackForCheckout && !completedInvoice && (
          <div className="space-y-6 text-white">
            {/* Track Summary Header */}
            <div className="p-4 rounded-2xl bg-[#0A0C14] border border-white/10 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold text-[#A99AF5] uppercase tracking-wider">Selected Track:</span>
                <h4 className="text-base font-black text-white">{selectedTrackForCheckout.title}</h4>
                <p className="text-xs text-[#94A3B8]">{selectedTrackForCheckout.subtitle}</p>
              </div>
              <div className="text-right">
                <span className="text-xl font-black text-white">
                  {getPriceSymbol()}{getPrice(selectedTrackForCheckout).toLocaleString()}
                </span>
                <span className="text-xs text-[#94A3B8] block">/ {billingCycle}</span>
              </div>
            </div>

            {/* Coupon Code Section */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-gray-300">
                Promo or Institutional Coupon Code:
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="e.g. IQ20 or FAANG50"
                  className="flex-1 p-3 bg-[#0A0C14] border border-white/10 rounded-xl text-xs text-white uppercase tracking-wider outline-none focus:border-[#6655D9]"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleApplyCoupon}
                >
                  Apply Code
                </Button>
              </div>
              {couponAppliedMessage && (
                <p className={`text-xs font-semibold ${discountPercent > 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {couponAppliedMessage}
                </p>
              )}
            </div>

            {/* Price Breakdown Calculation */}
            {(() => {
              const calc = calculateFinalTotal();
              return (
                <div className="p-4 rounded-2xl bg-[#0A0C14] border border-white/10 space-y-2 text-xs">
                  <div className="flex justify-between text-[#94A3B8]">
                    <span>Base Track Revenue Price ({billingCycle}):</span>
                    <span className="text-white font-mono">{getPriceSymbol()}{calc.base.toLocaleString()}</span>
                  </div>
                  {calc.discount > 0 && (
                    <div className="flex justify-between text-emerald-400 font-semibold">
                      <span>Promo Discount ({discountPercent}% OFF):</span>
                      <span className="font-mono">-{getPriceSymbol()}{calc.discount.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-[#94A3B8]">
                    <span>Standard Platform GST / Processing (18%):</span>
                    <span className="text-white font-mono">{getPriceSymbol()}{calc.tax.toLocaleString()}</span>
                  </div>
                  <div className="pt-2 border-t border-white/10 flex justify-between text-sm font-black text-white">
                    <span>Total Amount Payable:</span>
                    <span className="text-emerald-400 text-base font-mono">{getPriceSymbol()}{calc.total.toLocaleString()}</span>
                  </div>
                </div>
              );
            })()}

            {/* Payment Method Selector */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-gray-300">
                Select Payment Method:
              </label>
              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3 rounded-xl border text-xs font-bold transition-all cursor-pointer flex flex-col items-center gap-1 ${
                    paymentMethod === 'card'
                      ? 'bg-[#6655D9]/20 border-[#6655D9] text-white'
                      : 'bg-[#0A0C14] border-white/10 text-[#94A3B8] hover:text-white'
                  }`}
                >
                  <CreditCard className="w-4 h-4 text-[#A99AF5]" />
                  <span>Card / Visa</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-3 rounded-xl border text-xs font-bold transition-all cursor-pointer flex flex-col items-center gap-1 ${
                    paymentMethod === 'upi'
                      ? 'bg-[#6655D9]/20 border-[#6655D9] text-white'
                      : 'bg-[#0A0C14] border-white/10 text-[#94A3B8] hover:text-white'
                  }`}
                >
                  <Zap className="w-4 h-4 text-emerald-400" />
                  <span>UPI / GPay</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('demo')}
                  className={`p-3 rounded-xl border text-xs font-bold transition-all cursor-pointer flex flex-col items-center gap-1 ${
                    paymentMethod === 'demo'
                      ? 'bg-[#6655D9]/20 border-[#6655D9] text-white'
                      : 'bg-[#0A0C14] border-white/10 text-[#94A3B8] hover:text-white'
                  }`}
                >
                  <Sparkles className="w-4 h-4 text-[#38BDF8]" />
                  <span>1-Click Demo</span>
                </button>
              </div>
            </div>

            {/* Confirm Button */}
            <div className="flex justify-end gap-3 pt-2">
              <Button
                variant="outline"
                size="md"
                onClick={() => setSelectedTrackForCheckout(null)}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                size="md"
                isLoading={isProcessingPayment}
                onClick={handleConfirmEnrollment}
                leftIcon={<Shield className="w-4 h-4" />}
              >
                Confirm & Enroll Now
              </Button>
            </div>
          </div>
        )}

        {/* COMPLETED INVOICE & RECEIPT VIEW */}
        {completedInvoice && (
          <div className="space-y-6 text-white">
            <div className="p-6 rounded-3xl bg-[#0A0C14] border border-emerald-500/40 space-y-4">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-400">Payment Completed</span>
                  <h3 className="text-lg font-black text-white">InterviewIQ Tax Invoice</h3>
                  <p className="text-xs text-[#94A3B8]">Transaction ID: TXN-{Math.random().toString(36).substring(2, 10).toUpperCase()}</p>
                </div>
                <div className="text-right">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    {completedInvoice.status}
                  </span>
                  <p className="text-xs font-mono text-[#94A3B8] mt-1">{completedInvoice.invoiceNumber}</p>
                </div>
              </div>

              {/* Invoice Particulars Grid */}
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-[#94A3B8] block">Billed To Candidate:</span>
                  <strong className="text-white">{completedInvoice.candidateName}</strong>
                  <p className="text-[#94A3B8]">{completedInvoice.candidateEmail}</p>
                </div>
                <div>
                  <span className="text-[#94A3B8] block">Date of Issue:</span>
                  <strong className="text-white">{completedInvoice.date}</strong>
                  <p className="text-[#94A3B8]">Payment: {completedInvoice.paymentMethod}</p>
                </div>
              </div>

              {/* Line Items */}
              <div className="p-4 rounded-2xl bg-[#161B2E] border border-white/5 space-y-2 text-xs">
                <div className="flex justify-between font-bold text-white pb-2 border-b border-white/10">
                  <span>Description</span>
                  <span>Amount</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>{completedInvoice.courseTitle} ({completedInvoice.billingCycle})</span>
                  <span className="font-mono">{completedInvoice.currencySymbol}{completedInvoice.basePrice.toLocaleString()}</span>
                </div>
                {completedInvoice.discount > 0 && (
                  <div className="flex justify-between text-emerald-400 font-semibold">
                    <span>Discount Applied</span>
                    <span className="font-mono">-{completedInvoice.currencySymbol}{completedInvoice.discount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-400">
                  <span>Tax & Platform Fee (18%)</span>
                  <span className="font-mono">{completedInvoice.currencySymbol}{completedInvoice.tax.toLocaleString()}</span>
                </div>
                <div className="pt-2 border-t border-white/10 flex justify-between text-base font-black text-emerald-400">
                  <span>Total Billed:</span>
                  <span className="font-mono">{completedInvoice.currencySymbol}{completedInvoice.totalPaid.toLocaleString()}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-gray-400">
                <Shield className="w-4 h-4 text-[#A99AF5]" />
                <span>This digital invoice confirms immediate activation of your mock chamber and voice modulation suite.</span>
              </div>
            </div>

            <div className="flex justify-between items-center pt-2">
              <Button
                variant="outline"
                size="md"
                leftIcon={<Download className="w-4 h-4" />}
                onClick={() => toast.show('Digital Invoice saved to downloads!', 'success')}
              >
                Download Receipt (PDF)
              </Button>
              <Button
                variant="primary"
                size="md"
                onClick={() => {
                  setSelectedTrackForCheckout(null);
                  navigate('/student/mock-interview');
                }}
                leftIcon={<Zap className="w-4 h-4" />}
              >
                Enter Mock Chamber Now
              </Button>
            </div>
          </div>
        )}
      </Modal>

    </DashboardLayout>
  );
};
