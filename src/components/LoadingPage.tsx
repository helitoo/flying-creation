import { useEffect, useState } from "react";
import { useProgress } from "@react-three/drei";

export default function LoadingPage() {
  const { progress, active } = useProgress();
  const [fadeout, setFadeout] = useState(false);
  const [shouldRender, setShouldRender] = useState(true);

  // Khi tải xong 100% hoặc active chuyển về false, đợi một chút rồi fade-out mượt mà
  useEffect(() => {
    if (progress >= 100 || !active) {
      const timer = setTimeout(() => {
        setFadeout(true);
        const removeTimer = setTimeout(() => {
          setShouldRender(false);
        }, 700); // Khớp với transition duration (700ms)
        return () => clearTimeout(removeTimer);
      }, 400); // Giữ một chút để thấy 100%
      return () => clearTimeout(timer);
    }
  }, [progress, active]);

  if (!shouldRender) return null;

  const currentPercent = Math.min(100, Math.max(0, Math.round(progress)));

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#74D4FF] transition-opacity duration-700 ease-in-out select-none ${
        fadeout ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      style={{
        background: "radial-gradient(circle at center, #8de0ff 0%, #74D4FF 100%)",
      }}
    >
      {/* Hiệu ứng nền nhẹ */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-white/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-white/15 rounded-full blur-3xl" />
      </div>

      <div className="relative flex flex-col items-center z-10 px-6">
        {/* Bánh xe xoay tròn (Spinning Wheel) */}
        <div className="relative flex items-center justify-center mb-8">
          {/* Vòng hào quang phát sáng sau bánh xe */}
          <div className="absolute w-36 h-36 rounded-full bg-white/30 blur-xl animate-pulse" />

          {/* SVG Bánh xe chi tiết */}
          <svg
            className="w-28 h-28 md:w-36 md:h-36 text-white drop-shadow-lg animate-[spin_2.2s_linear_infinite]"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Lốp xe ngoài cùng với các gai lốp (Tire Tread) */}
            <circle
              cx="50"
              cy="50"
              r="44"
              stroke="currentColor"
              strokeWidth="5"
              strokeDasharray="6 3"
              className="opacity-90"
            />

            {/* Vành bánh xe (Outer & Inner Rim) */}
            <circle
              cx="50"
              cy="50"
              r="38"
              stroke="currentColor"
              strokeWidth="3.5"
              className="opacity-95"
            />
            <circle
              cx="50"
              cy="50"
              r="24"
              stroke="currentColor"
              strokeWidth="2"
              className="opacity-70"
            />

            {/* Các nan hoa bánh xe (Spokes) - 8 nan hoa đều nhau */}
            <g stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="opacity-90">
              {/* Trục chính 0 độ, 45 độ, 90 độ, 135 độ */}
              <line x1="50" y1="12" x2="50" y2="38" />
              <line x1="50" y1="62" x2="50" y2="88" />
              <line x1="12" y1="50" x2="38" y2="50" />
              <line x1="62" y1="50" x2="88" y2="50" />
              
              <line x1="23.14" y1="23.14" x2="41.52" y2="41.52" />
              <line x1="58.48" y1="58.48" x2="76.86" y2="76.86" />
              <line x1="76.86" y1="23.14" x2="58.48" y2="41.52" />
              <line x1="41.52" y1="58.48" x2="23.14" y2="76.86" />
            </g>

            {/* Trục giữa (Center Hub) */}
            <circle
              cx="50"
              cy="50"
              r="12"
              fill="currentColor"
              className="opacity-90"
            />
            <circle
              cx="50"
              cy="50"
              r="6"
              fill="#74D4FF"
            />
            <circle
              cx="50"
              cy="50"
              r="2.5"
              fill="currentColor"
            />

            {/* 4 Ốc vít trung tâm (Hub Bolts) */}
            <circle cx="50" cy="42" r="1" fill="#74D4FF" />
            <circle cx="50" cy="58" r="1" fill="#74D4FF" />
            <circle cx="42" cy="50" r="1" fill="#74D4FF" />
            <circle cx="58" cy="50" r="1" fill="#74D4FF" />
          </svg>
        </div>

        {/* Tiêu đề & Thông điệp */}
        <h2 className="text-white font-extrabold text-2xl md:text-3xl tracking-widest uppercase mb-1 drop-shadow-md">
          FLYING CREATION
        </h2>
        <p className="text-white/85 text-xs md:text-sm font-medium tracking-wider mb-6">
          Đang tải thế giới 3D...
        </p>

        {/* Thanh tiến trình (Progress Bar) */}
        <div className="w-56 md:w-72 h-2.5 bg-black/15 rounded-full overflow-hidden p-0.5 backdrop-blur-sm shadow-inner">
          <div
            className="h-full bg-white rounded-full transition-all duration-300 ease-out shadow-sm"
            style={{ width: `${currentPercent}%` }}
          />
        </div>

        {/* Số phần trăm */}
        <span className="text-white font-bold text-sm md:text-base mt-3 tracking-widest drop-shadow-sm">
          {currentPercent}%
        </span>
      </div>
    </div>
  );
}
