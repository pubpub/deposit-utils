import { validateXMLWithXSD } from "validate-with-xmllint";
import { toXml } from "xast-util-to-xml";
import { x as xastscriptJsxFactory } from "xastscript";
import type { Element, Node } from "xastscript/lib";
import type { children } from "xastscript/lib/jsx-classic";
import * as Xastscript from "xastscript/lib/jsx-classic";
import type * as Schema from "./xmlns/datacite.org/schema/kernel-4";
import type { XastElement, XastText } from "./xmlns/xml-primitives";

interface _Resource extends Schema.Resource {
  attributes: { xmlns: string };
}

interface _ResourceIdentifier extends Schema.ResourceIdentifier {
  attributes: {
    identifierType: string;
  };
}

interface _ResourceDescriptionsDescription
  extends Omit<Schema.ResourceDescriptionsDescription, "children"> {
  children: Schema.ResourceDescriptionsDescription["children"] extends Array<
    infer T
  >
    ? (T | XastText)[]
    : never;
}

interface _XastTextElement extends Schema.XastTextElement {
  name: "text";
}

interface _NonemptycontentStringType extends Schema.NonemptycontentStringType {
  name: "content";
}

interface _Edtf extends Schema.Edtf {
  name: "edtf";
}

interface _YearType extends Schema.YearType {
  name: "year";
}

interface _FunderName extends Schema.FunderName {
  name: "funderName";
}

interface _WestBoundLongitude extends Schema.WestBoundLongitude {
  name: "westBoundLongitude";
}

interface _EastBoundLongitude extends Schema.EastBoundLongitude {
  name: "eastBoundLongitude";
}

interface _NorthBoundLatitude extends Schema.NorthBoundLatitude {
  name: "northBoundLatitude";
}

interface _PointLatitude extends Schema.PointLatitude {
  name: "pointLatitude";
}

interface _PointLongitude extends Schema.PointLongitude {
  name: "pointLongitude";
}

interface _PublicationYear extends Schema.PublicationYear {
  name: "publicationYear";
}

interface _SouthBoundLatitude extends Schema.SouthBoundLatitude {
  name: "southBoundLatitude";
}

export type DataciteElements = {
  AffiliationIdentifier: Schema.AffiliationIdentifier;
  AffiliationIdentifierScheme: Schema.AffiliationIdentifierScheme;
  AwardURI: Schema.AwardURI;
  Box: Schema.Box;
  ClassificationCode: Schema.ClassificationCode;
  EastBoundLongitude: _EastBoundLongitude;
  Edtf: _Edtf;
  Format: Schema.Format;
  FunderName: _FunderName;
  Language: Schema.Language;
  NameIdentifierScheme: Schema.NameIdentifierScheme;
  NonemptycontentStringType: _NonemptycontentStringType;
  NorthBoundLatitude: _NorthBoundLatitude;
  Point: Schema.Point;
  PointLatitude: _PointLatitude;
  PointLongitude: _PointLongitude;
  PublicationYear: _PublicationYear;
  Resource: _Resource;
  ResourceAlternateIdentifiers: Schema.ResourceAlternateIdentifiers;
  ResourceAlternateIdentifiersAlternateIdentifier: Schema.ResourceAlternateIdentifiersAlternateIdentifier;
  ResourceContributors: Schema.ResourceContributors;
  ResourceContributorsContributor: Schema.ResourceContributorsContributor;
  ResourceCreators: Schema.ResourceCreators;
  ResourceCreatorsCreator: Schema.ResourceCreatorsCreator;
  ResourceCreatorsCreatorCreatorName: Schema.ResourceCreatorsCreatorCreatorName;
  ResourceDates: Schema.ResourceDates;
  ResourceDatesDate: Schema.ResourceDatesDate;
  ResourceDescriptions: Schema.ResourceDescriptions;
  ResourceDescriptionsDescription: _ResourceDescriptionsDescription;
  ResourceDescriptionsDescriptionBr: Schema.ResourceDescriptionsDescriptionBr;
  ResourceFormats: Schema.ResourceFormats;
  ResourceFundingReferences: Schema.ResourceFundingReferences;
  ResourceFundingReferencesFundingReference: Schema.ResourceFundingReferencesFundingReference;
  ResourceFundingReferencesFundingReferenceAwardNumber: Schema.ResourceFundingReferencesFundingReferenceAwardNumber;
  ResourceFundingReferencesFundingReferenceFunderIdentifier: Schema.ResourceFundingReferencesFundingReferenceFunderIdentifier;
  ResourceGeoLocations: Schema.ResourceGeoLocations;
  ResourceGeoLocationsGeoLocation: Schema.ResourceGeoLocationsGeoLocation;
  ResourceIdentifier: _ResourceIdentifier;
  ResourceRelatedIdentifiers: Schema.ResourceRelatedIdentifiers;
  ResourceRelatedIdentifiersRelatedIdentifier: Schema.ResourceRelatedIdentifiersRelatedIdentifier;
  ResourceRelatedItems: Schema.ResourceRelatedItems;
  ResourceRelatedItemsRelatedItem: Schema.ResourceRelatedItemsRelatedItem;
  ResourceRelatedItemsRelatedItemContributorsContributorContributorName: Schema.ResourceRelatedItemsRelatedItemContributorsContributorContributorName;
  ResourceRelatedItemsRelatedItemCreators: Schema.ResourceRelatedItemsRelatedItemCreators;
  ResourceRelatedItemsRelatedItemCreatorsCreatorCreatorName: Schema.ResourceRelatedItemsRelatedItemCreatorsCreatorCreatorName;
  ResourceRelatedItemsRelatedItemNumber: Schema.ResourceRelatedItemsRelatedItemNumber;
  ResourceRelatedItemsRelatedItemRelatedItemIdentifier: Schema.ResourceRelatedItemsRelatedItemRelatedItemIdentifier;
  ResourceRelatedItemsRelatedItemTitles: Schema.ResourceRelatedItemsRelatedItemTitles;
  ResourceRelatedItemsRelatedItemTitlesTitle: Schema.ResourceRelatedItemsRelatedItemTitlesTitle;
  ResourceResourceType: Schema.ResourceResourceType;
  ResourceRightsList: Schema.ResourceRightsList;
  ResourceRightsListRights: Schema.ResourceRightsListRights;
  ResourceSizes: Schema.ResourceSizes;
  ResourcePublisher: Schema.ResourcePublisher;
  ResourceSubjects: Schema.ResourceSubjects;
  ResourceSubjectsSubject: Schema.ResourceSubjectsSubject;
  ResourceTitles: Schema.ResourceTitles;
  ResourceTitlesTitle: Schema.ResourceTitlesTitle;
  RightsURI: Schema.RightsURI;
  SchemeURI: Schema.SchemeURI;
  Size: Schema.Size;
  SouthBoundLatitude: _SouthBoundLatitude;
  ValueURI: Schema.ValueURI;
  Version: Schema.Version;
  WestBoundLongitude: _WestBoundLongitude;
  XastTextElement: _XastTextElement;
  YearType: _YearType;
};

type DataciteElementsByName = {
  [K in keyof DataciteElements as DataciteElements[K]["name"]]: DataciteElements[K]["attributes"] extends {
    lang: string;
  }
    ? Omit<DataciteElements[K], "attributes"> & {
        attributes: Omit<DataciteElements[K]["attributes"], "lang"> & {
          "xml:lang"?: string;
        };
      }
    : DataciteElements[K];
};

type ExtendDataciteChildren<E extends Element> =
  E["name"] extends keyof DataciteElementsByName
    ? ExtendDataciteElement<DataciteElementsByName[E["name"]]>
    : never;

type ExtendDataciteElement<T extends Element> = T["children"] extends Array<
  infer E
>
  ? E extends Element
    ? Omit<T, "children"> & { children: ExtendDataciteChildren<E>[] }
    : T
  : T;

// Do this with tuple types and Exclude
export type DataciteElementMap = {
  [K in keyof DataciteElementsByName]: ExtendDataciteElement<
    DataciteElementsByName[K]
  >;
};

type ExtractAttributes<T extends XastElement> =
  undefined extends T["attributes"] ? {} : T["attributes"];

type NormalizeChildText<T> = T extends XastText
  ? Exclude<T, XastText> | string
  : T;
type NormalizeChildElement<T> = T extends Node ? Exclude<T, Node> | Node : T;
type NormalizeChild<T> = NormalizeChildElement<NormalizeChildText<T>>;
type NormalizeChildren<
  T extends unknown[],
  O extends unknown[] = []
> = T extends []
  ? O
  : T extends [infer Head, ...infer Tail]
  ? NormalizeChildren<Tail, [...O, NormalizeChild<Head>]>
  : NormalizeChild<T[0]>[];

type ExtractChildren<T extends XastElement> = undefined extends T["children"]
  ? {}
  : T["children"] extends []
  ? {}
  : {
      [children]: T["children"] extends [infer _]
        ? NormalizeChild<_>
        : T["children"] extends [unknown, ...unknown[]]
        ? NormalizeChildren<T["children"]>
        : T["children"] extends Array<infer _>
        ? NormalizeChild<_> | NormalizeChild<_>[]
        : never;
    };

export type DataciteIntrinsicElements = {
  [K in keyof DataciteElementMap]: ExtractChildren<DataciteElementMap[K]> &
    ExtractAttributes<DataciteElementMap[K]>;
};

export namespace x {
  export namespace JSX {
    export type Element = Xastscript.Element;
    export type ElementChildrenAttribute = Xastscript.ElementChildrenAttribute;
    export type IntrinsicAttributes = Xastscript.IntrinsicAttributes;
    export type IntrinsicElements = DataciteIntrinsicElements;
  }
}

export const x = xastscriptJsxFactory;

export function validateXml(xml: string) {
  validateXMLWithXSD(
    xml,
    "cache/xsd/schema.datacite.org/meta/kernel-4.4/metadata.xsd"
  );
}

export function renderXml(
  node: Node | DataciteElementMap[keyof DataciteElementMap],
  validate = true
) {
  let xml = toXml(node);
  if (validate) {
    validateXml(xml);
  }
  return xml;
}
