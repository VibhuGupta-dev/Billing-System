
import Login from "../Components/SignIn";
import SignUp from "../Components/SignUp";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Receipt, TrendingUp, Wallet, ArrowLeft } from "lucide-react";
import Notification from "../Components/Notification";

// Smooth Orchestrated Container Variants
const containerVariants = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    transition: { 
      type: "spring", 
      stiffness: 100, 
      damping: 22,
      staggerChildren: 0.08 
    } 
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 120, damping: 20 } }
};

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  const handleBack = () => {
    console.log("Navigating back to main deck...");
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap');
        .font-display { font-family: 'Space Grotesk', sans-serif; }
        .font-mono { font-family: 'JetBrains Mono', monospace; }
        
        @keyframes pulseGlow {
          0%, 100% { opacity: 0.12; transform: scale(1); }
          50% { opacity: 0.22; transform: scale(1.08); }
        }
        .animate-glow { animation: pulseGlow 10s ease-in-out infinite; }
      `}</style>

      {/* Full Screen Layout with Responsive Padding */}
      <section className="font-display relative min-h-screen w-full overflow-y-auto lg:overflow-hidden bg-[radial-gradient(circle_at_center,_#1c1c1e_0%,_#0a0a0a_100%)] text-zinc-100 flex items-center justify-center p-4 md:p-8 selection:bg-zinc-800">
        <div className="absolute top-4 right-4 z-20 ">
          <Notification />
        </div>
        {/* SVG Grain Noise Overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.13] mix-blend-overlay z-0">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <filter id="noiseFilter">
              <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="3" stitchTiles="stitch" />
            </filter>
            <rect width="100%" height="100%" filter="url(#noiseFilter)" />
          </svg>
        </div>

        {/* Ambient Spotlights */}
        <div className="absolute top-1/4 left-1/4 h-[350px] w-[350px] rounded-full bg-emerald-500/10 blur-[90px] pointer-events-none animate-glow" />
        <div className="absolute bottom-1/4 right-1/4 h-[350px] w-[350px] rounded-full bg-red-500/5 blur-[100px] pointer-events-none animate-glow" style={{ animationDelay: "2.5s" }} />

        {/* Outer Adaptive Responsive Grid Split Card */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative w-full max-w-[1020px] min-h-[580px] grid grid-cols-1 lg:grid-cols-12 rounded-2xl border border-zinc-800/60 bg-zinc-900/20 backdrop-blur-xl shadow-2xl overflow-hidden z-10"
        >
          
          {/* TOP RIGHT BACK BUTTON (Contextually accessible across viewports) */}
          <button 
            onClick={handleBack}
            className="absolute top-5 right-5 z-50 inline-flex items-center gap-1.5 rounded-lg border border-zinc-800/80 bg-zinc-950/40 backdrop-blur-md px-3 py-1.5 text-xs font-medium text-zinc-400 hover:text-zinc-100 hover:border-zinc-700 transition-all active:scale-95"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back</span>
          </button>

          {/* LEFT AREA: Modern Expense Visualization (Hidden on Mobile viewports) */}
          <div className="hidden lg:flex lg:col-span-6 relative bg-zinc-950/30 p-10 flex-col justify-between border-r border-zinc-800/40 overflow-hidden">
            <motion.div variants={itemVariants} className="z-10">
              <div className="inline-flex items-center gap-2 rounded-full border border-zinc-800/80 bg-zinc-900/60 backdrop-blur-sm px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-zinc-300">
                <Receipt className="h-3 w-3 text-emerald-400" />
                InvoiceX Platform
              </div>
              <h1 className="text-3xl font-bold tracking-tight text-white mt-6 leading-tight">
                Manage expenses,<br />
                <span className="text-zinc-500">perfected for teams.</span>
              </h1>
            </motion.div>

            {/* Micro-Dashboard Asset */}
            <div className="relative my-auto py-6 flex justify-center items-center">
              <div className="absolute h-36 w-36 rounded-full bg-emerald-500/10 blur-3xl" />
              <motion.div 
                whileHover={{ y: -4, rotate: -0.5, transition: { duration: 0.2 } }}
                className="font-mono w-full max-w-[270px] bg-zinc-900/95 border border-zinc-800/90 rounded-xl p-5 shadow-2xl relative z-10"
              >
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[10px] text-zinc-500 font-bold tracking-wider uppercase">Telemetry</span>
                  <Wallet className="h-4 w-4 text-emerald-400" />
                </div>
                <div className="text-2xl font-bold text-white tracking-tight">₹48,920.00</div>
                
                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-zinc-400">Infrastructure</span>
                    <span className="text-white font-bold">₹12,400</span>
                  </div>
                  <div className="w-full bg-zinc-800 h-1 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: "70%" }} transition={{ duration: 0.8, delay: 0.3 }} className="bg-emerald-400 h-full rounded-full" />
                  </div>
                  
                  <div className="flex items-center justify-between text-[11px] pt-1">
                    <span className="text-zinc-400">API Gateway</span>
                    <span className="text-white font-bold">₹8,900</span>
                  </div>
                  <div className="w-full bg-zinc-800 h-1 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: "45%" }} transition={{ duration: 0.8, delay: 0.4 }} className="bg-red-400 h-full rounded-full" />
                  </div>
                </div>

                <div className="absolute -bottom-3 -right-3 bg-zinc-100 text-zinc-950 font-display font-bold text-[10px] px-2.5 py-1 rounded-lg flex items-center gap-1 shadow-xl">
                  <TrendingUp className="h-3 w-3 text-emerald-600" />
                  <span>+12.4%</span>
                </div>
              </motion.div>
            </div>

            <p className="text-xs text-zinc-500 font-light z-10">
              Automate financial flows, parse statements and lower overhead metrics efficiently.
            </p>
          </div>

          {/* RIGHT AREA: Core Glassmorphic Form Stage */}
          <div className="lg:col-span-6 p-6 sm:p-10 md:p-12 flex flex-col justify-center relative mt-8 lg:mt-0">
            
            {/* Context Header */}
            <motion.div variants={itemVariants} className="flex flex-col items-center lg:items-start mb-6 text-center lg:text-left">
              <div className="lg:hidden inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-zinc-300 mb-3">
                <Receipt className="h-3 w-3 text-emerald-400" />
                InvoiceX System
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-white">
                {isLogin ? "Welcome Back" : "Get Started"}
              </h2>
              <p className="text-xs text-zinc-400 mt-1 max-w-xs font-light">
                {isLogin ? "Enter terminal credentials to synchronize workflow." : "Establish an operational profile to deploy systems."}
              </p>
            </motion.div>

            {/* Custom Sliding Toggle Control */}
            <motion.div variants={itemVariants} className="relative flex p-1 bg-zinc-950/60 rounded-xl border border-zinc-800/60 mb-6">
              <motion.div 
                className="absolute top-1 bottom-1 left-1 rounded-lg bg-zinc-100 shadow"
                animate={{ x: isLogin ? 0 : "98%" }}
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
                style={{ width: "49%" }}
              />
              <button 
                onClick={() => setIsLogin(true)}
                className={`flex-1 relative z-10 py-2 text-xs font-semibold rounded-lg transition-colors duration-150 ${isLogin ? "text-zinc-950" : "text-zinc-400 hover:text-zinc-200"}`}
              >
                Login
              </button>
              <button 
                onClick={() => setIsLogin(false)}
                className={`flex-1 relative z-10 py-2 text-xs font-semibold rounded-lg transition-colors duration-150 ${!isLogin ? "text-zinc-950" : "text-zinc-400 hover:text-zinc-200"}`}
              >
                Sign Up
              </button>
            </motion.div>

            {/* Smooth Render Phase */}
            <div className="relative min-h-[290px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={isLogin ? "loginStage" : "signupStage"}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                >
                  {isLogin ? <Login /> : <SignUp />}
                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        </motion.div>
      </section>
    </>
  );
}