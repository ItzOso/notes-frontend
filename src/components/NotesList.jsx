import { useNavigate } from "react-router-dom";
import { formatDate, noteContentPreview } from "../utils/utils";

function NotesList({ filteredNotes, category }) {
    const navigate = useNavigate();

    const sortedNotes = filteredNotes.sort((a,b) => new Date(b.updatedAt) - new Date(a.updatedAt))

    return (
        <div className="overflow-y-auto">
            {sortedNotes.map((note) => (
                <div
                    onClick={() => navigate(note._id)}
                    key={note._id}
                    className="border-t-2 border-gray2 w-full px-10 py-5 flex flex-col gap-1 hover:bg-gray2 hover:cursor-pointer">
                    <div className="flex justify-between text-gray-400 text-sm">
                        <p>{category?.name}</p>
                        <p>{formatDate(note.updatedAt)}</p>
                    </div>
                    <p className="text-lg font-bold">{note?.title}</p>
                    <p className="text-gray-400 break-words">{noteContentPreview(note.content)}</p>
                </div>
            ))}
        </div>
    );
}

export default NotesList;
