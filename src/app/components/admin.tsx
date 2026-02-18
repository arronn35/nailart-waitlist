import { useState, useEffect, useRef, useCallback } from "react";
import { Trash2, Users, Clock, Wifi, WifiOff, ArrowLeft, Lock, LogOut, Eye, EyeOff } from "lucide-react";

interface Registration {
    id: number;
    email: string;
    created_at: string;
    ip: string | null;
}

// ─── Auth helpers ───────────────────────────────────────────
function getToken() {
    return localStorage.getItem("nailart_admin_token");
}
function setToken(token: string) {
    localStorage.setItem("nailart_admin_token", token);
}
function clearToken() {
    localStorage.removeItem("nailart_admin_token");
}
function authHeaders() {
    const token = getToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
}

// ─── Login Screen ───────────────────────────────────────────
function LoginScreen({ onLogin }: { onLogin: () => void }) {
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!password.trim()) return;
        setLoading(true);
        setError("");

        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ password }),
            });
            const data = await res.json();

            if (res.ok && data.token) {
                setToken(data.token);
                onLogin();
            } else {
                setError("Invalid password");
            }
        } catch {
            setError("Connection error. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-renaissance-burgundy flex items-center justify-center">
            {/* Background pattern */}
            <div
                className="fixed inset-0 opacity-[0.04] pointer-events-none"
                style={{
                    backgroundImage: `radial-gradient(circle at 1px 1px, #C9A84C 0.5px, transparent 0.5px)`,
                    backgroundSize: "32px 32px",
                }}
            />

            <div className="relative w-full max-w-sm mx-6">
                {/* Brand */}
                <div className="text-center mb-8">
                    <div className="w-14 h-14 mx-auto mb-4 rounded-full border border-renaissance-gold/40 flex items-center justify-center">
                        <span
                            className="text-renaissance-gold"
                            style={{ fontFamily: "var(--font-display)", fontSize: "20px", fontWeight: 700 }}
                        >
                            N
                        </span>
                    </div>
                    <h1
                        className="text-renaissance-ivory mb-2"
                        style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 600 }}
                    >
                        Admin Access
                    </h1>
                    <p
                        className="text-renaissance-champagne/40"
                        style={{ fontFamily: "var(--font-accent)", fontSize: "0.85rem" }}
                    >
                        Enter your password to view registrations
                    </p>
                </div>

                {/* Login Form */}
                <form onSubmit={handleSubmit}>
                    <div className="border border-renaissance-gold/20 bg-renaissance-burgundy/80 backdrop-blur-sm p-6">
                        <div className="relative mb-4">
                            <label htmlFor="admin-password" className="sr-only">
                                Admin Password
                            </label>
                            <div className="relative">
                                <Lock
                                    size={14}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-renaissance-gold/40"
                                />
                                <input
                                    id="admin-password"
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Password"
                                    autoFocus
                                    className="w-full pl-10 pr-10 py-3.5 bg-white/5 border border-renaissance-gold/15 text-renaissance-ivory placeholder:text-renaissance-champagne/25 focus:outline-none focus:border-renaissance-gold/40 focus:ring-1 focus:ring-renaissance-gold/20 transition-all duration-300"
                                    style={{
                                        fontFamily: "var(--font-accent)",
                                        fontSize: "0.9rem",
                                    }}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-renaissance-champagne/30 hover:text-renaissance-gold/60 transition-colors"
                                >
                                    {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                                </button>
                            </div>
                        </div>

                        {error && (
                            <div
                                className="mb-4 px-3 py-2 border border-red-400/20 bg-red-400/5 text-red-300"
                                style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem" }}
                            >
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading || !password.trim()}
                            className="w-full py-3.5 bg-renaissance-gold/10 border border-renaissance-gold/30 text-renaissance-gold hover:bg-renaissance-gold/20 hover:border-renaissance-gold/50 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
                            style={{
                                fontFamily: "var(--font-accent)",
                                fontSize: "13px",
                                fontWeight: 500,
                                letterSpacing: "0.15em",
                            }}
                        >
                            <span className="uppercase">{loading ? "Verifying..." : "Enter"}</span>
                        </button>
                    </div>
                </form>

                <a
                    href="/"
                    className="flex items-center justify-center gap-2 mt-6 text-renaissance-champagne/30 hover:text-renaissance-gold/60 transition-colors"
                    style={{ fontFamily: "var(--font-accent)", fontSize: "0.8rem" }}
                >
                    <ArrowLeft size={12} />
                    <span>Back to site</span>
                </a>
            </div>
        </div>
    );
}

// ─── Admin Dashboard ────────────────────────────────────────
function Dashboard({ onLogout }: { onLogout: () => void }) {
    const [registrations, setRegistrations] = useState<Registration[]>([]);
    const [count, setCount] = useState(0);
    const [connected, setConnected] = useState(false);
    const [newIds, setNewIds] = useState<Set<number>>(new Set());
    const wsRef = useRef<WebSocket | null>(null);
    const reconnectRef = useRef<ReturnType<typeof setTimeout>>();

    const handleLogout = async () => {
        try {
            await fetch("/api/auth/logout", {
                method: "POST",
                headers: { ...authHeaders() },
            });
        } catch { /* ignore */ }
        clearToken();
        onLogout();
    };

    const connectWebSocket = useCallback(() => {
        const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
        const ws = new WebSocket(`${protocol}//${window.location.host}/ws`);

        ws.onopen = () => {
            setConnected(true);
        };

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);

            switch (data.type) {
                case "init":
                    setCount(data.count);
                    break;
                case "new_registration":
                    setRegistrations((prev) => [data.registration, ...prev]);
                    setCount(data.count);
                    setNewIds((prev) => new Set(prev).add(data.registration.id));
                    setTimeout(() => {
                        setNewIds((prev) => {
                            const next = new Set(prev);
                            next.delete(data.registration.id);
                            return next;
                        });
                    }, 3000);
                    break;
                case "delete_registration":
                    setRegistrations((prev) => prev.filter((r) => r.id !== data.id));
                    setCount(data.count);
                    break;
            }
        };

        ws.onclose = () => {
            setConnected(false);
            reconnectRef.current = setTimeout(connectWebSocket, 2000);
        };

        ws.onerror = () => ws.close();
        wsRef.current = ws;
    }, []);

    useEffect(() => {
        fetch("/api/waitlist", {
            headers: { ...authHeaders() },
        })
            .then((r) => {
                if (r.status === 401) {
                    clearToken();
                    window.location.reload();
                    throw new Error("Unauthorized");
                }
                return r.json();
            })
            .then((data) => {
                setRegistrations(data.registrations);
                setCount(data.count);
            })
            .catch(console.error);

        connectWebSocket();

        return () => {
            wsRef.current?.close();
            clearTimeout(reconnectRef.current);
        };
    }, [connectWebSocket]);

    const handleDelete = async (id: number) => {
        try {
            const res = await fetch(`/api/waitlist/${id}`, {
                method: "DELETE",
                headers: { ...authHeaders() },
            });
            if (res.status === 401) {
                clearToken();
                window.location.reload();
            }
        } catch (err) {
            console.error("Delete error:", err);
        }
    };

    const formatDate = (dateStr: string) => {
        const d = new Date(dateStr + "Z");
        return d.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    return (
        <div className="min-h-screen bg-renaissance-burgundy">
            {/* Background pattern */}
            <div
                className="fixed inset-0 opacity-[0.04] pointer-events-none"
                style={{
                    backgroundImage: `radial-gradient(circle at 1px 1px, #C9A84C 0.5px, transparent 0.5px)`,
                    backgroundSize: "32px 32px",
                }}
            />

            {/* Header */}
            <header className="sticky top-0 z-40 bg-renaissance-burgundy/95 backdrop-blur-md border-b border-renaissance-gold/20">
                <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <a
                            href="/"
                            className="flex items-center gap-2 text-renaissance-champagne/50 hover:text-renaissance-gold transition-colors duration-300"
                            style={{ fontFamily: "var(--font-accent)", fontSize: "0.85rem" }}
                        >
                            <ArrowLeft size={14} />
                            <span>Back to Site</span>
                        </a>
                        <div className="w-px h-5 bg-renaissance-gold/20" />
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full border border-renaissance-gold/50 flex items-center justify-center">
                                <span
                                    className="text-renaissance-gold tracking-wider"
                                    style={{ fontFamily: "var(--font-display)", fontSize: "13px", fontWeight: 600 }}
                                >
                                    N
                                </span>
                            </div>
                            <span
                                className="tracking-[0.2em] text-renaissance-ivory uppercase"
                                style={{ fontFamily: "var(--font-display)", fontSize: "13px", fontWeight: 500 }}
                            >
                                Admin
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        {/* Connection status */}
                        {connected ? (
                            <div className="flex items-center gap-1.5 text-emerald-400">
                                <Wifi size={13} />
                                <span style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem" }}>Live</span>
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
                                </span>
                            </div>
                        ) : (
                            <div className="flex items-center gap-1.5 text-red-400">
                                <WifiOff size={13} />
                                <span style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem" }}>Offline</span>
                            </div>
                        )}

                        {/* Logout */}
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-1.5 text-renaissance-champagne/30 hover:text-red-400 transition-colors duration-300"
                            style={{ fontFamily: "var(--font-accent)", fontSize: "0.8rem" }}
                            title="Logout"
                        >
                            <LogOut size={14} />
                            <span className="hidden sm:inline">Logout</span>
                        </button>
                    </div>
                </div>
            </header>

            <div className="relative max-w-6xl mx-auto px-6 py-8">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                    <div className="border border-renaissance-gold/20 bg-renaissance-burgundy/50 backdrop-blur-sm p-5">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-8 flex items-center justify-center border border-renaissance-gold/30">
                                <Users size={14} className="text-renaissance-gold" />
                            </div>
                            <span
                                className="text-renaissance-champagne/40 tracking-[0.2em] uppercase"
                                style={{ fontFamily: "var(--font-accent)", fontSize: "10px" }}
                            >
                                Total Patrons
                            </span>
                        </div>
                        <span
                            className="text-renaissance-ivory block"
                            style={{ fontFamily: "var(--font-display)", fontSize: "2rem", fontWeight: 700 }}
                        >
                            {count.toLocaleString()}
                        </span>
                    </div>

                    <div className="border border-renaissance-gold/20 bg-renaissance-burgundy/50 backdrop-blur-sm p-5">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-8 flex items-center justify-center border border-renaissance-gold/30">
                                <Clock size={14} className="text-renaissance-gold" />
                            </div>
                            <span
                                className="text-renaissance-champagne/40 tracking-[0.2em] uppercase"
                                style={{ fontFamily: "var(--font-accent)", fontSize: "10px" }}
                            >
                                Latest Entry
                            </span>
                        </div>
                        <span
                            className="text-renaissance-ivory block truncate"
                            style={{ fontFamily: "var(--font-accent)", fontSize: "0.95rem", fontWeight: 500 }}
                        >
                            {registrations.length > 0
                                ? formatDate(registrations[0].created_at)
                                : "No entries yet"}
                        </span>
                    </div>

                    <div className="border border-renaissance-gold/20 bg-renaissance-burgundy/50 backdrop-blur-sm p-5">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-8 flex items-center justify-center border border-renaissance-gold/30">
                                <span className="text-renaissance-gold" style={{ fontSize: "14px" }}>✦</span>
                            </div>
                            <span
                                className="text-renaissance-champagne/40 tracking-[0.2em] uppercase"
                                style={{ fontFamily: "var(--font-accent)", fontSize: "10px" }}
                            >
                                Capacity
                            </span>
                        </div>
                        <div className="flex items-end gap-2">
                            <span
                                className="text-renaissance-ivory"
                                style={{ fontFamily: "var(--font-display)", fontSize: "2rem", fontWeight: 700 }}
                            >
                                {Math.min(100, Math.round((count / 5000) * 100))}%
                            </span>
                            <span
                                className="text-renaissance-champagne/30 mb-1"
                                style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem" }}
                            >
                                of 5,000
                            </span>
                        </div>
                        <div className="mt-2 h-1 bg-renaissance-gold/10 overflow-hidden">
                            <div
                                className="h-full bg-renaissance-gold/60 transition-all duration-700"
                                style={{ width: `${Math.min(100, (count / 5000) * 100)}%` }}
                            />
                        </div>
                    </div>
                </div>

                {/* Table Header */}
                <div className="flex items-center justify-between mb-4">
                    <h2
                        className="text-renaissance-ivory"
                        style={{ fontFamily: "var(--font-display)", fontSize: "1.3rem", fontWeight: 600 }}
                    >
                        Waitlist Registrations
                    </h2>
                    <span
                        className="text-renaissance-champagne/30"
                        style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem" }}
                    >
                        {count} {count === 1 ? "entry" : "entries"}
                    </span>
                </div>

                {/* Table */}
                <div className="border border-renaissance-gold/15 overflow-hidden">
                    {/* Table header row */}
                    <div className="grid grid-cols-[1fr_auto_auto_auto] gap-4 px-5 py-3 bg-renaissance-gold/5 border-b border-renaissance-gold/15">
                        <span
                            className="text-renaissance-gold/60 tracking-[0.2em] uppercase"
                            style={{ fontFamily: "var(--font-accent)", fontSize: "10px", fontWeight: 500 }}
                        >
                            Email
                        </span>
                        <span
                            className="text-renaissance-gold/60 tracking-[0.2em] uppercase text-right hidden sm:block"
                            style={{ fontFamily: "var(--font-accent)", fontSize: "10px", fontWeight: 500 }}
                        >
                            IP
                        </span>
                        <span
                            className="text-renaissance-gold/60 tracking-[0.2em] uppercase text-right"
                            style={{ fontFamily: "var(--font-accent)", fontSize: "10px", fontWeight: 500 }}
                        >
                            Date
                        </span>
                        <span className="w-8" />
                    </div>

                    {/* Rows */}
                    {registrations.length === 0 ? (
                        <div className="px-5 py-16 text-center">
                            <span
                                className="text-renaissance-champagne/20"
                                style={{ fontFamily: "var(--font-accent)", fontSize: "1rem", fontStyle: "italic" }}
                            >
                                No registrations yet — share your waitlist link!
                            </span>
                        </div>
                    ) : (
                        <div className="max-h-[60vh] overflow-y-auto">
                            {registrations.map((reg) => (
                                <div
                                    key={reg.id}
                                    className={`grid grid-cols-[1fr_auto_auto_auto] gap-4 px-5 py-3 items-center border-b border-renaissance-gold/8 transition-all duration-700 ${newIds.has(reg.id)
                                            ? "bg-renaissance-gold/15 border-l-2 border-l-renaissance-gold"
                                            : "hover:bg-renaissance-gold/5"
                                        }`}
                                >
                                    <span
                                        className="text-renaissance-ivory truncate"
                                        style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem" }}
                                    >
                                        {reg.email}
                                    </span>
                                    <span
                                        className="text-renaissance-champagne/25 text-right hidden sm:block min-w-[100px]"
                                        style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem" }}
                                    >
                                        {reg.ip || "—"}
                                    </span>
                                    <span
                                        className="text-renaissance-champagne/40 text-right whitespace-nowrap min-w-[130px]"
                                        style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem" }}
                                    >
                                        {formatDate(reg.created_at)}
                                    </span>
                                    <button
                                        onClick={() => handleDelete(reg.id)}
                                        className="w-8 h-8 flex items-center justify-center text-renaissance-champagne/20 hover:text-red-400 hover:bg-red-400/10 transition-all duration-200"
                                        title="Delete registration"
                                    >
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

// ─── Main Export ─────────────────────────────────────────────
export function AdminDashboard() {
    const [authenticated, setAuthenticated] = useState<boolean | null>(null);

    useEffect(() => {
        const token = getToken();
        if (!token) {
            setAuthenticated(false);
            return;
        }
        // Verify saved token
        fetch("/api/auth/verify", {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((r) => r.json())
            .then((data) => setAuthenticated(data.valid))
            .catch(() => setAuthenticated(false));
    }, []);

    // Loading state while verifying
    if (authenticated === null) {
        return (
            <div className="min-h-screen bg-renaissance-burgundy flex items-center justify-center">
                <div
                    className="text-renaissance-champagne/30"
                    style={{ fontFamily: "var(--font-accent)", fontSize: "0.9rem" }}
                >
                    Verifying access...
                </div>
            </div>
        );
    }

    if (!authenticated) {
        return <LoginScreen onLogin={() => setAuthenticated(true)} />;
    }

    return <Dashboard onLogout={() => setAuthenticated(false)} />;
}
