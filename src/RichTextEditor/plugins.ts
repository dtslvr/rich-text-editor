import {
    createBoldPlugin,
    createHighlightPlugin,
    createItalicPlugin,
    createParagraphPlugin,
    createPlateEditor,
    createReactPlugin,
    createUnderlinePlugin,
    deserializeHtml,
    ELEMENT_PARAGRAPH,
    isElement,
    onKeyDownToggleMark,
    PlatePlugin,
    PlateStoreState,
    serializeHtml,
    StyledLeaf,
    TDescendant,
    ToggleMarkPlugin,
} from "@udecode/plate";
import { createPluginFactory, withProps } from "@udecode/plate-core";
import { Node, Text } from "slate";

export const MARK_HIGHLIGHT_2 = "highlight-2";

export const plugins: PlatePlugin[] = [
    createReactPlugin(),
    createParagraphPlugin(),
    createBoldPlugin({
        deserializeHtml: {
            rules: [
                {
                    validNodeName: ["STRONG", "B"],
                },
            ],
        },
    }),
    createItalicPlugin(),
    createUnderlinePlugin(),
    createPluginFactory<ToggleMarkPlugin>({
        component: withProps(StyledLeaf, {
            as: "mark",
            className: `slate-${MARK_HIGHLIGHT_2}`,
        }),
        deserializeHtml: {
            rules: [
                {
                    validClassName: `slate-${MARK_HIGHLIGHT_2}`,
                    validNodeName: ["MARK"],
                },
            ],
        },
        handlers: {
            onKeyDown: onKeyDownToggleMark,
        },
        isLeaf: true,
        key: MARK_HIGHLIGHT_2,
    })(),
    createHighlightPlugin(),
];

const editor = createPlateEditor({ plugins });
export const serializeSlateDocument = (nodes: TDescendant[]) => {
    const unwrappedNodes =
        nodes.length === 1 && isElement(nodes[0]) && nodes[0].type === undefined
            ? nodes[0].children
            : nodes;

    const escapedUnwrappedNodes = [];

    for (const unwrappedNode of unwrappedNodes) {
        const children = unwrappedNode.children.map((child: TDescendant) => {
            if (typeof child.text === "string") {
                let newChild = {
                    ...child,
                    text: child.text.replace(/&/g, "&amp;"),
                };
                newChild = {
                    ...newChild,
                    text: newChild.text.replace(/</g, "&lt;"),
                };
                newChild = {
                    ...newChild,
                    text: newChild.text.replace(/>/g, "&gt;"),
                };
                newChild = {
                    ...newChild,
                    text: newChild.text.replace(/"/g, "&quot;"),
                };
                newChild = {
                    ...newChild,
                    text: newChild.text.replace(/'/g, "&#039;"),
                };
                newChild = {
                    ...newChild,
                    text: newChild.text.replace(/\n/g, "<br>"),
                };

                return { ...newChild, text: encodeURIComponent(newChild.text) };
            }

            return child;
        });

        escapedUnwrappedNodes.push({ ...unwrappedNode, children });
    }

    return serializeHtml(editor, {
        nodes: escapedUnwrappedNodes,
    });
};

export const deserializeSlateDocument = (
    html: string
): PlateStoreState["value"] => {
    const fragment = deserializeHtml(editor, {
        element: html,
    });
    const transformNode = (node: Node): any =>
        isElement(node) && node.type === undefined
            ? {
                  type: ELEMENT_PARAGRAPH,
                  children: node.children.map(transformNode),
              }
            : node;
    const transformedNodes =
        fragment.length === 0 ? [{ text: "" }] : fragment.map(transformNode);
    return [
        {
            children: Text.isTextList(transformedNodes)
                ? [
                      {
                          type: ELEMENT_PARAGRAPH,
                          children: transformedNodes,
                      },
                  ]
                : transformedNodes,
        },
    ];
};
