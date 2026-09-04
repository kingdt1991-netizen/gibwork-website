"use client";

import { useEffect, useState } from "react";
import { siteConfig } from "@/lib/site-config";

const REFERRAL_CODE_PATTERN = /^[A-Za-z0-9_-]{1,64}$/;

export function buildReferralAppUrl(search: string): string {
  const params = new URLSearchParams(search);
  const referralCode = params.get("ref");

  if (!referralCode || !REFERRAL_CODE_PATTERN.test(referralCode)) {
    return siteConfig.appUrl;
  }

  const appUrl = new URL(siteConfig.appUrl);
  appUrl.searchParams.set("ref", referralCode);
  return appUrl.toString();
}

export function useReferralAppUrl(): string {
  const [appUrl, setAppUrl] = useState(siteConfig.appUrl);

  useEffect(() => {
    setAppUrl(buildReferralAppUrl(window.location.search));
  }, []);

  return appUrl;
}
