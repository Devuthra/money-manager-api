import { LoaderCircle } from "lucide-react";
import { useState } from "react";

const DeleteAlert = ({ content, onDelete }) => {
    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
        setLoading(true);
        try {
            await onDelete();
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <p className="text-sm text-gray-600">{content}</p>
            <div className="flex justify-end mt-6">
                <button
                    onClick={handleDelete}
                    disabled={loading}
                    type="button"
                    className={`flex items-center gap-2 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-200 font-medium ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}
                >
                    {loading ? (
                        <>
                            <LoaderCircle className="h-4 w-4 animate-spin" />
                            Deleting...
                        </>
                    ) : (
                        'Delete'
                    )}
                </button>
            </div>
        </div>
    );
};

export default DeleteAlert;