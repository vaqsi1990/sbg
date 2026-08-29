import React from 'react';
import ProductImages from '../ProductImage';
import { getSingleProduct } from '@/lib/actions/actions';
import { Link } from "@/i18n/navigation";
import Image from 'next/image';
import { Mattress, Pad } from '@prisma/client';
import ProductCarousel from '../ProductCarousel';
import { getAllProduct } from '@/lib/actions/actions';
import { getCatalogItems } from '@/lib/actions/catalog';
import QuiltSizePicker from '../QuiltSizePicker';
import QuiltSpecs from '../QuiltSpecs';
import FurnitureInfoAccordion from '../FurnitureInfoAccordion';
import FurnitureHighlights from '../FurnitureHighlights';
import { parseFurnitureInfo, toFurnitureInfoDisplay } from '@/lib/furniture-info';
import { cn } from '@/lib/utils';
type Feature = {
  key:
    | 'height'
    | 'springTech'
    | 'breathable'
    | 'doubleSided'
    | 'orthopaedic'
    | 'superSoftFoam'
    | 'visconFabric'
    | 'graphiteViscoFoam'
    | 'carbonYarnTechnologyPillowTopMattress'
    | 'middleComfortLayer'
    | 'visconFabricSoftComfortLayer'
    | 'copperViscoLayer'
    | 'cncFoamTechnology'
    | 'softComfortLayer'
    | 'firmComfortLayer'
    | 'aloeveraFabric'
    | 'knitte'
    | 'wool'
    | 'visco'
    | 'dns'
    | 'latex'
    | 'coconutLayer'
    | 'washable';
  label: string;
  labelEn: string;
  href: string;
  logo: string;
};

const HEIGHT_FEATURES: Feature[] = [
  { key: 'height', label: '6 სიმაღლე', labelEn: '6 height', href: '/6', logo: '/filters/6.jpg' },
  { key: 'height', label: '7 სიმაღლე', labelEn: '7 height', href: '/7', logo: '/filters/7.jpg' },
  { key: 'height', label: '25 სიმაღლე', labelEn: '25 height', href: '/25', logo: '/filters/25.jpg' },
  { key: 'height', label: '26 სიმაღლე', labelEn: '26 height', href: '/26', logo: '/filters/26.jpg' },
  { key: 'height', label: '27 სიმაღლე', labelEn: '27 height', href: '/27', logo: '/filters/27.jpg' },
  { key: 'height', label: '28 სიმაღლე', labelEn: '28 height', href: '/28', logo: '/filters/28.jpg' },
  { key: 'height', label: '30 სიმაღლე', labelEn: '30 height', href: '/30', logo: '/filters/30.jpg' },
  { key: 'height', label: '32 სიმაღლე', labelEn: '32 height', href: '/32', logo: '/filters/32.jpg' },
  { key: 'height', label: '33 სიმაღლე', labelEn: '33 height', href: '/33', logo: '/filters/33.jpg' },
];

const FEATURES: Feature[] = [
  { key: 'springTech', label: '7 ზონიანი შეფუთული ზამბარა', labelEn: '7 Zone Pocket Spring Technology', href: '/zone', logo: '/filters/zone.jpg' },
  { key: 'breathable', label: 'სუნთქვადი', labelEn: 'Breathable', href: '/brieth', logo: '/filters/brieth1.jpg' },
  { key: 'doubleSided', label: 'ორმხრივი', labelEn: 'Double Sided', href: '/double', logo: '/filters/ds.jpg' },
  { key: 'orthopaedic', label: 'ორთოპედიული', labelEn: 'Orthopaedic', href: '/ort', logo: '/filters/ort.jpg' },
  { key: 'superSoftFoam', label: 'სუპერ რბილი ღრუბელი', labelEn: 'Super Soft Foam', href: '/super-soft-foam', logo: '/filters/ort.jpg' },
  { key: 'visconFabric', label: 'ვისკონის ქსოვილი', labelEn: 'Viscon Fabric', href: '/viscon-fabric', logo: '/filters/knitted.jpg' },
  { key: 'graphiteViscoFoam', label: 'გრაფიტ ვისკო ქაფი', labelEn: 'Graphite Visco Foam', href: '/graphite-visco-foam', logo: '/filters/visco.jpg' },
  { key: 'carbonYarnTechnologyPillowTopMattress', label: 'Carbon Yarn ტექნოლოგიის Pillow Top', labelEn: 'Carbon Yarn Technology Pillow Top Mattress', href: '/carbon-yarn-pillow-top', logo: '/filters/zone.jpg' },
  { key: 'middleComfortLayer', label: 'საშუალო კომფორტის ფენა', labelEn: 'Middle Comfort Layer', href: '/middle-comfort-layer', logo: '/filters/ds.jpg' },
  { key: 'visconFabricSoftComfortLayer', label: 'Viscon Fabric რბილი კომფორტის ფენა', labelEn: 'Viscon Fabric Soft Comfort Layer', href: '/viscon-soft-comfort-layer', logo: '/filters/knitted.jpg' },
  { key: 'copperViscoLayer', label: 'Copper Visco ფენა', labelEn: 'Copper Visco Layer', href: '/copper-visco-layer', logo: '/filters/visco.jpg' },
  { key: 'cncFoamTechnology', label: 'CNC ქაფის ტექნოლოგია', labelEn: 'CNC Foam Technology', href: '/cnc-foam-technology', logo: '/filters/dns.jpg' },
  { key: 'softComfortLayer', label: 'რბილი კომფორტის ფენა', labelEn: 'Soft Comfort Layer', href: '/soft-comfort-layer', logo: '/filters/soft.jpg' },
  { key: 'firmComfortLayer', label: 'მაგარი კომფორტის ფენა', labelEn: 'Firm Comfort Layer', href: '/firm-comfort-layer', logo: '/filters/firmcomfort.jpg' },
  { key: 'aloeveraFabric', label: 'ალოე ვერას ქსოვილი', labelEn: 'Aloevera Fabric', href: '/aloevera-fabric', logo: '/filters/aloevera.jpg' },
  { key: 'knitte', label: 'ნაქსოვი', labelEn: 'Knitted', href: '/knitte', logo: '/filters/knitted.jpg' },
  { key: 'wool', label: 'ბამბა', labelEn: 'Wool', href: '/wool', logo: '/filters/wool.jpg' },
  { key: 'visco', label: 'ვისკო', labelEn: 'Visco', href: '/visco', logo: '/filters/visco.jpg' },
  { key: 'dns', label: 'მაღალი საჰაერო გამტარობის DNS ღრუბელი', labelEn: 'High Dns Air Ducted Support Sponge', href: '/dns', logo: '/filters/dns.jpg' },
  { key: 'latex', label: 'ლატექსი', labelEn: 'Latex', href: '/latex', logo: '/filters/latex.jpg' },
  { key: 'coconutLayer', label: 'ქოქოსის შრე', labelEn: 'Coconut Layer', href: '/coconut', logo: '/filters/coconut.jpg' },
  { key: 'washable', label: 'რეცხვადი ქეისი', labelEn: 'Washable', href: '/wash', logo: '/filters/wash.jpg' },
  { key: 'cncFoamTechnology', label: 'რეცხვადი ქეისი', labelEn: 'CNC Foam Technology', href: '/cnc-foam-technology', logo: '/filters/cnc.jpg' },
  { key: 'middleComfortLayer', label: 'საშუალო კომფორტის ფენა', labelEn: 'Middle Comfort Layer', href: '/wash', logo: '/filters/comfort.jpg' },
];

const DetailPage = async(props: {
  params:Promise< {id:string,locale: string} >
}) => {
  const { id, locale } = await props.params;
   const product = await getSingleProduct(id); 
  const isGe = locale === 'ge';

  if (!product) {
    return (
      <div className="container mx-auto px-4 pt-40 lg:pt-48 pb-16 text-center">
        <p className="text-lg font-semibold text-foreground">Product not found</p>
      </div>
    );
  }

  const title = isGe ? product.titleKa : product.titleEn;
  const second = isGe ? product.secondtext : product.secondtextEn;

  const rawFirmnessLevel =
    product.type === 'MATTRESS' ? product.mattress?.firmnessLevel : null;

  const firmnessLevel =
    typeof rawFirmnessLevel === 'number' && rawFirmnessLevel >= 1 && rawFirmnessLevel <= 5
      ? rawFirmnessLevel
      : null;

  const firmnessLabel =
    firmnessLevel === null
      ? null
      : firmnessLevel <= 2
      ? isGe
        ? 'რბილი'
        : 'Soft'
      : firmnessLevel === 3
      ? isGe
        ? 'საშუალო'
        : 'Medium'
      : isGe
      ? 'მაგარი'
      : 'Firm';

  const heightValue =
    product.type === 'MATTRESS'
      ? product.mattress?.height?.toString()
      : product.type === 'PAD'
      ? product.pad?.height?.toString()
      : null;

  const { data: allSameTypeProducts } = await getAllProduct(product.type);
  const filtered = allSameTypeProducts.filter(p => p.id !== id).slice(0, 4);
  const catalogItems = await getCatalogItems();
  const catalogByLegacy = Object.fromEntries(
    catalogItems
      .filter((item) => item.legacyKey)
      .map((item) => [item.legacyKey as string, item])
  );
  const displayFeatures = FEATURES.filter(
    (feature, index, list) => list.findIndex((item) => item.key === feature.key) === index
  ).map((feature) => {
    const catalog = catalogByLegacy[feature.key];
    if (!catalog) return feature;
    return {
      ...feature,
      label: catalog.labelKa,
      labelEn: catalog.labelEn,
      logo: catalog.image,
      href: catalog.href || feature.href,
    };
  });
  const catalogHeight = catalogItems.find(
    (item) => item.kind === "HEIGHT" && item.slug === String(heightValue ?? "")
  );
  const matchedHeightFeature = catalogHeight
    ? {
        key: "height" as const,
        label: catalogHeight.labelKa,
        labelEn: catalogHeight.labelEn,
        href: catalogHeight.href || `/feature/${catalogHeight.slug}`,
        logo: catalogHeight.image,
      }
    : HEIGHT_FEATURES.find((h) => h.label.includes(`${heightValue} სმ`) || h.label.startsWith(`${heightValue} `));

  const ALL_FEATURES = matchedHeightFeature
    ? [matchedHeightFeature, ...displayFeatures]
    : [...displayFeatures];
  const isFlexMode = product.type === 'PILLOW';
  const getFeatureValue = (key: Feature['key']) => {
    if (key === 'height') return true;
    if (product.type === 'MATTRESS') {
      return product.mattress?.[key as keyof Mattress];
    }
    if (product.type === 'PAD') {
      const mattressOnlyFeatures: Feature['key'][] = [
        'superSoftFoam',
        'visconFabric',
        'graphiteViscoFoam',
        'carbonYarnTechnologyPillowTopMattress',
        'middleComfortLayer',
        'visconFabricSoftComfortLayer',
        'copperViscoLayer',
        'cncFoamTechnology',
        'softComfortLayer',
        'firmComfortLayer',
        'aloeveraFabric',
      ];
      if (mattressOnlyFeatures.includes(key)) return false;
      return product.pad?.[key as keyof Pad];
    }
    return undefined;
  };
  const assignedFeatures = (product.catalogItems ?? [])
    .map((row) => row.item)
    .filter((item) => item.kind === "FEATURE" && !item.legacyKey);
  const pillowBadges =
    product.type === "PILLOW" && product.pillow
      ? [
          product.pillow.weight
            ? `${product.pillow.weight} ${isGe ? "გრამი" : "gram"}`
            : "",
          (isGe ? product.pillow.outerFabric : product.pillow.outerFabricEn) ?? "",
          (isGe ? product.pillow.filling : product.pillow.fillingEn) ?? "",
          (isGe ? product.pillow.packaging : product.pillow.packagingEn) ?? "",
          (isGe ? product.pillow.care : product.pillow.careEn) ?? "",
        ]
          .map((value) => value.trim())
          .filter(Boolean)
      : [];
  const quiltSizes =
    product.type === "QUILT" && product.quilt
      ? [product.quilt.size1, product.quilt.size2]
          .filter((size): size is string => Boolean(size?.trim()))
          .map((size) => size.trim())
      : [];
  const mattressSizes =
    product.type === "MATTRESS" && product.mattress
      ? [product.mattress.size1, product.mattress.size2]
          .filter((size): size is string => Boolean(size?.trim()))
          .map((size) => size.trim())
      : [];
  const furniture =
    product.type === "FURNITURE" && product.furniture
      ? (product.furniture as typeof product.furniture & {
          size1?: string | null;
          size2?: string | null;
          infoSections?: unknown;
        })
      : null;
  const furnitureSizes = furniture
      ? [furniture.size1, furniture.size2]
          .filter((size): size is string => Boolean(size?.trim()))
          .map((size) => size.trim())
      : [];
  const sizeOptions =
    product.type === "QUILT"
      ? quiltSizes
      : product.type === "FURNITURE"
      ? furnitureSizes
      : mattressSizes;

  const typeLabel =
    product.type === "MATTRESS"
      ? isGe ? "მატრასი" : "Mattress"
      : product.type === "PILLOW"
      ? isGe ? "ბალიში" : "Pillow"
      : product.type === "QUILT"
      ? isGe ? "საბანი" : "Duvet"
      : product.type === "FURNITURE"
      ? isGe ? "ავეჯი" : "Furniture"
      : isGe ? "ტოპერი" : "Topper";

  const specRows: { label: string; value: string }[] = [];

  if (product.type === "PILLOW" && product.pillow?.size) {
    specRows.push({ label: isGe ? "ზომა" : "Size", value: product.pillow.size });
  }

  const quiltSpecCards =
    product.type === "QUILT" && product.quilt
      ? (() => {
          const quilt = product.quilt as typeof product.quilt & {
            packaging?: string;
            packagingEn?: string;
            care?: string;
            careEn?: string;
          };
          const pick = (ka?: string | null, en?: string | null) =>
            ((isGe ? ka : en) || ka || en || "").trim();
          return [
            { key: "fabric", label: isGe ? "ქსოვილი" : "Fabric", value: pick(quilt.fabric, quilt.fabricEn) },
            { key: "filling", label: isGe ? "შევსება" : "Filling", value: pick(quilt.filling, quilt.fillingEn) },
            { key: "weight", label: isGe ? "წონა" : "Weight", value: (quilt.weight ?? "").trim() },
            { key: "packaging", label: isGe ? "შეფუთვა" : "Packaging", value: pick(quilt.packaging, quilt.packagingEn) },
            { key: "care", label: isGe ? "მოვლა" : "Care", value: pick(quilt.care, quilt.careEn) },
          ].filter((item) => Boolean(item.value));
        })()
      : [];

  const minitext =
    product.type === "PILLOW"
      ? isGe ? product.pillow?.minitext : product.pillow?.minitextEn
      : product.type === "QUILT"
      ? isGe ? product.quilt?.minitext : product.quilt?.minitextEn
      : product.type === "PAD"
      ? isGe ? product.pad?.minitext : product.pad?.minitextEn
      : product.type === "FURNITURE"
      ? null
      : isGe ? product.mattress?.minitext : product.mattress?.minitextEn;

  const description = (
    product.type === "MATTRESS" && product.mattress
      ? isGe ? product.mattress.descriptionKa : product.mattress.descriptionEn
      : product.type === "PAD" && product.pad
      ? isGe ? product.pad.descriptionKa : product.pad.descriptionEn
      : product.type === "QUILT" && product.quilt
      ? isGe
        ? (product.quilt as { descriptionKa?: string }).descriptionKa
        : (product.quilt as { descriptionEn?: string }).descriptionEn
      : product.type === "FURNITURE" && furniture
      ? isGe ? furniture.descriptionKa : furniture.descriptionEn
      : null
  )?.trim() || null;

  const furnitureInfo = furniture
      ? [
          ...(description
            ? [{ title: isGe ? "აღწერა" : "Description", rows: [{ label: "", value: description }] }]
            : []),
          ...toFurnitureInfoDisplay(parseFurnitureInfo(furniture.infoSections), isGe),
        ]
      : [];

  const activeFeatures = (product.type === "PAD" || product.type === "MATTRESS")
    ? ALL_FEATURES.filter((feature) => getFeatureValue(feature.key))
    : [];

  return (
    <section className="w-full bg-background">
      <div className="container mx-auto px-4 lg:px-6 pt-40 lg:pt-48 pb-16 lg:pb-20">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          <div>
            <div className="lg:sticky lg:top-40">
              <ProductImages images={product.images} />
            </div>
            {product.type === "FURNITURE" ? <FurnitureHighlights isGe={isGe} /> : null}
          </div>

          <div className="flex flex-col gap-6 lg:gap-8">
            <div className="space-y-4">
              <span className="inline-flex items-center rounded-full bg-brand/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand">
                {typeLabel}
              </span>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground leading-tight">
                {title}
              </h1>
              {second ? (
                <p className="text-base lg:text-lg text-muted-foreground leading-relaxed">{second}</p>
              ) : null}
            </div>

            {firmnessLevel !== null && (
              <div className="elevated-card p-5 lg:p-6 space-y-4">
                <h3 className="md:text-[18px] text-[16px] font-semibold text-foreground">
                  {isGe ? "მატრასის სიმაგრე" : "Mattress Firmness Level"}
                </h3>
                <div className="relative flex items-center justify-between px-1">
                  <div className="absolute left-3 right-3 h-0.5 bg-border top-1/2 -translate-y-1/2" />
                  {[1, 2, 3, 4, 5].map((value) => {
                    const isActive = value === firmnessLevel;
                    return (
                      <div
                        key={value}
                        className={cn(
                          "relative z-10 flex h-9 w-9 items-center justify-center rounded-full border-2 text-xs font-semibold transition-colors",
                          isActive
                            ? "border-brand bg-brand text-white"
                            : "border-border bg-card text-muted-foreground"
                        )}
                      >
                        {value}
                      </div>
                    );
                  })}
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{isGe ? "რბილი" : "Soft"}</span>
                  <span>{isGe ? "მაგარი" : "Firm"}</span>
                </div>
                {firmnessLabel ? (
                  <p className="text-sm text-center text-muted-foreground">
                    {isGe ? "სიმაგრის დონე: " : "Firmness level: "}
                    <span className="font-semibold text-foreground">{firmnessLabel}</span>
                  </p>
                ) : null}
              </div>
            )}

            {minitext && minitext !== second ? (
              <p className="text-[15px] lg:text-base text-muted-foreground leading-relaxed">{minitext}</p>
            ) : null}

            {sizeOptions.length > 0 ? (
              <QuiltSizePicker sizes={sizeOptions} isGe={isGe} />
            ) : null}

            {furnitureInfo.length > 0 ? (
              <FurnitureInfoAccordion sections={furnitureInfo} isGe={isGe} />
            ) : null}

            {specRows.length > 0 ? (
              <div className="elevated-card divide-y divide-border overflow-hidden">
                {specRows.map(({ label, value }) => (
                  <div key={label} className="flex items-center justify-between gap-4 px-4 py-3.5">
                    <span className="text-sm text-muted-foreground">{label}</span>
                    <span className="text-sm font-medium text-foreground text-right">{value}</span>
                  </div>
                ))}
              </div>
            ) : null}

            {(activeFeatures.length > 0 || assignedFeatures.length > 0 || quiltSpecCards.length > 0) && (
              <div className="space-y-3">
                <h3 className="md:text-[18px] text-[16px] font-semibold text-foreground">
                  {isGe ? "მახასიათებლები" : "Features"}
                </h3>
                {product.type === "QUILT" ? (
                  <QuiltSpecs items={quiltSpecCards}>
                    {assignedFeatures.map((item) => (
                      <Link
                        key={item.id}
                        href={`/feature/${item.slug}`}
                        className="flex min-h-[88px] items-center gap-3 rounded-xl border border-border bg-card p-4 transition-colors hover:bg-muted/50"
                      >
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-muted/60 p-1.5">
                          <Image
                            src={item.image}
                            alt={item.labelEn}
                            width={36}
                            height={36}
                            className="h-full w-full object-contain"
                            unoptimized={item.image.startsWith("http")}
                          />
                        </div>
                        <span className="text-sm sm:text-base font-semibold text-foreground leading-snug">
                          {isGe ? item.labelKa : item.labelEn}
                        </span>
                      </Link>
                    ))}
                  </QuiltSpecs>
                ) : (
                  <div className={cn("grid gap-3", isFlexMode ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2")}>
                    {activeFeatures.map((feature, index) => (
                      <Link
                        key={`${feature.key}-${index}`}
                        href={feature.href}
                        className="flex items-center gap-3 rounded-xl border border-border bg-card p-3 transition-colors hover:bg-muted/50"
                      >
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-muted/60 p-1.5">
                          <Image
                            src={feature.logo}
                            alt=""
                            width={36}
                            height={36}
                            className="h-full w-full object-contain"
                          />
                        </div>
                        <span className="text-sm font-medium text-foreground leading-snug">
                          {isGe ? feature.label : feature.labelEn}
                        </span>
                      </Link>
                    ))}
                    {assignedFeatures.map((item) => (
                      <Link
                        key={item.id}
                        href={`/feature/${item.slug}`}
                        className="flex items-center gap-3 rounded-xl border border-border bg-card p-3 transition-colors hover:bg-muted/50"
                      >
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-muted/60 p-1.5">
                          <Image
                            src={item.image}
                            alt={item.labelEn}
                            width={36}
                            height={36}
                            className="h-full w-full object-contain"
                            unoptimized={item.image.startsWith("http")}
                          />
                        </div>
                        <span className="text-sm font-medium text-foreground leading-snug">
                          {isGe ? item.labelKa : item.labelEn}
                        </span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {pillowBadges.length > 0 ? (
          <div className="mt-10 lg:mt-14 grid grid-cols-2 lg:grid-cols-4 gap-3">
            {pillowBadges.map((badge) => (
              <div
                key={badge}
                className="elevated-card min-h-[56px] px-4 py-3 text-sm lg:text-base font-medium text-foreground text-center flex items-center justify-center"
              >
                {badge}
              </div>
            ))}
          </div>
        ) : null}

        {description && product.type !== "FURNITURE" && description !== second?.trim() ? (
          <div className="mt-12 lg:mt-16 max-w-3xl mx-auto text-center">
            <h2 className="section-heading-center">{isGe ? "აღწერა" : "Description"}</h2>
            <p className="text-base lg:text-lg text-muted-foreground leading-relaxed">{description}</p>
          </div>
        ) : null}

        <div className="mt-12 lg:mt-16 border-t border-border pt-12 lg:pt-16">
          <ProductCarousel products={filtered} locale={locale} />
        </div>
      </div>
    </section>
  );
};

export default DetailPage;
