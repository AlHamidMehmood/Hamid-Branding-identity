/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ColorInfo {
  hex: string;
  name: string;
  usage: string;
}

export interface TypographyPair {
  header: {
    fontFamily: string;
    source: string;
    description: string;
  };
  body: {
    fontFamily: string;
    source: string;
    description: string;
  };
}

export interface LogoDescription {
  description: string;
  style: string;
  visualElements: string[];
}

export interface BrandBible {
  companyName: string;
  missionStatement: string;
  brandPersonality: string;
  palette: ColorInfo[];
  typography: TypographyPair;
  logoConcepts: {
    primary: LogoDescription;
    secondary: LogoDescription;
    mark: LogoDescription;
  };
  narrative: string;
}
