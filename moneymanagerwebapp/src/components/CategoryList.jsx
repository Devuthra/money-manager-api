import { Layers2, Pencil, Trash2 } from "lucide-react";

const CategoryList = ({ categories, onEditCategory, onDeleteCategory }) => {
    return (
        <div className="card p-4">
            <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold">Category Sources</h4>
            </div>

            {/* Category List */}
            {categories.length === 0 ? (                          
                <p className="text-gray-500">
                    No categories added yet. Add some to get started!
                </p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {categories.map((category) => (
                        <div
                            key={category.id}
                            className="group relative flex items-center gap-4 p-3 rounded-lg hover:bg-gray-100/60">

                            {/* Icon/Emoji display */}
                            <div className="w-12 h-12 flex items-center justify-center text-xl text-gray-800 bg-gray-100 rounded-full">
                                {category.icon ? (
                                    typeof category.icon === "string" && category.icon.startsWith("http")
                                        ? <img src={category.icon} alt={category.name} className="h-5 w-5" />  // URL
                                        : <span className="text-2xl">{category.icon}</span>                    // Emoji
                                ) : (
                                    <Layers2 className="text-primary" size={24} />                              // Fallback
                                )}
                            </div>

                            {/* Category name and type */}
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-800 truncate">
                                    {category.name}
                                </p>
                                <p className="text-xs text-purple-800 capitalize">
                                    {category.type}
                                </p>
                            </div>

                            {/* Action buttons */}
                            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                <button
                                    onClick={() => onEditCategory(category)}
                                    className="p-1.5 rounded-md hover:bg-purple-100 text-purple-600 transition-colors">
                                    <Pencil size={14} />
                                </button>
                               
                            </div>

                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CategoryList;