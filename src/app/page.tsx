import TuAsesorNequiChat from '@/app/components/TuAsesorNequiChat/TuAsesorNequiChat';
import PhoneFrame from '@/app/components/PhoneFrame/PhoneFrame';
import InfoForMvp from '@/app/components/Info/Info';
import AboutDemo from '@/app/components/About/About';
import Disclaimer from '@/app/components/Disclaimer/Disclaimer';

export default function Home() {
  return (
    <div>
      <div>
        <AboutDemo />
      </div>
      <div>
        <Disclaimer />
      </div>
      <div className="flex main-background pt-15 pb-15">
        <div className="flex-1 flex justify-center items-center">
          <PhoneFrame>
            <TuAsesorNequiChat />
          </PhoneFrame>
        </div>
        <div className="flex-1 flex justify-center items-center ">
          <InfoForMvp />
        </div>
      </div>
    </div>
  );
}
