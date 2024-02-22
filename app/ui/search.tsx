'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { Button } from '@/components/ui/button';
import React from 'react';

export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    console.log('searching for:', term);
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  const handleOnCheckedChange = (
    id: string,
    paramKey: string,
    value: boolean,
  ) => {
    const params = new URLSearchParams(searchParams);
    const currentKey = searchParams.get(paramKey)?.split(',');
    if (value) {
      if (currentKey) {
        currentKey.push(id);
        params.set(paramKey, currentKey.join(','));
      } else {
        params.set(paramKey, id);
      }
    } else {
      if (currentKey) {
        const index = currentKey.indexOf(id);
        currentKey.splice(index, 1);
        params.set(paramKey, currentKey.join(','));
      }
    }
    console.log('currentKey:', currentKey);
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <>
      <div className="relative flex flex-1 flex-shrink-0">
        <label htmlFor="search" className="sr-only">
          Search
        </label>
        <input
          className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
          placeholder={placeholder}
          onChange={(e) => handleSearch(e.target.value)}
          defaultValue={searchParams.get('query')?.toString() || ''}
        />
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
      </div>
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Open</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Appearance</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem
              checked={
                searchParams.get('shifts')?.split(',').includes('1') || false
              }
              onCheckedChange={(value) =>
                handleOnCheckedChange('1', 'shifts', value)
              }
            >
              Status Bar
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={
                searchParams.get('shifts')?.split(',').includes('2') || false
              }
              onCheckedChange={(value) =>
                handleOnCheckedChange('2', 'shifts', value)
              }
            >
              Activity Bar
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={
                searchParams.get('shifts')?.split(',').includes('3') || false
              }
              onCheckedChange={(value) =>
                handleOnCheckedChange('3', 'shifts', value)
              }
            >
              Panel
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
}
