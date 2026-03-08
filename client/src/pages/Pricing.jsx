import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Check, Zap, Rocket, Crown, ArrowRight } from "lucide-react";
import { toast } from "react-hot-toast";

const Pricing = () => {
    const { user } = useContext(AuthContext);

    const plans = [
        {
            name: "Free",
            price: "₹0",
            credits: "10",
            features: [
                "10 Free AI-Generated Posts",
                "Basic Platform Support",
                "Standard Response Time",
                "Community Support"
            ],
            buttonText: user ? (user.subscriptionTier === 'free' ? "Current Plan" : "Upgrade") : "Get Started",
            highlight: false,
            tier: 'free'
        },
        {
            name: "Pro",
            price: "₹499",
            period: "/month",
            credits: "500",
            features: [
                "500 AI-Generated Posts/mo",
                "Image-to-Post Generation",
                "AI Image Generation",
                "Priority AI Processing",
                "Advanced Post Tones",
                "Early Access Features"
            ],
            buttonText: "Upgrade to Pro",
            highlight: true,
            tier: 'pro',
            icon: <Rocket className="w-5 h-5" />
        },
        {
            name: "Business",
            price: "₹1499",
            period: "/month",
            credits: "Unlimited*",
            features: [
                "Unlimited Generations*",
                "Multi-account Management",
                "Custom Brand Voice AI",
                "API Access Integration",
                "Dedicated Account Manager",
                "Custom AI Templates"
            ],
            buttonText: "Contact Sales",
            highlight: false,
            tier: 'business',
            icon: <Crown className="w-5 h-5" />
        }
    ];

    const handleSubscription = (tier) => {
        if (!user) {
            toast.error("Please login to upgrade your plan.");
            return;
        }
        if (tier === 'free') return;

        toast.success(`Redirecting to payment gateway for ${tier.toUpperCase()} plan...`, {
            icon: '💳',
            style: { border: '1px solid #4a5568', background: '#1e293b', color: '#fff' }
        });

        // Simulating payment logic
        setTimeout(() => {
            alert("This is a demo. Integration with Stripe/Razorpay would happen here to monetise your 15k-20k goal!");
        }, 1500);
    };

    return (
        <div className="min-h-[calc(100vh-80px)] bg-slate-950 py-20 px-4 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-purple-600/5 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none translate-y-1/2 -translate-x-1/3"></div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">
                        Simple, <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">Transparent</span> Pricing
                    </h1>
                    <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto">
                        Choose the perfect plan to scale your social media presence and generate viral content effortlessly.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
                    {plans.map((plan, idx) => (
                        <div
                            key={idx}
                            className={`glass-card p-8 rounded-[2.5rem] border flex flex-col transition-all duration-500 hover:-translate-y-2 ${plan.highlight
                                    ? "border-purple-500/50 shadow-[0_0_50px_rgba(168,85,247,0.15)] relative scale-105 md:scale-110 z-20 bg-slate-900/40"
                                    : "border-slate-800 hover:border-slate-700 bg-slate-900/20"
                                }`}
                        >
                            {plan.highlight && (
                                <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-black uppercase tracking-widest px-6 py-2 rounded-full shadow-lg">
                                    Most Popular
                                </div>
                            )}

                            <div className="mb-8">
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 border ${plan.highlight ? "bg-purple-500/20 border-purple-500/30 text-purple-400" : "bg-slate-800 border-slate-700 text-slate-400"
                                    }`}>
                                    {plan.icon || <Zap className="w-5 h-5" />}
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-4xl font-extrabold text-white">{plan.price}</span>
                                    {plan.period && <span className="text-slate-500 font-medium">{plan.period}</span>}
                                </div>
                                <p className="mt-4 text-slate-400 font-medium">{plan.credits} Credits included</p>
                            </div>

                            <div className="space-y-4 mb-10 flex-grow">
                                {plan.features.map((feature, i) => (
                                    <div key={i} className="flex items-start gap-3">
                                        <div className="mt-1 bg-green-500/20 rounded-full p-0.5">
                                            <Check className="w-3.5 h-3.5 text-green-500" />
                                        </div>
                                        <span className="text-slate-300 text-sm font-medium">{feature}</span>
                                    </div>
                                ))}
                            </div>

                            <button
                                onClick={() => handleSubscription(plan.tier)}
                                className={`w-full py-4 px-6 rounded-2xl font-bold text-lg transition-all flex items-center justify-center gap-2 group ${plan.highlight
                                        ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-xl hover:shadow-purple-500/40"
                                        : "bg-slate-800 text-slate-200 hover:bg-slate-700 border border-slate-700"
                                    }`}
                            >
                                {plan.buttonText}
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    ))}
                </div>

                <div className="mt-24 text-center p-12 rounded-[3rem] bg-slate-900/30 border border-slate-800/50 backdrop-blur-sm max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-white mb-4">Enterprise Customization?</h2>
                    <p className="text-slate-400 mb-8 max-w-xl mx-auto font-medium">
                        Need custom AI models for your specific industry or massive scale API access? Our team can build tailored solutions for your business.
                    </p>
                    <button className="text-purple-400 font-bold hover:text-purple-300 transition-colors flex items-center justify-center gap-2 mx-auto">
                        Talk to our Solutions Architect <ArrowRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Pricing;
