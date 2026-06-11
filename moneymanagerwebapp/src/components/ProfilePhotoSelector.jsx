import { Trash, Upload, User } from "lucide-react"; //  Added missing User import
import { useRef, useState } from "react";

const ProfilePhotoSelector = ({ image, setImage }) => { // Destructure props properly

    const inputRef = useRef(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    const handleImageChange = (e) => { //  Renamed from handleSubmit → handleImageChange
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            const preview = URL.createObjectURL(file);
            setPreviewUrl(preview);
        }
    };

    const handleRemoveImage = (e) => {
        e.preventDefault();
        setImage(null);
        setPreviewUrl(null);
    };

    const onChooseFile = (e) => {
        e.preventDefault();
        inputRef.current?.click();
    };

    return (
        <div className="flex justify-center mb-6">
            <input
                type="file"
                accept="image/*"
                ref={inputRef}
                onChange={handleImageChange}
                className="hidden"
            />

            {!image ? (
                <div className="w-20 h-20 flex items-center justify-center bg-purple-100 rounded-full relative"> {/* ✅ Fixed typos: items-center, relative */}
                    <User className="text-purple-500" size={35} /> {/* ✅ Fixed typo: text-purple-500 */}

                    <button
                        onClick={onChooseFile}
                        className="w-8 h-8 flex items-center justify-center bg-primary text-white rounded-full absolute -bottom-1 -right-1" // ✅ Fixed: flex, spacing
                    >
                        <Upload size={15} className="text-purple-500"/>
                    </button>
                </div>
            ) : (
                <div className="relative">
                    <img src={previewUrl} alt="profile photo" className="w-20 h-20 rounded-full object-cover" /> {/* ✅ Fixed typo: object-cover */}
                    <button
                        onClick={handleRemoveImage}
                        className="w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded-full absolute -bottom-1 -right-1"
                    >
                        <Trash size={15} />
                    </button>
                </div>
            )}
        </div>
    );
};

export default ProfilePhotoSelector;