export default function NavItemDivider() {
  return (
    <div className="bg-white relative size-full" data-name="nav-item divider">
      <div className="-translate-y-1/2 absolute flex flex-col font-['Source_Sans_Pro:Regular',sans-serif] justify-center leading-[0] left-[5px] not-italic text-[14px] text-black top-[22px] tracking-[0.16px] whitespace-nowrap">
        <p className="leading-[24px]">Individual</p>
      </div>
      <div className="absolute flex h-0 items-center justify-center left-0 top-[43px] w-[260px]">
        <div className="flex-none rotate-180">
          <div className="h-0 relative w-[260px]">
            <div className="absolute inset-[-1px_0_0_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 260 1">
                <line id="Line 10" stroke="var(--stroke-0, #979797)" x2="260" y1="0.5" y2="0.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}