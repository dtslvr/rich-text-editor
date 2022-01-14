import { Meta, Story } from "@storybook/react/types-6-0";
import React from "react";

import { deserializeSlateDocument } from "./plugins";
import RichTextEditor, { RichTextEditorProps } from "./RichTextEditor";

export default {
    title: "Rich Text Editor",
    component: RichTextEditor,
} as Meta;

const Template: Story<RichTextEditorProps> = (args) => (
    <div>
        <RichTextEditor
            {...args}
            editorId={`editor1-${Date.now()}`}
            label="Editor 1"
        />
        <RichTextEditor
            {...args}
            editorId={`editor2-${Date.now()}`}
            label="Editor 2"
        />
        <RichTextEditor
            {...args}
            editorId={`editor3-${Date.now()}`}
            label="Editor 3"
        />
    </div>
);

const defaultValue = deserializeSlateDocument(`
<div>
<p>Lorem <b>ipsum</b> dolor sit <strong class="slate-bold">amet</strong>, <i>consectetur</i> adipiscing <u>elit</u>. Proin <mark>vehicula</mark> ac <mark class="slate-highlight-2">arcu</mark> quis aliquam. Praesent eleifend magna non metus mattis, ac varius lorem accumsan.</p>
<p>&lt;thisisnotatag&gt;</p>
</div>
`);

export const Default = Template.bind({});
Default.args = {
    defaultValue,
    enableInlineEditor: false,
    onChange: (value: any) => {
        console.log(value);
    },
};

export const Inline = Template.bind({});
Inline.args = {
    defaultValue,
    enableInlineEditor: true,
    onChange: (value: any) => {
        console.log(value);
    },
};

export const CustomizedToolbar = Template.bind({});
CustomizedToolbar.args = {
    customizedToolbar: ["highlight"],
    defaultValue: deserializeSlateDocument(
        `<div><p>Lorem ipsum dolor sit amet</p></div>`
    ),
    enableInlineEditor: false,
    onChange: (value: any) => {
        console.log(value);
    },
};
