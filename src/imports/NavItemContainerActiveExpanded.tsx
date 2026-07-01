import svgPaths from "./svg-z2wv65ffvw";

export default function NavItemContainerActiveExpanded() {
  return (
    <div className="bg-white relative size-full" data-name="nav-item container active expanded">
      <div className="absolute h-[37px] left-[5px] top-[4px] w-[44px]" data-name="home logo">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 44 37">
          <path d={svgPaths.p3c915ec0} fill="var(--fill-0, #757575)" id="home logo" />
        </svg>
      </div>
      <div className="absolute bg-[#015fa2] h-[44px] left-0 top-0 w-[5px]" data-name="active-indicator" />
      <div className="-translate-y-1/2 absolute flex flex-col font-['Source_Sans_Pro:SemiBold',sans-serif] justify-center leading-[0] left-[64px] not-italic text-[14px] text-black top-[22px] tracking-[0.16px] whitespace-nowrap">
        <p className="leading-[24px]">Home</p>
      </div>
    </div>
  );
}