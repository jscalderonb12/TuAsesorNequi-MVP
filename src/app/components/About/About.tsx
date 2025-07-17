import React from 'react';
import Image from 'next/image';

export default function AboutDemo() {
  return (
    <section className="bg-[#fdeaf0] text-[#1e002b] font-rubik h-[100vh] ">
      <div className="flex flex-col md:flex-row w-full h-full">
        <div className="hidden md:flex flex-1 justify-center items-center">
          <div className="relative w-[320px] h-[320px] md:w-[400px] md:h-[400px]">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="absolute w-[108%] h-[108%] bg-[#FF2C80] rounded-[36px] rotate-[6deg] z-0 opacity-90" />
              <div className="absolute w-[108%] h-[108%] bg-[#00E1E1] rounded-[36px] rotate-[-6deg] z-0 opacity-90" />
            </div>
            <div className="absolute top-0 left-0 w-full h-full rounded-[36px] overflow-hidden shadow-xl border-[6px] border-white z-10">
              <Image
                src="/image-about-demo.png"
                alt="TuAsesorNequi"
                layout="fill"
                objectFit="cover"
                className="rounded-[36px]"
              />
            </div>
          </div>
        </div>
        <div className="flex-1 flex justify-center items-center  px-6">
          <div className="space-y-6  w-[100%]  ">
            <h2 className="text-3xl md:text-4xl font-bold leading-tight">
              TuAsesorNequi: una nueva forma de hablar con tu plata 💬
            </h2>
            <p className="text-base md:text-lg leading-relaxed">
              Esta demo nace de algo simple: que puedas preguntarle a Nequi, con
              tus propias palabras, cómo estás gastando tu dinero.
            </p>
            <ul className="list-disc list-inside text-base space-y-2 leading-relaxed text-left mx-auto md:mx-0">
              <li>Ideal si no entiendes los extractos o nunca los abres.</li>
              <li>
                Funciona si sueles decir:{' '}
                <b>
                  <i>“¿Pa dónde se fue mi plata?”</i>
                </b>
              </li>
              <li>Perfecto si prefieres hablar antes que buscar en menús.</li>
            </ul>
            <div className="bg-white text-[#1e002b] rounded-xl px-5 py-4 font-medium shadow-md inline-block text-center">
              Animate a utilizar este prototipo y explorar cómo podría funcionar
              TuAsesorNequi
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
