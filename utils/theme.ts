import { createTheme } from "@uiw/codemirror-themes";
import { tags } from "@lezer/highlight";
import { HighlightStyle, syntaxHighlighting } from "@codemirror/language";
import { EditorView } from "codemirror";

export type Theme = {
  backgroundColor: string;
  primaryFontColor: string;
  secondaryFontColor: string;
  defaultFontColor: string;
};

export const themeData: Theme = {
  backgroundColor: "#161717",
  primaryFontColor: "",
  secondaryFontColor: "black",
  defaultFontColor: "white",
};

// NOTE: Below Theme extension is copied from `@codemirror/theme-one-dark` with minor custom modification to styling
// Using https://github.com/one-dark/vscode-one-dark-theme/ as reference for the colors
const chalky = "#e5c07b",
  coral = "#e06c75",
  cyan = "#56b6c2",
  invalid = "#ffffff",
  ivory = "#abb2bf",
  stone = "#7d8799", // Brightened compared to original to increase contrast
  malibu = "#61afef",
  sage = "#98c379",
  whiskey = "#d19a66",
  violet = "#c678dd",
  darkBackground = "#21252b",
  highlightBackground = "#1f2329",
  background = "#1a1c21",
  tooltipBackground = "#353a42",
  selection = "rgba(255, 255, 0, 0.5)",
  cursor = "#528bff";
/**
The colors used in the theme, as CSS color strings.
*/
const color = {
  chalky,
  coral,
  cyan,
  invalid,
  ivory,
  stone,
  malibu,
  sage,
  whiskey,
  violet,
  darkBackground,
  highlightBackground,
  background,
  tooltipBackground,
  selection,
  cursor,
};
/**
The editor theme styles for One Dark.
*/
const oneDarkTheme = /*@__PURE__*/ EditorView.theme(
  {
    "&": {
      color: ivory,
      backgroundColor: background,
    },
    ".cm-content": {
      caretColor: cursor,
    },
    ".cm-cursor, .cm-dropCursor": { borderLeftColor: cursor },
    "&.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection":
      { backgroundColor: selection },
    ".cm-panels": { backgroundColor: darkBackground, color: ivory },
    ".cm-panels.cm-panels-top": { borderBottom: "2px solid black" },
    ".cm-panels.cm-panels-bottom": { borderTop: "2px solid black" },
    ".cm-searchMatch": {
      backgroundColor: "#72a1ff59",
      outline: "1px solid #457dff",
    },
    ".cm-searchMatch.cm-searchMatch-selected": {
      backgroundColor: "#6199ff2f",
    },
    ".cm-activeLine": { backgroundColor: "#6699ff0b" },
    ".cm-selectionMatch": { backgroundColor: "#aafe661a" },
    "&.cm-focused .cm-matchingBracket, &.cm-focused .cm-nonmatchingBracket": {
      backgroundColor: "#bad0f847",
    },
    ".cm-gutters": {
      backgroundColor: background,
      color: stone,
      border: "none",
    },
    ".cm-activeLineGutter": {
      backgroundColor: highlightBackground,
    },
    ".cm-foldPlaceholder": {
      backgroundColor: "transparent",
      border: "none",
      color: "#ddd",
    },
    ".cm-tooltip": {
      border: "none",
      backgroundColor: tooltipBackground,
    },
    ".cm-tooltip .cm-tooltip-arrow:before": {
      borderTopColor: "transparent",
      borderBottomColor: "transparent",
    },
    ".cm-tooltip .cm-tooltip-arrow:after": {
      borderTopColor: tooltipBackground,
      borderBottomColor: tooltipBackground,
    },
    ".cm-tooltip-autocomplete": {
      "& > ul > li[aria-selected]": {
        backgroundColor: highlightBackground,
        color: ivory,
      },
    },
  },
  { dark: true }
);
/**
The highlighting style for code in the One Dark theme.
*/
const oneDarkHighlightStyle = /*@__PURE__*/ HighlightStyle.define([
  { tag: tags.keyword, color: violet },
  {
    tag: [tags.name],
    color: "white",
  },
  {
    tag: [
      // tags.name,
      tags.deleted,
      tags.character,
      tags.propertyName,
      tags.macroName,
    ],
    color: coral,
  },
  {
    tag: [/*@__PURE__*/ tags.function(tags.variableName), tags.labelName],
    color: malibu,
  },
  {
    tag: [
      tags.color,
      /*@__PURE__*/ tags.constant(tags.name),
      /*@__PURE__*/ tags.standard(tags.name),
    ],
    color: whiskey,
  },
  {
    tag: [/*@__PURE__*/ tags.definition(tags.name), tags.separator],
    color: ivory,
  },
  {
    tag: [
      tags.typeName,
      tags.className,
      tags.number,
      tags.changed,
      tags.annotation,
      tags.modifier,
      tags.self,
      tags.namespace,
    ],
    color: chalky,
  },
  {
    tag: [
      tags.operator,
      tags.operatorKeyword,
      tags.url,
      tags.escape,
      tags.regexp,
      tags.link,
      /*@__PURE__*/ tags.special(tags.string),
    ],
    color: cyan,
  },
  { tag: [tags.meta, tags.comment], color: stone, fontStyle: "italic" },
  { tag: tags.strong, fontWeight: "bold" },
  { tag: tags.emphasis, fontStyle: "italic" },
  { tag: tags.strikethrough, textDecoration: "line-through" },
  { tag: tags.link, color: stone, textDecoration: "underline" },
  { tag: tags.heading, fontWeight: "bold", color: coral },
  {
    tag: [tags.atom, tags.bool, /*@__PURE__*/ tags.special(tags.variableName)],
    color: whiskey,
  },
  {
    tag: [tags.processingInstruction, tags.string, tags.inserted],
    color: sage,
  },
  { tag: tags.invalid, color: invalid },
]);

// This extension sets the font-family
const customExtension = createTheme({
  theme: "dark",
  settings: {
    fontFamily: "Consolas, Courier New",
  },
  styles: [],
});
/**
Extension to enable the One Dark theme (both the editor theme and
the highlight style).
*/
export const oneDark = [
  oneDarkTheme,
  /*@__PURE__*/ syntaxHighlighting(oneDarkHighlightStyle),
  customExtension,
];
