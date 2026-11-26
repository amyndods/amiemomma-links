import { cookies } from "next/headers";
import { createHash } from "crypto";
import { redirect } from "next/navigation";
import { items } from "@/lib/config";
import { day, pipeline, storeEnabled } from "@/lib/store";

export const dynamic = "force-dynamic";
export const metadata = { title: "Admin", robots: { index: false } };

const token = () => createHash("sha256").update((process.env.ADMIN_PASSWORD || "") + "::lib").digest("hex");

async function login(form: FormData) {
  "use server";
  const pw = process.env.ADMIN_PASSWORD;
  if (pw && form.get("password") === pw) {
    (await cookies()).set("lib_admin", token(), { httpOnly: true, secure: true, sameSite: "lax", maxAge: 60 * 60 * 24 * 30, path: "/admin" });
  }
  redirect("/admin");
}
async function logout() {
  "use server";
  (await cookies()).delete({ name: "lib_admin", path: "/admin" });
  redirect("/admin");
}

function Spark({ data }: { data: number[] }) {
  const max = Math.max(1, ...data);
  return (
    <svg viewBox={`0 0 ${data.length * 8} 28`} width="100%" height="28" preserveAspectRatio="none" aria-hidden>
      {data.map((v, i) => (
        <rect key={i} x={i * 8 + 1} width="6" rx="1.5" y={28 - Math.max(2, (v / max) * 28)} height={Math.max(2, (v / max) * 28)} fill="currentColor" opacity={v ? 0.9 : 0.2} />
      ))}
    </svg>
  );
}

export default async function Admin() {
  const ok = process.env.ADMIN_PASSWORD && (await cookies()).get("lib_admin")?.value === token();
  if (!ok) {
    return (
      <main className="admin">
        <h1>Admin</h1>
        {!process.env.ADMIN_PASSWORD ? (
          <p>Set the <code>ADMIN_PASSWORD</code> environment variable in Vercel, then redeploy.</p>
        ) : (
          <form action={login}>
            <input name="password" type="password" placeholder="Password" autoFocus required />
            <button>Sign in</button>
          </form>
        )}
      </main>
    );
  }

  const links = items.filter((i) => i.type === "link") as Extract<(typeof items)[number], { type: "link" }>[];
  const days = Array.from({ length: 30 }, (_, i) => day(new Date(Date.now() - (29 - i) * 864e5)));
  const cmds: (string | number)[][] = [
    ["GET", "view:page"],
    ...days.map((d) => ["GET", `view:page:${d}`]),
    ...links.flatMap((l) => [["GET", `click:${l.id}`], ...days.map((d) => ["GET", `click:${l.id}:${d}`])]),
    ["HGETALL", "click:country"],
    ["HGETALL", "click:ref"],
    ["ZCARD", "emails"],
    ["ZRANGE", "emails", 0, 199, "REV"],
  ];
  const r = await pipeline(cmds);
  let p = 0;
  const num = (v: any) => Number(v || 0);
  const views = num(r[p++]);
  const viewDays = days.map(() => num(r[p++]));
  const rows = links.map((l) => {
    const total = num(r[p++]);
    const series = days.map(() => num(r[p++]));
    return { l, total, series };
  });
  const pairs = (a: any) => {
    const o: [string, number][] = [];
    for (let i = 0; Array.isArray(a) && i < a.length; i += 2) o.push([a[i], Number(a[i + 1])]);
    return o.sort((x, y) => y[1] - x[1]).slice(0, 8);
  };
  const countries = pairs(r[p++]);
  const refs = pairs(r[p++]);
  const emailCount = num(r[p++]);
  const emails: string[] = r[p++] || [];
  const clicks = rows.reduce((s, x) => s + x.total, 0);

  return (
    <main className="admin">
      <header>
        <h1>Analytics</h1>
        <form action={logout}><button className="ghost">Sign out</button></form>
      </header>
      {!storeEnabled && <p className="warn">No database connected yet. Add Upstash Redis in Vercel Storage to start collecting stats.</p>}
      <section className="stats">
        <div><b>{views}</b><span>Page views</span></div>
        <div><b>{clicks}</b><span>Link clicks</span></div>
        <div><b>{views ? ((clicks / views) * 100).toFixed(1) : "0"}%</b><span>Click rate</span></div>
        <div><b>{emailCount}</b><span>Subscribers</span></div>
      </section>
      <h2>Views, last 30 days</h2>
      <div className="card"><Spark data={viewDays} /></div>
      <h2>Links</h2>
      <div className="card">
        {rows.sort((a, b) => b.total - a.total).map(({ l, total, series }) => (
          <div className="row" key={l.id}>
            <span className="t">{l.title}</span>
            <span className="s"><Spark data={series} /></span>
            <b>{total}</b>
          </div>
        ))}
      </div>
      <div className="two">
        <div><h2>Countries</h2><div className="card">{countries.map(([k, v]) => <div className="row" key={k}><span className="t">{k}</span><b>{v}</b></div>)}{!countries.length && <em>No data yet</em>}</div></div>
        <div><h2>Sources</h2><div className="card">{refs.map(([k, v]) => <div className="row" key={k}><span className="t">{k}</span><b>{v}</b></div>)}{!refs.length && <em>No data yet</em>}</div></div>
      </div>
      <h2>Subscribers</h2>
      <div className="card">
        {emails.length ? <>
          <textarea readOnly rows={Math.min(10, emails.length)} value={emails.join("\n")} />
          <p><em>Copy and paste into your email tool. Newest first.</em></p>
        </> : <em>No signups yet</em>}
      </div>
    </main>
  );
}
