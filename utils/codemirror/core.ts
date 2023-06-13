import { parser } from "./parser";
import {
  LRLanguage,
  foldNodeProp,
  LanguageSupport,
  TreeIndentContext,
} from "@codemirror/language";
import { Completion } from "@codemirror/autocomplete";
import { SyntaxNode } from "@lezer/common";
import {
  snippetCompletion,
  ifNotIn,
  completeFromList,
} from "@codemirror/autocomplete";

const dontComplete = ["String", "LineComment", "BlockComment", "PropertyName"];
const globals: Completion[] = ["False", "True"]
  .map((n) => ({ label: n, type: "constant" }))
  .concat(
    ["bool", "float", "int", "str"].map((n) => ({ label: n, type: "type" }))
  )
  .concat(["print"].map((n) => ({ label: n, type: "function" })));
const snippets = [
  snippetCompletion("def ${functionName}() -> ReturnType:\n\t${}", {
    label: "def",
    detail: "function",
    type: "keyword",
  }),
  snippetCompletion("for ${x} in ${iterable}:\n\t${}", {
    label: "for",
    detail: "loop",
    type: "keyword",
  }),
  snippetCompletion("while ${}:\n\t${}", {
    label: "while",
    detail: "loop",
    type: "keyword",
  }),
  snippetCompletion("if ${}:\n\t\n", {
    label: "if",
    detail: "block",
    type: "keyword",
  }),
  snippetCompletion("if ${}:\n\t${}\nelse:\n\t${}", {
    label: "if",
    detail: "/ else block",
    type: "keyword",
  }),
  snippetCompletion(
    "type ${StructName} struct:\n\tdef __init__() -> ${StructName}:\n\t\t${}",
    {
      label: "type",
      detail: "struct",
      type: "keyword",
    }
  ),
  snippetCompletion("type ${LambdaTypeName} lambda = () -> ${ReturnType}", {
    label: "type",
    detail: "lambda",
    type: "keyword",
  }),
];
/*
Autocompletion for built-in Jarvil globals and keywords.
*/
const globalCompletion = ifNotIn(
  dontComplete,
  completeFromList(globals.concat(snippets))
);

const jarvilLanguage = LRLanguage.define({
  name: "jarvil",
  parser: parser.configure({
    props: [
      foldNodeProp.add({
        BlockComment: (node, state) => ({
          from: node.from + 2,
          to: node.to - 2,
        }),
      }),
    ],
  }),
  languageData: {
    closeBrackets: {
      brackets: ["(", "[", "{", "'", '"'],
    },
    commentTokens: { block: { open: "/*", close: "*/" } },
    // indentOnInput: /^\s*([\}\]\)]|else:|elif )$/,
  },
});
/**
Jarvil language support.
*/
function jarvil() {
  return new LanguageSupport(jarvilLanguage, [
    jarvilLanguage.data.of({ autocomplete: globalCompletion }),
  ]);
}

export { jarvil };
