'use client';

import * as React from 'react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationVerticalMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import useBasicStore from '@/hooks/useBasicStore';
import { useEffect } from 'react';
import FlagIcon from '@/components/FlagIcon';
import { useRegions } from '@/hooks/useRegions';

const RegionDropdownMenu = () => {
  const { data } = useRegions();
  const { selectedRegion, setSelectedRegion } = useBasicStore();

  useEffect(() => {
    if (!selectedRegion) {
      const defaultRegion = data?.find((region) => region?.isDefault);
      setSelectedRegion(defaultRegion);
    }
  }, [selectedRegion, data]);

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="gap-2">
            <FlagIcon flagUrl={selectedRegion?.flagUrl} />
            {selectedRegion?.name ?? 'Choose region'}
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid grid-flow-row auto-rows-max gap-2 p-4">
              {data?.map((region) => (
                <li key={region.id} className="flex">
                  <NavigationMenuLink
                    asChild
                    active={region.id === selectedRegion?.id}
                    onClick={() => setSelectedRegion(region)}
                    className={navigationVerticalMenuTriggerStyle()}
                  >
                    <div className="flex-auto gap-2 items-center">
                      <FlagIcon flagUrl={region?.flagUrl} />
                      {region.name}
                    </div>
                  </NavigationMenuLink>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuIndicator className="NavigationMenuIndicator" />
      </NavigationMenuList>
      <NavigationMenuViewport className="bg-popover/80 backdrop-blur-lg" />
    </NavigationMenu>
  );
};

export default RegionDropdownMenu;
