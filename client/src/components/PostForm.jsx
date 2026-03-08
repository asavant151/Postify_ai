import { useState, useRef } from "react";
import { Send, Sparkles, LayoutList, MessageSquare, Image as ImageIcon, X } from "lucide-react";

const PostForm = ({ onGenerate, loading }) => {
    const [idea, setIdea] = useState("");
    const [platform, setPlatform] = useState("LinkedIn");
    const [tone, setTone] = useState("Professional");
    const [image, setImage] = useState(null);

    const textareaRef = useRef(null);
    const fileInputRef = useRef(null);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeImage = () => {
        setImage(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!idea.trim() && !image) return;
        onGenerate(idea || "Analyze this image and create a post", platform, tone, image);
    };

    const platforms = [
        { id: "LinkedIn", label: "LinkedIn" },
        { id: "Twitter", label: "Twitter (X)" },
        { id: "Instagram", label: "Instagram" },
        { id: "Blog", label: "Blog Post" },
    ];

    const tones = [
        { id: "Professional", label: "Professional" },
        { id: "Casual", label: "Casual & Friendly" },
        { id: "Motivational", label: "Motivational" },
        { id: "Storytelling", label: "Storytelling" },
        { id: "Marketing", label: "Sales & Marketing" },
    ];

    return (
        <div className="glass-card p-8 md:p-10 rounded-3xl w-full border border-slate-700/60 shadow-2xl relative overflow-hidden group hover:border-slate-500/50 transition-all duration-300">

            {/* Decorative gradient corner */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-purple-500/20 to-transparent rounded-bl-[100px] pointer-events-none"></div>

            <form onSubmit={handleSubmit} className="space-y-8 relative z-10">

                {/* Idea Input */}
                <div>
                    <label className="flex items-center gap-2 text-slate-200 font-bold mb-3 text-lg">
                        <MessageSquare className="w-5 h-5 text-purple-400" />
                        What do you want to write about?
                    </label>
                    <div className="relative group/input">
                        <textarea
                            ref={textareaRef}
                            required={!image}
                            value={idea}
                            onChange={(e) => setIdea(e.target.value)}
                            className="w-full px-5 py-4 min-h-[120px] bg-slate-950/50 border border-slate-700 text-slate-200 placeholder-slate-500 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all resize-none shadow-inner"
                            placeholder="e.g. AI agents are replacing junior developers, but it's actually creating more senior roles than ever..."
                            maxLength={300}
                        />

                        {/* Character count & Submit Floating */}
                        <div className="absolute bottom-4 right-4 flex items-center gap-3">
                            <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                className="p-2 text-slate-400 hover:text-purple-400 hover:bg-purple-500/10 rounded-xl transition-all"
                                title="Upload Image"
                            >
                                <ImageIcon className="w-5 h-5" />
                            </button>
                            <span className={`text-xs font-medium px-2 py-1 rounded-md bg-slate-900 border border-slate-800 ${idea.length > 280 ? 'text-orange-400' : 'text-slate-500'}`}>
                                {idea.length}/300
                            </span>
                        </div>
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleImageUpload}
                            accept="image/*"
                            className="hidden"
                        />
                    </div>
                    {image && (
                        <div className="mt-3 relative inline-block">
                            <img src={image} alt="Uploaded preview" className="h-24 w-auto rounded-lg border border-slate-700 shadow-md" />
                            <button
                                type="button"
                                onClick={removeImage}
                                className="absolute -top-2 -right-2 bg-slate-800 hover:bg-slate-700 border border-slate-600 p-1 rounded-full text-white shadow-lg z-10"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    )}
                </div>

                {/* Dropdowns */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 rounded-2xl bg-slate-950/30 border border-slate-800/50">

                    <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm font-semibold text-slate-300">
                            <LayoutList className="w-4 h-4 text-blue-400" />
                            Target Platform
                        </label>
                        <div className="relative">
                            <select
                                value={platform}
                                onChange={(e) => setPlatform(e.target.value)}
                                className="input-field appearance-none cursor-pointer hover:border-slate-600 bg-slate-900 pr-10"
                            >
                                {platforms.map(p => (
                                    <option key={p.id} value={p.id}>{p.label}</option>
                                ))}
                            </select>
                            {/* Custom arrow indicator */}
                            <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-slate-400">
                                <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"></path></svg>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm font-semibold text-slate-300">
                            <Sparkles className="w-4 h-4 text-pink-400" />
                            Content Tone
                        </label>
                        <div className="relative">
                            <select
                                value={tone}
                                onChange={(e) => setTone(e.target.value)}
                                className="input-field appearance-none cursor-pointer hover:border-slate-600 bg-slate-900 pr-10"
                            >
                                {tones.map(t => (
                                    <option key={t.id} value={t.id}>{t.label}</option>
                                ))}
                            </select>
                            {/* Custom arrow indicator */}
                            <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-slate-400">
                                <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"></path></svg>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Generate Button Wrapper */}
                <div className="pt-2">
                    <button
                        type="submit"
                        disabled={loading || (!idea.trim() && !image)}
                        className="w-full relative overflow-hidden group bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 p-[1px] rounded-2xl transition-all duration-300 hover:shadow-[0_0_40px_rgba(99,102,241,0.5)] disabled:opacity-50 disabled:hover:shadow-none"
                    >
                        <div className="absolute inset-0 bg-white/20 group-hover:bg-transparent transition-colors duration-300"></div>
                        <div className="relative bg-slate-900/40 backdrop-blur-sm rounded-2xl flex items-center justify-center gap-3 px-8 py-5 group-hover:bg-transparent transition-all duration-300">
                            {loading ? (
                                <>
                                    <span className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin"></span>
                                    <span className="text-white font-bold text-lg tracking-wide">Processing...</span>
                                </>
                            ) : (
                                <>
                                    <span className="text-white font-bold text-lg tracking-wide">Generate Content</span>
                                    <Send className="w-5 h-5 text-white transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                </>
                            )}
                        </div>
                    </button>
                </div>

            </form>
        </div>
    );
};

export default PostForm;
