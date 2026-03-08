import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { User, Mail, Shield, Coins, Calendar, ChevronRight, LogOut, CreditCard } from "lucide-react";
import { Link } from "react-router-dom";

const Profile = () => {
    const { user, logout, refreshUser } = useContext(AuthContext);

    useEffect(() => {
        refreshUser();
    }, []);

    if (!user) return null;

    return (
        <div className="min-h-[calc(100vh-80px)] bg-slate-950 py-12 px-4 relative overflow-hidden">
            {/* Background effects */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-600/5 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[100px] pointer-events-none translate-y-1/2 -translate-x-1/3"></div>

            <div className="max-w-4xl mx-auto relative z-10">
                <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <h1 className="text-4xl font-extrabold text-white tracking-tight mb-2">My Account</h1>
                        <p className="text-slate-400 font-medium">Manage your subscription, credits, and profile settings.</p>
                    </div>
                    <button
                        onClick={logout}
                        className="flex items-center gap-2 px-6 py-2.5 bg-red-500/10 text-red-400 border border-red-500/20 rounded-xl font-bold hover:bg-red-500 hover:text-white transition-all shadow-lg hover:shadow-red-500/20"
                    >
                        <LogOut className="w-4 h-4" /> Sign Out
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Left Column - User Info */}
                    <div className="md:col-span-1 space-y-6">
                        <div className="glass-card p-1 rounded-3xl overflow-hidden border-slate-800 bg-gradient-to-b from-slate-800/50 to-slate-900/50">
                            <div className="bg-slate-900 rounded-[calc(1.5rem-4px)] p-6 flex flex-col items-center">
                                <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-3xl flex items-center justify-center mb-6 shadow-2xl relative group">
                                    <User className="w-12 h-12 text-white" />
                                    <div className="absolute inset-0 bg-white/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                </div>
                                <h3 className="text-xl font-bold text-white mb-1 uppercase tracking-wider">{user.name}</h3>
                                <p className="text-slate-500 text-sm font-semibold flex items-center gap-1">
                                    <Mail className="w-3 h-3" /> {user.email}
                                </p>

                                <div className="mt-8 w-full space-y-3">
                                    <div className="flex items-center justify-between p-3 bg-slate-950 border border-slate-800 rounded-xl">
                                        <span className="text-slate-400 text-xs font-bold uppercase">Role</span>
                                        <span className="px-2 py-0.5 bg-blue-500/10 text-blue-400 border border-blue-500/30 rounded-md text-[10px] font-black uppercase tracking-widest flex items-center gap-1">
                                            <Shield className="w-3 h-3" /> {user.isAdmin ? 'Administrator' : 'Creator'}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between p-3 bg-slate-950 border border-slate-800 rounded-xl">
                                        <span className="text-slate-400 text-xs font-bold uppercase">Joined</span>
                                        <span className="text-slate-300 text-xs font-bold flex items-center gap-1">
                                            <Calendar className="w-3 h-3" /> {new Date(user.createdAt || Date.now()).toLocaleDateString()}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <Link to="/history" className="glass-card p-6 rounded-2xl border-slate-800 hover:border-purple-500/50 transition-all group flex items-center justify-between bg-slate-900/40">
                            <div className="flex items-center gap-4">
                                <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-slate-400 group-hover:text-purple-400 transition-colors">
                                    <ChevronRight className="w-5 h-5" />
                                </div>
                                <span className="text-white font-bold group-hover:translate-x-1 transition-transform">My Content Archive</span>
                            </div>
                        </Link>
                    </div>

                    {/* Right Column - Subscription & Credits */}
                    <div className="md:col-span-2 space-y-6">
                        {/* Credits Card */}
                        <div className="glass-card p-8 rounded-3xl border-purple-500/30 bg-gradient-to-br from-slate-900/80 to-slate-950 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                                <Coins className="w-32 h-32 text-purple-500" />
                            </div>

                            <div className="relative z-10">
                                <h3 className="text-sm font-black text-purple-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                                    <Coins className="w-4 h-4" /> Credit Balance
                                </h3>

                                <div className="flex items-end gap-3 mb-8">
                                    <span className="text-7xl font-black text-white leading-none">{user.credits}</span>
                                    <span className="text-slate-400 text-xl font-bold mb-2">Available</span>
                                </div>

                                <div className="h-2 w-full bg-slate-800 rounded-full mb-8 overflow-hidden">
                                    <div
                                        className="h-full bg-gradient-to-r from-purple-600 to-indigo-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]"
                                        style={{ width: `${Math.min(100, (user.credits / 100) * 100)}%` }}
                                    ></div>
                                </div>

                                <Link
                                    to="/pricing"
                                    className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-wider text-sm shadow-xl hover:shadow-purple-500/40 hover:-translate-y-1 transition-all"
                                >
                                    Get More Credits <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </div>

                        {/* Subscription Tier */}
                        <div className="glass-card p-8 rounded-3xl border-slate-800 bg-slate-900/40">
                            <h3 className="text-sm font-black text-slate-500 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                                <CreditCard className="w-4 h-4" /> Current Membership
                            </h3>

                            <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                                <div className="flex items-center gap-6">
                                    <div className="w-16 h-16 bg-slate-950 border border-slate-800 rounded-2xl flex items-center justify-center text-indigo-400">
                                        <Shield className="w-8 h-8" />
                                    </div>
                                    <div>
                                        <h4 className="text-2xl font-extrabold text-white capitalize">{user.subscriptionTier || 'Free'} Plan</h4>
                                        <p className="text-slate-400 font-medium">Your account is currently on the legacy {user.subscriptionTier || 'free'} tier.</p>
                                    </div>
                                </div>
                                <Link
                                    to="/pricing"
                                    className="w-full md:w-auto text-center px-6 py-3 bg-slate-800 text-white border border-slate-700 rounded-xl font-bold hover:bg-slate-700 transition-all"
                                >
                                    View Plans
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const ArrowRight = ({ className }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
);

export default Profile;
