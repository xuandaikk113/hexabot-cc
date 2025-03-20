/*
 * Copyright © 2025 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

export const getFromQuery = ({
  key,
  search,
  defaultValue = "",
}: {
  key: string;
  search?: string;
  defaultValue?: string;
}) => {
  try {
    const paramsString = search || window.location.search;
    const searchParams = new URLSearchParams(paramsString);
    const loadCampaign = searchParams.get(key) || defaultValue;

    return loadCampaign;
  } catch (e) {
    return defaultValue;
  }
};

export const buildURL = (baseUrl: string, relativePath: string): string => {
  try {
    return new URL(relativePath).toString();
  } catch {
    try {
      return new URL(
        relativePath.replace(/^\//, ""),
        baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`,
      ).toString();
    } catch {
      throw new Error(`Invalid base URL: ${baseUrl}`);
    }
  }
};

export const isAbsoluteUrl = (value: string = ""): boolean => {
  try {
    const url = new URL(value);
    const hostnameParts = url.hostname.split(".");

    return (
      (url.protocol === "http:" || url.protocol === "https:") &&
      ((url.href.startsWith("http://") && value.startsWith("http://")) ||
        (url.href.startsWith("https://") && value.startsWith("https://"))) &&
      hostnameParts.length > 1 &&
      hostnameParts[hostnameParts.length - 1].length > 1
    );
  } catch (error) {
    return false;
  }
};
