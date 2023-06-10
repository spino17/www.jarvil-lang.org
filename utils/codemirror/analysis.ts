// import { parser } from "./test";
import { parser } from "@lezer/python";

function runParser(code: string) {
  let tree = parser.parse(code);
  // let cursor = tree.cursor;
  let topNode = tree.topNode;
  let children = topNode.getChildren("Statement");
  console.log(children);
}

export { runParser };
