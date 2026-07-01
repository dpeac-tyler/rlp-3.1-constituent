export default function AddressContainer() {
  return (
    <div className="bg-white relative size-full text-[14px] text-black tracking-[0.16px] whitespace-nowrap" data-name="address container">
      <div className="-translate-y-1/2 absolute flex flex-col font-['Public+Sans:SemiBold',sans-serif] font-semibold justify-center leading-[0] left-[5px] top-[27px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[24px]">Welcome, First Name/Business N...</p>
      </div>
      <div className="-translate-y-1/2 absolute flex flex-col font-['Public+Sans:Regular',sans-serif] font-normal justify-center leading-[24px] left-[5px] top-[70px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="mb-0">PO Box 9991, Austin</p>
        <p>TX 78748</p>
      </div>
    </div>
  );
}