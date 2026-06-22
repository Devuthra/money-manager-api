import EmojiPicker from "emoji-picker-react";
import { Image, X } from "lucide-react";
import { useState } from "react";

const EmojiPickerPopup = ({ icon, onSelect }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleEmojiClick = (emoji) => {
        onSelect(emoji?.emoji || "");
        setIsOpen(false);
    }

    return (
        <div className="flex flex-col md:flex-row items-start gap-5 mb-6 relative">
            <div
                onClick={() => setIsOpen(true)}
                className="flex items-center gap-4 cursor-pointer">
                <div className="w-12 h-12 flex items-center justify-center text-2xl bg-purple-50 text-purple-500 rounded-lg">
                    {icon ? (
                        <span className="text-2xl">{icon}</span>
                    ) : (
                        <Image />
                    )}
                </div>
                <p>{icon ? "Change icon" : "Pick Icon"}</p>
            </div>

            {isOpen && (
                <div className="absolute top-16 left-0 z-50 shadow-lg rounded-lg">
                    <button
                        onClick={() => setIsOpen(false)}
                        className="w-7 h-7 flex items-center justify-center bg-white border border-gray-200 rounded-full absolute -top-3 -right-3 z-10 cursor-pointer shadow-sm leading-none p-0">
                        <X size={14} className="block" />
                    </button>

                    <EmojiPicker
                        open={isOpen}
                        onEmojiClick={handleEmojiClick}
                    />
                </div>
            )}
        </div>
    );
};

export default EmojiPickerPopup;