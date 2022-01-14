import { createStyles, Theme, WithStyles, withStyles } from "@material-ui/core";
import { BalloonToolbar, Plate, PlateStoreState } from "@udecode/plate";
import React, { FunctionComponent } from "react";
import { EditableProps } from "slate-react/dist/components/editable";

import { defaultHighlightColor, defaultHighlightColor2 } from "./configuration";
import { plugins } from "./plugins";
import RichTextEditorToolbar from "./RichTextEditorToolbar";

const styles = (theme: Theme) =>
    createStyles({
        editor: {
            fontSize: theme.typography.pxToRem(15) + " !important",
            lineHeight: "1.3 !important",
            "& p": {
                padding: 0,
            },
            "& .slate-bold": {
                fontWeight: "bold",
            },
            "& .slate-highlight": {
                backgroundColor: defaultHighlightColor,
            },
            "& .slate-highlight-2": {
                backgroundColor: defaultHighlightColor2,
            },
            "& .slate-italic": {
                fontStyle: "italic",
            },
            "& .slate-underline": {
                textDecoration: "underline",
            },
        },
    });

const RichTextArea: FunctionComponent<
    Readonly<{
        customizedToolbar: string[];
        editorId?: string;
        className?: string;
        defaultValue: PlateStoreState["value"];
        editableProps?: EditableProps;
        enableInlineEditor?: boolean;
        onChange?: (document: PlateStoreState["value"]) => void;
    }> &
        WithStyles<typeof styles>
> = ({
    children,
    classes,
    customizedToolbar,
    editorId,
    className,
    defaultValue,
    editableProps,
    enableInlineEditor,
    onChange,
}) => {
    console.log(editorId);

    return (
        <>
            <Plate
                id={editorId}
                editableProps={{
                    className:
                        classes.editor + (className ? " " + className : ""),
                    ...editableProps,
                }}
                initialValue={defaultValue}
                onChange={(doc) => {
                    onChange?.(doc as any);
                }}
                plugins={plugins}
            >
                {children}
                {enableInlineEditor === true && (
                    <BalloonToolbar theme="light">
                        <RichTextEditorToolbar
                            customizedToolbar={customizedToolbar}
                        />
                    </BalloonToolbar>
                )}
            </Plate>
        </>
    );
};

export default withStyles(styles)(RichTextArea);
