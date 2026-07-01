import imgGeneratedImage2 from "@/assets/196b191ce691d2f78d61dfbfa7f1326c3953b9cd.png";
import { imgGeneratedImage1 } from "./svg-qjf20";

export default function MaskGroup({ className }: { className?: string }) {
  return (
    <div className={className || "h-[205px] relative w-[1184px]"} data-name="Mask group">
      <div className="absolute aspect-[1419.589289933443/711.0610755681992] flex items-center justify-center left-[-16.62%] right-[-3.28%] top-[-243.03px]">
        <div className="flex-none h-[531px] rotate-[-7.82deg] w-[1360px]">
          <div className="mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[196.795px_243.031px] mask-size-[1184px_205px] relative size-full" data-name="generated-image 1" style={{ maskImage: `url('${imgGeneratedImage1}')` }}>
            <img alt="" className="absolute inset-0 max-w-none object-cover opacity-60 pointer-events-none size-full" src={imgGeneratedImage2} />
          </div>
        </div>
      </div>
    </div>
  );
}