import React, { useEffect, useState } from "react";

/**
 * AdminPhotographersPanel.tsx
 * - Fetches /api/admin/photographers
 * - Shows columns: id, firstname, lastname, review_count, like_count, whatsapp, email
 * - Create form to add photographer (calls POST /api/admin/photographers)
 * - Responsive: table on desktop, stacked cards on mobile/tablet.
 */

type Photographer = {
  id: number;
  first_name: string;
  last_name: string;
  photographer_whatsapp_no?: string;
  photographer_email?: string;
  review_count: number;
  like_count: number;
};

const AdminAddPhotographersPanel: React.FC = () => {
  const [list, setList] = useState<Photographer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [screenWidth, setScreenWidth] = useState<number>(typeof window !== "undefined" ? window.innerWidth : 1200);

  // create form state
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const fetchList = async () => {
      try {
        setLoading(true);
        const resp = await fetch("/api/admin/photographers");
        if (!resp.ok) throw new Error("Network error");
        const body = await resp.json();
        if (!body.success) throw new Error("API error");
        setList(body.data || []);
      } catch (err: any) {
        setError(err.message || "Error");
      } finally {
        setLoading(false);
      }
    };
    fetchList();
  }, []);

  useEffect(() => {
    const onResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const isMobile = screenWidth < 768;

  // create photographer
  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const resp = await fetch("/api/admin/photographers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          whatsapp_no: phone,
          email,
        }),
      });
      const body = await resp.json();
      if (!body.success) throw new Error(body.error || "Create failed");
      // optimistic refresh: refetch list (simple)
      const refreshed = await (await fetch("/api/admin/photographers")).json();
      setList(refreshed.data || []);
      setFirstName(""); setLastName(""); setPhone(""); setEmail("");
    } catch (err: any) {
      alert("Create failed: " + (err.message || err));
    }
  };

  return (
    <div style={{ padding: 20, fontFamily: "Inter, system-ui, Arial", background: "#f7f7f7", minHeight: "100vh" }}>
      <style>{`
        .panel { max-width: 1200px; margin: 0 auto; background: #fff; border-radius: 12px; padding: 20px; box-shadow: 0 6px 28px rgba(0,0,0,0.06); }
        .header { display:flex; justify-content:space-between; align-items:center; gap:16px; flex-wrap:wrap; margin-bottom:16px; }
        .title { font-size:20px; font-weight:700; }
        .form { display:flex; gap:12px; flex-wrap:wrap; align-items:center; }
        .form input { padding:8px 10px; border-radius:6px; border:1px solid #ddd; min-width:150px; }
        .btn { background:#2563eb; color:white; padding:8px 12px; border-radius:8px; border:none; cursor:pointer; }
        .grid { display:grid; gap:12px; grid-template-columns: 1fr; }
        @media (min-width: 768px) { .grid { grid-template-columns: repeat(2, 1fr); } }
        @media (min-width: 1024px) { .grid { grid-template-columns: 1fr; } } /* table below */
        table { width:100%; border-collapse:collapse; margin-top:12px; }
        th, td { padding:10px 8px; border-bottom:1px solid #eee; text-align:left; }
        th { background:#fafafa; font-weight:600; color:#333; }
        .card { background:#fff; border:1px solid #eee; padding:12px; border-radius:8px; display:flex; align-items:center; gap:12px; }
        .avatar { width:56px; height:56px; border-radius:50%; background:#ddd; display:inline-block; flex-shrink:0; }
        .meta { display:flex; flex-direction:column; gap:4px; }
        .muted { color:#666; font-size:13px; }
      `}</style>

      <div className="panel">
        <div className="header">
          <div>
            <div className="title">Admin → Photographers</div>
            <div className="muted">Showing id, name, reviews, likes, phone and email</div>
          </div>

          <form className="form" onSubmit={handleCreate}>
            <input value={firstName} onChange={e => setFirstName(e.target.value)} placeholder="First name" required />
            <input value={lastName} onChange={e => setLastName(e.target.value)} placeholder="Last name" required />
            <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="Whatsapp no" />
            <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" type="email" />
            <button className="btn" type="submit">Create</button>
          </form>
        </div>

        {loading ? <div>Loading…</div> : error ? <div style={{color:"red"}}>{error}</div> : (
          <div>
            {/* Desktop/tablet: table; Mobile: cards */}
            {isMobile ? (
              <div style={{ display: "grid", gap: 12 }}>
                {list.map(p => (
                  <div className="card" key={p.id}>
                    <div className="avatar" />
                    <div style={{flex:1}}>
                      <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
                        <div style={{fontWeight:700}}>{p.first_name} {p.last_name}</div>
                        <div style={{fontSize:13}}><strong>{p.review_count}</strong> reviews • <strong>{p.like_count}</strong> likes</div>
                      </div>
                      <div className="muted">{p.photographer_whatsapp_no || "—" } • {p.photographer_email || "—"}</div>
                      <div style={{marginTop:8}}>
                        <button className="btn" onClick={() => navigator.clipboard?.writeText(String(p.id))}>Copy ID</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th style={{width:80}}>ID</th>
                    <th>Name</th>
                    <th>Reviews</th>
                    <th>Likes</th>
                    <th>Whatsapp</th>
                    <th>Email</th>
                    <th style={{width:120}}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {list.map(p => (
                    <tr key={p.id}>
                      <td>{p.id}</td>
                      <td>{p.first_name} {p.last_name}</td>
                      <td>{p.review_count}</td>
                      <td>{p.like_count}</td>
                      <td>{p.photographer_whatsapp_no || "—"}</td>
                      <td>{p.photographer_email || "—"}</td>
                      <td>
                        <button className="btn" onClick={() => navigator.clipboard?.writeText(String(p.id))}>Copy ID</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminAddPhotographersPanel;
