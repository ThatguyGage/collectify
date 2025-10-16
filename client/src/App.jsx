
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const normalizeToArray = (data) =>
    Array.isArray(data) ? data : Array.isArray(data?.items) ? data.items : [];

  const load = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await API.get("/", { params: { q, category: categoryFilter } });
      setItems(normalizeToArray(res?.data));
    } catch (e) {
      console.error(e);
      setError("Failed to load items.");
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        const res = await API.get("/", { params: { q, category: categoryFilter } });
        if (!cancelled) setItems(normalizeToArray(res?.data));
      } catch {
        if (!cancelled) {
          setError("Failed to load items.");
          setItems([]);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [q, categoryFilter]);

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.category) return;
    try {
      if (editingId) {
        await API.put(`/${editingId}`, form);
        setEditingId(null);
      } else {
        await API.post("/", form);
      }
      setForm(empty);
      await load();
    } catch (e) {
      console.error(e);
      setError("Save failed.");
    }
  };

  const startEdit = (item) => {
    setEditingId(item._id || item.id);
    setForm({
      name: item.name || "",
      category: item.category || "",
      description: item.description || "",
      imageUrl: item.imageUrl || "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const remove = async (id) => {
    if (!confirm("Delete this item?")) return;
    try {
      await API.delete(`/${id}`);
      await load();
    } catch (e) {
      console.error(e);
      setError("Delete failed.");
    }
  };

  const categories = useMemo(() => {
    const s = new Set((items || []).map((i) => i?.category).filter(Boolean));
    return Array.from(s).sort();
  }, [items]);

  if (loading) return <div className="container" style={{ padding: 24 }}>Loading…</div>;
  if (error) {
    return (
      <div className="container" style={{ padding: 24 }}>
        <div style={{ color: "tomato", marginBottom: 12 }}>{error}</div>
        <button onClick={load}>Retry</button>
      </div>
    );
  }

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
              onClick={() => {
                setEditingId(null);
                setForm(empty);
              }}
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
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <button type="button" onClick={load}>
          Refresh
        </button>
      </div>

      <div className="grid">
        {(items || []).map((item) => (
          <div key={item._id || item.id} className="card">
            {item.imageUrl ? (
              <img src={item.imageUrl} alt={item.name || "Item"} />
            ) : (
              <div className="placeholder">No image</div>
            )}
            <h3>{item.name || "Item"}</h3>
            <p className="muted">{item.category}</p>
            {item.description && <p>{item.description}</p>}
            <div className="row">
              <button onClick={() => startEdit(item)}>Edit</button>
              <button className="danger" onClick={() => remove(item._id || item.id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {Array.isArray(items) && items.length === 0 && (
        <p style={{ opacity: 0.8, marginTop: 12 }}>No items yet.</p>
      )}
    </div>
  );
}
