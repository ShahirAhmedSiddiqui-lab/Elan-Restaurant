/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface MenuItem {
  id: string;
  number: string;
  image: string;
  name: string;
  description: string;
  tags: string[];
  price?: string;
  details?: string;
}

export interface GalleryItem {
  id: string;
  image: string;
  title: string;
  category: string;
}

export interface ReservationData {
  date: string;
  time: string;
  guests: string;
}
