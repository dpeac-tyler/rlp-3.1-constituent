export default function HeaderAvatar() {
  return (
    <div className="bg-[#162f52] relative size-full" data-name="header - avatar">
      <div className="absolute bottom-0 right-0 top-0 w-[40px]" data-name="Avatar">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40 40">
          <circle cx="20" cy="20" fill="var(--fill-0, #7E57C2)" id="Ellipse 6" r="20" />
        </svg>
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40 40">
          <circle cx="20" cy="20" fill="var(--fill-0, #009688)" id="Ellipse 3" r="20" />
        </svg>
        <p className="absolute font-['Public+Sans:Regular',sans-serif] font-normal inset-[17.5%_15%_12.5%_15%] leading-[28px] text-[16px] text-center text-white tracking-[0.15px] whitespace-pre-wrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          LC
        </p>
      </div>
    </div>
  );
}