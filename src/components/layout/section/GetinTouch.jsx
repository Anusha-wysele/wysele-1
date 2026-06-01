import { Facebook, Instagram, Linkedin, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import jobService from '../../../services/jobService';
import Button from '../../common/Button';

function useWindowWidth() {
    const [width, setWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);
    useEffect(() => {
        const handler = () => setWidth(window.innerWidth);
        window.addEventListener('resize', handler);
        return () => window.removeEventListener('resize', handler);
    }, []);
    return width;
}

const GetInTouch = () => {
    const [form, setForm] = useState({
        fullName: "",
        emailAddress: "",
        phoneNumber: "",
        location: "",
        message: "",
        confirm: false
    });
    const [sent, setSent] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const width = useWindowWidth();
    const isMobile = width < 768;

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setIsSubmitting(true);

            const payload = {
                full_name: form.fullName,
                email: form.emailAddress,
                phone_number: form.phoneNumber,
                location: form.location,
                message: form.message
            };

            await jobService.createContact(payload);

            setSent(true);
            setTimeout(() => setSent(false), 5000);
            setForm({ fullName: "", emailAddress: "", phoneNumber: "", location: "", message: "", confirm: false });
        } catch (error) {
            console.error('Failed to submit contact form:', error);
            alert('Failed to send message. Please try again later.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="contact" className={`w-full ${isMobile ? 'h-auto py-16' : 'h-[95vh] max-h-[700px] min-h-[450px]'} bg-white relative flex items-center justify-center overflow-hidden font-inter`}>

            {/* Background Geometric Layers */}
            <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden" data-aos="fade-up">
                <div className={`absolute top-0 right-0 ${isMobile ? 'w-full h-1/2' : 'w-[60%] h-[35%]'} bg-[#e3eff2]`} />
                {!isMobile && (
                    <div className="absolute top-[20%] right-0 w-[55%] h-[55%] bg-[#c6e1e8]" style={{ clipPath: 'polygon(0 30%, 100% 0, 100% 100%, 0 100%)' }} data-aos="fade-up" />
                )}
                <div className={`absolute bottom-0 right-0 ${isMobile ? 'w-full h-1/4' : 'w-[50%] h-[40%]'} bg-[#C9184A]`} style={isMobile ? {} : { clipPath: 'polygon(100% 30%, 100% 100%, 0 100%)' }} />
                <div className={`absolute top-0 left-0 ${isMobile ? 'w-full h-[60%] rounded-b-[40px]' : 'w-[90%] md:w-[72%] h-[96%] rounded-tr-[50px] rounded-br-[150px] md:rounded-br-[250px] rounded-bl-[60px] md:rounded-bl-[80px]'} bg-gray-800`} />
            </div>

            <div className={`relative z-10 w-full max-w-7xl mx-auto px-6 md:px-8 lg:px-16 flex flex-col md:flex-row h-full items-center ${isMobile ? 'gap-12' : 'md:items-stretch gap-0'}`}>

                {/* Left Side: Form */}
                <div className={`w-full md:w-[55%] flex flex-col relative text-white justify-center ${isMobile ? 'text-center items-center' : ''}`} data-aos="fade-lefts">
                    <div className="mb-6 md:mb-4">
                        <span className="text-[10px] md:text-sm tracking-[0.2em] font-semibold text-gray-400 uppercase block mb-2">Wysele Technologies</span>
                        <h2 className="text-3xl md:text-[3rem] font-bold leading-[1.1] mb-4 tracking-tight">Get In Touch</h2>
                        <p className="text-white/90 text-sm md:text-[15px] font-light max-w-[480px] leading-relaxed hidden md:block">
                            Wysele Technologies LLP. Let us know how we can help with your software needs.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className={`flex flex-col gap-4 md:gap-5 max-w-[540px] w-full ${isMobile ? 'px-0' : 'mb-3'}`}>
                        <div className="flex flex-col md:flex-row gap-4 md:gap-5 w-full">
                            <input type="text" name="fullName" value={form.fullName} onChange={handleChange} required placeholder="Full Name" className="w-full bg-transparent border-b border-white/50 py-2.5 text-[15px] text-white placeholder-white/80 outline-none focus:border-white transition-colors" />
                            <input type="email" name="emailAddress" value={form.emailAddress} onChange={handleChange} required placeholder="Email Address" className="w-full bg-transparent border-b border-white/50 py-2.5 text-[15px] text-white placeholder-white/80 outline-none focus:border-white transition-colors" />
                        </div>
                        <div className="flex flex-col md:flex-row gap-4 md:gap-5 w-full">
                            <input type="tel" name="phoneNumber" value={form.phoneNumber} onChange={handleChange} required placeholder="Phone Number" className="w-full bg-transparent border-b border-white/50 py-2.5 text-[15px] text-white placeholder-white/80 outline-none focus:border-white transition-colors" />
                            <input type="text" name="location" value={form.location} onChange={handleChange} required placeholder="Location" className="w-full bg-transparent border-b border-white/50 py-2.5 text-[15px] text-white placeholder-white/80 outline-none focus:border-white transition-colors" />
                        </div>
                        <textarea name="message" value={form.message} onChange={handleChange} required placeholder="Message" className="w-full bg-transparent border-b border-white/50 py-2.5 text-[15px] text-white placeholder-white/80 outline-none focus:border-white transition-colors resize-none h-[42px]" />

                        <div className="flex items-start gap-3 w-full mt-2 text-left">
                            <input type="checkbox" name="confirm" id="confirm-checkbox" checked={form.confirm} onChange={handleChange} required className="mt-1" />
                            <label htmlFor="confirm-checkbox" className="text-[11px] md:text-[13px] text-white/80 font-light cursor-pointer">
                                I confirm, I have read and agree to wysele Privacy Policy and consent to sharing my information.
                            </label>
                        </div>

                        <Button
                            type="submit"
                            disabled={!form.confirm || isSubmitting}
                            text={isSubmitting ? "Sending..." : sent ? "Sent" : "Submit"}
                            className="mt-4 w-fit"
                        />
                    </form>
                </div>

                {/* Right Side: Contact Card */}
                <div className="w-full md:w-[45%] flex items-center justify-center md:justify-end" >
                    <div className="w-full max-w-[480px] bg-white rounded-[20px] p-8 md:p-12 shadow-xl relative z-20" data-aos="fade-up">
                        <h3 className="text-2xl md:text-3xl font-bold text-black mb-6">Contact Us</h3>
                        <div className="flex flex-col gap-6">
                            <div className="flex items-start gap-4">
                                <MapPin size={24} className="text-black shrink-0" />
                                <p className="text-sm text-black">Wysele Technologies LLP<br />#308 4th floor DSL Abacus IT Park, Hyderabad, 500039.</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <Mail size={24} className="text-black shrink-0" />
                                <p className="text-sm text-black">info@wysele.com</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <MessageCircle size={24} className="text-black shrink-0" />
                                <p className="text-sm text-black">+91 9100042919</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <Phone size={24} className="text-black shrink-0" />
                                <p className="text-sm text-black">040-45276773</p>
                            </div>
                            <div className="flex gap-4 pt-4 border-t border-gray-100">
                                <a
                                    href="https://www.linkedin.com/company/wysele"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    title="Wysele Technologies LinkedIn Profile"
                                    className="text-black hover:text-[#C9184A] transition-colors"
                                >
                                    <Linkedin size={20} />
                                </a>
                                <Instagram size={20} className="cursor-pointer hover:text-[#C9184A]" />
                                <Facebook size={20} className="cursor-pointer hover:text-[#C9184A]" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default GetInTouch;
