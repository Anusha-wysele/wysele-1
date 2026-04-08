import { useState } from "react";
import { motion } from "framer-motion";
import { MapPinArea as MapPinAreaIcon, Mailbox as MailboxIcon, WhatsappLogo as WhatsappLogoIcon, Phone as PhoneIcon, LinkedinLogo as LinkedinLogoIcon, InstagramLogo as InstagramLogoIcon, FacebookLogo as FacebookLogoIcon, YoutubeLogo as YoutubeLogoIcon } from "@phosphor-icons/react";

export default function GetInTouch() {
    const [form, setForm] = useState({
        fullName: "",
        emailAddress: "",
        phoneNumber: "",
        location: "",
        message: "",
        confirm: false
    });
    const [sent, setSent] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSent(true);
        setTimeout(() => setSent(false), 3000);
        setForm({ fullName: "", emailAddress: "", phoneNumber: "", location: "", message: "", confirm: false });
    };

    return (
        <section id="contact" className="w-full h-[95vh] max-h-[700px] min-h-[450px] bg-white relative flex items-center justify-center overflow-hidden font-inter py-0">

            {/* Background Geometric Layers matching the Screenshot exactly */}
            <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
                {/* Top Right Lightest Blue Block */}
                <div className="absolute top-0 right-0 w-[60%] h-[35%] bg-[#e3eff2]" />

                {/* Middle Right Light Cyan Diagonal Block */}
                <div className="absolute top-[20%] right-0 w-[55%] h-[55%] bg-[#c6e1e8]" style={{ clipPath: 'polygon(0 30%, 100% 0, 100% 100%, 0 100%)' }} />

                {/* Bottom Right Dark Blue Triangle */}
                <div className="absolute bottom-0 right-0 w-[50%] h-[40%] bg-[#C9184A]" style={{ clipPath: 'polygon(100% 30%, 100% 100%, 0 100%)' }} />

                {/* Main Blue Bubble Blob (Left) */}
                <div className="absolute top-0 left-0 w-[90%] md:w-[72%] h-[96%] bg-gray-800 rounded-tr-[50px] rounded-br-[150px] md:rounded-br-[250px] rounded-bl-[60px] md:rounded-bl-[80px]" />
            </div>

            <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 md:px-12 flex flex-col md:flex-row h-full items-center md:items-stretch gap-4 md:gap-0 mt-0 mb-0 max-h-full">

                {/* Left Offset Content Box */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="w-full md:w-[55%] flex flex-col pb-2 relative text-white justify-center h-full"
                >
                    <div className="mb-4">
                        <span className="text-xs md:text-sm tracking-[0.2em] font-semibold text-gray-400 uppercase block mb-2">
                            Wysele Technologies
                        </span>
                        <h2 className="text-4xl md:text-[3rem] font-bold leading-[1.1] mb-4 tracking-tight">
                            Get In Touch
                        </h2>
                        <p className="text-white/90 text-sm md:text-[15px] font-light max-w-[480px] leading-relaxed hidden md:block">
                            Wysele Technologies LLP. Let us know how we can help with your software needs.
                        </p>
                    </div>

                    {/* Integrated Form Component */}
                    <form onSubmit={handleSubmit} className="flex flex-col gap-5 max-w-[540px] w-full mb-3">
                        {/* Row 1: Full Name & Email */}
                        <div className="flex flex-col md:flex-row gap-5 w-full">
                            <div className="relative w-full md:w-1/2">
                                <input
                                    type="text"
                                    name="fullName"
                                    value={form.fullName}
                                    onChange={handleChange}
                                    required
                                    placeholder="Full Name"
                                    className="w-full bg-transparent border-b border-white/50 py-2.5 text-[15px] text-white placeholder-white/80 outline-none focus:border-white transition-colors"
                                />
                            </div>
                            <div className="relative w-full md:w-1/2">
                                <input
                                    type="email"
                                    name="emailAddress"
                                    value={form.emailAddress}
                                    onChange={handleChange}
                                    required
                                    placeholder="Email Address"
                                    className="w-full bg-transparent border-b border-white/50 py-2.5 text-[15px] text-white placeholder-white/80 outline-none focus:border-white transition-colors"
                                />
                            </div>
                        </div>

                        {/* Row 2: Phone & Location */}
                        <div className="flex flex-col md:flex-row gap-5 w-full">
                            <div className="relative w-full md:w-1/2">
                                <input
                                    type="tel"
                                    name="phoneNumber"
                                    value={form.phoneNumber}
                                    onChange={handleChange}
                                    required
                                    placeholder="Phone Number"
                                    className="w-full bg-transparent border-b border-white/50 py-2.5 text-[15px] text-white placeholder-white/80 outline-none focus:border-white transition-colors"
                                />
                            </div>
                            <div className="relative w-full md:w-1/2">
                                <input
                                    type="text"
                                    name="location"
                                    value={form.location}
                                    onChange={handleChange}
                                    required
                                    placeholder="Location"
                                    className="w-full bg-transparent border-b border-white/50 py-2.5 text-[15px] text-white placeholder-white/80 outline-none focus:border-white transition-colors"
                                />
                            </div>
                        </div>



                        {/* Row 4: Message */}
                        <div className="relative w-full mt-2">
                            <textarea
                                name="message"
                                value={form.message}
                                onChange={handleChange}
                                required
                                placeholder="Message"
                                className="w-full bg-transparent border-b border-white/50 py-2.5 text-[15px] text-white placeholder-white/80 outline-none focus:border-white transition-colors resize-none h-[42px]"
                            />
                        </div>

                        {/* Row 5: Checkbox */}
                        <div className="flex items-start gap-3 w-full mt-2">
                            <input
                                type="checkbox"
                                name="confirm"
                                checked={form.confirm}
                                onChange={handleChange}
                                required
                                className="mt-1 w-3.5 h-3.5 rounded border-white/50 bg-transparent text-gray-800 cursor-pointer"
                            />
                            <label className="text-[12px] md:text-[13px] leading-tight text-white/80 font-light cursor-pointer mt-[2px]" onClick={() => document.querySelector('input[name="confirm"]').click()}>
                                I confirm, I have read and agree to wysele Privacy Policy and consent to sharing my information.
                            </label>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={!form.confirm}
                            className={`mt-5 group border px-8 py-3 rounded-[6px] text-[1.1rem] font-normal transition-all duration-300 inline-flex items-center justify-center gap-2 self-start overflow-hidden ${
                                form.confirm 
                                    ? "border-white/50 hover:border-[#C9184A] bg-transparent hover:bg-[#C9184A] text-white cursor-pointer" 
                                    : "border-white/20 bg-transparent text-white/40 cursor-not-allowed"
                            }`}
                        >
                            <span className="relative z-10">{sent ? "Sent" : "Submit"}</span>
                            {!sent ? (
                                <svg
                                    width="16" height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className={`transition-transform duration-300 flex-shrink-0 relative z-10 ${form.confirm ? "group-hover:rotate-45" : ""}`}
                                >
                                    <path d="M7 17L17 7M17 7H7M17 7V17" />
                                </svg>
                            ) : (
                                <span className="text-white relative z-10">✓</span>
                            )}
                        </button>
                    </form>


                </motion.div>

                {/* Right Overlapping White Card component strictly matched to screenshot */}
                <div className="w-full md:w-[45%] flex items-center justify-center md:justify-end md:mt-0 pb-0 md:pb-4">
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                        className="w-full max-w-[480px] bg-white rounded-tl-[60px] rounded-tr-[10px] rounded-br-[10px] rounded-bl-[10px] p-8 md:p-12 relative z-20"
                        style={{
                            boxShadow: "-20px 20px 60px -15px rgba(0, 0, 0, 0.15)"
                        }}
                    >
                        <div className="flex flex-col gap-6 text-[15px] font-medium text-black">

                            {/* Heading */}
                            <h3 className="text-3xl font-bold tracking-tight text-black mb-[-5px]">Contact Us</h3>

                            {/* ADDRESS Item */}
                            <div className="flex items-start gap-5">
                                <div className="pt-1 flex-shrink-0">
                                    <MapPinAreaIcon size={32} weight="thin" color="black" />
                                </div>
                                <div className="leading-snug pt-1">
                                    Wysele Technologies LLP<br />
                                    #308 4th floor DSL Abacus IT Park,<br />
                                    Survey Colony, Industrial Development Area,<br />
                                    Uppal, Hyderabad, Telangana 500039.
                                </div>
                            </div>

                            {/* EMAIL Item */}
                            <div className="flex items-center gap-5">
                                <div className="flex-shrink-0">
                                    <MailboxIcon size={32} weight="thin" color="black" />
                                </div>
                                <div>
                                    info@wysele.com
                                </div>
                            </div>

                            {/* WHATSAPP Item */}
                            <div className="flex items-center gap-5">
                                <div className="flex-shrink-0">
                                    <WhatsappLogoIcon size={32} weight="thin" color="black" />
                                </div>
                                <div>
                                    +91 63057 53919
                                </div>
                            </div>

                            {/* PHONE Item */}
                            <div className="flex items-center gap-5">
                                <div className="flex-shrink-0 flex items-center justify-center -ml-1">
                                    <PhoneIcon size={32} weight="thin" color="black" />
                                </div>
                                <div>
                                    040-45276773
                                </div>
                            </div>

                            {/* Socials Row */}
                            <div className="flex items-center gap-4 pt-4">
                                {/* LinkedIn */}
                                <a href="#" aria-label="LinkedIn" className="hover:opacity-70 transition-opacity flex items-center justify-center">
                                    <LinkedinLogoIcon size={32} weight="thin" color="black" />
                                </a>

                                {/* Instagram */}
                                <a href="#" aria-label="Instagram" className="hover:opacity-70 transition-opacity flex items-center justify-center">
                                    <InstagramLogoIcon size={32} weight="thin" color="black" />
                                </a>

                                {/* Facebook */}
                                <a href="#" aria-label="Facebook" className="hover:opacity-70 transition-opacity flex items-center justify-center">
                                    <FacebookLogoIcon size={32} weight="thin" color="black" />
                                </a>

                                {/* YouTube */}
                                <a href="#" aria-label="YouTube" className="hover:opacity-70 transition-opacity flex items-center justify-center">
                                    <YoutubeLogoIcon size={32} weight="thin" color="black" />
                                </a>
                            </div>

                        </div>
                    </motion.div>
                </div>

            </div>
        </section>
    );
}
