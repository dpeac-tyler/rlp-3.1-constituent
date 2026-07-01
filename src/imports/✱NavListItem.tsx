export default function NavListItem() {
  return (
    <div className="bg-white relative rounded-[4px] size-full" data-name="✱ / Nav List Item">
      <div className="content-stretch flex flex-col items-start px-[8px] relative size-full">
        <div className="content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px overflow-clip relative w-full" data-name="shape">
          <div className="content-stretch flex flex-[1_0_0] h-full items-center min-h-px min-w-px relative" data-name="slot-middle">
            <div className="flex flex-[1_0_0] flex-col font-['Public+Sans:SemiBold',sans-serif] font-semibold h-[18px] justify-center leading-[0] min-h-px min-w-px overflow-hidden relative text-[14px] text-[rgba(0,0,0,0.87)] text-ellipsis tracking-[0.16px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
              <p className="leading-[24px] overflow-hidden">Subordinate</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}