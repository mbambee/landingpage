"use client";

import Image from "next/image";
import { useLanguage } from "../i18n/LanguageContext";


export const Footer = () => {
  const { t } = useLanguage();
  return (
    <footer className="bg-black text-white py-12 px-6 h-60 flex   ">
      <div className=" flex  gap-4  -my-6  w-full h-30 flex-col   ">

        <div className="flex  justify-between  ">
          <Image src="/logo.png" alt="Logo" width={140} height={90} />                    
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Restez connecté</h4>
            <p className="mt-4 text-sm text-white">Inscrivez-vous pour nos dernières mises à jour.</p>
            <div className="mt-4 flex">
              <input
                type="email"
                placeholder="Votre email"
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-l-lg focus:outline-none focus:ring-1 focus:ring-red-500"
              />
              <button className="bg-red-600 text-white px-4 py-2 text-sm font-medium rounded-r-lg hover:bg-red-700 transition-colors">
                OK
              </button>
            </div>
          </div>
          <div>
            <h1 className="text-red-500 ">{t("contact.heading")}</h1>
            <address className=" text-sm flex flex-col mt-4 ">
              <div>Adresse : Immeuble Centre Ibrahim,</div><div>Av. Habib Bourguiba,</div><div>Sousse 4000</div>
              <div>Téléphone : +216 31 439 350 </div>
              <div>Email : Info@visioad.com </div>
            </address>
          </div>


        </div>
        <hr className="border-white " />
        <div className=" flex justify-between  items-center my-2">
          <h3 className="text-sm">&copy; {new Date().getFullYear()} {t("footer.copyright")}</h3>
          <div className=" flex items-center justify-center gap-4  w-30">
            <a href="https://www.instagram.com/ste_visioad/"><Image src="/instagram.png" alt="Logo" width={60} height={50} /></a>
            <a href="https://www.facebook.com/visioad/"><Image src="/facebook.png" alt="Logo" width={60} height={50} /></a>
            <a href="https://www.youtube.com/@visoad"><Image src="/youtube.png" alt="Logo" width={60} height={50} /></a>
            <a href="https://www.tiktok.com/@visioad"><Image src="/tik-tok (1).png" alt="Logo" width={60} height={50} /></a>
          </div>
        </div>
      </div>

    </footer>
  );
};
