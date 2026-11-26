const outer = Array.from({ length: 16 }, (_, i) => i * 22.5);
const inner = Array.from({ length: 16 }, (_, i) => i * 22.5 + 11.25);

function Sunflower() {
  return (
    <svg viewBox="-70 -70 140 140" fill="none" stroke="#f2c81d" strokeWidth="1.1" strokeLinejoin="round">
      {outer.map((a) => (
        <path key={a} transform={`rotate(${a})`} d="M0,-20 C9,-32 9,-52 0,-66 C-9,-52 -9,-32 0,-20Z" />
      ))}
      {inner.map((a) => (
        <path key={a} transform={`rotate(${a})`} d="M0,-18 C6,-27 6,-40 0,-50 C-6,-40 -6,-27 0,-18Z" />
      ))}
      <circle r="17" />
      <circle r="12" strokeDasharray="1.5 3" />
      <circle r="6" strokeDasharray="1 2.5" />
    </svg>
  );
}

export default function Sunflowers() {
  return (
    <div className="sfs">
      <span className="sf s1"><Sunflower /></span>
      <span className="sf s2"><Sunflower /></span>
      <span className="sf s3"><Sunflower /></span>
      <span className="sf s4"><Sunflower /></span>
    </div>
  );
}
