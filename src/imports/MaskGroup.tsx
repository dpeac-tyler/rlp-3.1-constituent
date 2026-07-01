import imgGeneratedImage2 from "@/assets/196b191ce691d2f78d61dfbfa7f1326c3953b9cd.png";
import { imgGeneratedImage1 } from "./svg-qzd0u";

export default function MaskGroup() {
  return (
    <div className="relative size-full" data-name="Mask group">
      <div className="absolute flex h-[711.061px] items-center justify-center left-[-196.79px] top-[-243.03px] w-[1419.589px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "19" } as React.CSSProperties}>
        <div className="flex-none rotate-[-7.82deg]">
          <div className="h-[531px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[196.795px_243.031px] mask-size-[1184px_205px] relative w-[1360px]" data-name="generated-image 1" style={{ maskImage: `url('${imgGeneratedImage1}')` }}>
            <img alt="" className="absolute inset-0 max-w-none object-cover opacity-60 pointer-events-none size-full" src={imgGeneratedImage2} />
          </div>
        </div>
      </div>
    </div>
  );
}