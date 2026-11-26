"use client";
import { useEffect, useState } from "react";
import { ShareIcon } from "./Icons";

export function ViewBeacon() {
  useEffect(() => {
    try { navigator.sendBeacon?.("/api/view"); } catch {}
  }, []);
  return null;
}

export function ShareButton({ title }: { title: string }) {
  const [done, setDone] = useState(false);
  async function share() {
    const url = location.href.split("#")[0];
    try {
      if (navigator.share) { await navigator.share({ title, url }); return; }
      await navigator.clipboard.writeText(url);
      setDone(true);
      setTimeout(() => setDone(false), 1800);
    } catch {}
  }
  return (
    <button className="pill" onClick={share} aria-live="polite">
      <ShareIcon /> {done ? "Link copied" : "Share"}
    </button>
  );
}

export function EmailForm({ button = "Join" }: { button?: string }) {
  const [state, setState] = useState<"idle" | "busy" | "ok" | "err">("idle");
  const [msg, setMsg] = useState("");
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    setState("busy");
    try {
      const r = await fetch("/api/subscribe", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: f.get("email"), hp: f.get("hp") }) });
      const j = await r.json();
      if (j.ok) { setState("ok"); } else { setState("err"); setMsg(j.error || "Something went wrong"); }
    } catch { setState("err"); setMsg("Network error"); }
  }
  if (state === "ok") return <p className="ok">You're in. Thank you!</p>;
  return (
    <form className="email" onSubmit={submit}>
      <input name="email" type="email" placeholder="you@email.com" required autoComplete="email" aria-label="Email address" />
      <input name="hp" tabIndex={-1} autoComplete="off" aria-hidden className="hp" />
      <button disabled={state === "busy"}>{state === "busy" ? "…" : button}</button>
      {state === "err" && <small role="alert">{msg}</small>}
    </form>
  );
}
