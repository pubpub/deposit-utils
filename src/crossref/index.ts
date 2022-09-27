import { dirname, join } from "path";
import { validateXMLWithXSD } from "validate-with-xmllint";
import { toXml } from "xast-util-to-xml";
import { x as xastscriptJsxFactory } from "xastscript";
import type { Element, Node } from "xastscript/lib";
import type { children } from "xastscript/lib/jsx-classic";
import * as Xastscript from "xastscript/lib/jsx-classic";
import type * as Schema from "./xmlns/www.crossref.org/schema/5.3.1";
import type { XastElement, XastText } from "./xmlns/xml-primitives";

export type Elements = {
  A: Schema.A;
  // TODO: rest of elements
};

type NormalElements = {
  [K in keyof Elements as Elements[K]["name"]]: Elements[K]["attributes"] extends {
    lang: string;
  }
    ? Omit<Elements[K], "attributes"> & {
        attributes: Omit<Elements[K]["attributes"], "lang"> & {
          "xml:lang"?: string;
        };
      }
    : Elements[K];
};

type ExtendChildren<E extends Element> = E["name"] extends keyof NormalElements
  ? ExtendElement<NormalElements[E["name"]]>
  : never;

type ExtendElement<T extends Element> = T["children"] extends Array<infer E>
  ? E extends Element
    ? Omit<T, "children"> & { children: ExtendChildren<E>[] }
    : T
  : T;

// Do this with tuple types and Exclude
export type ElementMap = {
  [K in keyof NormalElements]: ExtendElement<NormalElements[K]>;
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

export namespace x {
  export namespace JSX {
    export type Element = Xastscript.Element;
    export type ElementChildrenAttribute = Xastscript.ElementChildrenAttribute;
    export type IntrinsicAttributes = Xastscript.IntrinsicAttributes;
    export type IntrinsicElements = {
      [K in keyof ElementMap]: ExtractChildren<ElementMap[K]> &
        ExtractAttributes<ElementMap[K]>;
    };
  }
}

export const x = xastscriptJsxFactory;

export function validateXml(xml: string) {
  return validateXMLWithXSD(
    xml,
    join(
      dirname(require.resolve("@pubpub/deposit-utils/crossref")),
      "cache/xsd/data.crossref.org/schemas/crossref5.3.1.xsd"
    )
  );
}

export async function renderXml(
  node: Node | ElementMap[keyof ElementMap],
  validate = true
) {
  let xml = toXml(node);
  if (validate) {
    await validateXml(xml);
  }
  return xml;
}
