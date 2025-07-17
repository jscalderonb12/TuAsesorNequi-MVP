import TuAsesorNequiChat from '@/app/components/TuAsesorNequiChat/TuAsesorNequiChat';
import PhoneFrame from '@/app/components/PhoneFrame/PhoneFrame';
import InfoForMvp from '@/app/components/Info/Info';

const Demo = () => {
  return (
    <div className="flex flex-col md:flex-row gap-y-6 md:gap-y-0 main-background pt-15 pb-15">
      <div className="flex-1 flex justify-center items-center order-2 md:order-1">
        <PhoneFrame>
          <TuAsesorNequiChat />
        </PhoneFrame>
      </div>
      <div className="flex-1 flex justify-center items-center order-1 md:order-2">
        <InfoForMvp />
      </div>
    </div>
  );
};

export default Demo;
