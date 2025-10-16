import { useEffect, useMemo, useState } from "react";
import API from "./api";
import "./App.css";

export default function App() {
  const empty = { name: "", category: "", description: "", imageUrl: "" };
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(empty);
  const [editingId, setEditingId] = useState(null);
  const [q, setQ] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  const load = async () => {
    const res = await API.get("/", { params: { q, category: categoryFilter } });
    setItems(res.data);
  };

  useEffect(() => { load(); }, [q, categoryFilter]);

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.category) return;
    if (editingId) {
      await API.put(`/${editingId}`, form);
      setEditingId(null);
    } else {
      await API.post("/", form);
    }
    setForm(empty);
    load();
  };

  const startEdit = (item) => {
    setEditingId(item._id);
    setForm({
      name: item.name,
      category: item.category,
      description: item.description || "",
      imageUrl: item.imageUrl || ""
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const remove = async (id) => {
    if (!confirm("Delete this item?")) return;
    await API.delete(`/${id}`);
    load();
  };

  const categories = useMemo(() => {
    const s = new Set(items.map(i => i.category).filter(Boolean));
    return Array.from(s).sort();
  }, [items]);

  return (
    <div className="container">
      <h1>Collectify</h1>

      <form onSubmit={submit} className="card">
        <div className="row">
          <input
            placeholder="Name *"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            placeholder="Category *"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          />
        </div>
        <input
          placeholder="Image URL (optional)"
          value={form.imageUrl}
          onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
        />
        <textarea
          placeholder="Description"
          rows={3}
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <div className="row">
          <button type="submit">{editingId ? "Update Item" : "Add Item"}</button>
          {editingId && (
            <button
              type="button"
              className="secondary"
              onClick={() => { setEditingId(null); setForm(empty); }}
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="filters card">
        <input placeholder="Search by name" value={q} onChange={(e) => setQ(e.target.value)} />
        <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
          <option value="">All categories</option>
          {categories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <button type="button" onClick={load}>Refresh</button>
      </div>

      <div className="grid">
        {items.map(item => (
          <div key={item._id} className="card">
            {item.imageUrl
              ? <img src={item.imageUrl} alt={item.name} />
              : <div className="placeholder">No image</div>}
            <h3>{item.name}</h3>
            <p className="muted">{item.category}</p>
            {item.description && <p>{item.description}</p>}
            <div className="row">
              <button onClick={() => startEdit(item)}>Edit</button>
              <button className="danger" onClick={() => remove(item._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
