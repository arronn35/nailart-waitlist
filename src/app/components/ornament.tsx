export function OrnamentalDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-4 ${className}`}>
      <div className="h-px w-16 bg-gradient-to-r from-transparent to-renaissance-gold/60" />
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-renaissance-gold">
        <path
          d="M12 2L14.5 8.5L21 12L14.5 15.5L12 22L9.5 15.5L3 12L9.5 8.5L12 2Z"
          fill="currentColor"
          opacity="0.7"
        />
      </svg>
      <div className="h-px w-16 bg-gradient-to-l from-transparent to-renaissance-gold/60" />
    </div>
  );
}

export function GoldLine({ className = "" }: { className?: string }) {
  return (
    <div className={`w-full flex items-center justify-center ${className}`}>
      <div className="h-px flex-1 max-w-xs bg-gradient-to-r from-transparent via-renaissance-gold/40 to-transparent" />
    </div>
  );
}

export function FloralCorner({ className = "", mirror = false }: { className?: string; mirror?: boolean }) {
  return (
    <svg
      width="80"
      height="80"
      viewBox="0 0 80 80"
      fill="none"
      className={`text-renaissance-gold/30 ${mirror ? "scale-x-[-1]" : ""} ${className}`}
    >
      <path
        d="M4 76C4 76 8 40 40 20C40 20 20 8 4 4"
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
      />
      <path
        d="M4 76C4 76 40 72 60 40C60 40 72 60 76 76"
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
      />
      <circle cx="40" cy="20" r="2" fill="currentColor" />
      <circle cx="60" cy="40" r="2" fill="currentColor" />
      <circle cx="4" cy="76" r="3" fill="currentColor" />
    </svg>
  );
}

export function FrameCorners({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative ${className}`}>
      {/* Top-left corner */}
      <div className="absolute -top-2 -left-2 w-6 h-6 border-t border-l border-renaissance-gold/40" />
      {/* Top-right corner */}
      <div className="absolute -top-2 -right-2 w-6 h-6 border-t border-r border-renaissance-gold/40" />
      {/* Bottom-left corner */}
      <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b border-l border-renaissance-gold/40" />
      {/* Bottom-right corner */}
      <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b border-r border-renaissance-gold/40" />
      {children}
    </div>
  );
}
