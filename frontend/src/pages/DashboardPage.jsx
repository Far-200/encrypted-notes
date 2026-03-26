import { useEffect, useMemo, useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
  togglePinNote,
} from "../services/noteService";
import Navbar from "../components/Navbar";
import NoteForm from "../components/NoteForm";
import SearchBar from "../components/SearchBar";
import NoteCard from "../components/NoteCard";

export default function DashboardPage() {
  const { user, logout, token } = useAuth();

  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [search, setSearch] = useState("");
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [loadingNotes, setLoadingNotes] = useState(true);
  const [formLoading, setFormLoading] = useState(false);
  const [error, setError] = useState("");

  const loadNotes = async () => {
    try {
      setLoadingNotes(true);
      setError("");
      const data = await getNotes(token);
      setNotes(data);
    } catch (err) {
      console.error("Error loading notes:", err);
      setError("Failed to load notes.");
    } finally {
      setLoadingNotes(false);
    }
  };

  useEffect(() => {
    loadNotes();
  }, [token]);

  const resetForm = () => {
    setTitle("");
    setContent("");
    setEditingNoteId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      setError("Title and content are required.");
      return;
    }

    try {
      setFormLoading(true);
      setError("");

      const payload = {
        title: title.trim(),
        content: content.trim(),
      };

      if (editingNoteId) {
        await updateNote(editingNoteId, payload, token);
      } else {
        await createNote(payload, token);
      }

      resetForm();
      await loadNotes();
    } catch (err) {
      console.error("Error saving note:", err);
      setError("Failed to save note.");
    } finally {
      setFormLoading(false);
    }
  };

  const handleEdit = (note) => {
    setTitle(note.title);
    setContent(note.content);
    setEditingNoteId(note._id);
    setError("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Delete this note permanently?");

    if (!confirmed) return;

    try {
      setError("");
      await deleteNote(id, token);

      if (editingNoteId === id) {
        resetForm();
      }

      await loadNotes();
    } catch (err) {
      console.error("Error deleting note:", err);
      setError("Failed to delete note.");
    }
  };

  const handleTogglePin = async (id) => {
    try {
      setError("");
      await togglePinNote(id, token);
      await loadNotes();
    } catch (err) {
      console.error("Error toggling pin:", err);
      setError("Failed to update pin status.");
    }
  };

  const filteredNotes = useMemo(() => {
    const sortedNotes = [...notes].sort((a, b) => {
      if (a.isPinned === b.isPinned) {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
      return Number(b.isPinned) - Number(a.isPinned);
    });

    return sortedNotes.filter((note) => {
      const query = search.toLowerCase().trim();

      if (!query) return true;

      return (
        note.title.toLowerCase().includes(query) ||
        note.content.toLowerCase().includes(query)
      );
    });
  }, [notes, search]);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar onLogout={logout} />

      <main className="mx-auto max-w-5xl px-6 py-8">
        <section className="mb-8 rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-2xl">
          <h2 className="text-4xl font-bold tracking-tight">
            Welcome, {user?.name}
          </h2>
          <p className="mt-2 text-slate-400">{user?.email}</p>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
              <p className="text-sm text-slate-400">Stored notes</p>
              <p className="mt-2 text-2xl font-bold text-cyan-400">
                {notes.length}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
              <p className="text-sm text-slate-400">Pinned notes</p>
              <p className="mt-2 text-2xl font-bold text-amber-400">
                {notes.filter((note) => note.isPinned).length}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
              <p className="text-sm text-slate-400">Mode</p>
              <p className="mt-2 text-2xl font-bold text-green-400">
                Encrypted
              </p>
            </div>
          </div>
        </section>

        <NoteForm
          title={title}
          content={content}
          setTitle={setTitle}
          setContent={setContent}
          editingNoteId={editingNoteId}
          onSubmit={handleSubmit}
          onCancelEdit={resetForm}
          formLoading={formLoading}
          error={error}
        />

        <section className="mb-6">
          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-xl">
            <div className="mb-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h3 className="text-2xl font-semibold">Your notes</h3>
                <p className="mt-1 text-sm text-slate-400">
                  Search, pin, edit, delete. Tiny empire, full control.
                </p>
              </div>

              <SearchBar search={search} setSearch={setSearch} />
            </div>

            {loadingNotes ? (
              <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6 text-slate-400">
                Loading notes...
              </div>
            ) : filteredNotes.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-950 p-8 text-center">
                <p className="text-lg font-medium text-slate-300">
                  No notes found
                </p>
                <p className="mt-2 text-sm text-slate-500">
                  {search
                    ? "Try a different search term."
                    : "No notes yet. Your secrets are… suspiciously empty 👀"}
                </p>
              </div>
            ) : (
              <div className="grid gap-4">
                {filteredNotes.map((note) => (
                  <NoteCard
                    key={note._id}
                    note={note}
                    onTogglePin={handleTogglePin}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
