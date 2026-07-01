import svgPaths from "./svg-pv8b1hzdg1";

export default function Group() {
  return (
    <div className="relative size-full">
      <div className="absolute bg-[#ecf3ec] h-[65px] left-[8px] top-0 w-[356px]" />
      <div className="-translate-y-1/2 absolute h-[65px] left-0 top-1/2 w-[8px]" data-name="rectangle">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 65">
          <path d="M8 0H0V65H8V0Z" fill="var(--fill-0, #00A91C)" id="rectangle" />
        </svg>
      </div>
      <div className="absolute contents inset-[33.85%_88.74%_35.38%_5.77%]" data-name="USWDS Components">
        <div className="absolute contents inset-[33.85%_88.74%_35.38%_5.77%]" data-name="Icons">
          <div className="absolute inset-[33.85%_88.74%_35.38%_5.77%]" data-name="Fill">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
              <g id="Fill">
                <path clipRule="evenodd" d={svgPaths.p1a707180} fill="var(--fill-0, #1B1B1B)" fillRule="evenodd" id="Vector" />
              </g>
            </svg>
          </div>
        </div>
      </div>
      <p className="absolute font-['Public_Sans:Regular',sans-serif] font-normal leading-[1.5] left-[calc(50%-131px)] text-[#1b1b1b] text-[16px] top-[20px]">Changes saved successfully</p>
    </div>
  );
}