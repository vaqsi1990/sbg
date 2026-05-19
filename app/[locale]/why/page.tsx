import { useTranslations } from 'next-intl';
import Video from './Video';
import './why.css'
export default function FranchiseSection() {
  const t = useTranslations();

  return (
    <section className="w-full mx-auto">
      <div>
        <div
          className="flex h-[50vh] items-center flex-wrap bg-overlay sm:p-6 before:bg-title before:bg-opacity-70"
          style={{ backgroundImage: "url('/prod/why.jpg')" }}
        >
          <div className="text-center z-50 w-full">
            <h2 className="text-white mt-10 sm:pt-10 pt-[50px] lg:mt-0 text-[25px] md:text-[50px] font-normal text-center">
              {t('whyUsTitle')}
            </h2>
            <p className="max-w-[672px] text-white mx-auto lg:text-xl">
              {t('bestSleepForEveryone')}
            </p>
          </div>
        </div>
      </div>
     
      <div className="mt-[70px] flex rounded-lg container  bg-[#203e72] py-10">
        <Video />
      </div>

      <div className="allcontainer">
        <div className="container pt-12 lg:pt-12 lg:!pb-12 mx-auto">
          <section className="mb-12">
            <h2 className="mt-5 text-xl lg:text-[25px] leading-tight lg:text-start text-center mb-5 font-semibold">
              {t('whyFranchise')}
            </h2>
            <p className="text-lg text-center leading-relaxed md:text-left">
              {t('franchiseDescription1')}
            </p>

            <p className="text-lg mt-5 text-center leading-relaxed md:text-left">
              {t('franchiseDescription2')}
            </p>

            <p className="text-lg mt-5 text-center leading-relaxed md:text-left">
              {t('franchiseDescription3')}
            </p>

            <p className="text-lg mt-5 text-center leading-relaxed md:text-left">
              {t('franchiseDescription4')}
            </p>
          </section>

          <section className="mb-12 border-t border-gray-300">
            <h2 className="mt-5 text-xl lg:text-[25px] leading-tight lg:text-start text-center mb-5 font-semibold">
              {t('targetMarketPosition')}
            </h2>
            <p className="text-lg text-center leading-relaxed md:text-left">
              {t('marketDescription')}
            </p>

            <h2 className="mb-2 text-left mt-5 text-lg font-semibold text-black  dark:text-white">
              {t('ourProductPortfolio')}
            </h2>
            <ul className="max-w-md text-left  space-y-1 text-black list-disc list-inside ">
              <li>{t('mattressesPillows')}</li>
              <li>{t('mattressProtectors')}</li>
              <li>{t('bedFramesBases')}</li>
              <li>{t('roomAromatizers')}</li>
              <li>{t('hotelCollection')}</li>
              <li>{t('kidsCollection')}</li>
              <li>{t('petCollection')}</li>
            </ul>

            <p className="text-lg mt-5 text-center leading-relaxed md:text-left">
              {t('productPortfolioDescription')}
            </p>
          </section>

          <section className="mb-5 border-t border-gray-300 py-6">
            <h2 className="mt-5 text-xl lg:text-[25px] leading-tight lg:text-start text-center mb-5 font-semibold">
              {t('franchiseBenefits')}
            </h2>
            <p className="text-lg text-center leading-relaxed md:text-left px-4">
              {t('franchiseSupport')}
            </p>

            <h2 className="mb-2 lg:text-left mt-5 text-center text-lg font-semibold text-black  dark:text-white">
              {t('comprehensiveSupport')}
            </h2>
            <ul className="max-w-4xl text-left space-y-1 text-black  list-disc list-inside  px-4">
              <li>{t('marketingSupport')}</li>
              <li>{t('storeSupport')}</li>
              <li>{t('salesTraining')}</li>
              <li>{t('digitalInfrastructure')}</li>
              <li>{t('customerSatisfaction')}</li>
            </ul>
          </section>

          <section className="mb-5 border-t border-gray-300 py-6">
            <h2 className="mt-5 text-xl lg:text-[25px] leading-tight lg:text-start text-center mb-5 font-semibold">
              {t('advertisingSupport')}
            </h2>

            <ul className="max-w-4xl text-left space-y-1 text-black  list-disc list-inside  px-4">
              <li>{t('socialMediaCampaigns')}</li>
              <li>{t('promoPackages')}</li>
              <li>{t('emailMarketingStrategies')}</li>
              <li>{t('regionalAdPlanning')}</li>
            </ul>
          </section>

          <section className="mb-5 border-t border-gray-300 py-6">
            <h2 className="mt-5 text-xl lg:text-[25px] leading-tight lg:text-start text-center mb-5 font-semibold">
              {t('franchiseApplicationProcess')}
            </h2>
            <p className="text-lg text-center leading-relaxed md:text-left px-4">
              {t('franchiseSteps')}
            </p>

            <h2 className="mb-2 lg:text-left mt-5 text-center text-lg font-semibold text-black  dark:text-white">
              {t('franchiseApplication')}
            </h2>
            <ol className="max-w-4xl text-left space-y-1 text-black list-decimal list-inside  px-4">
              <li>{t('applicationForm')}</li>
              <li>{t('approval')}</li>
              <li>{t('storeLocation')}</li>
              <li>{t('competitorAnalysis')}</li>
              <li>{t('productSelection')}</li>
              <li>{t('architecturalDesign')}</li>
              <li>{t('agreementSigning')}</li>
              <li>{t('openingPlan')}</li>
              <li>{t('productionProcess')}</li>
              <li>{t('storeSetup')}</li>
              <li>{t('productDelivery')}</li>
              <li>{t('storeOpening')}</li>
              <li>{t('annualPlanning')}</li>
            </ol>
          </section>

          <section className="border-t border-gray-300 py-6">
            <h2 className="mt-5 text-xl lg:text-[25px] leading-tight lg:text-start text-center mb-5 font-semibold">
              {t('buildBetterSleep')}
            </h2>

            <h2 className="mb-2 lg:text-left mt-5 text-center text-lg font-semibold text-gray-900 dark:text-white">
              {t('visionAndPhilosophy')}
            </h2>

            <p className="text-lg py-4 text-center leading-relaxed md:text-left">
              {t('sleepIsIntegrity')}
            </p>

            <p className="text-lg py-4 text-center leading-relaxed md:text-left">
              {t('sleepExperience')}
            </p>
          </section>

          <section className="border-t border-gray-300 py-6">
            <h2 className="mt-5 text-xl lg:text-[30px] leading-tight lg:text-start text-center mb-5 font-semibold">
              {t('strongFranchiseChain')}
            </h2>

            <p className="text-lg py-4 text-center leading-relaxed md:text-left">
              {t('franchiseChainGrowth')}
            </p>

            <p className="text-lg py-4 text-center leading-relaxed md:text-left">
              {t('global')}
            </p>
          </section>

          <section className="border-t border-gray-300 py-6">
            <h2 className="mt-5 text-xl lg:text-[25px] leading-tight lg:text-start text-center mb-5 font-semibold">
              {t('joinUs')}
            </h2>

            <p className="text-lg py-4 text-center leading-relaxed md:text-left">
              {t('becomePartOfFamily')}
            </p>
          </section>
        </div>
      </div>
    </section>
  );
}
