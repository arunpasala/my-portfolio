"use client";

export default function RotatingGlobe() {
  return (
    <div className="relative mx-auto h-[420px] w-full overflow-hidden rounded-[2rem] border border-white/10 bg-black">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.25),transparent_55%)]" />

      <div className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/40 shadow-[0_0_60px_rgba(255,255,255,0.35)]">
        <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_35%_30%,rgba(255,255,255,0.25),rgba(15,23,42,0.15)_35%,rgba(0,0,0,0.95)_75%)]" />

        <div className="globe-spin absolute inset-0 rounded-full opacity-70">
          <div className="absolute inset-0 rounded-full bg-[linear-gradient(90deg,transparent_48%,rgba(255,255,255,0.25)_50%,transparent_52%)]" />
          <div className="absolute inset-0 rounded-full bg-[repeating-linear-gradient(90deg,rgba(255,255,255,0.18)_0px,rgba(255,255,255,0.18)_1px,transparent_2px,transparent_28px)]" />
          <div className="absolute inset-0 rounded-full bg-[repeating-linear-gradient(0deg,rgba(255,255,255,0.12)_0px,rgba(255,255,255,0.12)_1px,transparent_2px,transparent_34px)]" />
        </div>

        <div className="absolute left-[18%] top-[25%] rounded bg-white px-2 py-1 text-[10px] font-bold text-slate-900">
          NEW YORK
        </div>

        <div className="absolute right-[12%] top-[48%] rounded bg-white px-2 py-1 text-[10px] font-bold text-slate-900">
          TOKYO
        </div>

        <div className="absolute left-[34%] bottom-[22%] rounded bg-white px-2 py-1 text-[10px] font-bold text-slate-900">
          SAN FRANCISCO
        </div>
      </div>
    </div>
  );
}