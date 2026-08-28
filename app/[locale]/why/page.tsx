import { useTranslations } from "next-intl";
import PageHeader from "@/components/PageHeader";
import Video from "./Video";

export default function FranchiseSection() {
  const t = useTranslations();

  return (
    <section className="w-full bg-background">
      <PageHeader title={t("whyUsTitle")} subtitle={t("bestSleepForEveryone")} />

      <div className="container mx-auto px-4 lg:px-6 py-12 lg:py-16">
        <div className="brand-panel mb-12 lg:mb-16">
          <Video />
        </div>

        <div className="max-w-4xl mx-auto space-y-12 lg:space-y-16">
          <section>
            <h2 className="section-heading mb-5">{t("whyFranchise")}</h2>
            <div className="space-y-4 text-base lg:text-lg text-muted-foreground leading-relaxed">
              <p>{t("franchiseDescription1")}</p>
              <p>{t("franchiseDescription2")}</p>
              <p>{t("franchiseDescription3")}</p>
              <p>{t("franchiseDescription4")}</p>
            </div>
          </section>

          <section className="border-t border-border pt-10">
            <h2 className="section-heading mb-5">{t("targetMarketPosition")}</h2>
            <p className="text-base lg:text-lg text-muted-foreground leading-relaxed mb-6">
              {t("marketDescription")}
            </p>
            <h3 className="text-lg font-semibold text-foreground mb-3">{t("ourProductPortfolio")}</h3>
            <ul className="max-w-md space-y-1.5 text-foreground list-disc list-inside mb-6">
              <li>{t("mattressesPillows")}</li>
              <li>{t("mattressProtectors")}</li>
              <li>{t("bedFramesBases")}</li>
              <li>{t("roomAromatizers")}</li>
              <li>{t("hotelCollection")}</li>
              <li>{t("kidsCollection")}</li>
              <li>{t("petCollection")}</li>
            </ul>
            <p className="text-base lg:text-lg text-muted-foreground leading-relaxed">
              {t("productPortfolioDescription")}
            </p>
          </section>

          <section className="border-t border-border pt-10">
            <h2 className="section-heading mb-5">{t("franchiseBenefits")}</h2>
            <p className="text-base lg:text-lg text-muted-foreground leading-relaxed mb-6">
              {t("franchiseSupport")}
            </p>
            <h3 className="text-lg font-semibold text-foreground mb-3">{t("comprehensiveSupport")}</h3>
            <ul className="space-y-1.5 text-foreground list-disc list-inside">
              <li>{t("marketingSupport")}</li>
              <li>{t("storeSupport")}</li>
              <li>{t("salesTraining")}</li>
              <li>{t("digitalInfrastructure")}</li>
              <li>{t("customerSatisfaction")}</li>
            </ul>
          </section>

          <section className="border-t border-border pt-10">
            <h2 className="section-heading mb-5">{t("advertisingSupport")}</h2>
            <ul className="space-y-1.5 text-foreground list-disc list-inside">
              <li>{t("socialMediaCampaigns")}</li>
              <li>{t("promoPackages")}</li>
              <li>{t("emailMarketingStrategies")}</li>
              <li>{t("regionalAdPlanning")}</li>
            </ul>
          </section>

          <section className="border-t border-border pt-10">
            <h2 className="section-heading mb-5">{t("franchiseApplicationProcess")}</h2>
            <p className="text-base lg:text-lg text-muted-foreground leading-relaxed mb-6">
              {t("franchiseSteps")}
            </p>
            <h3 className="text-lg font-semibold text-foreground mb-3">{t("franchiseApplication")}</h3>
            <ol className="space-y-1.5 text-foreground list-decimal list-inside">
              <li>{t("applicationForm")}</li>
              <li>{t("approval")}</li>
              <li>{t("storeLocation")}</li>
              <li>{t("competitorAnalysis")}</li>
              <li>{t("productSelection")}</li>
              <li>{t("architecturalDesign")}</li>
              <li>{t("agreementSigning")}</li>
              <li>{t("openingPlan")}</li>
              <li>{t("productionProcess")}</li>
              <li>{t("storeSetup")}</li>
              <li>{t("productDelivery")}</li>
              <li>{t("storeOpening")}</li>
              <li>{t("annualPlanning")}</li>
            </ol>
          </section>

          <section className="border-t border-border pt-10">
            <h2 className="section-heading mb-5">{t("buildBetterSleep")}</h2>
            <h3 className="text-lg font-semibold text-foreground mb-3">{t("visionAndPhilosophy")}</h3>
            <div className="space-y-4 text-base lg:text-lg text-muted-foreground leading-relaxed">
              <p>{t("sleepIsIntegrity")}</p>
              <p>{t("sleepExperience")}</p>
            </div>
          </section>

          <section className="border-t border-border pt-10">
            <h2 className="section-heading mb-5">{t("strongFranchiseChain")}</h2>
            <div className="space-y-4 text-base lg:text-lg text-muted-foreground leading-relaxed">
              <p>{t("franchiseChainGrowth")}</p>
              <p>{t("global")}</p>
            </div>
          </section>

          <section className="border-t border-border pt-10 pb-4">
            <h2 className="section-heading mb-5">{t("joinUs")}</h2>
            <p className="text-base lg:text-lg text-muted-foreground leading-relaxed">
              {t("becomePartOfFamily")}
            </p>
          </section>
        </div>
      </div>
    </section>
  );
}
