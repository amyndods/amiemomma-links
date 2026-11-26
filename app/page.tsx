import { existsSync } from "fs";
import { join } from "path";
import Sunflowers from "@/components/Sunflowers";
import { items, site } from "@/lib/config";
import { isVisible } from "@/lib/util";
import { Arrow, Pin, UserPlus, Verified, Social } from "@/components/Icons";
import { EmailForm, ShareButton, ViewBeacon } from "@/components/Client";

export const revalidate = 60; // scheduled links appear/disappear within a minute

const avatarOk = !!site.avatar && (!site.avatar.startsWith("/") || existsSync(join(process.cwd(), "public", site.avatar)));
const initials = site.name.split(/\s+/).map((w) => w[0]).slice(0, 2).join("").toUpperCase();

function Embed({ provider, id, title }: { provider: string; id: string; title?: string }) {
  const src = provider === "youtube" ? `https://www.youtube-nocookie.com/embed/${id}` : `https://open.spotify.com/embed/${id}`;
  return (
    <div className={`embed ${provider}`}>
      <iframe src={src} title={title || provider} loading="lazy" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" allowFullScreen />
    </div>
  );
}

export default function Home() {
  const visible = items.filter((i) => isVisible(i));
  let n = 3;
  return (
    <>
      <div className="bg" aria-hidden><i /><i /><i /><Sunflowers /></div>
      <main className="wrap">
        <header className="profile" style={{ ["--i" as string]: 0 }}>
          <div className={`avatar${avatarOk ? " logo" : ""}`}>
            {avatarOk ? <img src={site.avatar} alt={site.name} width={168} height={168} /> : <span>{initials}</span>}
          </div>
          <h1>
            {site.name} {site.verified && <Verified />}
          </h1>
          <p className="tagline">{site.tagline}</p>
          {site.bio && <p className="bio">{site.bio}</p>}
          {site.location && <p className="loc"><Pin /> {site.location}</p>}
          <nav className="socials" aria-label="Social profiles">
            {site.socials.map((s) => (
              <a key={s.url} href={s.url} target="_blank" rel="noopener noreferrer me" aria-label={s.network}>
                <Social network={s.network} />
              </a>
            ))}
          </nav>
          <div className="actions">
            <ShareButton title={site.name} />
            {(site.contact.email || site.contact.phone || site.contact.url) && <a className="pill" href="/vcard" download><UserPlus /> Save contact</a>}
          </div>
        </header>

        <ul className="list">
          {visible.map((it, idx) => {
            const style = { ["--i" as string]: n++ };
            if (it.type === "header") return <li key={idx} className="hd" style={style}>{it.title}</li>;
            if (it.type === "embed") return <li key={it.id} style={style}><Embed {...it} /></li>;
            if (it.type === "email")
              return (
                <li key={it.id} className="card email-card" style={style}>
                  <strong>{it.title}</strong>
                  {it.description && <span className="desc">{it.description}</span>}
                  <EmailForm button={it.button} />
                </li>
              );
            return (
              <li key={it.id} style={style}>
                <a href={`/go/${it.id}`} className={`card link${it.featured ? " featured" : ""}${it.highlight ? " pulse" : ""}`} rel="noopener">
                  {it.featured && it.image && <img src={it.image} alt="" loading="eager" />}
                  <span className="body">
                    <span className="title">{it.title}{it.badge && <em className="badge">{it.badge}</em>}</span>
                    {it.description && <span className="desc">{it.description}</span>}
                  </span>
                  <span className="go"><Arrow /></span>
                </a>
              </li>
            );
          })}
        </ul>

        {site.footer && <footer style={{ ["--i" as string]: n }}>{site.footer}</footer>}
      </main>
      <ViewBeacon />
    </>
  );
}
