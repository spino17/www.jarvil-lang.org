// import { parser } from "@lezer/python";
import { parser } from "./parser";
import {
  // syntaxTree,
  LRLanguage,
  indentNodeProp,
  foldNodeProp,
  LanguageSupport,
} from "@codemirror/language";
// import { NodeWeakMap, IterMode } from "@lezer/common";
import {
  snippetCompletion,
  ifNotIn,
  completeFromList,
} from "@codemirror/autocomplete";
import context from "react-bootstrap/esm/AccordionContext";

// @ts-check
/*
const cache = new NodeWeakMap();
const ScopeNodes = new Set([
  "Script",
  "Body",
  "FunctionDefinition",
  "ClassDefinition",
  "LambdaExpression",
  "ForStatement",
  "MatchClause",
]);
function defID(type) {
  return (node, def, outer) => {
    if (outer) return false;
    let id = node.node.getChild("VariableName");
    if (id) def(id, type);
    return true;
  };
}
const gatherCompletions = {
  FunctionDefinition: defID("function"),
  ClassDefinition: defID("class"),
  ForStatement(node, def, outer) {
    if (outer)
      for (let child = node.node.firstChild; child; child = child.nextSibling) {
        if (child.name == "VariableName") def(child, "variable");
        else if (child.name == "in") break;
      }
  },
  ImportStatement(_node, def) {
    var _a, _b;
    let { node } = _node;
    let isFrom =
      ((_a = node.firstChild) === null || _a === void 0 ? void 0 : _a.name) ==
      "from";
    for (let ch = node.getChild("import"); ch; ch = ch.nextSibling) {
      if (
        ch.name == "VariableName" &&
        ((_b = ch.nextSibling) === null || _b === void 0 ? void 0 : _b.name) !=
          "as"
      )
        def(ch, isFrom ? "variable" : "namespace");
    }
  },
  AssignStatement(node, def) {
    for (let child = node.node.firstChild; child; child = child.nextSibling) {
      if (child.name == "VariableName") def(child, "variable");
      else if (child.name == ":" || child.name == "AssignOp") break;
    }
  },
  ParamList(node, def) {
    for (
      let prev = null, child = node.node.firstChild;
      child;
      child = child.nextSibling
    ) {
      if (
        child.name == "VariableName" &&
        (!prev || !/\*|AssignOp/.test(prev.name))
      )
        def(child, "variable");
      prev = child;
    }
  },
  CapturePattern: defID("variable"),
  AsPattern: defID("variable"),
  __proto__: null,
};
*/
/*
function getScope(doc, node) {
  let cached = cache.get(node);
  if (cached) return cached;
  let completions = [],
    top = true;
  function def(node, type) {
    let name = doc.sliceString(node.from, node.to);
    completions.push({ label: name, type });
  }
  node.cursor(IterMode.IncludeAnonymous).iterate((node) => {
    if (node.name) {
      let gather = gatherCompletions[node.name];
      if (
        (gather && gather(node, def, top)) ||
        (!top && ScopeNodes.has(node.name))
      )
        return false;
      top = false;
    } else if (node.to - node.from > 8192) {
      // Allow caching for bigger internal nodes
      for (let c of getScope(doc, node.node)) completions.push(c);
      return false;
    }
  });
  cache.set(node, completions);
  return completions;
}*/
// const Identifier = /^[\w\xa1-\uffff][\w\d\xa1-\uffff]*$/;
const dontComplete = ["String", "FormatString", "Comment", "PropertyName"];
/*
function localCompletionSource(context) {
  let inner = syntaxTree(context.state).resolveInner(context.pos, -1);
  if (dontComplete.indexOf(inner.name) > -1) return null;
  let isWord =
    inner.name == "VariableName" ||
    (inner.to - inner.from < 20 &&
      Identifier.test(context.state.sliceDoc(inner.from, inner.to)));
  if (!isWord && !context.explicit) return null;
  let options = [];
  for (let pos = inner; pos; pos = pos.parent) {
    if (ScopeNodes.has(pos.name))
      options = options.concat(getScope(context.state.doc, pos));
  }
  return {
    options,
    from: isWord ? inner.from : context.pos,
    validFor: Identifier,
  };
}
*/
const globals = ["False", "True"]
  .map((n) => ({ label: n, type: "constant" }))
  .concat(
    ["bool", "float", "int", "str"].map((n) => ({ label: n, type: "type" }))
  )
  .concat(["print"].map((n) => ({ label: n, type: "function" })));
const snippets = [
  /*
  snippetCompletion("def ${name}(${params}):\n\t${}", {
    label: "def",
    detail: "function",
    type: "keyword",
  }),*/
  snippetCompletion("for ${name} in ${collection}:\n\t${}", {
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
    "type ${name} struct:\n\tdef __init__(${params}) -> ${name}:\n\t\t${}",
    {
      label: "type",
      detail: "struct",
      type: "keyword",
    }
  ),
  snippetCompletion(
    "type ${name} lambda = (${param_types}) -> ${return_type}",
    {
      label: "type",
      detail: "lambda",
      type: "keyword",
    }
  ),
];
/*
Autocompletion for built-in Jarvil globals and keywords.
*/
const globalCompletion = ifNotIn(
  dontComplete,
  completeFromList(globals.concat(snippets))
);

function indentBody(context, node) {
  let base = context.lineIndent(node.from);
  let line = context.lineAt(context.pos, -1),
    to = line.from + line.text.length;
  // Don't consider blank, deindented lines at the end of the
  // block part of the block
  if (
    /^\s*($|#)/.test(line.text) &&
    context.node.to < to + 100 &&
    !/\S/.test(context.state.sliceDoc(to, context.node.to)) &&
    context.lineIndent(context.pos, -1) <= base
  )
    return null;
  // A normally deindenting keyword that appears at a higher
  // indentation than the block should probably be handled by the next
  // level
  if (
    /^\s*(else:|elif )/.test(context.textAfter) &&
    context.lineIndent(context.pos, -1) > base
  )
    return null;
  return base + context.unit;
}

const jarvilLanguage = LRLanguage.define({
  name: "jarvil",
  parser: parser.configure({
    props: [
      indentNodeProp.add({
        Body: (context) => {
          var _a;
          return (_a = indentBody(context, context.node)) !== null &&
            _a !== void 0
            ? _a
            : context.continue();
        },
        StructBody: (context) => {
          var _a;
          return (_a = indentBody(context, context.node)) !== null &&
            _a !== void 0
            ? _a
            : context.continue();
        },
        "String FormatString BlockComment": () => null,
        IfStatement: (cx) =>
          /^\s*(else:|elif )/.test(cx.textAfter)
            ? cx.baseIndent
            : cx.continue(),
        Script: (context) => {
          if (
            context.pos + /\s*/.exec(context.textAfter)[0].length >=
            context.node.to
          ) {
            let endBody = null;
            for (let cur = context.node, to = cur.to; ; ) {
              cur = cur.lastChild;
              if (!cur || cur.to != to) break;
              if (cur.type.name == "Body") endBody = cur;
            }
            if (endBody) {
              let bodyIndent = indentBody(context, endBody);
              if (bodyIndent != null) return bodyIndent;
            }
          }
          return context.continue();
        },
      }),
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
    commentTokens: { line: "#", block: { open: "/*", close: "*/" } },
    indentOnInput: /^\s*([\}\]\)]|else:|elif )$/,
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
