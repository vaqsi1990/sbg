import React from 'react';
import ProductImages from '../ProductImage';
import { getSingleProduct } from '@/lib/actions/actions';
import { Link } from "@/i18n/navigation";
import Image from 'next/image';
import { Mattress, Pad } from '@prisma/client';
import ProductCarousel from '../ProductCarousel';
import { getAllProduct } from '@/lib/actions/actions';
import { getCatalogItems } from '@/lib/actions/catalog';
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
    return <div className="text-center text-lg font-bold">Product not found</div>;
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
  const isFlexMode = product.type === 'PILLOW' || product.type === 'QUILT';
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
        ]
          .map((value) => value.trim())
          .filter(Boolean)
      : [];
  return (
    <section className="w-full mx-auto max-w-[1440px]">
      <div className="text-black ">
        <div className="container mx-auto flex flex-col md:flex-row gap-6 lg:gap-12 items-center">
          <div className="w-full lg:w-1/2 flex justify-center">
            <ProductImages images={product.images} />
          </div>
          <div className="w-full lg:w-1/2 lg:mt-28 p-4 sm:p-6 flex flex-col">
            <h2 className="lg:mt-[80px] text-xl lg:text-[25px] text-center lg:text-start mb-5 font-semibold">
              {title}
            </h2>
            <p className="text-[15px] lg:text-[17px] leading-tight mb-4 font-semibold">
              {second}
            </p>

            {firmnessLevel !== null && (
              <div className="mt-4 mb-6">
                <h3 className="text-sm font-semibold mb-2">
                  {isGe ? 'მატრასის სიმაგრე' : 'Mattress Firmness Level'}
                </h3>
                <div className="relative flex items-center justify-between">
                  <div className="absolute left-0 right-0 h-[2px] bg-gray-300 top-1/2 -translate-y-1/2" />
                  {[1, 2, 3, 4, 5].map((value) => {
                    const isActive = value === firmnessLevel;
                    return (
                      <div key={value} className="relative z-10 flex flex-col items-center">
                        <div
                          className={`flex items-center justify-center w-8 h-8 rounded-full border text-xs font-medium transition-colors ${
                            isActive
                              ? 'bg-blue-900 text-white border-blue-900'
                              : 'bg-white text-gray-600 border-gray-300'
                          }`}
                        >
                          {value}
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
                  <span>{isGe ? 'რბილი' : 'Soft'}</span>
                  <span>{isGe ? 'მაგარი' : 'Firm'}</span>
                </div>
                {firmnessLabel && (
                  <p className="mt-3 text-sm text-center">
                    {isGe ? 'სიმაგრის დონე: ' : 'Firmness level: '}
                    <span className="font-semibold">
                      {firmnessLabel}
                    </span>
                  </p>
                )}
              </div>
            )}

<div className="">
{product.type === 'PILLOW' && product.pillow?.minitext && (
  <p className="mt-4 text-[15px] w-full">
    {isGe ? product.pillow.minitext : product.pillow.minitextEn}
  </p>
)}

{product.type === 'QUILT' && product.quilt?.minitext && (
  <p className="mt-4 text-[15px] w-full">
    {isGe ? product.quilt.minitext : product.quilt.minitextEn}
  </p>
)}

{product.type === 'PAD' && product.pad?.minitext && (
  <p className="mt-4 text-[15px] w-full">
    {isGe ? product.pad.minitext : product.pad.minitextEn}
  </p>
)}

{product.type === 'MATTRESS' && product.mattress?.minitext && (
  <p className="mt-4 text-[15px] w-full">
    {isGe ? product.mattress.minitext : product.mattress.minitextEn}
  </p>
)}
</div>

<div className={`mt-4 ${isFlexMode ? 'flex flex-col gap-y-2' : 'grid grid-cols-1 sm:grid-cols-2 gap-4'}`}>
  {product.type === 'PILLOW' && product.pillow && (
    <>
      {product.pillow.size && (
        <p><strong>{isGe ? 'ზომა' : 'Size'}:</strong> {product.pillow.size}</p>
      )}
    </>
  )}

  {product.type === 'QUILT' && product.quilt && (
    <>
      {product.quilt.dimensions && (
        <p><strong>{isGe ? 'ზომა' : 'Dimensions'}:</strong> {product.quilt.dimensions}</p>
      )}
      {(isGe ? product.quilt.fabric : product.quilt.fabricEn) && (
        <p><strong>{isGe ? 'ქსოვილი' : 'Fabric'}:</strong> {isGe ? product.quilt.fabric : product.quilt.fabricEn}</p>
      )}
      {(isGe ? product.quilt.filling : product.quilt.fillingEn) && (
        <p><strong>{isGe ? 'შევსება' : 'Filling'}:</strong> {isGe ? product.quilt.filling : product.quilt.fillingEn}</p>
      )}
      {product.quilt.weight && (
        <p><strong>{isGe ? 'წონა' : 'Weight'}:</strong> {product.quilt.weight}</p>
      )}
    </>
  )}

  {(product.type === 'PAD' || product.type === 'MATTRESS') && (
    <>
      {ALL_FEATURES.map((feature, index) => {
        const value = getFeatureValue(feature.key);
        if (!value) return null;

        return (
          <div key={index}>
            <div className="flex items-center space-x-2 p-2 rounded-lg transition">
              <Link
                href={feature.href}
                className="font-semibold flex items-center gap-2 p-2 text-[15px] text-gray-800 hover:underline"
              >
                <Image
                  src={feature.logo}
                  alt="logo"
                  width={42}
                  height={42}
                  className="object-contain"
                />
                {isGe ? feature.label : feature.labelEn}
              </Link>
            </div>
          </div>
        );
      })}
      {assignedFeatures.map((item) => (
        <div key={item.id}>
          <div className="flex items-center space-x-2 p-2 rounded-lg transition">
            <Link
              href={`/feature/${item.slug}`}
              className="font-semibold flex items-center gap-2 p-2 text-[15px] text-gray-800 hover:underline"
            >
              <Image
                src={item.image}
                alt={item.labelEn}
                width={42}
                height={42}
                className="object-contain"
                unoptimized={item.image.startsWith("http")}
              />
              {isGe ? item.labelKa : item.labelEn}
            </Link>
          </div>
        </div>
      ))}
    </>
  )}
</div>


          </div>
          
        </div>

        {pillowBadges.length > 0 ? (
          <div className="container mx-auto mt-8 mb-4 px-4 grid grid-cols-2 lg:grid-cols-4 gap-3">
            {pillowBadges.map((badge) => (
              <div
                key={badge}
                className="min-h-[56px] px-4 py-3 rounded-xl border border-[#1e3a6e] bg-[#ececec] text-black text-base lg:text-lg font-medium text-center flex items-center justify-center"
              >
                {badge}
              </div>
            ))}
          </div>
        ) : null}

        
        {(product.type === 'MATTRESS' && product.mattress && (isGe ? product.mattress.descriptionKa : product.mattress.descriptionEn)) ||
 (product.type === 'PAD' && product.pad && (isGe ? product.pad.descriptionKa : product.pad.descriptionEn)) ? (
  <div className="container mt-10 text-center mx-auto gap-6 lg:gap-12">
    <h1 className="text-xl lg:text-[25px] font-semibold">{isGe ? 'აღწერა' : 'Description'}:</h1>
    <p className="mt-4 text-[16px]">
      {product.type === 'MATTRESS' && product.mattress && (
        isGe ? product.mattress.descriptionKa : product.mattress.descriptionEn
      )}
      {product.type === 'PAD' && product.pad && (
        isGe ? product.pad.descriptionKa : product.pad.descriptionEn
      )}
    </p>
  </div>
) : null}
<div className="container mb-8">

      <ProductCarousel products={filtered} locale={locale} />
</div>
      </div>
    </section>
  );
};

export default DetailPage;
