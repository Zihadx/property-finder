"use client";

import * as React from "react";
import { Carousel } from "@/components/ui/carousel";
import { PropertyCategoryCard } from "./property-category-card";

type PropertyCategoryItem = {
  title: string;
  subtitle: string;
  href: string;
  icon: "building" | "layers" | "map" | "store";
  count: number;
  image?: string;
};

interface PropertyCategorySliderProps {
  items: PropertyCategoryItem[];
}

export function PropertyCategorySlider({
  items,
}: PropertyCategorySliderProps) {
  return (
    <Carousel
      items={items}
      ariaLabel="Property categories"
      slideBasis="
        basis-[82%]
        xs:basis-[72%]
        sm:basis-[48%]
        md:basis-[36%]
        lg:basis-[30%]
        xl:basis-1/4
      "
      gap="md"
      showNavigation
      showProgress
      showIndex
      dragFree={true}
      previousLabel="Previous property categories"
      nextLabel="Next property categories"
      trackClassName="py-8"
      renderItem={(item, index) => (
        <PropertyCategoryCard
          title={item.title}
          subtitle={item.subtitle}
          href={item.href}
          count={item.count}
          image={item.image}
          icon={item.icon}
          index={index}
        />
      )}
      getItemKey={(item) => item.href}
    />
  );
}